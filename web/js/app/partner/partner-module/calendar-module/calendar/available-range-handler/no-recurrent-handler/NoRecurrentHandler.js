import DayHandler from './../day-handler/DayHandler';

export default class NoRecurrentHandler extends DayHandler {

  constructor(app) {
    super(app);
  }
  
  setAvailableRange(event) {
    let hourStart = +event.getHourStart(),
      hourEnd = +event.getHourEnd(),
      columnStart, columnEnd, i, firstHourStart, lastHourEnd;
    if (event.start.time <= this.app.cm.calendar.timeEnd && event.end.time >= this.app.cm.calendar.timeStart) {
      this.dayEventHandler(event);
    }
  }

}
