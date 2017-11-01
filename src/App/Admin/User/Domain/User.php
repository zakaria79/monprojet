<?php

namespace App\Admin\User\Domain;

use App\Admin\User\Exception\InvalideUserDataException;

/**
 * Class User
 * @author Zakaria Othmane
 */
class User
{
  private $user_Id;
  private $user_name;
  private $user_first_name;
  private $role;
  private $role_Id;
  private $tel;
  private $mail;
  private $address;
  private $city;
  private $code_postal;
  private $password;
  private $salt;
  private $isAuthenticated = false;

  /**
   * Getter for user_Id
   *
   * @return int
   */
  public function getUser_Id() : int
  {
      return $this->user_Id;
  }
  
  /**
   * Setter for user_Id
   *
   * @param int $user_Id
   * @return User
   */
  public function setUser_Id(int $user_Id) : User
  {
    if ($user_Id && $user_Id > 0) {
      $this->user_Id = $user_Id;
      return $this;
    }
    throw new InvalideUserDataException('Identifiant invalide'.$user_Id);
  }

  /**
   * Getter for user_name
   *
   * @return string
   */
  public function getUser_name() : string
  {
      return $this->user_name;
  }
  
  /**
   * Setter for user_name
   *
   * @param string $user_name
   * @return User
   */
  public function setUser_name(string $user_name) : User
  {
    if ($user_name) {
      $this->user_name = $user_name;
      return $this;
    }
    throw new InvalideUserDataException('Nom de l\'utilisateur invalide');
  }

  /**
   * Getter for user_first_name
   *
   * @return string
   */
  public function getUser_first_name() : string
  {
      return $this->user_first_name;
  }
  
  /**
   * Setter for user_first_name
   *
   * @param string $user_first_name
   * @return User
   */
  public function setUser_first_name(string $user_first_name) : User
  {
    if ($user_first_name) {
      $this->user_first_name = $user_first_name;
      return $this;
    }
    throw new InvalideUserDataException('Prénom d\'utilisateur invalide');
  }

  /**
   * Getter for role
   *
   * @return string
   */
  public function getRole() :string
  {
      return $this->role;
  }
  
  /**
   * Setter for role
   *
   * @param string $role
   * @return User
   */
  public function setRole(string $role) : User
  {
    if ($role) {
      $this->role = $role;
      return $this;
    }
    throw new InvalideUserDataException('Role invalide');

  }

  /**
   * Getter for role_Id
   *
   * @return int
   */
  public function getRole_Id() : int
  {
      return $this->role_Id;
  }
  
  /**
   * Setter for role_Id
   *
   * @param int $role_Id
   * @return User
   */
  public function setRole_Id(int $role_Id) : User
  {
    if ($role_Id) {
      $this->role_Id = $role_Id;
      return $this;
    }
    throw new InvalideUserDataException('Role Id invalide');
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
   * @return User
   */
  public function setTel(string $tel) : User
  {
    if ($tel) {
      $this->tel = $tel;
      return $this;
    }
    throw new InvalideUserDataException('Numéro de téléphone invalide');
  }

  /**
   * Getter for mail
   *
   * @return string
   */
  public function getMail() : string
  {
      return $this->mail;
  }
  
  /**
   * Setter for mail
   *
   * @param string $mail
   * @return User
   */
  public function setMail(string $mail) : User
  {
    if ($mail) {
      $this->mail = $mail;
      return $this;
    }
      throw new InvalideUserDataException('Adresse mail invalide');
  }

  /**
   * Getter for address
   *
   * @return string
   */
  public function getAddress() : string
  {
      return $this->address;
  }
  
  /**
   * Setter for address
   *
   * @param string $address
   * @return User
   */
  public function setAddress(string $address) : User
  {
    if ($address) {
      $this->address = $address;
      return $this;
    }
    throw new InvalideUserDataException('Adresse invalide');
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
   * @return User
   */
  public function setCity(string $city) : User
  {
    if ($city) {
      $this->city = $city;
      return $this;
    }
    throw new InvalideUserDataException('Ville invalide');
  }

  /**
   * Getter for code_postal
   *
   * @return string
   */
  public function getCode_postal() : string
  {
      return $this->code_postal;
  }
  
  /**
   * Setter for code_postal
   *
   * @param string $code_postal
   * @return User
   */
  public function setCode_postal(string $code_postal) : User
  {
    if ($code_postal) {
      $this->code_postal = $code_postal;
      return $this;
    }
    throw new InvalideUserDataException('Code postal invalide');
  }

  /**
   * Getter for password
   *
   * @return string
   */
  public function getPassword() : string
  {
      return $this->password;
  }
  
  /**
   * Setter for password
   *
   * @param string $password
   * @return User
   */
  public function setPassword(string $password = null) : User
  {
    if ($password) {
      $this->password = $password;
      return $this;
    }
    $str = 'abcdefghijklmnopqrstuvwxyZABCDEFGHIJKLMNOPQRSTUVWXYZ/\?!&';
    $pass = '';
    while (strlen($pass) < 8) {
      $pass .= $str[rand(0, 56)];
    }
    $this->password = $pass;
    return $this;
  }

  /**
   * Getter for isAuthenticated
   *
   * @return bool
   */
  public function IsAuthenticated()
  {
    return $this->isAuthenticated;
  }

  /**
   * Setter for isAuthenticated
   *
   * @param bool $isAuthenticated
   * @return User
   */
  public function setIsAuthenticated(bool $isAuthenticated) : User
  {
    $this->isAuthenticated = $isAuthenticated;

    return $this;
  }

}
