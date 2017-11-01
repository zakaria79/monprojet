import SetEvent from './SetEvent';
export default class EveryWeekEvent extends SetEvent {

  constructor(calendar) {
    super(calendar);
  }

  setEvent(event) {
    this.event = event;
    let interval = 7 * event.interval,
      isEvent = false,
      first = false,
      tdStart, tdnbsStart, tdnbsEnd, tdEnd, tds, trnbs,
      tdnbs, start, date, eventStart, trnbsStart, trnbsEnd, i, a, dayRec, td;
    if (event.dateEndRec.time >= this.calendar.timeStart && event.dateEndRec.time <= this.calendar.timeEnd) {
      tdEnd = this.calendarElt.querySelector('[data-date="' + event.dateEndRec.date_standard + '"]');
      tdnbsEnd = parseInt(tdEnd.dataset.tdnbs);
      trnbsEnd = parseInt(tdEnd.parentElement.dataset.trnbs);
    } else {
      trnbsEnd = this.trElts.length - 1;
      tdnbsEnd = this.tdElts.length - 1;
    }
    if (event.start.time >= this.calendar.timeStart && event.start.time <= this.calendar.timeEnd) {
      start = event.start.date_standard;
      isEvent = true;
      first = true;
    } else {
      eventStart = new Date(event.start.date_standard + ' 00:00:00');
      while (eventStart.getTime() < this.calendar.timeStart) {
        eventStart.setDate(eventStart.getDate() + interval);
      }
      start = this.app.dm.getStandardDate(eventStart);
      if (eventStart.getTime() >= this.calendar.timeStart && eventStart.getTime() <= this.calendar.timeEnd) {
        isEvent = true;
      }
    }
    if (isEvent) {
      tdStart = this.calendarElt.querySelector('[data-date="' + start + '"]');
      tdnbsStart = parseInt(tdStart.dataset.tdnbs);
      trnbsStart = parseInt(tdStart.parentElement.dataset.trnbs) + 1;
      for (i = trnbsStart; i <= trnbsEnd; i += event.interval) {
        tds = this.trElts[i].querySelectorAll('td');
        if (event.daysRec) {
          for (dayRec of event.daysRec) {
            td = tds[parseInt(dayRec) - 1];
            if (!first || td.dataset.tdnbs >= tdnbsStart && td.dataset.tdnbs <= tdnbsEnd) {
              date = td.dataset.date;
              this.createEventElement(date, date, td.querySelector('.eventMonth'), true);
            }
          }
        }
      }
    }
  }
}
