<?php

namespace App\Admin\Calendar\DAO;

use Silex\Application;
use App\Admin\Calendar\Domain\Config;
use DAO\DAO;

/**
 * Class ConfigDAO
 * @author Othmane Zakaria
 */
class ConfigDAO extends DAO
{

  /**
   * @param Application $app
   */
  public function __construct(Application $app)
  {
    parent::__construct($app);
  }

  /**
   * Récupère la list des paramètres pour un champ de formulaire
   *
   * @return array
   */
  public function getFieldParams(string $sql)
  {
    $bdd = $this->getBdd();
    $query = $bdd->prepare($sql);
    $query->execute();
    return $query->fetchAll(\PDO::FETCH_ASSOC);
  }
  
  /**
   * Récupère la liste des paramètres pour un champ de formulaire
   *
   * @return array
   */
  public function getVisibilities()
  {
    return $this->getFieldParams("SELECT * FROM visibility");
  }

  /**
   * Récupère la list des paramètres pour un champ de formulaire
   *
   * @return array
   */
  public function getCategories()
  {
    return $this->getFieldParams("SELECT * FROM category");
  }
}
