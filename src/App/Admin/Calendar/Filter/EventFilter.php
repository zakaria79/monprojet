<?php

namespace App\Admin\Calendar\Filter;

use Filter\FilterManager;

/**
 * Class EventFilter
 * @author Zakaria Othmane
 */
class EventFilter extends FilterManager
{

  private $colors_patern = '/blue|red|grey|green|yellow|maroon/';

  /**
   * @param array $data
   */
  public function __construct($data)
  {
    parent::__construct($data);
  }

  public function getArgs () {
    return array(
      'title' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'comment' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'client_name' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'client_first_name' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'client_mail' => FILTER_SANITIZE_FULL_SPECIAL_CHARS,
      'client_tel' => array(
        'filter' => FILTER_CALLBACK,
        'options' => array(
          $this, 'filter_format_tel'
        )
      ),
      'client_rdv_object' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 1,
          'max_range' => 5
        )
      ),
      'allday' => FILTER_VALIDATE_BOOLEAN,
      'available' => FILTER_VALIDATE_BOOLEAN,
      'end_rec_type' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 1,
          'max_range' =>3
        )
      ),
      'event_interval' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 1,
          'max_range' =>30
        )
      ),
      'number_repetitions' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 1,
          'max_range' =>30
        )
      ),
      'start_day' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 1,
          'max_range' =>31
        )
      ),
      'start_month' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 1,
          'max_range' =>12
        )
      ),
      'start_year' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 1900,
          'max_range' =>2060
        )
      ),
      'start_hour' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 0,
          'max_range' =>23
        )
      ),
      'start_minute' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 0,
          'max_range' =>59
        )
      ),
      'end_day' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 1,
          'max_range' =>31
        )
      ),
      'end_month' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 1,
          'max_range' =>31
        )
      ),
      'end_year' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 1900,
          'max_range' =>2060
        )
      ),
      'end_hour' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 0,
          'max_range' =>23
        )
      ),
      'end_minute' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 0,
          'max_range' =>59
        )
      ),
      'endRec_day' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 1,
          'max_range' =>31
        )
      ),
      'endRec_month' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 1,
          'max_range' =>31
        )
      ),
      'endRec_year' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 1900,
          'max_range' =>2060
        )
      ),
      'event_Id' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 0
        )
      ),
      'Id_partenaire' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 0
        )
      ),
      'Id_client' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 0
        )
      ),
      'recurrence' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 0,
          'max_range' =>8
        )
      ),
      'visibility_Id' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 1,
          'max_range' =>5
        )
      ),
      'category_Id' => array(
        'filter' => FILTER_VALIDATE_INT,
        'options' => array(
          'min_range' => 1,
          'max_range' =>5
        )
      ),
      'days_rec' => array(
        'filter' => FILTER_VALIDATE_INT,
        'flags' => FILTER_FORCE_ARRAY,
        'options' => array(
          'min_range' => 1, 'max_range' => 10
        )
      ),
      'color' => array(
        'filter' => FILTER_CALLBACK,
        'options' => array(
          $this, 'filter_color'
        )
      ),
    );

  }

  public function filter_color($color)
  {
    return $this->filter_match($this->colors_patern, $color);
  }

}
