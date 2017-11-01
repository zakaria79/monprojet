<?php

namespace App\Admin\User\Filter;

use Filter\FilterManager;

/**
 * Class EventFilter
 * @author Zakaria Othmane
 */
class UserFilter extends FilterManager
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
      'password' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
    );
  }

}
