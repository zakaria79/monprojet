import SetEvent from './SetEvent';

export default class EveryDaysOfWeekEvent extends SetEvent {

  constructor (calendar) {

    super (calendar);

  }


  setEvent (event) {

    let columnStart, columnEnd, i, tds, a, hourStart = event.getHourStart(), hourEnd = event.getHourEnd();

    this.event = event;

    columnStart = this.getStartColumn(event.start.date_standard);

    columnEnd = this.getEndColumn(event.dateEndRec.date_standard);

    for (i = columnStart; i <= columnEnd; i++) {

      this.calendar.eventInColumn[i -1]++;

      if (this.calendar.eventInColumn[i -1] >= 6) {

        this.createCounterElement(i);

      } else {

        tds = this.calendarElt.querySelectorAll('[data-column="' + i + '"]');

        for (a = hourStart; a <= hourEnd; a++) {

          this.createEventElement(tds[a].querySelector('.eventDays'), i, a === hourStart);

        }

      }

    }

  }

}
