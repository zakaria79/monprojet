import SetEventOnCalendar from './../../set-event-on-calendar/SetEventOnCalendar';

export default class SetEvent extends SetEventOnCalendar {
  
  constructor (calendar) {

    super (calendar);
  
    this.evTitleElts = calendar.Es.weekevent_titleElts;
  
  }


  setLongEvent (start, end) {

    let startColumn = this.getStartColumn(start), endColumn = this.getEndColumn(end), tds, i, a,
      hourStart = this.event.getHourStart(), hourEnd = this.event.getHourEnd();

    for (i = startColumn; i <= endColumn; i++) {

      this.calendar.eventInColumn[i -1]++;

      if (this.calendar.eventInColumn[i-1] >= 6) {

        this.createCounterElement(i);
        
      } else {
      
        tds = this.calendarElt.querySelectorAll('[data-column="'+i+'"]');

        for (a = hourStart; a <= hourEnd; a++) {

          this.createEventElement(tds[a].querySelector('.eventDays'), i, a === hourStart);
        
        }
      
      }


    }

  }

  createCounterElement (column) {
  
    let elt = this.calendarElt.querySelector('[data-column="'+column+'"]');

    elt.innerHTML = `<div class="count_events">${this.calendar.eventInColumn[parseInt(column) -1]} évenements</div>`;
  
  }


  isInCalendar (date) {

    if (this.calendarElt.querySelector('[data-date="' + date + '"]')) {

      return true;

    }

    return false;

  }


  // Cré l'évenement dans le DOM
  createEventElement (elt, column, isFirst) {

    let divEventElt = document.createElement('div');

    divEventElt.classList.add(this.event.color);

    divEventElt.classList.add('event');

    divEventElt.classList.add('event'+this.calendar.eventInColumn[column -1]);

    divEventElt.dataset.id = this.event.id;

    elt.appendChild(divEventElt);

    if (this.longRecurrentEvent) {
      
      divEventElt.dataset.occurencestart = this.app.dm.getStandardDate(this.occurenceDates.start);

      divEventElt.dataset.occurenceend = this.app.dm.getStandardDate(this.occurenceDates.end);

    }

    if (isFirst) {

      elt.parentElement.querySelector('.event_title').innerHTML = this.event.title;

    }

  }


  getStartColumn (date) {

    return this.calendarElt.querySelector('[data-date="'+date+'"]') ? parseInt(this.calendarElt.querySelector('[data-date="'+date+'"]').dataset.column) : 1;

  }


  getEndColumn (date) {

    return this.calendarElt.querySelector('[data-date="'+date+'"]') ? parseInt(this.calendarElt.querySelector('[data-date="'+date+'"]').dataset.column) : 4;

  }

}
