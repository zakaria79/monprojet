import DayHandler from './../day-handler/DayHandler';

export default class YearAnMonthHandler extends DayHandler {

  constructor(app) {
    super(app);
  }
  
  getLastOccurenceDate(event) {
    let d = new Date(event.start.date_standard + ' 08:00:00');
    while (d.getTime() < this.app.cm.calendar.timeStart) {
      this.addIntervalInDate(d, event.interval);
    }
    return d;
  }

  getYearLastOccurenceDates(event) {
    let s = new Date(event.start.date_standard + ' 08:00:00'),
      e = new Date(event.end.date_standard + ' 19:00:00');
    while (s.getTime() < this.app.cm.calendar.timeStart && e.getTime() < this.app.cm.calendar.timeStart) {
      this.addIntervalInDate(s, event.interval);
      this.addIntervalInDate(e, event.interval);
    }
    return {
      s,
      e
    };
  }
}
