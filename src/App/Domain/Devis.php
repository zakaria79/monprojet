<?php

namespace App\Domain;

class Devis
{
  private $devis_Id;
  private $lastname;
  private $firstname;
  private $tel;
  private $birth_date;
  private $postal_code;
  private $city;
  private $email;
  private $insurance_type;
  private $hospitalisation;
  private $optique;
  private $dentaire;
  private $medecine;
  private $assure_actuellement;
  private $bonus;
  private $garantie_souhaite;
  private $residence_principale;
  private $habitation_actuelle;
  private $nb_pieces;
  private $assurance_deces;
  private $accident_vie;
  private $date_creation;
  private $title;
  private $pros_part;

  private $sqlInsertColumns;
  private $sqlInsertValues;
  private $paramIndex = 0;
  private $sqlParamArray = array();
  private $names = array();

  public function getSqlInsertQuery() :string
  {
    return 'INSERT INTO devis ('.$this->sqlInsertValues.') VALUES('.$this->sqlInsertColumns.')';
  }

  public function addToSqlInsertQuery(string $name, $value) {
    $nameValue = $this->paramIndex > 0 ? ', '.$name : $name;
    array_push($this->names, $name);
    $param = $this->paramIndex > 0 ? ', ?' : '?';
    $this->sqlInsertValues = $this->sqlInsertValues.$nameValue;
    $this->sqlInsertColumns = $this->sqlInsertColumns.$param;
    $this->paramIndex = 1;
    $this->sqlParamArray[] = $value;
  }

  public function getSqlParamArray() : array
  {
    return $this->sqlParamArray;
  }

  /**
   * Getter for devis_Id
   *
   * @return int
   */
  public function getDevis_Id() : int
  {
    return $this->devis_Id;
  }

  /**
   * Setter for devis_Id
   *
   * @param int $devis_Id
   * @return Devis
   */
  public function setDevis_Id(int $devis_Id) : Devis
  {
    $this->devis_Id = $devis_Id;

    return $this;
  }

  /**
   * Getter for lastname
   *
   * @return string
   */
  public function getLastname() : string
  {
    return $this->lastname;
  }

  /**
   * Setter for lastname
   *
   * @param string $lastname
   * @return Devis
   */
  public function setLastname(string $lastname) : Devis
  {
    $this->lastname = $lastname;
    $this->addToSqlInsertQuery('lastname', $this->getLastname());

    return $this;
  }

  /**
   * Getter for firstname
   *
   * @return string
   */
  public function getFirstname() : string
  {
    return $this->firstname;
  }

  /**
   * Setter for firstname
   *
   * @param string $firstname
   * @return Devis
   */
  public function setFirstname(string $firstname) : Devis
  {
    $this->firstname = $firstname;
    $this->addToSqlInsertQuery('firstname', $this->getFirstname());

    return $this;
  }

  /**
   * Getter for tel
   *
   * @return string
   */
  public function getTel() : string
  {
    return $this->tel;
  }

  /**
   * Setter for tel
   *
   * @param string $tel
   * @return Devis
   */
  public function setTel(string $tel) : Devis
  {
    $this->tel = $tel;
    $this->addToSqlInsertQuery('tel', $this->getTel());

    return $this;
  }

  /**
   * Getter for birth_date
   *
   * @return string
   */
  public function getBirth_date() : string
  {
    return $this->birth_date->format('Y-m-d');
  }

  /**
   * Setter for birth_date
   *
   * @param string $birth_date
   * @return Devis
   */
  public function setBirth_date(string $birth_date) : Devis
  {
    $date = explode('/', $birth_date);
    // Checkdate ordre des arguments: mois, jour, ans
    if (\checkdate($date[1], $date[0], $date[2]) === false) {
      throw new \Exception('Date de naissance invalide '.$date[1].'-'.$date[0].'-'.$date[2]);
    }
    $this->birth_date = new \DateTimeImmutable($date[2].'-'.\sprintf('%02d-%02d', $date[1], $date[0]));
    $this->addToSqlInsertQuery('birth_date', $this->getBirth_date());

    return $this;
  }

  /**
   * Getter for postal_code
   *
   * @return string
   */
  public function getPostal_code() : string
  {
    return $this->postal_code;
  }

  /**
   * Setter for postal_code
   *
   * @param string $postal_code
   * @return Devis
   */
  public function setPostal_code(string $postal_code) : Devis
  {
    $this->postal_code = $postal_code;
    $this->addToSqlInsertQuery('postal_code', $this->getPostal_code());

    return $this;
  }

  /**
   * Getter for city
   *
   * @return string
   */
  public function getCity() : string
  {
    return $this->city;
  }

  /**
   * Setter for city
   *
   * @param string $city
   * @return Devis
   */
  public function setCity(string $city) : Devis
  {
    $this->city = $city;
    $this->addToSqlInsertQuery('city', $this->getCity());

    return $this;
  }

  /**
   * Getter for email
   *
   * @return string
   */
  public function getEmail() : string
  {
    return $this->email;
  }

  /**
   * Setter for email
   *
   * @param string $email
   * @return Devis
   */
  public function setEmail(string $email) : Devis
  {
    $this->email = $email;
    $this->addToSqlInsertQuery('email', $this->getEmail());

    return $this;
  }

  /**
   * Getter for insurance_type
   *
   * @return string
   */
  public function getInsurance_type() : string
  {
    return $this->insurance_type;
  }

  /**
   * Setter for insurance_type
   *
   * @param string $insurance_type
   * @return Devis
   */
  public function setInsurance_type(string $insurance_type) : Devis
  {
    $this->insurance_type = $insurance_type;
    $this->addToSqlInsertQuery('insurance_type', $this->getInsurance_type());

    return $this;
  }

  /**
   * Getter for hospitalisation
   *
   * @return string
   */
  public function getHospitalisation() : int
  {
    return $this->hospitalisation;
  }

  /**
   * Setter for hospitalisation
   *
   * @param string $hospitalisation
   * @return Devis
   */
  public function setHospitalisation(int $hospitalisation) : Devis
  {
    $this->hospitalisation = $hospitalisation;
    $this->addToSqlInsertQuery('hospitalisation', $this->getHospitalisation());

    return $this;
  }

  /**
   * Getter for optique
   *
   * @return int
   */
  public function getOptique() : int
  {
    return $this->optique;
  }

  /**
   * Setter for optique
   *
   * @param int $optique
   * @return Devis
   */
  public function setOptique(int $optique) : Devis
  {
    $this->optique = $optique;
    $this->addToSqlInsertQuery('optique', $this->getOptique());

    return $this;
  }

  /**
   * Getter for dentaire
   *
   * @return int
   */
  public function getDentaire() : int
  {
    return $this->dentaire;
  }

  /**
   * Setter for dentaire
   *
   * @param int $dentaire
   * @return Devis
   */
  public function setDentaire(int $dentaire) : Devis
  {
    $this->dentaire = $dentaire;
    $this->addToSqlInsertQuery('dentaire', $this->getDentaire());

    return $this;
  }

  /**
   * Getter for medecine
   *
   * @return int
   */
  public function getMedecine() : int
  {
    return $this->medecine;
  }

  /**
   * Setter for medecine
   *
   * @param int $medecine
   * @return Devis
   */
  public function setMedecine(int $medecine) : Devis
  {
    $this->medecine = $medecine;
    $this->addToSqlInsertQuery('medecine', $this->getMedecine());

    return $this;
  }

  /**
   * Getter for assure_actuellement
   *
   * @return int
   */
  public function getAssure_actuellement() : int
  {
    return $this->assure_actuellement;
  }

  /**
   * Setter for assure_actuellement
   *
   * @param int $assure_actuellement
   * @return Devis
   */
  public function setAssure_actuellement(int $assure_actuellement) : Devis
  {
    $this->assure_actuellement = $assure_actuellement;
    $this->addToSqlInsertQuery('assure_actuellement', $this->getAssure_actuellement());

    return $this;
  }

  /**
   * Getter for bonus
   *
   * @return int
   */
  public function getBonus() : int
  {
    return $this->bonus;
  }

  /**
   * Setter for bonnus
   *
   * @param int $bonus
   * @return Devis
   */
  public function setBonus(int $bonus) : Devis
  {
    $this->bonus = $bonus;
    $this->addToSqlInsertQuery('bonus', $this->getBonus());

    return $this;
  }

  /**
   * Getter for garantie_souhaite
   *
   * @return string
   */
  public function getGarantie_souhaite() : string
  {
    return $this->garantie_souhaite;
  }

  /**
   * Setter for garantie_souhaite
   *
   * @param string $garantie_souhaite
   * @return Devis
   */
  public function setGarantie_souhaite(string $garantie_souhaite) : Devis
  {
    $this->garantie_souhaite = $garantie_souhaite;
    $this->addToSqlInsertQuery('garantie_souhaite', $this->getGarantie_souhaite());

    return $this;
  }

  /**
   * Getter for residence_principale
   *
   * @return string
   */
  public function getResidence_principale() : int
  {
    return $this->residence_principale;
  }

  /**
   * Setter for residence_principale
   *
   * @param string $residence_principale
   * @return Devis
   */
  public function setResidence_principale(int $residence_principale) : Devis
  {
    $this->residence_principale = $residence_principale;
    $this->addToSqlInsertQuery('residence_principale', $this->getResidence_principale());

    return $this;
  }

  /**
   * Getter for habitation_actuelle
   *
   * @return string
   */
  public function getHabitation_actuelle() : string
  {
    return $this->habitation_actuelle;
  }

  /**
   * Setter for habitation_actuelle
   *
   * @param string $habitation_actuelle
   * @return Devis
   */
  public function setHabitation_actuelle(string $habitation_actuelle) : Devis
  {
    $this->habitation_actuelle = $habitation_actuelle;
    $this->addToSqlInsertQuery('habitation_actuelle', $this->getHabitation_actuelle());

    return $this;
  }

  /**
   * Getter for nb_pieces
   *
   * @return int
   */
  public function getNb_pieces() : int
  {
    return $this->nb_pieces;
  }

  /**
   * Setter for nb_pieces
   *
   * @param int $nb_pieces
   * @return Devis
   */
  public function setNb_pieces(int $nb_pieces) : Devis
  {
    $this->nb_pieces = $nb_pieces;
    $this->addToSqlInsertQuery('nb_pieces', $this->getNb_pieces());

    return $this;
  }

  /**
   * Getter for assurance_deces
   *
   * @return int
   */
  public function getAssurance_deces() : int
  {
    return $this->assurance_deces;
  }

  /**
   * Setter for assurance_deces
   *
   * @param int $assurance_deces
   * @return Devis
   */
  public function setAssurance_deces(int $assurance_deces) : Devis
  {
    $this->assurance_deces = $assurance_deces;
    $this->addToSqlInsertQuery('assurance_deces', $this->getAssurance_deces());

    return $this;
  }

  /**
   * Getter for accident_vie
   *
   * @return int
   */
  public function getAccident_vie() : int
  {
    return $this->accident_vie;
  }

  /**
   * Setter for accident_vie
   *
   * @param int $accident_vie
   * @return Devis
   */
  public function setAccident_vie(int $accident_vie) : Devis
  {
    $this->accident_vie = $accident_vie;
    $this->addToSqlInsertQuery('accident_vie', $this->getAccident_vie());

    return $this;
  }

  /**
   * Getter for date_creation
   *
   * @return string
   */
  public function getDate_creation() : string
  {
    return $this->date_creation->format('Y-m-d H:i:s');
  }

  /**
   * Setter for date_creation
   *
   * @param string $date_creation
   * @return Devis
   */
  public function setDate_creation(\DateTimeImmutable $date_creation) : Devis
  {
    $this->date_creation = $date_creation;
    $this->addToSqlInsertQuery('date_creation', $this->getDate_creation());

    return $this;
  }

  /**
   * Getter for pros_part
   *
   * @return string
   */
  public function getPros_part() : string
  {
      return $this->pros_part;
  }
  
  /**
   * Setter for pros_part
   *
   * @param string $pros_part
   * @return Devis
   */
  public function setPros_part(string $pros_part) : Devis
  {
      $this->pros_part = $pros_part;
      $this->addToSqlInsertQuery('pros_part', $this->getPros_part());
  
      return $this;
  }

  /**
   * Getter for insurance_type_title
   *
   * @return string
   */
  public function getTitle() : string
  {
      return $this->title;
  }
  
  /**
   * Setter for insurance_type_title
   *
   * @param string $insurance_type_title
   * @return Devis
   */
  public function setTitle(string $title) : Devis
  {
      $this->title = $title;
  
      return $this;
  }

  public function getYesOrNoFromNumber($nb)
  {
    return $nb === 1 ? 'non' : 'oui';
  }

  public function getSanteText() {
    return '
      <h3><strong>Santé</strong></h3>
      <ul>
        <li>Hospitalisation : '.$this->getHospitalisation().'</li>
        <li>Medecine : '.$this->getMedecine().'</li>
        <li>Dentaire : '.$this->getDentaire().'</li>
        <li>Optique : '.$this->getOptique().'</li>
      </ul>
    ';
  }


  public function getAutoText() {
    return '
      <h3><strong>Auto</strong></h3>
      <ul>
        <li>Assuré(e) actuellement : <strong>'.$this->getYesOrNoFromNumber($this->getAssure_actuellement()).'</strong></li>
        <li>Bonus : <strong>'.$this->getYesOrNoFromNumber($this->getBonus()).'</strong></li>
        <li>Garantie souhaitée : <strong>'.$this->getGarantie_souhaite().'</strong></li>
      </ul>
    ';
  }

  public function getPretText() {
    return '
      <h3><strong>Prêt</strong></h3>
      <ul>
        <li>Assuré(e) actuellement : <strong>'.$this->getYesOrNoFromNumber($this->getAssure_actuellement()).'</strong></li>
        <li>Résidence principale : <strong>'.$this->getYesOrNoFromNumber($this->getResidence_principale()).'</strong></li>
      </ul>
    ';
  }

  public function getHabitationText() {
    return '
      <h3><strong>Habitation</strong></h3>
      <ul>
        <li>Habitation actuelle : <strong>'.$this->getHabitation_actuelle().'</strong></li>
        <li>Nombre de pièces : <strong>'.$this->getNb_pieces().'</strong></li>
      </ul>
    ';
  }

  public function getPrevoyanceText() {
    return '
      <h3><strong>Prévoyance</strong></h3>
      <ul>
        <li>Assurance décès : <strong>'.$this->getYesOrNoFromNumber($this->getAssurance_deces()).'</strong></li>
        <li>Accident de la vie : <strong>'.$this->getYesOrNoFromNumber($this->getAccident_vie()).'</strong></li>
      </ul>
    ';
  }


  public function getAssuranceText() {
    $assuranceText = '';
    switch ($this->getInsurance_type()) {
      case 'sante':
        $assuranceText = $this->getSanteText();
        break;
      case 'auto':
        $assuranceText = $this->getAutoText();
        break;
      case 'pret':
        $assuranceText = $this->getPretText();
        break;
      case 'prevoyance':
        $assuranceText = $this->getPrevoyanceText();
        break;
      case 'habitation':
        $assuranceText = $this->getHabitationText();
    }
    return $assuranceText;
  }
}
