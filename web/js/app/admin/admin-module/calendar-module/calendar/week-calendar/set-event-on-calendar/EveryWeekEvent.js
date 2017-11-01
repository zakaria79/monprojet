import SetEvent from './SetEvent';

export default class EveryWeekEvent extends SetEvent {

  constructor (calendar) {

    super (calendar);

  }


  setOccurences (start, columnEnd, first) {

    let dayRec, i, columnStart, tds;

    columnStart = this.calendarElt.querySelector('[data-date="'+start+'"]').dataset.column;

    for (dayRec of this.event.daysRec) {

      this.calendar.eventInColumn[dayRec -1]++;

      if (this.calendar.eventInColumn[i -1] >= 6) {

        this.createCounterElement(i);

      } else {

        tds = this.calendarElt.querySelectorAll('[data-column="'+dayRec+'"]');

        if (!first || dayRec >= columnStart && dayRec <= columnEnd) {

          for (i = this.hourStart; i <= this.hourEnd; i++) {

            this.createEventElement(tds[i].querySelector('.eventWeek'), dayRec, i === this.hourStart);

          }

        }

      }

    }

  }


  setEvent (event) {

    let interval = 7 * event.interval, tdEnd, columnStart, columnEnd, start, isEvent, dayRec, first = false, tds, i;

    this.event = event;

    this.hourStart = event.getHourStart();
    this.hourEnd = event.getHourEnd();

    columnEnd = this.getEndColumn(event.dateEndRec.date_standard);

    if (event.start.time >= this.calendar.timeStart && event.start.time <= this.calendar.timeEnd) {

      this.setOccurences(event.start.date_standard, columnEnd, true);

    } else {

      start = new Date(event.start.date_standard+' 00:00:00:00');

      while (start.getTime() < this.calendar.timeStart) {

        start.setDate(start.getDate() + interval);

      }


      if (start.getTime() >= this.calendar.timeStart && start.getTime() <= this.calendar.timeEnd) {

        this.setOccurences(this.app.dm.getStandardDate(start), columnEnd, false);

      }

    }

  }

}
