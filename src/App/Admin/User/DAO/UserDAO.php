<?php

namespace App\Admin\User\DAO;

use Silex\Application;
use App\Admin\User\Domain\User;
use DAO\DAO;

/**
 * Class UserDAO
 * @author Zakaria Othmane
 */
class UserDAO extends DAO
{

  /**
   * @param Application $app
   */
  public function __construct(Application $app)
  {
    parent::__construct($app);
  }

  /**
   * Récupère l'utilisateur à partir de ses identifiants
   *
   * @return array
   */
  public function find(array $data)
  {
    $sql = "SELECT user_Id,user_name,user_first_name, tel, mail, address, city, code_postal, r.role_name, password
      FROM user AS u INNER JOIN role AS r
      ON u.role_Id = r.Id
      WHERE mail = ?
    ";
    $bdd = $this->getBdd();
    $query = $bdd->prepare($sql);
    $query->bindParam(1, $data['mail']);
    $query->execute();
    if ($res = $query->fetch(\PDO::FETCH_ASSOC)) {
      return $this->buildDomainObject($res);
    }
    return null;
  }
  
  /**
   * Récupère tous les utilisateurs
   *
   * @return array
   */
  public function findAll(int $user_role)
  {
    $sql = 'SELECT u.role_Id, user_Id, user_name, user_first_name, tel, mail, address, city, code_postal, role_name FROM user AS u INNER JOIN role AS r ON role_Id = Id WHERE role_Id = :userrole';
    $bdd = $this->getBdd();
    $query = $bdd->prepare($sql);
    $query->bindValue(':userrole', $user_role, \PDO::PARAM_INT);
    $query->execute();
    return $query->fetchAll(\PDO::FETCH_ASSOC);
  }

  // Enregisrte un utilisateur
  public function save(array $data, $user_Id)
  {
    $user = $this->buildDomainObject($data);
    try {
      $bdd = $this->getBdd();
      $sql = 'INSERT INTO user (user_name, user_first_name, role_Id, tel, mail, address, city, code_postal, password, date_creation)
        VALUES (:name, :firstname, :role, :tel, :mail, :address, :city, :code_postal, :password, NOW())';
      $query = $bdd->prepare($sql);
      $query->bindValue(':name', $user->getUser_name());
      $query->bindValue(':firstname', $user->getUser_first_name());
      $query->bindValue(':role', $user->getRole_Id());
      $query->bindValue(':tel', $user->getTel());
      $query->bindValue(':mail', $user->getMail());
      $query->bindValue(':address', $user->getAddress());
      $query->bindValue(':city', $user->getCity());
      $query->bindValue(':code_postal', $user->getCode_postal());
      $query->bindValue(':password', \password_hash($user->getPassword(), PASSWORD_DEFAULT));
      $query->execute();
      return [$user, false];
    } catch (\Exception $e) {
      $sql2 = "SELECT * FROM user WHERE mail = :mail";
      $query2 = $bdd->prepare($sql2);
      $query2->execute(array('mail' => $user->getMail()));
      if ($query2->fetch()) {
        return [$query2->fetch(), true];
      }
      throw new \Exception('L\'utilisateur n\'a pas pu être enregistré'.$e->getMessage());
    }
    return [$user, false];
    // return 'L\'utilisateur a été enregistré avec succès';
  }

  /**
   * build user object to save
   *
   * @return User
   */
  public function buildDomainObject(array $userArray) : User
  {
    $user = new User();
    if (isset($userArray['user_Id']) && !empty($userArray['user_Id'])) {
      $user->setUser_Id($userArray['user_Id']);
    }
    if (isset($userArray['role']) && !empty($userArray['role'])) {
      $user->setRole_Id($userArray['role']);
    }
    if (isset($userArray['role_name']) && !empty($userArray['role_name'])) {
      $user->setRole($userArray['role_name']);
    }
    $user->setUser_name($userArray['user_name']);
    $user->setUser_first_name($userArray['user_first_name']);
    $user->setTel($userArray['tel']);
    $user->setMail($userArray['mail']);
    $user->setAddress($userArray['address']);
    $user->setCity($userArray['city']);
    $user->setCode_postal($userArray['code_postal']);
    $user->setPassword($userArray['password']);
    return $user;
  }

  /**
   * Change le mot de passe de l'utilisateur
   *
   * @return 
   */
  public function updatePassword($user_Id, $new_pass)
  {
    $bdd = $this->getBdd();
    try {
      $query = $bdd->prepare('UPDATE user SET password = ? WHERE user_Id = ?');
      $query->execute(array(\password_hash($new_pass, PASSWORD_DEFAULT), $user_Id));
    } catch (Exception $e) {
      return $e->getMessage();
    }
  }
}
