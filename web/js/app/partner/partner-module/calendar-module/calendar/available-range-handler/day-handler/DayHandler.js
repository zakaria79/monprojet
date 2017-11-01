import AvailableRangeHandler from './../AvailableRangeHandler';

export default class DayHandler extends AvailableRangeHandler {

  constructor(app) {
    super(app);
  }

  dayEventHandler(event) {
    let hourStart = +event.getHourStart(),
      hourEnd = +event.getHourEnd(),
      columnStart, columnEnd, i, firstHourStart, lastHourEnd;
    if (event.startEndDiff === 0) {
      this.removeAvailableClassFromColumn(
        hourStart,
        hourEnd, document.querySelector('#calendar [data-date="' + event.start.date_standard + '"]').dataset.column
      );
    } else {
      this.longDayEventHandler(event, event.start.date, event.end.date);
    }
  }

  longDayEventHandler(event, start, end) {
    let hourStart = +event.getHourStart(),
      hourEnd = +event.getHourEnd(),
      columnStart, columnEnd, firstHourStart, lastHourEnd, i;
    if (start.getTime() < this.app.cm.calendar.timeStart) {
      columnStart = 1;
      firstHourStart = 8;
    } else {
      columnStart = +document.querySelector('#calendar [data-date="' + this.app.dateManager.getStandardDate(start) + '"]').dataset.column;
      firstHourStart = hourStart;
    }
    if (end.getTime() > this.app.cm.calendar.timeEnd) {
      columnEnd = 7;
      lastHourEnd = 19;
    } else {
      columnEnd = +document.querySelector('#calendar [data-date="' + this.app.dateManager.getStandardDate(end) + '"]').dataset.column;
      columnEnd = columnEnd >= 6 ? columnEnd - (this.app.cm.weekendNb - (7 - columnEnd)) : columnEnd;
      lastHourEnd = hourEnd;
    }
    for (i = +columnStart; i <= +columnEnd; i++) {
      this.removeAvailableClassFromColumn(i === columnStart ? firstHourStart : 8, i === columnEnd ? lastHourEnd : 19, i);
    }
  }

}
