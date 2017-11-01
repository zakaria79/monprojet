<?php
namespace App\Partner\DAO;

use Silex\Application;
use App\Partner\Domain\Rdv;
use App\Admin\User\Domain\User;
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

  /**
   * Récupère les événements d'un utilisateur
   *
   * @return 
   */
  public function getEventsByUser(int $user_Id, int $page = 1)
  {
    $bdd = $this->getBdd();
    $sql_total = '
      SELECT COUNT(rdv_Id) AS total FROM rdv
      LEFT JOIN event AS e
      ON e.event_Id = rdv.event_Id
      WHERE e.user_Id = :user_Id
    ';
    $limit = 10;
    $start = ($page -1) * $limit;
    $query = $bdd->prepare($sql_total);
    $query->bindValue(':user_Id', $user_Id);
    $query->execute();
    $total = $query->fetch();
    $numberOfPages = ceil((int) $total['total'] / $limit);
    if ((int) $page > $numberOfPages || (int) $page <= 0) {
      throw new \Exception('Cette page n\'existe pas');
    }
    $sql = "SELECT start, rdv_Id, rdv_object.rdv_object, client_name, rdv_removed, client_first_name, client_name, client_email, client_tel, rdv_status.rdv_status
      FROM rdv
      LEFT JOIN event AS e
      ON e.event_Id = rdv.event_Id
      LEFT JOIN rdv_status
      ON rdv.rdv_status_Id = rdv_status.rdv_status_Id
      LEFT JOIN rdv_object
      ON rdv.rdv_object_Id = rdv_object.rdv_object_Id
      WHERE e.user_Id = ?
      ORDER BY start
      LIMIT ? OFFSET ?
      ";
    $sql2 = 'SELECT COUNT(rdv_status_Id) AS apayer FROM rdv 
        LEFT JOIN event AS e
        ON e.event_Id = rdv.event_Id
        WHERE rdv_status_Id = 3 AND e.user_Id = :user_Id
        UNION ALL
        SELECT COUNT(rdv_status_Id) as paye FROM rdv 
        LEFT JOIN event AS e
        ON e.event_Id = rdv.event_Id
        WHERE rdv_status_Id = 4 AND e.user_Id = :user_Id
    ';
    $query = $bdd->prepare($sql);
    $query->bindValue(1, $user_Id, \PDO::PARAM_INT);
    $query->bindValue(2, $limit, \PDO::PARAM_INT);
    $query->bindValue(3, $start, \PDO::PARAM_INT);
    $query->execute();
    $query2 = $bdd->prepare($sql2);
    $query2->bindValue(':user_Id', $user_Id);
    $query2->execute();
    return array(
      $query->fetchAll(\PDO::FETCH_ASSOC),
      $query2->fetchAll(\PDO::FETCH_ASSOC),
      $total
    );
  }

  /**
   * Récupère les plages non disponibles
   *
   * @return array
   */
  public function getNonAvailableEvents(string $start, string $end) : array
  {
    $s = explode('-', $start);
    $e = explode('-', $end);
     if (\checkdate($s[1], $s[2], $s[0]) === false || \checkdate($e[1], $e[2], $e[0]) === false) {
       throw new \Exception('Date Invalide');
     }
     $start = $start.' 00:00:00';
     $end = $end.' 23:59:59';
    $bdd = $this->getBdd();
    $sql = "SELECT start, end, e.event_Id, recurrence, allday, date_end_rec, days_rec, event_interval, end_rec_type, start_end_diff
      FROM event AS e
      WHERE (
        (category_Id <> 1) AND (available = 1)
      )
      AND (
        (start BETWEEN :start AND :end)
        OR (end BETWEEN :start AND :end) 
        OR (start <= :start AND end >= :start)
        OR (
          recurrence > 1 AND start <= :start AND 
          (
            date_end_rec > :start 
            OR (
              start_end_diff > 1 AND DATE_ADD(date_end_rec, INTERVAL start_end_diff DAY) > :start
            )
          )
        )
      )
      ORDER BY start";
    $sql2 = "SELECT start, e.event_Id
      FROM event AS e
      LEFT JOIN rdv
      ON e.event_Id = rdv.event_Id
      LEFT JOIN category
      ON category.category_Id = e.category_Id
      WHERE (category_name = 'RDV' && rdv.rdv_removed = 1)
      AND (start BETWEEN :start AND :end)
      ORDER BY start";
    $query = $bdd->prepare($sql);
    $query->bindParam(':start', $start);
    $query->bindParam(':end', $end);
    $query->execute();
    $query2 = $bdd->prepare($sql2);
    $query2->bindParam(':start', $start);
    $query2->bindParam(':end', $end);
    $query2->execute();
    return array( 
      $query->fetchAll(\PDO::FETCH_ASSOC),
      $query2->fetchAll(\PDO::FETCH_ASSOC)
    );
  }

  /**
   * Construit un objet Rdv
   *
   * @return Rdv
   */
  public function buildRdvObject(array $data)//  : Rdv
  {
    $rdv = new Rdv();
    $rdv->setClient_email($data['client_email']);
    $rdv->setClient_name($data['client_name']);
    $rdv->setClient_first_name($data['client_first_name']);
    $rdv->setClient_tel($data['client_tel']);
    $rdv->setStart($data['rdv_date'], $data['rdv_hour']);
    $rdv->setRdv_object($data['rdv_object']);
    return $rdv;
  }
  

  /**
   * Enregistre un rdv en base de données
   *
   * @return 
   */
  public function saveRdv(array $data, $user)
  {
    $rdv = $this->buildRdvObject($data);
    try {
      $bdd = $this->getBdd();
      $bdd->beginTransaction();
      $sql1 = '
        INSERT INTO event (title, start, end, user_Id, category_Id, date_creation)
        VALUES (:title, :start, :end, :user_Id, 1, NOW())
      ';
      $query = $bdd->prepare($sql1);
      $query->bindValue(':title', $rdv->getRdvTitle($user));
      $query->bindValue(':start', $rdv->getStart());
      $query->bindValue(':end', $rdv->getEnd());
      $query->bindValue(':user_Id', $user->getUser_Id());
      $query->execute();
      $event_Id = $bdd->lastInsertId();
      $sql2 = '
        INSERT INTO rdv (client_email, client_name, client_first_name, client_tel, event_Id, rdv_object_Id)
        VALUES (:client_email, :client_name, :client_first_name, :client_tel, :event_Id, :rdv_object_Id)';
      $query = $bdd->prepare($sql2);
      $query->bindValue(':client_email', $rdv->getClient_email());
      $query->bindValue(':client_name', $rdv->getClient_name());
      $query->bindValue(':client_first_name', $rdv->getClient_first_name());
      $query->bindValue(':client_tel', $rdv->getClient_tel());
      $query->bindValue(':rdv_object_Id', $rdv->getRdv_object());
      $query->bindValue(':event_Id', $event_Id);
      $query->execute();
      $bdd->commit();
    } catch (\Exception $e) {
      $bdd->rollback();
      return $e->getMessage();
    }
    return $data;
  }
}
