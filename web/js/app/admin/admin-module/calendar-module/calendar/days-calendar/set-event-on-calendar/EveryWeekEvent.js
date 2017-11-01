import SetEvent from './SetEvent';

export default class EveryWeekEvent extends SetEvent {

  constructor (calendar) {
  
    super (calendar);
  
  }


  setOccurences (columnStart, columnEnd, first) {

    let hourStart = this.event.getHourStart(), hourEnd = this.event.getHourEnd(), dayRec, i, tds, currentWeekDay, a;
  
    for (i = columnStart; i <= columnEnd; i++) {

      tds = this.calendarElt.querySelectorAll('[data-column="'+i+'"]');

      currentWeekDay = tds[0].dataset.weekday;
    
      this.calendar.eventInColumn[i -1]++;

      if (this.event.daysRec.includes(currentWeekDay)) {

        if (this.calendar.eventInColumn[i -1] >= 6) {

          this.createCounterElement(i);

        } else {

          for (a = hourStart; a <= hourEnd; a++) {

            this.createEventElement(tds[a].querySelector('.eventDays'), dayRec, a === hourStart);

          }

        }

      }

      if (currentWeekDay === '7' && this.event.interval > 1) {

        break;

      }

    }

  }


  setEvent (event) {

    let interval = 7 * event.interval, columnStart, columnEnd, calendarWeekStart, eventWeekStart, eventWeekStartDateStandard;
    
    this.event = event;

    columnEnd = this.getEndColumn(event.dateEndRec);

    if (this.isInCalendar(event.start.date_standard)) {

      columnStart = this.calendarElt.querySelector('[data-date="'+event.start.date_standard+'"]').dataset.column;

      this.setOccurences(columnStart,columnEnd, true);

    } else {
    
      // Récupère le premier jour de la semaine de l'évenement
      eventWeekStart = new Date(event.start.date_standard+' 00:00:00:00');
      eventWeekStart.setDate(eventWeekStart.getDate() -(this.app.dm.getWeekDayNb(eventWeekStart.getDay()) -1));

      // Récupère le premier jour de la semaine du calendrier
      calendarWeekStart = new Date( this.calendar.dateStart.getFullYear(), this.calendar.dateStart.getMonth(), this.calendar.dateStart.getDate(), 0,0,0,0);
      calendarWeekStart.setDate(calendarWeekStart.getDate() -(this.app.dm.getWeekDayNb(calendarWeekStart.getDay()) -1));

      while (eventWeekStart.getTime() < calendarWeekStart.getTime()) {

        eventWeekStart.setDate(eventWeekStart.getDate() + interval);
    
      }

      if (eventWeekStart.getTime() <= this.calendar.dateEnd.getTime()) {

        eventWeekStartDateStandard = this.app.dm.getStandardDate(eventWeekStart);

        if (this.isInCalendar(eventWeekStartDateStandard)) {

          columnStart = this.calendarElt.querySelector('[data-date="'+eventWeekStartDateStandard+'"]').dataset.column;

        } else {
        
          columnStart = 1;
        
        }

        this.setOccurences(columnStart, columnEnd, false);
        
      }

    }

  }

}
