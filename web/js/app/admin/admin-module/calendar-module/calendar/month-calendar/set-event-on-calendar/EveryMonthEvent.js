import LongIntervalEvent from './LongIntervalEvent';

export default class EveryMonthEvent extends LongIntervalEvent {

  constructor (calendar) {
    super(calendar);
  }

  addIntervalInDate (date) {
    date.setMonth(date.getMonth() + this.event.interval);
  }

  getNextOccurenceDate(date_standard) {
    let s = new Date(date_standard + ' 00:00:00');
    this.addIntervalInDate(s);
    return s;
  }

  getNextOccurenceDates(start_standard, end_standard) {
    let start = new Date(start_standard + ' 00:00:00'),
      end = new Date(end_standard + ' 00:00:00');
    this.addIntervalInDate(start);
    this.addIntervalInDate(end);
    return {
      start,
      end
    };
  }

  setLongEvent(start, end) {
    let dates = this.getNextOccurenceDates(start, end);
    super.setLongEvent(start, end);
    console.log(this.event.dateEndRec.time);
    if (dates.start.getTime() <= this.calendar.timeEnd && dates.start.getTime() <= this.event.dateEndRec.time) {
      this.occurenceStart = dates.start;
      this.occurenceEnd = dates.end;
     super.setLongEvent(this.dm.getStandardDate(dates.start), this.dm.getStandardDate(dates.end));
    }
  }

  setOneDay(start, isFirst) {
    super.setOneDay(start, isFirst);
    let nextOccurenceStart = this.getNextOccurenceDate(start);
    if (nextOccurenceStart.getTime() <= this.event.dateEndRec.time) {
      super.setOneDayOccurrenceEvent(nextOccurenceStart, isFirst);
    }
  }
}
