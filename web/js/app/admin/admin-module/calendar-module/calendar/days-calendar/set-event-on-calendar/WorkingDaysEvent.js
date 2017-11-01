import SetEvent from './SetEvent';

export default class WorkingDaysEvent extends SetEvent {

  constructor (calendar) {

    super (calendar);

  }


  setEvent (event) {

    let hourStart = event.getHourStart(), hourEnd = event.getHourEnd(), columnStart, columnEnd, i, tds, a;

    this.event = event;

    if (event.start.time <= this.calendar.timeEnd && event.dateEndRec.time >= this.calendar.timeStart) {

      columnStart = this.getStartColumn(event.start.date_standard);

      columnEnd = this.getEndColumn(event.dateEndRec.date_standard);

      for (i = columnStart; i <= columnEnd; i++) {

        this.calendar.eventInColumn[i -1]++;

        if (this.calendar.eventInColumn[i -1] >= 6) {

          this.createCounterElement(i);

        } else {

          tds = this.calendarElt.querySelectorAll('[data-column="'+i+'"]');
          
          if (parseInt(tds[0].dataset.weekday) < 6) {

            for (a = hourStart; a <= hourEnd; a++) {

              this.createEventElement(tds[a].querySelector('.eventDays'), i, a === hourStart);

            }
            
          }

        }

      }

    }

  }

}
