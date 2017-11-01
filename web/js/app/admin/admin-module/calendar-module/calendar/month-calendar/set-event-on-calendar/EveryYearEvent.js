import LongIntervalEvent from './LongIntervalEvent';

export default class EveryYearEvent extends LongIntervalEvent {

  constructor (calendar) {
    super(calendar);
  }

  addIntervalInDate (date) {
    date.setFullYear(date.getFullYear() + this.event.interval);
  }

  // setDates (start, end) {
  //
  //   while (start.getTime() < this.calendar.timeStart && end.getTime() < this.calendar.timeStart) {
  //
  //     start.setFullYear(start.getFullYear() + this.event.interval);
  //     end.setFullYear(end.getFullYear() + this.event.interval);
  //
  //   }
  //
  // }
  //
  // setDate (date) {
  //
  //   while (date.getTime() < this.calendar.timeStart) {
  //
  //     date.setFullYear(date.getFullYear() + this.event.interval);
  //
  //   }
  //
  // }

}
