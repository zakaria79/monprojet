import SetEvent from './SetEvent';

export default class EveryDaysOfWeekEvent extends SetEvent {
  constructor (calendar) {
    super (calendar);
  }

  setEvent (event) {
    this.event = event;
    let startTdNb = this.getStartTdNumber(event.start.date_standard), endTdNb = this.getEndTdNumber(event.dateEndRec.date_standard), i, date, evElt;
    for (i = startTdNb; i <= endTdNb; i++) {
      evElt = this.eventElts[i];
      date = evElt.dataset.date;
      this.createEventElement(date, date, evElt, true);
    }
  }
}
