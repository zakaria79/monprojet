import MonthCalendar from './month-calendar/MonthCalendar';
import WeekCalendar from './week-calendar/WeekCalendar';
import DaysCalendar from './days-calendar/DaysCalendar';
import DayCalendar from './day-calendar/DayCalendar';

export default class CalendarManager {

  constructor(app) {
    this.app = app;
    this.dem = app.dem;
    this.dem.setElement(['#calendar', '#current_date_to_string', '#current_date', '#date_toda', '#date_today_to_string', '#dropdownMenu3']);
    this.Es = this.dem.getElements();
    this.monthCalendar = new MonthCalendar(app);
    this.weekCalendar = new WeekCalendar(app);
    this.daysCalendar = new DaysCalendar(app);
    this.dayCalendar = new DayCalendar(app);
  }

  start() {
    this.currentCalendarName = 'monthCalendar';
    this.currentCalendar = this.monthCalendar;
    this.Es.current_dateElt.textContent = this.app.dateToday.dateText;
    this.setCalendar();
    // window.setInterval(() => {
    //   this.app.em.getEvents(
    //     `events/${this.currentCalendar.start}/${this.currentCalendar.end}`,
    //     this.refreshEventsCalendar.bind(this),
    //     this.dem.setErrorMessage.bind(this.dem)
    //   );
    // }, 10000);
  }

  refreshEventsCalendar(events) {
    let ids = [];
    for (let event of events) {
      ids.push(event.id);
      if (!this.app.em.eventsArrayById[event.id] || event.lastModif && this.app.em.eventsArrayById[event.id].lastModif.date.getTime() !== event.lastModif.date.getTime()) {
        this.currentCalendar.eventElementHandler(event, 'setEvent');
      }
    }
    for (let id of this.app.em.eventIds) {
      if (!ids.includes(id)) {
        this.currentCalendar.eventElementHandler(this.app.em.eventsArrayById[id], 'removeEventElement');
      }
    }
  }

  setCalendar() {
    this.currentCalendar.setDates();
    this.currentCalendar.setCurrentDateText();
    this.currentCalendar.fillCalendar();
  }

  backToTodayDate() {
    this.app.setCurrentDate(new Date());
    this.Es.current_dateElt.classList.add('active');
    this.setCalendar();
  }

  changeTime(e) {
    e.preventDefault();
    this.Es.current_dateElt.classList.remove('active');
    this.currentCalendar[e.currentTarget.dataset.action]();
    this.setCalendar();
  }

  changeCalendar(e) {
    e.preventDefault();
    // this.app.pm.changePage(this.Es.calendarElt, 'calendar', this.currentCalendar.calendarName);
    this.currentCalendar.calendarElt.hidden = true;
    this.currentCalendar = this[e.currentTarget.dataset.calendar];
    this.currentCalendar.calendarElt.hidden = false;
     this.app.pm.changePage(this.Es.calendarElt);
    this.setCalendar();
  }

}
