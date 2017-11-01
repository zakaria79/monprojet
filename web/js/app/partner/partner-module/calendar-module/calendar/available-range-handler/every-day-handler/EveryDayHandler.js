import AvailableRangeHandler from './../AvailableRangeHandler';

export default class EveryDayHandler extends AvailableRangeHandler {

  constructor(app) {
    super(app);
  }
  
  setAvailableRange(event) {
    let start = new Date(event.start.date_standard + ' 12:00:00'),
      columnStart, columnEnd, i;
    if (start.getTime() < this.app.cm.calendar.timeStart) {
      while (start.getTime() < this.app.cm.calendar.timeStart) {
        start.setDate(start.getDate() + event.interval);
      }
    }
    if (start.getTime() <= this.app.cm.calendar.timeEnd && start.getTime() >= this.app.cm.calendar.timeStart) {
      columnStart = +document.querySelector('#calendar [data-date="' + this.app.dateManager.getStandardDate(start) + '"]').dataset.column;
      if (event.dateEndRec.time > this.app.cm.calendar.timeEnd) {
        columnEnd = 7 - this.app.cm.weekendNb;
      } else {
        columnEnd = +document.querySelector('#calendar [data-date="' + event.dateEndRec.date_standard + '"]').dataset.column;
      }
      for (i = columnStart; i <= columnEnd; i += event.interval) {
        this.removeAvailableClassFromColumn(+event.getHourStart(), +event.getHourEnd(), i);
      }
    }
  }

}
