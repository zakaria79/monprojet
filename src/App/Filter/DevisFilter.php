<?php

namespace App\Filter;

use Filter\FilterManager;

/**
 * Class EventFilter
 * @author Zakaria Othmane
 */
class DevisFilter extends FilterManager
{

  /**
   * @param array $data
   */
  public function __construct($data)
  {
    parent::__construct($data);
  }

  public function getArgs () {
    return array(
      'lastname' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'firstname' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'postal_code' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'city' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'birth_date' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'insurance_type' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'garantie_souhaite' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'habitation_actuelle' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'pros-part' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'tel' => array(
        'filter' => FILTER_CALLBACK,
        'options' => array(
          $this, 'filter_format_tel'
        )
      ),
      'email' => FILTER_VALIDATE_EMAIL,
      'hospitalisation' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 0,
          'max_range' => 5
        )
      ),
      'optique' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 0,
          'max_range' => 5
        )
      ),
      'medecine' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 0,
          'max_range' => 5
        )
      ),
      'dentaire' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 0,
          'max_range' => 5
        )
      ),
      'nb_pieces' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 1,
          'max_range' => 10
        )
      ),
      'assurance_deces' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 1,
          'max_range' => 2
        )
      ),
      'accident_vie' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 1,
          'max_range' => 2
        )
      ),
      'assure_actuellement' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 1,
          'max_range' => 2
        )
      ),
      'bonus' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 1,
          'max_range' => 2
        )
      ),
      'residence_principale' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 1,
          'max_range' => 2
        )
      ),
    );

  }
}
