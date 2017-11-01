import Calendar from './../Calendar';

import NoRecurrentEvent from './set-event-on-calendar/NoRecurrentEvent';
import EveryDayEvent from './set-event-on-calendar/EveryDayEvent';
import EveryDaysOfWeekEvent from './set-event-on-calendar/EveryDaysOfWeekEvent';
import WorkingDaysEvent from './set-event-on-calendar/WorkingDaysEvent';
import EveryWeekEvent from './set-event-on-calendar/EveryWeekEvent';
import EveryMonthEvent from './set-event-on-calendar/EveryMonthEvent';
import EveryYearEvent from './set-event-on-calendar/EveryYearEvent';

export default class DayCalendar extends Calendar {

  constructor(app) {
    super(app, 'day', 'Jour', ['.eventDay', '#day .tdDay', '.currentDate', '#day .event_title'], ['#day', '#day_calendar_button', '#is_today', '#calendar .date_to_string']);
    this.eventElts = this.Es.eventDayElts;
    this.tdElts = this.Es.daytdDayElts;
    this.evTitleElts = this.Es.dayevent_titleElts;
    this.eventHandlers = [
      new NoRecurrentEvent(this),
      new EveryDayEvent(this),
      new EveryWeekEvent(this),
      new EveryDaysOfWeekEvent(this),
      new WorkingDaysEvent(this),
      new EveryMonthEvent(this),
      new EveryYearEvent(this)
    ];
  }

  setCalendar() {
    this.setCurrentDateText();
    this.fillCalendar();
  }

  setDates() {}

  goToNext() {
    this.app.currentDate.date.setDate(this.app.currentDate.day + 1);
    this.app.setCurrentDate(this.app.currentDate.date);
  }

  goToPrevious() {
    this.app.currentDate.date.setDate(this.app.currentDate.day - 1);
    this.app.setCurrentDate(this.app.currentDate.date);
  }

  setCurrentDateText() {
    let dateText = this.app.currentDate.weekDayToString + ' ' + this.app.currentDate.day + ' ' + this.app.currentDate.monthToString + ' ' + this.app.currentDate.year;
    this.Es.calendardate_to_stringElt.textContent = dateText;
  }

  fillCalendar() {
    super.fillCalendar();
    let app = this.app,
      i;
    for (i = 0; i < this.Es.daytdDayElts.length; i++) {
      this.Es.daytdDayElts[i].dataset.date = app.currentDate.dateStandard;
      this.Es.daytdDayElts[i].dataset.weekday = app.currentDate.weekDay;
    }
    this.start = app.currentDate.dateStandard;
    this.end = this.start;
    this.setStartAndEndDates();
    this.getEventsCalendar();
  }

  initializeCalendar() {
    let tdElt, countEvents, countEvent;
    super.initializeCalendar();
    this.eventInColumn = 0;
    if (this.app.currentDate.dateStandard === this.app.dateToday.dateStandard) {
      for (tdElt of this.Es.daytdDayElts) {
        tdElt.classList.add('today');
      }
    }
    this.dem.emptyElements(this.Es.dayevent_titleElts);
    this.dem.removeElementIfExist(this.calendarElt, '.count_events');
  }

}
