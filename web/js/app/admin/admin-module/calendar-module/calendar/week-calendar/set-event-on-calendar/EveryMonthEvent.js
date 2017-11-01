import LongIntervalEvent from './LongIntervalEvent';

export default class EveryMonthEvent extends LongIntervalEvent {

  constructor (calendar) {

    super(calendar);

  }


  addIntervalInDate (date) {
  
    date.setMonth(date.getMonth() + this.event.interval);
  
  }

}
