export default class SetEventOnCalendar {

  constructor(calendar) {
    this.calendar = calendar;
    this.calendarElt = calendar.calendarElt;
    this.tdElts = calendar.tdElts;
    this.eventElts = calendar.eventElts;
    this.app = calendar.app;
    this.dm = this.app.dm;
    this.dem = this.app.dem;
  }

  getLastOccurenceDates(s, e) {
    let start = new Date(s + ' 00:00:00'),
      end = new Date(e + ' 00:00:00');
    while (start.getTime() < this.calendar.timeStart && end.getTime() < this.calendar.timeStart) {
      this.addIntervalInDate(start);
      this.addIntervalInDate(end);
    }
    return {
      start,
      end
    };
  }

  getLastOccurenceDate(date) {
    let d = new Date(date + ' 00:00:00');
    while (d.getTime() < this.calendar.timeStart) {
      this.addIntervalInDate(d);
    }
    return d;
  }

}
