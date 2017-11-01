import SetEvent from './SetEvent';
export default class NoRecurrentEvent extends SetEvent {
  
  constructor (calendar) {
    super(calendar);
  }

  setEvent (event) {
    let hourStart = event.getHourStart(), hourEnd = event.getHourEnd(), td, tds, i, column;
    this.event = event;
    if (event.isOneDay()) {
      td = this.calendarElt.querySelector('[data-date="'+event.start.date_standard+'"]');
      column = td.dataset.column;
      this.calendar.eventInColumn[parseInt(column) -1]++;
      if (this.calendar.eventInColumn[parseInt(column) -1] >= 6) {
        this.createCounterElement(parseInt(column));
      } else {
        tds = this.calendarElt.querySelectorAll('[data-column="'+column+'"]');
        for (i = hourStart; i <= hourEnd; i++) {
          this.createEventElement(tds[i].querySelector('.eventWeek'), parseInt(column), i === hourStart);
        }
      }
    } else {
      this.setLongEvent(event.start.date_standard, event.end.date_standard);
    }
  }
}
