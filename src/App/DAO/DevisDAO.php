<?php

namespace App\DAO;

use Silex\Application;
use App\Domain\Devis;
use DAO\DAO;

class DevisDAO extends DAO
{
  private $inssurance_type_titles = array(
    'sante' => 'Santé',
    'auto' => 'Auto',
    'prevoyance' => 'Prévoyance',
    'pret' => 'Prêt',
    'habitation' => 'Habitation'
  );

  /**
   * @param Application $app
   */
  public function __construct(Application $app)
  {
    parent::__construct($app);
  }

  /**
   * Récupère les rdvs
   *
   * @return array
   */
  public function getDevis(int $page = 1)
  {
    $bdd = $this->getBdd();
    $sql_total = 'SELECT COUNT(devis_Id) AS total FROM devis';
    $limit = 10;
    $start = ($page -1) * $limit;
    $query = $bdd->prepare($sql_total);
    $query->execute();
    $total = $query->fetch();
    $numberOfPages = ceil((int) $total['total'] / $limit);
    if ((int) $total['total'] <= 0 || (int) $page > $numberOfPages) {
      return [
        'devis' => null,
        'total' => $total['total'],
      ];
    }
    $sql = "SELECT * FROM devis ORDER BY date_creation DESC LIMIT ? OFFSET ?";
    $query = $bdd->prepare($sql);
    $query->bindValue(1, $limit, \PDO::PARAM_INT);
    $query->bindValue(2, $start, \PDO::PARAM_INT);
    $query->execute();
    return array(
      'devis' => $query->fetchAll(\PDO::FETCH_ASSOC),
      'total' => $total['total']
    );
  }

  // Enregistre les données du formulaire de devis dans la base de données
  public function save(Devis $devis)
  {
    $bdd = $this->getBdd();
    $devis->setDate_creation(new \DateTimeImmutable());
    $query = $bdd->prepare($devis->getSqlInsertQuery());
    return $query->execute($devis->getSqlParamArray());
  }

  // Consrtuit un objet Devis à partir des données du formulaire
  public function buildDomainObject(array $devisArray) //  : Devis
  {
    $devis = new Devis();
     $devis->setLastname($devisArray['lastname'])
      ->setFirstname($devisArray['firstname'])
      ->setTel($devisArray['tel'])
      ->setBirth_date($devisArray['birth_date'])
      ->setPostal_code($devisArray['postal_code'])
      ->setCity($devisArray['city'])
      ->setEmail($devisArray['email'])
      ->setInsurance_type( $devisArray['insurance_type'])
      ->setTitle($devisArray['insurance_type'])
      ->setPros_part($devisArray['pros-part']);
    switch ($devis->getInsurance_type()) {
      case 'sante':
        // $devis->setHospitalisation(3)
        //   ->setOptique(2)
        //   ->setDentaire(5)
        //   ->setMedecine(3);
         $devis->setHospitalisation($devisArray['hospitalisation'])
           ->setOptique($devisArray['optique'])
           ->setDentaire($devisArray['dentaire'])
           ->setMedecine($devisArray['medecine']);
        break;
      case 'auto':
        $devis->setAssure_actuellement($devisArray['assure_actuellement'])
          ->setBonus($devisArray['bonus'])
          ->setGarantie_souhaite($devisArray['garantie_souhaite']);
        break;
      case 'pret':
        $devis->setAssure_actuellement($devisArray['assure_actuellement'])
          ->setResidence_principale($devisArray['residence_principale']);
        break;
      case 'habitation':
        $devis->setHabitation_actuelle($devisArray['habitation_actuelle'])
          ->setNb_pieces($devisArray['nb_pieces']);
        break;
      case 'prevoyance':
        $devis->setAssurance_deces($devisArray['assurance_deces'])
          ->setAccident_vie($devisArray['accident_vie']);
        break;
    }
    return $devis;
  }

  /**
   * Supprime les devis à partir de leurs identifiants
   *
   * @return 
   */
  public function delete(array $ids)
  {
    $bdd = $this->getBdd();
    $query = $bdd->prepare('DELETE FROM devis WHERE devis_Id = ?');
    foreach ($ids['devis'] as $id) {
      if ($id) {
        $query->bindValue(1, $id, \PDO::PARAM_INT);
        $query->execute(array($id));
      }
    }
  }

  /**
   * Change le status du devis "traité…"
   *
   * @return 
   */
  // public function changeDevisStatus($data)
  // {
  //   $sql = 'UPDATE devis SET devis_status_Id = :devisstatus WHERE devis_Id = :devis_Id';
  //   $bdd = $this->getBdd();
  //   $query = $bdd->prepare($sql);
  //   foreach ($data['devis'] as $devis) {
  //     $query->bindParam(':devisstatus', $data['devis_status']);
  //     $query->bindParam(':devis_Id', $devis);
  //     $query->execute();
  //   }
  // }
}
