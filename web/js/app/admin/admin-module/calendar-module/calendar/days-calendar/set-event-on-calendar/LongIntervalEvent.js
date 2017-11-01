import SetEvent from './SetEvent';

export default class LongIntervalEvent extends SetEvent {


  constructor (calendar) {

    super(calendar);

  }


  setOccurence (column, tds) {

    let hourStart = this.event.getHourStart(), hourEnd = this.event.getHourEnd(), i;

    this.calendar.eventInColumn[column -1]++;

    if (this.calendar.eventInColumn[column -1] >= 6) {

      this.createCounterElement(column);

    } else {

      for (i = hourStart; i <= hourEnd; i++) {

        this.createEventElement(tds[i].querySelector('.eventDays'), column, i === hourStart);

      }

    }

  }


  setEvent (event) {

    this.event = event;

    this.longRecurrentEvent = false;

    let isOneDay = event.isOneDay(), date, dates, tds, column, i, columnStart, columnEnd;

    if (isOneDay) {

      date = this.getLastOccurenceDate(event.start.date_standard);

      if (date.getTime() >= this.calendar.timeStart && date.getTime() <= this.calendar.timeEnd) {

        tds = this.calendarElt.querySelectorAll('[data-date="'+this.dm.getStandardDate(date)+'"]');

        column = parseInt(tds[0].dataset.column);

        this.setOccurence(column, tds);

      }

    } else {
    
      dates = this.getLastOccurenceDates(event.start.date_standard, event.end.date_standard);

      if (dates.start.getTime() <= this.calendar.timeEnd) {

        this.longRecurrentEvent = true;

        this.occurenceDates = dates;
        
        columnStart = this.getStartColumn(this.app.dm.getStandardDate(dates.start));

        columnEnd = this.getEndColumn(this.app.dm.getStandardDate(dates.end));

        for (i = columnStart; i <= columnEnd; i++) {

          tds = this.calendarElt.querySelectorAll('[data-column="'+i+'"]');

          this.setOccurence(i, tds);
        
        }

      }

    }

  }

}
