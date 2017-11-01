<?php

namespace App\Partner\Filter;

use Filter\FilterManager;

/**
 * Class EventFilter
 * @author Zakaria Othmane
 */
class RdvFilter extends FilterManager
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
      'client_name' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'client_first_name' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'rdv_object' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'client_email' => FILTER_VALIDATE_EMAIL,
      'rdv_Id' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 0
        )
      ),
      'rdv_hour' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 8,
          'max_range' => 19
        )
      ),
      'client_tel' => array(
        'filter' => FILTER_CALLBACK,
        'options' => array(
          $this, 'filter_tel'
        )
      ),
      'rdv_date' => array(
        'filter' => FILTER_CALLBACK,
        'options' => array(
          $this, 'filter_format_date'
        )
      ),
    );
  }

  public function filter_tel($tel)
  {
    return $this->filter_format_tel($tel);
  }

}

