import AvailableRangeHandler from './../AvailableRangeHandler';

export default class EveryWeekHandler extends AvailableRangeHandler {

  constructor(app) {
    super(app);
  }
  
  setAvailableRange(event) {
    let start = new Date(event.start.date_standard + ' 12:00:00'),
      isBeforeStartCalendar = false,
      columnStart, columnEnd, i;
    if (start.getTime() < this.app.cm.calendar.timeStart) {
      while (start.getTime() < this.app.cm.calendar.timeStart) {
        start.setDate(start.getDate() + (7 *event.interval));
      }
      isBeforeStartCalendar = true;
    }
    if (start.getTime() <= this.app.cm.calendar.timeEnd && start.getTime() >= this.app.cm.calendar.timeStart) {
      if (isBeforeStartCalendar) {
        columnStart = 1;
      } else{
        columnStart = +document.querySelector('#calendar [data-date="' + event.start.date_standard + '"]').dataset.column;
      }
      if (event.dateEndRec.time > this.app.cm.calendar.timeEnd) {
        columnEnd = 7 - this.app.cm.weekendNb;
      } else {
        columnEnd = +document.querySelector('#calendar [data-date="' + event.dateEndRec.date_standard + '"]').dataset.column;
      }
      for (i = columnStart; i <= columnEnd; i++) {
        if (event.daysRec.includes(i.toString())) {
          this.removeAvailableClassFromColumn(+event.getHourStart(), +event.getHourEnd(), i);
        }
      }
    }
  }

}
