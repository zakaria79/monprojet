import LongIntervalEvent from './LongIntervalEvent';

export default class EveryYearEvent extends LongIntervalEvent {


  constructor (calendar) {

    super(calendar);

  }


  addIntervalInDate (date) {
  
    date.setFullYear(date.getFullYear() + this.event.interval);
  
  }

}
