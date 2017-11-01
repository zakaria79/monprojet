import SetEvent from './SetEvent';

export default class LongIntervalEvent extends SetEvent {


  constructor (calendar) {

    super(calendar);

  }

  setOccurences (start, end, isOneDay) {

    let hourStart = this.event.getHourStart(), hourEnd = this.event.getHourEnd(), td, column, tds, i;

    if (isOneDay) {

      td = this.calendarElt.querySelector('[data-date="'+start+'"]');

      column = td.dataset.column;

      this.calendar.eventInColumn[parseInt(column) -1]++;

      if (this.calendar.eventInColumn[parseInt(column) -1] >= 6) {

        this.createCounterElement(parseInt(column));

      } else {

        tds = this.calendarElt.querySelectorAll('[data-column="'+column+'"]');

        for (i = hourStart; i <= hourEnd; i++) {

          this.createEventElement(tds[i].querySelector('.eventWeek'), parseInt(column), i === hourStart);

        }

      }

    } else {

      this.setLongEvent(start, end);

    }

  }


  setEvent (event) {

    this.event = event;

    this.longRecurrentEvent = false;

    let isOneDay = event.isOneDay(), start, end, dates, td, column, tds, i, occurenceStart, occurenceEnd;

    start = new Date(event.start.date_standard+' 00:00:00:00');
    end = new Date(event.end.date_standard+' 00:00:00:00');

    if (start.getTime() >= this.calendar.timeStart || end.getTime() >= this.calendar.timeStart) {

      this.setOccurences(event.start.date_standard, event.end.date_standard, isOneDay);

    } else {

      if (isOneDay) {

        start = this.getLastOccurenceDate(event.start.date_standard);

        if (start.getTime() >= this.calendar.timeStart && start.getTime() <= this.calendar.timeEnd) {

          start = this.app.dm.getStandardDate(start);

          this.setOccurences(start, end, isOneDay);

        }

      } else {

        dates = this.getLastOccurenceDates(event.start.date_standard, event.end.date_standard);

        if ((dates.start.getTime() <= this.calendar.timeEnd && dates.end.getTime() >= this.calendar.timeStart) || (dates.start.getTime() >= this.calendar.timeStart && dates.start.getTime() <= this.calendar.timeEnd) || (dates.end.getTime() >= this.calendar.timeStart && dates.end.getTime() <= this.calendar.timeEnd)) {

          this.longRecurrentEvent = true;

          this.occurenceStart = dates.start;

          this.occurenceEnd = dates.end;

          this.setOccurences(this.app.dm.getStandardDate(dates.start), this.app.dm.getStandardDate(dates.end), isOneDay);

        }

      }

    }

  }

}
