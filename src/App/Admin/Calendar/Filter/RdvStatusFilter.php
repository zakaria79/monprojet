<?php

namespace App\Admin\Calendar\Filter;

use Filter\FilterManager;

/**
 * Class RdvStatusFilter
 * @author Zakaria Othmane
 */
class RdvStatusFilter extends FilterManager
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
      'rdv_status' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 1,
          'max_range' =>5
        )
      ),
      'rdv' => array(
        'filter' => FILTER_VALIDATE_INT,
        'flags' => FILTER_FORCE_ARRAY,
        'options' => array(
          'min_range' => 1
        )
      )
    );

  }
}
