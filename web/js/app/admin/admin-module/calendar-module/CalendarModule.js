import Config from './config/Config';
import DateManager from './date/DateManager';
import Form from './event-form/EventForm';
import CalendarManager from './calendar/CalendarManager';
import EventManager from './event/EventManager';
import EventsElement from './event/EventsElement';
import Action from './action/Action';
import AdminModule from './../AdminModule';

export default class CalendarModule extends AdminModule {

  constructor(pm) {
    super(pm);
    this.currentDate = {};
    this.dateToday = {};
    this.config = new Config(this.req);
    this.dm = new DateManager(this);
    this.form = new Form(this);
    this.cm = new CalendarManager(this);
    this.em = new EventManager(this);
    this.evElt = new EventsElement(this);
    this.action = new Action(this);
  }

  formatNumber (nb) { 
    return nb < 10 ? '0'+nb : nb; 
  }

  // Renvoi la plage horaire dans la journée : 'toute la journée, de 8h00 à 10h00…'
  getRangeTimeInDay (start, end, allDayValue) {
    let startMinutes = start.getMinutes() < 10 ? '0'+start.getMinutes() : start.getMinutes(), endMinutes = end.getMinutes() < 10 ? '0'+end.getMinutes() : end.getMinutes();
    if (allDayValue) {
      return ' toute la journée ';
    } else if (start === end){
      return ' à ' + start.getHours()+'h'+startMinutes;
    } else {
      return ' de '+ start.getHours()+'h'+startMinutes + ' à '+ end.getHours()+'h'+endMinutes;
    }
  }

  // Décode les chaine de caractère
  decodeString (string) {
    let elt = document.createElement('div');
    elt.innerHTML = string;
    return elt.innerHTML;
  }

  setCurrentDate (currentDate) {
    this.currentDate = this.dm.setDate(currentDate);
  }

  setDateToday () {
    this.dateToday = this.dm.setDate(new Date());
  }

  run () {
    this.setCurrentDate(new Date());
    this.setDateToday();
    this.cm.start();
    this.action.start();
  }
}
