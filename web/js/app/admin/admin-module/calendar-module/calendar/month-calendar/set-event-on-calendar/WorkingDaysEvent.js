import SetEvent from './SetEvent';

export default class WorkingDaysEvent extends SetEvent {
  constructor (calendar) {
    super (calendar);
    this.evElts = this.calendar.Es.eventMonthElts;
  }

  setEvent (event) {
    this.event = event;
    let startTdNb = this.getStartTdNumber(event.start.date_standard), endTdNb = this.getEndTdNumber(event.dateEndRec.date_standard), i, date, evElt;
    for (i = startTdNb; i <= endTdNb; i++) {
      if (i % 7 <= 4) {
        evElt = this.eventElts[i];
        date = evElt.dataset.date;
        this.createEventElement(date, date, evElt, true);
      }
    }
  }
}
