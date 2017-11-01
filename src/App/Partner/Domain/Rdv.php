<?php

namespace App\Partner\Domain;

class Rdv
{
  private $rdv_Id;
  private $user_Id;
  private $start;
  private $end;
  private $rdv_object;
  private $last_modif;
  private $client_name;
  private $client_first_name;
  private $rdv_title;
  private $client_email;
  private $client_tel;
  private $rdv_removed;
  private $category_Id = 1;
  private $rdv_status;
  private $date_creation;

  public function getRdvTitle($user) : string
  {
    return 'RDV pris par '.$user->getUser_name().' '.$user->getUser_first_name();
  }

  public function setRdv_object(string $rdv_object) {
    $this->rdv_object = $rdv_object;
  }

  /**
   * Retourn l'objet du rdv
   *
   * @return string
   */
  public function getRdv_object()
  {
    return $this->rdv_object;
  }
  

  public function getEvent_Id () : int
  {
    return $this->event_Id;
  }

  public function setEvent_Id(int $event_Id = null) : Rdv
  {
    if ($event_Id !== null && $event_Id !== false && !empty($event_Id)) {
      $this->event_Id = $event_Id;
    }
    return $this;
  }

  public function getUser_Id() : int
  {
    return $this->user_Id;
  }

  public function setUser_Id(int $user_Id) : Rdv
  {
    if ($user_Id !== null && $user_Id !== false) {
      $this->user_Id = $user_Id;
      $this->addToSqlInsertQuery('user_Id', $user_Id);
    }
    return $this;
  }

  public function getLast_modif ()
  {
    return $this->last_modif->format('Y-m-d H:i:s');
  }

  public function getStart() : string
  {
    return $this->start->format('Y-m-d H:i:s');
  }

  public function setStart(string $dateStart, int $hourStart) : Rdv
  {
    $dStart = explode('-', $dateStart);
    if (\checkdate($dStart[1], $dStart[2], $dStart[0]) !== false) {
      $this->start = new \DateTimeImmutable($dateStart.' '.\sprintf('%02d:00:00', $hourStart));
      return $this;
    }
    throw new \Exception('Format date invalide');
  }

  public function getEnd() : string
  {
    $end = $this->start->add(new \DateInterval('PT1H'));
    return $end->format('Y-m-d H:i:s');
  }

  /**
   * Getter for rdv_status
   *
   * @return string
   */
  public function getRdv_status() : int
  {
      return $this->rdv_status;
  }
  
  /**
   * Setter for rdv_status
   *
   * @param string $rdv_status
   * @return Rdv
   */
  public function setRdv_status(int $rdv_status) : Rdv
  {
      $this->rdv_status = $rdv_status;
  
      return $this;
  }

  /**
   * Getter for rdv_removed
   *
   * @return int
   */
  public function getRdv_removed() : int
  {
      return $this->rdv_removed;
  }
  
  /**
   * Setter for rdv_removed
   *
   * @param int $rdv_removed
   * @return Rdv
   */
  public function setRdv_removed(int $rdv_removed) : Rdv
  {
      $this->rdv_removed = $rdv_removed;
  
      return $this;
  }

  /**
   * Getter for client_tel
   *
   * @return string
   */
  public function getClient_tel() : string
  {
      return $this->client_tel;
  }
  
  /**
   * Setter for client_tel
   *
   * @param string $client_tel
   * @return Rdv
   */
  public function setClient_tel(string $client_tel) : Rdv
  {
      $this->client_tel = $client_tel;
  
      return $this;
  }

  /**
   * Getter for client_email
   *
   * @return string
   */
  public function getClient_email() : string
  {
      return $this->client_email;
  }
  
  /**
   * Setter for client_email
   *
   * @param string $client_email
   * @return Rdv
   */
  public function setClient_email(string $client_email) : Rdv
  {
      $this->client_email = $client_email;
      return $this;
  }

  /**
   * Getter for client_first_name
   *
   * @return string
   */
  public function getClient_first_name() : string
  {
      return $this->client_first_name;
  }
  
  /**
   * Setter for client_first_name
   *
   * @param string $client_first_name
   * @return Rdv
   */
  public function setClient_first_name(string $client_first_name) : Rdv
  {
      $this->client_first_name = $client_first_name;
      return $this;
  }

  /**
   * Retourne le nom du client
   *
   * @return string
   */
  public function getClient_name() : string
  {
    return $this->client_name;
  }

  /**
   * Définit le nom du client
   *
   * @return Rdv
   */
  public function setClient_name(string $client_name) : Rdv
  {
    $this->client_name = $client_name;
    return $this;
  }

}

