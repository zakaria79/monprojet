import SetEvent from './SetEvent';

export default class NoRecurrentEvent extends SetEvent {
  
  constructor (calendar) {

    super(calendar);
  
  }


  setEvent (event) {

    let hourStart = event.getHourStart(), hourEnd = event.getHourEnd(), i;

    this.event = event;

    this.calendar.eventInColumn++;

    if (this.calendar.eventInColumn >= 5) {

      this.createCounterElement();

    } else {

     for (i = hourStart; i <= hourEnd; i++) {
        
      this.createEventElement(this.eventElts[i], i === hourStart);

     }

    }

  }

}
