import SetEvent from './SetEvent';

export default class WorkingDaysEvent extends SetEvent {

  constructor (calendar) {

    super (calendar);

    this.evElts = this.calendar.Es.eventMonthElts;
    
  }


  setEvent (event) {

    this.event = event;

    let startColumn = this.getStartColumn(event.start.date_standard), hourStart = event.getHourStart(), hourEnd = event.getHourEnd(), endColumn, i, a, tds;

    endColumn = this.getEndColumn(event.dateEndRec.date_standard) > 5 ? 5 : this.getEndColumn(event.dateEndRec.date_standard);

    for (i = startColumn; i <= endColumn; i++) {

      this.calendar.eventInColumn[i -1]++;

      if (this.calendar.eventInColumn[i -1] >= 6) {

        this.createCounterElement(i);
        
      } else {

        tds = this.calendarElt.querySelectorAll('[data-column="'+i+'"]');

        for (a = hourStart; a <= hourEnd; a++) {

          this.createEventElement(tds[a].querySelector('.eventWeek'), i, a === hourStart);
        
        }

      }

    }

  }

}
