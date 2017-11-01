import SetEvent from './SetEvent';

export default class WorkingDaysEvent extends SetEvent {

  constructor (calendar) {

    super (calendar);

  }


  setEvent (event) {

    let hourStart = event.getHourStart(), hourEnd = event.getHourEnd(), i, elts, weekday;

    this.event = event;

    this.calendar.eventInColumn++;

    if (this.calendar.eventInColumn >= 5) {

      this.createCounterElement();

    } else {


      if (parseInt(this.tdElts[0].dataset.weekday) < 6) {

        for (i = hourStart; i <= hourEnd; i++) {

          this.createEventElement(this.eventElts[i], i === hourStart);

        }

      }

    }

  }

}
