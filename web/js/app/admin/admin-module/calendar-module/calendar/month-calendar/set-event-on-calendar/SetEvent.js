import SetEventOnCalendar from './../../set-event-on-calendar/SetEventOnCalendar';

export default class SetEvent extends SetEventOnCalendar {

  constructor(calendar) {
    super(calendar);
    this.trElts = calendar.Es.monthtrElts;
  }

  setLongEvent(start, end) {
    let startTdNb = this.getStartTdNumber(start),
      endTdNb = this.getEndTdNumber(end),
      i;
    for (i = startTdNb; i <= endTdNb; i++) {
      this.createEventElement(start, end, this.eventElts[i], i === startTdNb);
    }
  }

  // Cré l'évenement dans le DOM
  createEventElement(start, end, elt, isFirst) {
    let divEventElt = document.createElement('div'),
      td = elt.parentElement,
      tdnb = parseInt(td.dataset.tdnbs),
      countElt;
    this.calendar.eventsInTds[tdnb]++;
    if (isFirst) {
      divEventElt.textContent = this.event.title;
    }
    divEventElt.classList.add(this.event.color);
    divEventElt.classList.add('event');
    divEventElt.dataset.id = this.event.id;
    divEventElt.dataset.start = start;
    divEventElt.dataset.end = end;
    elt.appendChild(divEventElt);
    if (this.longRecurrentEvent) {
      divEventElt.dataset.occurencestart = this.app.dm.getStandardDate(this.occurenceStart);
      divEventElt.dataset.occurenceend = this.app.dm.getStandardDate(this.occurenceEnd);
    }
    if (this.calendar.eventsInTds[tdnb] > 2) {
      countElt = td.querySelector('.countEvent');
      countElt.textContent = this.calendar.eventsInTds[tdnb] + ' évenements';
      countElt.hidden = false;
      divEventElt.hidden = true;
    }
  }

  getStartTdNumber(date) {
    return this.calendarElt.querySelector('[data-date="' + date + '"]') ? parseInt(this.calendarElt.querySelector('[data-date="' + date + '"]').dataset.tdnbs) : 0;
  }

  getEndTdNumber(date) {
    return this.calendarElt.querySelector('[data-date="' + date + '"]') ? parseInt(this.calendarElt.querySelector('[data-date="' + date + '"]').dataset.tdnbs) : this.tdElts.length - 1;
  }

  removeEventElement(event) {
    let elt = this.calendarElt.querySelector(`[data-id="${event.id}"]`);
    elt.parentElement.removeChild(elt);
    if (!this.app.evElt.Es.eventsElt.hidden) {
      if (this.app.evElt.Es.listElt.querySelector(`[data-id="${event.id}"]`)) {
        this.app.evElt.Es.listElt.querySelector(`[data-id="${event.id}"]`).innerHTML += `<span class="deletedEvent">Supprimé<span>`;
      }
    }
  }
}
