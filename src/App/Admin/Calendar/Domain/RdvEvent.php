<?php

namespace App\Admin\Calendar\Domain;

class RdvEvent
{
  private $rdv_Id;
  private $client_rdv_object;
  private $client_name;
  private $client_first_name;
  private $client_mail;
  private $client_tel;
  private $rdv_removed;
  private $rdv_status;

  public function setClient_rdv_object(string $rdv_object) : RdvEvent
  {
    if ($rdv_object) {
      $this->client_rdv_object = $rdv_object;
      return $this;
    }
    throw new \Exception('Objet de RDV invalide');
  }

  /**
   * Retourn l'objet du rdv
   *
   * @return string
   */
  public function getClient_rdv_object()
  {
    return $this->client_rdv_object;
  }
  
  public function getEvent_Id () : int
  {
    return $this->event_Id;
  }

  public function setEvent_Id(int $event_Id = null) : RdvEvent
  {
    if ($event_Id !== null && $event_Id !== false && !empty($event_Id)) {
      $this->event_Id = $event_Id;
    }
    return $this;
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
  public function setRdv_status(int $rdv_status) : RdvEvent
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
  public function setRdv_removed(int $rdv_removed) : RdvEvent
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
  public function setClient_tel(string $client_tel) : RdvEvent
  {
    if ($client_tel) {
      $this->client_tel = $client_tel;
      return $this;
    }
    throw new \Exception('Numéro de téléphone client invalide');
  }

  /**
   * Getter for client_mail
   *
   * @return string
   */
  public function getClient_mail() : string
  {
      return $this->client_mail;
  }
  
  /**
   * Setter for client_mail
   *
   * @param string $client_mail
   * @return Rdv
   */
  public function setClient_mail(string $client_mail) : RdvEvent
  {
    if ($client_mail) {
      $this->client_mail = $client_mail;
      return $this;
    }
    throw new \Exception('Adresse mail du client invalide');
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
  public function setClient_first_name(string $client_first_name) : RdvEvent
  {
    if ($client_first_name) {
      $this->client_first_name = $client_first_name;
      return $this;
    }
    throw new \Exception('Prénom du client invalide');
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
  public function setClient_name(string $client_name) : RdvEvent
  {
    if ($client_name) {
    $this->client_name = $client_name;
    return $this;
    }
    throw new \Exception('Nom du client invalide');
  }
}
