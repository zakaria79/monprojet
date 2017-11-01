import EventManager from './../event/EventManager';
import Calendar from './calendar/Calendar';

export default class CalendarModule {
  
  constructor(app) {
    this.dm = app.dm;
    this.app = app;
    this.em = new EventManager(app);
    this.calendar = new Calendar(app);
    this.dm.setElement(['#reporting', '#calendar']);
    this.Es = this.dm.getElements();
    this.weekendNb = 1;
    this.hourStart = 8;
    this.hourEnd = 19;
  }

  display() {
    this.dm.fadeIn(this.Es.calendarElt);
    this.dm.fadeOut(this.Es.reportingElt);

    this.calendar.setDates();
    this.calendar.setCurrentDateText();
    this.calendar.fillCalendar();
  }

}
