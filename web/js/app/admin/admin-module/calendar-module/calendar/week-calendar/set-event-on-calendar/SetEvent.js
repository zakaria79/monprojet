import SetEventOnCalendar from './../../set-event-on-calendar/SetEventOnCalendar';
export default class SetEvent extends SetEventOnCalendar {
  
  constructor (calendar) {
    super (calendar);
    this.evTitle = calendar.evTitleElts;
  }

  setLongEvent (start, end) {
    let startColumn = this.getStartColumn(start), endColumn = this.getEndColumn(end), hourStart = this.event.getHourStart(), hourEnd = this.event.getHourEnd(), tds, i, a;
    for (i = startColumn; i <= endColumn; i++) {
      this.calendar.eventInColumn[i -1]++;
      if (this.calendar.eventInColumn[i-1] >= 6) {
        this.createCounterElement(i);
      } else {
        tds = this.calendarElt.querySelectorAll('[data-column="'+i+'"]');
        for (a = hourStart; a <= hourEnd; a++) {
          this.createEventElement(tds[a].querySelector('.eventWeek'), i, a === hourStart);
        }
      }
    }
  }

  createCounterElement (column) {
    let elt = this.calendarElt.querySelector('[data-column="'+column+'"]');
    elt.innerHTML = `<div class="count_events">${this.calendar.eventInColumn[parseInt(column) -1]} évenements</div>`;
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
      divEventElt.dataset.occurencestart = this.app.dm.getStandardDate(this.occurenceStart);
      divEventElt.dataset.occurenceend = this.app.dm.getStandardDate(this.occurenceEnd);
    }
    if (isFirst) {
      elt.parentElement.querySelector('.event_title').innerHTML = this.event.title;
    }
  }

  getStartColumn (date) {
    return this.calendarElt.querySelector('[data-date="'+date+'"]') ? parseInt(this.calendarElt.querySelector('[data-date="'+date+'"]').dataset.column) : 1;
  }

  getEndColumn (date) {
    return this.calendarElt.querySelector('[data-date="'+date+'"]') ? parseInt(this.calendarElt.querySelector('[data-date="'+date+'"]').dataset.column) : 7;
  }

  // isInCalendar (date) {
  //   if (this.calendarElt.querySelector('[data-date="' + date + '"]')) {
  //     return true;
  //   }
  //   return false;
  // }
}
