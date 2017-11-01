<?php

namespace App\Admin\User\Filter;

use Filter\FilterManager;

/**
 * Class EventFilter
 * @author Zakaria Othmane
 */
class UserAddFilter extends FilterManager
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
      'mail' => FILTER_VALIDATE_EMAIL,
      'mail2' => FILTER_VALIDATE_EMAIL,
      'password' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'password2' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'user_name' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'user_first_name' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'role' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 1,
          'max_range' => 2
        )
      ),
      'user_Id' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 1
        )
      ),
      'tel' => array(
        'filter' =>FILTER_CALLBACK,
        'options' => array(
          $this, 'filter_format_tel'
        )
      ),
      'address' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'city' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'code_postal' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'password' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'password_confirmation' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
    );
  }

}
