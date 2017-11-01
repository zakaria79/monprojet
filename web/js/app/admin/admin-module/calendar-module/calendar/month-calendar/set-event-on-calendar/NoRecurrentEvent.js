import SetEvent from './SetEvent';

export default class NoRecurrentEvent extends SetEvent {

  constructor (calendar) {
    super(calendar);
  }

  setEvent (event) {
    this.event = event;
    let start = event.start.date_standard, td, evElt, tdnb;
    if (event.isOneDay()) {
      td = this.calendarElt.querySelector('[data-date="'+event.start.date_standard+'"]');
      evElt = td.querySelector('.eventMonth');
      this.createEventElement(start, start, evElt, true);
    } else {
      this.setLongEvent(start, event.end.date_standard);
    }
  }
}
