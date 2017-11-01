import MultipleDaysCalendar from './../MultipleDaysCalendar';

import NoRecurrentEvent from './set-event-on-calendar/NoRecurrentEvent';
import EveryDayEvent from './set-event-on-calendar/EveryDayEvent';
import EveryDaysOfWeekEvent from './set-event-on-calendar/EveryDaysOfWeekEvent';
import WorkingDaysEvent from './set-event-on-calendar/WorkingDaysEvent';
import EveryWeekEvent from './set-event-on-calendar/EveryWeekEvent';
import EveryMonthEvent from './set-event-on-calendar/EveryMonthEvent';
import EveryYearEvent from './set-event-on-calendar/EveryYearEvent';

export default class WeekCalendar extends MultipleDaysCalendar {

  constructor(app) {
    super(app,'week','Semaine',['.eventWeek','#week td','#week th','#week .event_title'],['#week','#calendar .date_to_string']);

    this.eventElts = this.Es.weekevent_titleElts;
    this.thElts = this.Es.weekthElts;
    this.tdElts = this.Es.weektdElts;
    this.date_to_stringElt = this.Es.calendardate_to_stringElt;
    this.evTitleElts = this.Es.eventWeekElts;
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
    this.dateArrayLength = 6;
    this.todayDatesIndex = 0;
  }

  setDates () {
    this.currentDate = this.app.currentDate.date;
    this.currentDate = this.dm.setDateFirstDayInWeek(this.currentDate);
    super.setDates();
  }

  initializeCalendar () {
    super.initializeCalendar();
    this.eventInColumn = [0,0,0,0,0,0,0];
  }
  
  fillCalendar () {
    let i, j, tdElts;
    super.fillCalendar();
    for (i = 1; i <= this.dates.length; i++) {
      tdElts = this.calendarElt.querySelectorAll('[data-column="'+i+'"]');
      this.thElts[i].textContent = this.dates[i-1].weekDayToString.substr(0,1) +'.'+this.dates[i-1].day;
      for (j = 0; j < tdElts.length; j++) {
        tdElts[j].dataset.date = this.dates[i-1].dateStandard;
        tdElts[j].dataset.weekday = this.dates[i-1].weekDay;
      }
    }
    this.start = this.tdElts[1].dataset.date;
    this.end = this.tdElts[this.tdElts.length -1].dataset.date;
    this.getEventsCalendar();
  }
}
