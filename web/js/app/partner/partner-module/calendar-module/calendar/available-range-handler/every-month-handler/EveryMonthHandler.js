import YearAnMonthHandler from './../year-and-month-handler/YearAndMonthHandler';

export default class EveryMonthHandler extends YearAnMonthHandler {

  constructor(app) {
    super(app);
  }
  
  setAvailableRange(event) {
    let dates = {},
      date;
    if (event.start.time <= this.app.cm.calendar.timeEnd && event.end.time >= this.app.cm.calendar.timeStart) {
      this.dayEventHandler(event);
    } else {
      if (event.startEndDiff === 0) {
        date = this.getLastOccurenceDate(event);
        if (date.getTime() <= this.app.cm.calendar.timeEnd && date.getTime() >= this.app.cm.calendar.timeStart) {
          this.removeAvailableClassFromColumn(+event.getHourStart(), +event.getHourEnd(),
            document.querySelector('#calendar [data-date="' + this.app.dateManager.getStandardDate(date) + '"]').dataset.column
          );
        }
      } else {
        dates = this.getLastOccurenceDates(event);
        if (dates.s.getTime() <= this.app.cm.calendar.timeEnd && dates.e.getTime() >= this.app.cm.calendar.timeStart) {
          this.longDayEventHandler(event, dates.s, dates.e);
        }
      }
    }
  }

  addIntervalInDate(date, interval) {
    date.setMonth(date.getMonth() + interval);
  }

}
