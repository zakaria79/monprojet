import SetEvent from './SetEvent';

export default class EveryDayEvent extends SetEvent {

  constructor(calendar) {
    super(calendar);
  }

  setOccurences(start) {
    let startTdNb = parseInt(this.calendarElt.querySelector('[data-date="' + start + '"]').dataset.tdnbs),
      endTdNb = this.getEndTdNumber(this.event.dateEndRec.date_standard),
      i, evElt, date;
    for (i = startTdNb; i <= endTdNb; i += this.event.interval) {
      evElt = this.eventElts[i];
      date = evElt.dataset.date;
      this.createEventElement(date, date, evElt, true);
    }
  }

  setEvent(event) {
    this.event = event;
    let start;
    if (event.start.time >= this.calendar.timeStart && event.start.time <= this.calendar.timeEnd) {
      this.setOccurences(event.start.date_standard);
    } else {
      start = new Date(event.start.date_standard);
      while (start < this.calendar.dateStart) {
        start.setDate(start.getDate() + event.interval);
      }
      this.setOccurences(this.dm.getStandardDate(start));
    }
  }
}
