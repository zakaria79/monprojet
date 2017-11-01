<?php

namespace Filter;

class FilterManager
{

  protected $data = [];

  /**
   * @param array $data
   */
  public function __construct($data)
  {
        $this->data = $data;
  }
  

  public function getFiltredData ()
  {
    // renvoi false si la valeur n'est pas valide null si elle n'existe pas
    return \filter_var_array($this->data, $this->getArgs());
  }


  protected function filter_match($pattern, $arg)
  {
    if (preg_match($pattern, $arg)) {
      return $arg;
    }
    return false;
  }


  public function filter_format_tel($tel)
  {
    $pattern = '/^0\d([-\s.]?(\d){2}){4}$/';
    if (preg_match($pattern, $tel)) {
      return $tel;
    }
    return false;
  }

  public function filter_format_date($date)
  {
    $pattern = '/^\d{4}(-\d{2}){2}$/';
    if (preg_match($pattern, $date)) {
      return $date;
    }
    return false;
  }

  public function filter_format_mail($mail)
  {
    $pattern = '/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/';
    if (preg_match($pattern, $mail)) {
      return $mail;
    }
    return false;
  }

}
