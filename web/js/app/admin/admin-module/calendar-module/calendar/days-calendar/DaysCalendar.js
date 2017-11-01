import MultipleDaysCalendar from './../MultipleDaysCalendar';

import NoRecurrentEvent from './set-event-on-calendar/NoRecurrentEvent';
import EveryDayEvent from './set-event-on-calendar/EveryDayEvent';
import EveryDaysOfWeekEvent from './set-event-on-calendar/EveryDaysOfWeekEvent';
import WorkingDaysEvent from './set-event-on-calendar/WorkingDaysEvent';
import EveryWeekEvent from './set-event-on-calendar/EveryWeekEvent';
import EveryMonthEvent from './set-event-on-calendar/EveryMonthEvent';
import EveryYearEvent from './set-event-on-calendar/EveryYearEvent';

export default class DaysCalendar extends MultipleDaysCalendar {

  constructor(app) {
    super(app,'days','4 Jours',['.eventDays','#days th','#days td','#days .event_title'],['#days','#days_calendar_button','#calendar .date_to_string']);
    this.eventElts = this.Es.eventDaysElts;
    this.thElts = this.Es.daysthElts;
    this.tdElts = this.Es.daystdElts;
    this.evTitleElts = this.Es.daysevent_titleElts;
    this.date_to_stringElt = this.Es.calendardate_to_stringElt;
    this.eventHandlers = [
      new NoRecurrentEvent(this),
      new EveryDayEvent(this),
      new EveryWeekEvent(this),
      new EveryDaysOfWeekEvent(this),
      new WorkingDaysEvent(this),
      new EveryMonthEvent(this),
      new EveryYearEvent(this)
    ];
    this.dates = Array();
    this.today = false;
    this.dateArrayLength = 3;
    this.todayDatesIndex = 0;
  }

  setDates () {
    this.currentDate = this.app.currentDate.date;
    super.setDates();
  }

  initializeCalendar () {
    super.initializeCalendar();
    this.eventInColumn = [0,0,0,0];
  }

  fillCalendar () {
    let countEvents, countEvent, i, evTitle;
    super.fillCalendar();
    this.getEventsCalendar();
  }

}
