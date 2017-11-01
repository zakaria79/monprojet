import SetEvent from './SetEvent';

export default class LongIntervalEvent extends SetEvent {

  constructor (calendar) {

    super(calendar);

  }


  setOccurence () {

    let i, hourStart = this.event.getHourStart(), hourEnd = this.event.getHourEnd();

    this.calendar.eventInColumn++;

    if (this.calendar.eventInColumn >= 5) {

      this.createCounterElement();

    } else {

      for (i = hourStart; i <= hourEnd; i++) {

        this.createEventElement(this.eventElts[i], i === hourStart);

      }

    }

  }


  setEvent (event) {

    this.event = event;

    this.longRecurrentEvent = false;

    let isOneDay = event.isOneDay(), date, dates;

    if (isOneDay) {

      date = this.getLastOccurenceDate(event.start.date_standard);

      if (date.getTime() === this.calendar.timeStart) {

        this.setOccurence();

      }

    } else {

      dates = this.getLastOccurenceDates(event.start.date_standard, event.end.date_standard);

      if (dates.start.getTime() <= this.calendar.timeStart && dates.end >= this.calendar.timeStart) {

        this.longRecurrentEvent = true;

        this.occurenceDates = dates;

        this.setOccurence();

      }

    }

  }

}
