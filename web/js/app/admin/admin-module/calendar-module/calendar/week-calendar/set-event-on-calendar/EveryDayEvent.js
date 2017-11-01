import SetEvent from './SetEvent';

export default class EveryDayEvent extends SetEvent {
  constructor (calendar) {
    super(calendar);
  }

  setOccurences(start) {
    let startColumn = parseInt(this.calendarElt.querySelector('[data-date="'+start+'"]').dataset.column), 
      hourStart = this.event.getHourStart(), hourEnd = this.event.getHourEnd(), i, tds, a;
    for (i = startColumn; i <= this.endColumn; i += this.event.interval) {
      this.calendar.eventInColumn[i -1]++;
      if (this.calendar.eventInColumn[i -1] >= 6) {
        this.createCounterElement(i);
      } else {
        tds = this.calendarElt.querySelectorAll('[data-column="'+i+'"]');
        for (a = hourStart; a <= hourEnd; a++) {
          this.createEventElement(tds[a].querySelector('.eventWeek'), i, a === hourStart);
        }
      }
    }
  }

  setEvent (event) {
    let start, startTdNb, date, evElt, i;
    this.event = event;
    this.endColumn = this.getEndColumn(event.dateEndRec.date_standard);
    if (event.start.time >= this.calendar.timeStart && event.start.time <= this.calendar.timeEnd) {
      this.setOccurences(event.start.date_standard);
    } else {
      start = new Date(event.start.date_standard+' 00:00:00:00');
      while (start.getTime() < this.calendar.timeStart) {
        start.setDate(start.getDate() + event.interval);
      }
      if (start.getTime() >= this.calendar.timeStart && start.getTime() <= this.calendar.timeEnd) {
        this.setOccurences(this.app.dm.getStandardDate(start));
      }
    }
  }

}
