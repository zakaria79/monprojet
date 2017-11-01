import AvailableRangeHandler from './../AvailableRangeHandler';

export default class DaysOfWeekHandler extends AvailableRangeHandler {

  constructor(app) {
    super(app);
  }
  
  setAvailableRange(event, weekendNb) {
    let columnStart, columnEnd, i;
    // Vérifie si l'événement est compris dans le calendrier
    if (event.start.time <= this.app.cm.calendar.timeEnd && event.dateEndRec.time >= this.app.cm.calendar.timeStart) {
      if (event.start.time < this.app.cm.calendar.timeStart) {
        columnStart = 1;
      } else {
        columnStart = +document.querySelector('#calendar [data-date="' + event.start.date_standard + '"]').dataset.column;
      }
      if (event.dateEndRec.time > this.app.cm.calendar.timeEnd) {
        columnEnd = 7 - weekendNb;
      } else {
        columnEnd = +document.querySelector('#calendar [data-date="' + event.dateEndRec.date_standard + '"]').dataset.column;
        columnEnd = columnEnd >= 6 ? columnEnd - (weekendNb - (7 - columnEnd)) : columnEnd;
      }
      for (i = columnStart; i <= columnEnd; i++) {
        this.removeAvailableClassFromColumn(+event.getHourStart(), +event.getHourEnd(), i);
      }
    }
  }

}
