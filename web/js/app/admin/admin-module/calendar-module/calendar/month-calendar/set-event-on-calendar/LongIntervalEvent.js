import SetEvent from './SetEvent';

export default class LongIntervalEvent extends SetEvent {

  constructor(calendar) {
    super(calendar);
  }

  setEvent(event) {
    let isOneDay = event.isOneDay(),
      start, end, dates;
    this.event = event;
    this.longRecurrentEvent = false;
    start = new Date(event.start.date_standard + ' 00:00:00');
    end = new Date(event.end.date_standard + ' 00:00:00');
    if (start.getTime() >= this.calendar.timeStart || end.getTime() >= this.calendar.timeStart) {
      if (isOneDay) {
        this.setOneDay(event.start.date_standard, true);
      } else {
        this.setLongEvent(event.start.date_standard, event.end.date_standard);
      }
    } else {
      if (isOneDay) {
        let date = this.getLastOccurenceDate(event.start.date_standard);
        if (date.getTime() <= this.event.dateEndRec.time) {
          this.setOneDayOccurrenceEvent(date);
        }
      } else {
        dates = this.getLastOccurenceDates(event.start.date_standard, event.end.date_standard);
        if (dates.start.getTime() <= this.event.dateEndRec.time && dates.start.getTime() <= this.calendar.timeEnd && dates.end.getTime() >= this.calendar.timeStart) {
          this.longRecurrentEvent = true;
          this.occurenceStart = dates.start;
          this.occurenceEnd = dates.end;
          this.setLongEvent(this.dm.getStandardDate(dates.start), this.dm.getStandardDate(dates.end));
        }
      }
    }
  }

  setOneDay(start_standard, isFirst) {
    let td = this.calendarElt.querySelector('[data-date="' + start_standard + '"]'),
      evElt = td.querySelector('.eventMonth');
    this.createEventElement(start_standard, start_standard, evElt, isFirst);
  }

  setOneDayOccurrenceEvent(start) {
    if (start.getTime() >= this.calendar.timeStart && start.getTime() <= this.calendar.timeEnd) {
      let s = this.app.dm.getStandardDate(start);
      this.setOneDay(s, true);
      return s;
    }
    return null;
  }

}
