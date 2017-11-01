<?php

namespace App\Admin\Calendar\Domain;

use App\Admin\Calendar\Exception\InvalidEventDataException;

class Event
{
  private $event_Id;
  private $user_Id;
  private $title = 'Sans titre';
  private $start;
  private $end;
  private $comment = 'Sans commentaire';
  private $allday;
  private $category_Id;
  private $visibility_Id;
  private $color;
  private $recurrence;
  private $date_end_rec;
  private $available;
  private $days_rec;
  private $event_interval;
  private $last_modif;
  private $date_creation;
  private $number_repetitions;
  private $repetition;
  private $end_rec_type;
  private $start_year;
  private $start_month;
  private $start_day;
  private $start_hour;
  private $start_minute;
  private $end_year;
  private $end_month;
  private $end_day;
  private $end_hour;
  private $end_minute;
  private $endRec_year;
  private $endRec_month;
  private $endRec_day;
  private $start_end_diff;
  private $sqlInsertColumns;
  private $sqlInsertValues;
  private $paramIndex = 0;
  private $sqlParamArray = array();
  private $names = array();

  public function getSqlInsertQuery() :string
  {
    return 'INSERT INTO event ('.$this->sqlInsertValues.') VALUES('.$this->sqlInsertColumns.')';
  }

  /**
   * Créé la requête sql pour modifier un évènement
   *
   * @return string
   */
  public function getSqlUpdateQuery() : string
  {
    $paramNameArray = [];
    for ($i = 0; $i < count($this->names); $i++) {
      $paramNameArray[] = $this->names[$i].' = ?';
    }
    array_push($this->sqlParamArray, $this->event_Id);
    return 'UPDATE event SET '.implode(',', $paramNameArray).' WHERE event_Id = ?';
  }

  /**
   * Costruit la requête SQL 'INSERT'
   * 
   */
  public function addToSqlInsertQuery(string $name, $value) {
    $nameValue = $this->paramIndex > 0 ? ', '.$name : $name;
    array_push($this->names, $name);
    $param = $this->paramIndex > 0 ? ', ?' : '?';
    $this->sqlInsertValues = $this->sqlInsertValues.$nameValue;
    $this->sqlInsertColumns = $this->sqlInsertColumns.$param;
    $this->paramIndex = 1;
    $this->sqlParamArray[] = $value;
  }

  // Returne les paramètres de la requête SQL
  public function getSqlParamArray() : array
  {
    return $this->sqlParamArray;
  }
  
  /**
   * Vérifie si l'événement est un rdv
   *
   * @return bool
   */
  public function isRdv() : bool
  {
    return $this->getCategory_Id() === 1;
  }
  

  /**
   * Getter for start_end_diff
   *
   * @return int
   */
  public function getStart_end_diff() : int
  {
    return $this->start_end_diff;
  }

  /**
   * Setter for start_end_diff
   *
   * @param int $start_end_diff
   * @return Event
   */
  public function setStart_end_diff() : Event
  {
    $this->start_end_diff = (int) $this->start->diff($this->end)->format('%a');
    $this->addToSqlInsertQuery('start_end_diff', $this->start_end_diff);
    return $this;
  }

  public function getEvent_Id () : int
  {
    return $this->event_Id;
  }

  public function setEvent_Id(int $event_Id = null) : Event
  {
    if ($event_Id !== null && $event_Id !== false && !empty($event_Id)) {
      $this->event_Id = $event_Id;
    }
    return $this;
  }

  public function getUser_Id() : int
  {
    return $this->user_Id;
  }

  public function setUser_Id(int $user_Id) : Event
  {
    if ($user_Id) {
      $this->user_Id = $user_Id;
      $this->addToSqlInsertQuery('user_Id', $user_Id);
      return $this;
    }
    throw new InvalidEventDataException('Identifiant utilisateur invalide');
  }

  public function getTitle() : string
  {
    return $this->title;
  }

  public function setTitle(string $title) : Event
  {
    if ($title && !empty($title)) {
      $this->title = $title;
    }
    $this->addToSqlInsertQuery('title', $this->getTitle());
    return $this;
  }

  public function getComment () : string
  {
    return $this->comment;
  }

  public function setComment (string $comment) : Event
  {
    if ($comment && !empty($comment)) {
      $this->comment = $comment;
    }
    $this->addToSqlInsertQuery('comment', $this->getComment());
    return $this;
  }

  public function getCategory_Id () : int
  {
    return $this->category_Id;
  }

  public function setCategory_Id (int $category_Id) : Event
  {
    if ($category_Id) {
      $this->category_Id = $category_Id;
      $this->addToSqlInsertQuery('category_Id', $category_Id);
      return $this;
    }
    throw new InvalidEventDataException('Categorie invalide');
  }

  public function getColor () : string
  {
    return $this->color;
  }

  public function setColor (string $color = 'blue') : Event
  {
    $this->color = $color;
    $this->addToSqlInsertQuery('color', $color);
    return $this;
  }

  public function getAllday () : int 
  {
    return $this->allday ? 2 : 1;
  }

  public function setAllday (
    bool $allday = null,
    int $start_hour = null,
    int $start_minute = null,
    int $end_hour = null,
    int $end_minute = null
  ) : Event
  {
    $this->allday = $allday;
    $this->addToSqlInsertQuery('allday', $this->getAllday());
    if (!$allday) {
      $this->setStart_hour($start_hour);
      $this->setStart_minute($start_minute);
      $this->setEnd_hour($end_hour);
      $this->setEnd_minute($end_minute);
    }
    return $this;
  }

  public function getRecurrence()
  {
    return $this->recurrence;
  }

  public function setRecurrence ( int $recurrence = null, int $end_rec_type = null, int $event_interval = null, array $days_rec = null, $number_repetitions = null) : Event
  {
    $this->recurrence = $recurrence ? $recurrence : 1;
    $this->addToSqlInsertQuery('recurrence', $this->recurrence);
    if ($recurrence > 1) {
      $this->setEnd_rec_type($end_rec_type);
      if (in_array($recurrence, [2,3,6,7])) {
        $this->setEvent_interval($event_interval);
        if ($recurrence === 3) {
          $this->setDays_rec($days_rec); 
        }
      }
      switch ($end_rec_type) {
      case 2:
        $this->setNumber_repetitions($number_repetitions);
        break;
      case 3:
        $this->setDate_end_rec();
        break;
      default:
        $this->setDefaultDateEndRec();
        break;
      }
    }
    return $this;
  }

  private function setDefaultDateEndRec() : Event
  {
    $this->date_end_rec = new \DateTimeImmutable('2060-12-12');
    $this->addToSqlInsertQuery('date_end_rec', $this->getDate_end_rec());
    return $this;
  }

  /**
   * Getter for end_rec_type
   *
   * @return int
   */
  public function getEnd_rec_type() : int
  {
    return $this->end_rec_type;
  }

  /**
   * Setter for end_rec_type
   *
   * @param int end_rec_type
   * @return Event
   */
  public function setEnd_rec_type(string $end_rec_type) : Event
  {
    $this->end_rec_type = $end_rec_type;
    $this->addToSqlInsertQuery('end_rec_type', $end_rec_type);
    return $this;
  }

  public function getNumber_repetitions() : int
  {
    return $this->number_repetitions;
  }

  public function setNumber_repetitions (int $number_repetitions = null) : Event
  {
    $recurrence = ['D', 'W', 'D','D', 'M', 'Y'];
    $event_interval = $this->event_interval ? $this->event_interval : 1;
    $this->number_repetitions = $number_repetitions;
    $interval = new \DateInterval('P'.$event_interval.$recurrence[$this->recurrence -2]);
    $period = new \DatePeriod($this->start, $interval, ($number_repetitions -1));
    $date_end_rec = '';
    foreach ($period as $occurence) {
      $date_end_rec = $occurence->format('Y-m-d');
    }
    $this->date_end_rec = $date_end_rec;
    $this->addToSqlInsertQuery('date_end_rec', $this->date_end_rec.' 23:59:59');
    return $this;
  }

  public function getEvent_interval () : int
  {
    return $this->event_interval;
  }

  public function setEvent_interval (int $event_interval) : Event
  {
    $this->event_interval = $event_interval;
    $this->addToSqlInsertQuery('event_interval', $event_interval);

    return $this;
  }

  public function getDays_rec () : string
  {
    return $this->days_rec;
  }

  public function setDays_rec (array $days_rec = null) : Event
  {
    if ($days_rec) {
      $this->days_rec = implode(',',$days_rec);
      $this->addToSqlInsertQuery('days_rec', $this->days_rec);
    }
    return $this;
  }

  public function getAvailable () : int
  {
    return $this->available ? 2 : 1;
  }

  public function setAvailable (bool $available = null) : Event
  {
    $this->available = $available;
    $this->addToSqlInsertQuery('available', $this->getAvailable());

    return $this;
  }

  public function getVisibility_Id () : int
  {
    return $this->visibility_Id;
  }

  public function setVisibility_Id (int $visibility_Id = null) : Event
  {
    $this->visibility_Id = $visibility_Id ? $visibility_Id : 1;
    $this->addToSqlInsertQuery('visibility_Id', $this->visibility_Id);
    return $this;
  }

  /**
   * Getter for start_year
   *
   * @return string
   */
  public function getStart_year(): string
  {
    return $this->start_year;
  }

  /**
   * Setter for start_year
   *
   * @param string $start_year
   * @return Event
   */
  public function setStart_year(int $start_year) : Event
  {
    $this->start_year = (string) $start_year;
    return $this;
  }

  /**
   * Getter for start_month
   *
   * @return string
   */
  public function getStart_month(): string
  {
    return $this->start_month;
  }

  /**
   * Setter for start_month
   *
   * @param string $start_month
   * @return Event
   */
  public function setStart_month(int $start_month) : Event
  {
    $this->start_month = (string) $start_month;
    return $this;
  }

  /**
   * Getter for start_day
   *
   * @return string
   */
  public function getStart_day(): string
  {
    return $this->start_day;
  }

  /**
   * Setter for start_day
   *
   * @param string $start_day
   * @return Event
   */
  public function setStart_day(int $start_day) : Event
  {
    $this->start_day = (string) $start_day;
    return $this;
  }

  /**
   * Getter for start_hour
   *
   * @return string
   */
  public function getStart_hour(): string
  {
    return $this->start_hour;
  }

  /**
   * Setter for start_hour
   *
   * @param string $start_hour
   * @return Event
   */
  public function setStart_hour(int $start_hour = null) : Event
  {
    if ($start_hour !== null && $start_hour !== false) {
      $this->start_hour = (string) $start_hour;
    }
    return $this;
  }

  /**
   * Getter for start_minute
   *
   * @return string
   */
  public function getStart_minute(): string
  {
    return $this->start_minute;
  }

  /**
   * Setter for start_minute
   *
   * @param string $start_minute
   * @return Event
   */
  public function setStart_minute(int $start_minute = null) : Event
  {
    if ($start_minute !== null && $start_minute !== false) {
      $this->start_minute = (string) $start_minute;
    }
    return $this;
  }

  /**
   * Getter for end_year
   *
   * @return string
   */
  public function getEnd_year(): string
  {
    return $this->end_year;
  }

  /**
   * Setter for end_year
   *
   * @param string $end_year
   * @return Event
   */
  public function setEnd_year(int $end_year) : Event
  {
    $this->end_year = (string) $end_year;
    return $this;
  }

  /**
   * Getter for end_month
   *
   * @return string
   */
  public function getEnd_month(): string
  {
    return $this->end_month;
  }

  /**
   * Setter for end_month
   *
   * @param string $end_month
   * @return Event
   */
  public function setEnd_month(int $end_month) : Event
  {
    $this->end_month = (string) $end_month;
    return $this;
  }

  /**
   * Getter for end_day
   *
   * @return string
   */
  public function getEnd_day(): string
  {
    return $this->end_day;
  }

  /**
   * Setter for end_day
   *
   * @param string $end_day
   * @return Event
   */
  public function setEnd_day(int $end_day) : Event
  {
    $this->end_day = (string) $end_day;
    return $this;
  }

  /**
   * Getter for end_hour
   *
   * @return string
   */
  public function getEnd_hour(): string
  {
    return $this->end_hour;
  }

  /**
   * Setter for end_hour
   *
   * @param string $end_hour
   * @return Event
   */
  public function setEnd_hour(int $end_hour = null) : Event
  {
    if ($end_hour !== null && $end_hour !== false) {
      $this->end_hour = (string) $end_hour;
    }
    return $this;
  }

  /**
   * Getter for end_minute
   *
   * @return string
   */
  public function getEnd_minute(): string
  {
    return $this->end_minute;
  }

  /**
   * Setter for end_minute
   *
   * @param string $end_minute
   * @return Event
   */
  public function setEnd_minute(int $end_minute = null) : Event
  {
    if ($end_minute !== null && $end_minute !== false) {
      $this->end_minute = (string) $end_minute;
    }
    return $this;
  }

  /**
   * Getter for endRec_year
   *
   * @return string
   */
  public function getEndRec_year(): string
  {
    return $this->endRec_year;
  }

  /**
   * Setter for endRec_year
   *
   * @param string $endRec_year
   * @return Event
   */
  public function setEndRec_year(int $endRec_year = null) : Event
  {
    if ($endRec_year) {
      $this->endRec_year = (string) $endRec_year;
    }
    return $this;
  }

  /**
   * Getter for endRec_month
   *
   * @return string
   */
  public function getEndRec_month(): string
  {
    return $this->endRec_month;
  }

  /**
   * Setter for endRec_month
   *
   * @param string $endRec_month
   * @return Event
   */
  public function setEndRec_month(int $endRec_month = null) : Event
  {
    if ($endRec_month) {
      $this->endRec_month = (string) $endRec_month;
    }
    return $this;
  }

  /**
   * Getter for endRec_day
   *
   * @return string
   */
  public function getEndRec_day(): string
  {
    return $this->endRec_day;
  }

  /**
   * Setter for endRec_day
   *
   * @param string $endRec_day
   * @return Event
   */
  public function setEndRec_day(int $endRec_day = null) : Event
  {
    if ($endRec_day) {
      $this->endRec_day = (string) $endRec_day;
    }
    return $this;
  }

  public function getLast_modif ()
  {
    return $this->last_modif->format('Y-m-d H:i:s');
  }

  public function setLast_modif (\DateTimeImmutable $date) : Event
  {
    $this->last_modif = $date;
    $this->addToSqlInsertQuery('last_modif', $this->getLast_modif());
    return $this;
  }

  public function getDate_creation () : string
  {
    return $this->date_creation->format('Y-m-d H:i:s');
  }

  public function setDate_creation (\DateTimeImmutable $date) : Event
  {
    $this->date_creation = $date;
    $this->addToSqlInsertQuery('date_creation', $this->getDate_creation());
    return $this;
  }

  public function getStart() : string
  {
    return $this->start->format('Y-m-d H:i:s');
  }

  public function setStart() : Event
  {
    if (\checkdate($this->getStart_month(), $this->getStart_day(), $this->getStart_year()) !== false) {
      $start = $this->getStart_year().'-'.\sprintf('%02d-%02d',$this->getStart_month(), $this->getStart_day());
      if ($this->getAllday() === 1) {
        $start = $start.' '.\sprintf('%02d:%02d:00', $this->getStart_hour(), $this->getStart_minute());
      } else {
        $start = $start.' 08:00:00';
      }
      $this->start = new \DateTimeImmutable($start);
      $this->addToSqlInsertQuery('start', $this->getStart());
      return $this;
    }
    throw new \InvalidEventDataException('Format date invalide');
  }

  public function getEnd() : string
  {
    return $this->end->format('Y-m-d H:i:s');
  }

  public function setEnd() : Event
  {
    if ($this->getCategory_Id() === 1) {
      $this->end = $this->start->add(new \DateInterval('PT1H'));

    } else if (\checkdate($this->getEnd_month(), $this->getEnd_day(), $this->getEnd_year()) !== false) {
      $end = $this->getEnd_year().'-'.\sprintf('%02d-%02d',$this->getEnd_month(), $this->getEnd_day());
      if ($this->getAllday() === 1) {
        $end = $end.' '.\sprintf('%02d:%02d:00', $this->getEnd_hour(), $this->getEnd_minute());
      } else {
        $end = $end.' 19:00:00';
      }
      $this->end = new \DateTimeImmutable($end);
    } else {
      throw new \InvalidEventDataException('Format date invalide');
    }
    $this->addToSqlInsertQuery('end', $this->getEnd());
    return $this;
  }

  public function getDate_end_rec() : string
  {
    return $this->date_end_rec->format('Y-m-d H:i:s');
  }

  public function setDate_end_rec () : Event
  {
    if (\checkdate($this->getEndRec_month(), $this->getEndRec_day(), $this->getEndRec_year()) !== false) {
      $date_end_rec = $this->getEndRec_year().'-'.\sprintf('%02d-%02d',$this->getEndRec_month(), $this->getEndRec_day());
      $this->date_end_rec = new \DateTimeImmutable($date_end_rec.' 23:59:59');
      $this->addToSqlInsertQuery('date_end_rec', $this->getDate_end_rec());
      return $this;
    }
    throw new \InvalidEventDataException('Format date invalide');
  }
}
