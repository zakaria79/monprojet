<?php

namespace App\Admin\Calendar\DAO;

use Silex\Application;
use App\Admin\Calendar\Domain\{ Event, RdvEvent };
use DAO\DAO;

class EventDAO extends DAO
{
  /**
   * @param Application $app
   */
  public function __construct(Application $app)
  {
    parent::__construct($app);
  }

  // Récupération des évenements compris entre le début et la fin du calendrier affiché
  public function getEvents(string $start, string $end) : array
  {
    $s = explode('-', $start);
    $e = explode('-', $end);
    if (\checkdate($s[1], $s[2], $s[0]) === false || \checkdate($e[1], $e[2], $e[0]) === false) {
      throw new \Exception('Date Invalide');
    }
    $start = $start.' 00:00:00';
    $end = $end.' 23:59:59';
    $bdd = $this->getBdd();
    $sql = "SELECT event_Id,title,start,end,allday,color,recurrence,date_end_rec,days_rec,event_interval,end_rec_type,start_end_diff
      FROM event 
      WHERE (start BETWEEN :start AND :end)
      OR (end BETWEEN :start AND :end) OR
      (start <= :start AND end >= :start)
      OR (recurrence > 1 AND start <= :start AND 
      (date_end_rec > :start 
      OR (start_end_diff > 1 AND DATE_ADD(date_end_rec, INTERVAL start_end_diff DAY) > :start)))
      ORDER BY start";
    $query = $bdd->prepare($sql);
    $query->bindParam(':start', $start);
    $query->bindParam(':end', $end);
    $query->execute();
    return $query->fetchAll(\PDO::FETCH_ASSOC);
  }

  /**
   * Récupère les rdvs
   *
   * @return array
   */
  public function getRdvs(int $page = 1)
  {
    $bdd = $this->getBdd();
    $sql_total = 'SELECT COUNT(rdv_Id) AS total FROM rdv ';
    $limit = 10;
    $start = ($page -1) * $limit;
    $query = $bdd->prepare($sql_total);
    $query->execute();
    $total = $query->fetch();
    $numberOfPages = ceil((int) $total['total'] / $limit);
    if ((int) $total['total'] <= 0 || (int) $page > $numberOfPages) {
      return [
        'rdv' => null,
        'total' => $total['total'],
      ];
    }
    $sql = "SELECT rdv.rdv_Id AS rdv_Id, u.user_Id, u.mail AS user_mail, u.tel AS user_tel, client_email, client_first_name, client_name, client_tel, e.date_creation, 
      e.start, e.last_modif, ro.rdv_object, rs.rdv_status, r.role_name, user_first_name, user_name, rdv.rdv_status_Id
      FROM rdv
      LEFT JOIN event AS e
      ON rdv.event_Id = e.event_Id
      LEFT JOIN rdv_object AS ro
      ON rdv.rdv_object_Id = ro.rdv_object_Id
      LEFT JOIN visibility AS v
      ON v.visibility_Id = e.visibility_Id
      LEFT JOIN category AS cg
      ON cg.category_Id = e.category_Id
      LEFT JOIN user AS u
      ON u.user_Id = e.user_Id
      LEFT JOIN role AS r
      ON r.Id = u.role_Id
      LEFT JOIN rdv_status AS rs
      ON rs.rdv_status_Id = rdv.rdv_status_Id
      ORDER BY start DESC
      LIMIT ? OFFSET ?
    ";
    $query = $bdd->prepare($sql);
    $query->bindValue(1, $limit, \PDO::PARAM_INT);
    $query->bindValue(2, $start, \PDO::PARAM_INT);
    $query->execute();
    return array(
      'rdv' => $query->fetchAll(\PDO::FETCH_ASSOC),
      'total' => $total['total']
    );
  }


  // Récupération des évenements à partir des identifiants
  public function getEventsByIds(string $ids) : array
  {
    $ids = explode(',',$ids);
    $bdd = $this->getBdd();
    $param = [];
    for ($i = 0; $i < count($ids); $i++) {
      array_push($param, '?');
    }
    $sql = "SELECT *, r.role_name AS role, e.date_creation AS event_date_creation
      FROM event AS e
      LEFT JOIN visibility AS v
      ON v.visibility_Id = e.visibility_Id
      LEFT JOIN category AS cg
      ON cg.category_Id = e.category_Id
      LEFT JOIN user AS u
      ON u.user_Id = e.user_Id
      RIGHT JOIN role AS r
      ON r.Id = u.role_Id
      WHERE event_Id IN (".implode(',',$param).")
      ORDER BY start";
    $query = $bdd->prepare($sql);
    for ($i = 0; $i < count($ids); $i++) {
      $query->bindParam($i +1, $ids[$i]);
    }
    $query->execute();
    return $query->fetchAll(\PDO::FETCH_ASSOC);
  }

  /**
   * Update Event
   * @return void
   */
  public function updateEvent(array $eventArray, int $user_Id)
  {
    try {
      $bdd = $this->getBdd();
      $sql = '';
      $event = $this->buildDomainObject($eventArray);
      $event->setLast_modif(new \DateTimeImmutable());
      $query = $bdd->prepare('select * from rdv where event_Id = ?');
      $query->execute([$event->getEvent_Id()]);
      $wasRdv = $query->fetch();
      if ($event->isRdv()) {
        $rdv = new RdvEvent();
        $rdv->setClient_mail($eventArray['client_mail'])
          ->setClient_name($eventArray['client_name'])
          ->setClient_first_name($eventArray['client_first_name'])
          ->setClient_tel($eventArray['client_tel'])
          ->setClient_rdv_object($eventArray['client_rdv_object']);
        $rdvParam = array(
          $rdv->getClient_mail(),
          $rdv->getClient_name(),
          $rdv->getClient_first_name(),
          $rdv->getClient_tel(),
          $rdv->getClient_rdv_object(),
          $event->getEvent_Id()
        );
        $bdd->beginTransaction();
        if ($wasRdv) {
          $sql = 'UPDATE rdv SET client_email=?, client_name=?, client_first_name=?, client_tel=?, rdv_object_Id=? WHERE event_Id=?';
        } else {
          $sql = 'INSERT INTO rdv (client_email, client_name, client_first_name, client_tel, rdv_object_Id, event_Id) VALUES (?,?,?,?,?,?)';
        }
          $query2 = $bdd->prepare($sql);
          $query2->execute($rdvParam);
      } else {
        if ($wasRdv) {
          $bdd->beginTransaction();
          $query = $bdd->prepare('DELETE FROM rdv WHERE event_Id = ?');
          $query->execute([$event->getEvent_Id()]);
        }
      }

      $query = $bdd->prepare($event->getSqlUpdateQuery());
      $query->execute($event->getSqlParamArray());
      if ($bdd->inTransaction()) {
        $bdd->commit();
      }
    } catch (\PDOException $e) {
      if ($bdd->inTransaction()) {
        $bdd->rollback();
      }
      return $e->getMessage();
    }
  }

  // Sauvegarde un événement
  public function save(int $user_Id, array $eventArray)
  {
    $bdd = $this->getBdd();
    try {
      $event = $this->buildDomainObject($eventArray);
      $event->setDate_creation(new \DateTimeImmutable());
      $event->setUser_Id($user_Id);
      if ($event->getCategory_Id() === 1) {
        $bdd->beginTransaction();
        $rdv = new RdvEvent();
        $rdv->setClient_mail($eventArray['client_mail'])
        ->setClient_name($eventArray['client_name'])
        ->setClient_first_name($eventArray['client_first_name'])
        ->setClient_tel($eventArray['client_tel'])
        ->setClient_rdv_object($eventArray['client_rdv_object']);
      }
      $query = $bdd->prepare($event->getSqlInsertQuery());
      $query->execute($event->getSqlParamArray());

      if ($bdd->inTransaction()) {
        $event_Id = $bdd->lastInsertId();
        $sql = '
        INSERT INTO rdv (client_email, client_name, client_first_name, client_tel, event_Id, rdv_object_Id)
        VALUES (:client_email, :client_name, :client_first_name, :client_tel, :event_Id, :rdv_object_Id)';
        $query2 = $bdd->prepare($sql);
        $query2->bindValue(':client_email', $rdv->getClient_mail());
        $query2->bindValue(':client_name', $rdv->getClient_name());
        $query2->bindValue(':client_first_name', $rdv->getClient_first_name());
        $query2->bindValue(':client_tel', $rdv->getClient_tel());
        $query2->bindValue(':rdv_object_Id', $rdv->getClient_rdv_object());
        $query2->bindValue(':event_Id', $event_Id);
        $query2->execute();
        $bdd->commit();
        return 'bon';
      }
    } catch (\PDOException $e) {
      if ($bdd->inTransaction()) {
        $bdd->rollback();
      }
      return null;
    }
  }

  // Returne un objet Event à partir des données du formulaire
  public function buildDomainObject(array $eventArray) : Event
  {
    $event = new Event();
    $event->setEvent_Id($eventArray['event_Id'])
      ->setTitle($eventArray['title'])
      ->setComment($eventArray['comment'])
      ->setAvailable($eventArray['available'])
      ->setColor($eventArray['color'])
      ->setCategory_Id($eventArray['category_Id'])
      ->setVisibility_Id($eventArray['visibility_Id'])
      // Heure début et fin
      ->setAllday(
        $eventArray['allday'],
        $eventArray['start_hour'],
        $eventArray['start_minute'],
        $eventArray['end_hour'],
        $eventArray['end_minute']
      )
      // Date de début
      ->setStart_year($eventArray['start_year'])
      ->setStart_month($eventArray['start_month'])
      ->setStart_day($eventArray['start_day'])
      // Date de fin de recurrence
      ->setEndRec_year($eventArray['endRec_year'])
      ->setEndRec_month($eventArray['endRec_month'])
      ->setEndRec_day($eventArray['endRec_day'])
      ->setStart()
      ->setRecurrence( $eventArray['recurrence'],
        $eventArray['end_rec_type'],
        $eventArray['event_interval'],
        $eventArray['days_rec'],
        $eventArray['number_repetitions']
      );
    if ($event->getCategory_Id() !== 1) {
      // Date de fin
      $event->setEnd_year($eventArray['end_year']) ->setEnd_month($eventArray['end_month']) ->setEnd_day($eventArray['end_day']);
    }
    $event->setEnd()->setStart_end_diff();
    return $event;
  }

  /**
   * Supprime un évenement de la base de données
   * @param integer $id
   */
  public function delete(int $id)
  {
    if ($id <= 0) { throw new \Exception('L\'identifiant de l\'évènement est inéxistant'); }
    try {
      $bdd = $this->getBdd();
      $query = $bdd->prepare('SELECT * FROM rdv WHERE event_Id = ?');
      $query->execute([$id]);
      $isRdv = $query->fetch();
      if ($isRdv !== false) {
        $bdd->beginTransaction();
        $query = $bdd->prepare('DELETE FROM rdv WHERE event_Id = ?');
        $query->execute([$id]);
      }
      $sql = "DELETE FROM `event` WHERE event_Id = ?";
      $query = $bdd->prepare($sql);
      $query->execute([$id]);
      if ($bdd->inTransaction()) {
        $bdd->commit();
      }
    } catch (\PDOException $e) {
      if ($bdd->inTransaction()) {
        $bdd->rollback();
        return $e->getMessage();
      }
    }
  }

  /**
   * Change le status du rdv "À venir, Annulé..."
   *
   * @return 
   */
  public function changeRdvStatus($data)
  {
    $sql = 'UPDATE rdv SET rdv_status_Id = :rdvstatus WHERE rdv_Id = :rdv_Id';
    $bdd = $this->getBdd();
    $query = $bdd->prepare($sql);
    foreach ($data['rdv'] as $rdv) {
      $query->bindParam(':rdvstatus', $data['rdv_status']);
      $query->bindParam(':rdv_Id', $rdv);
      $query->execute();
    }
  }
}
