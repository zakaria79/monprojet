export default class EventsElement {

  constructor(app) {
    this.app = app;
    this.dem = app.dem;
    this.dem.setElement(['#events', '#events #bloc_btn', '#event', '#list', '#events h2', '#eventDetails']);
    this.Es = this.dem.elts;
    this.elt = this.Es.eventsElt;
  }

  /* Affiche la liste des évenements */
  display(e) {
    let app = this.app,
      currentEvents = [],
      ids = [],
      eventsElts, eventElt, dateText, event;
    this.selectedElement = e.currentTarget;
    this.Es.listElt.innerHTML = '';
    this.selectedDateData = this.app.dm.setDate(new Date(e.currentTarget.dataset.date));
    dateText = this.selectedDateData.dateToString;
    app.cm.currentCalendar.calendarElt.hidden = true;
    this.elt.hidden = false;
    if (e.currentTarget.querySelector('.event')) {
      this.h2Text = 'Évenements pour le ' + this.selectedDateData.dateToString;
      eventsElts = e.currentTarget.querySelectorAll('.event');
      for (eventElt of eventsElts) {
        ids.push(eventElt.dataset.id);
      }
      this.app.em.getEventsByIds(ids.join(','), (events) => {
        this.events = events;
        for (eventElt of eventsElts) {
          event = this.events[eventElt.dataset.id];
          if (event.startEndDiff > 0) {
            if (eventElt.dataset.occurencestart) {
              event.dateString = this.app.dm.getStringFromStartAndEndStandardDates(eventElt.dataset.occurencestart, eventElt.dataset.occurenceend);
            } else {
              event.dateString = this.app.dm.getStringFromStartAndEndStandardDates(event.start.date_standard, event.end.date_standard);
            }
          } else {
            event.dateString = this.app.dm.getStringFromOneDate(new Date(this.selectedElement.dataset.date));
          }
          event.recurrenceText = this.app.em.getFullRecurrenceText(event);
          event.calendarDate = this.selectedElement.dataset.date;
          currentEvents.push(this.events[eventElt.dataset.id]);
          eventElt = document.createElement('div');
          eventElt.dataset.id = event.id;
          eventElt.classList.add('event_list');
          eventElt.innerHTML = `<strong class="mr-3">${event.title} : </strong> ${event.getRangeTime()} <em class="comment">${event.comment ? event.comment : ''}</em>`;
          this.Es.listElt.appendChild(eventElt);
          this.Es.listElt.hidden = false;
          eventElt.addEventListener('click', this.displayEventDetails.bind(this));
        }
      });
    } else {
      this.h2Text = 'Pas d\'évenement pour le ' + this.selectedDateData.dateToString;
    }
    this.Es.eventsh2Elt.textContent = this.h2Text;
  }

  displayEventDetails(e) {
    this.selectedEvent = this.events[parseInt(e.currentTarget.dataset.id)];
    this.Es.eventDetailsElt.querySelector('.user').textContent = this.selectedEvent.user_first_name + ' ' + this.selectedEvent.user_name;
    this.Es.eventDetailsElt.querySelector('.role').textContent = this.selectedEvent.userRole;
    this.Es.eventsh2Elt.textContent = this.selectedEvent.title;
    this.Es.eventDetailsElt.querySelector('.eventDate').textContent = this.selectedEvent.dateString;
    this.Es.eventDetailsElt.querySelector('.hour').textContent = this.selectedEvent.getRangeTime();
    this.Es.eventDetailsElt.querySelector('.createdDate').textContent = this.app.dm.getStringDateAndHourFromDateObject(this.selectedEvent.dateCreation.date);
    this.Es.eventDetailsElt.querySelector('.recurence').textContent = this.selectedEvent.recurrenceText;
    this.Es.eventDetailsElt.querySelector('.visibility').textContent = this.app.em.visibilities[this.selectedEvent.visibility - 1];
    this.Es.eventDetailsElt.querySelector('.eventCategory').textContent = this.app.em.categories[this.selectedEvent.category - 1];
    this.Es.eventDetailsElt.querySelector('.eventComment').textContent = this.selectedEvent.comment;
    if (this.selectedEvent.lastModif) {
      this.Es.eventDetailsElt.querySelector('.modif').hidden = false;
      this.Es.eventDetailsElt.querySelector('.lastModif').textContent = 'Modifié le ' + this.app.dm.getStringDateAndHourFromDateObject(this.selectedEvent.lastModif.date);
    }
    this.Es.eventDetailsElt.querySelector('.available').textContent = 'Plage ' + (this.selectedEvent.available === '2' ? 'disponible' : 'non disponible');
    this.Es.eventDetailsElt.hidden = false;
    this.Es.listElt.hidden = true;
    this.Es.eventsbloc_btnElt.hidden = true;
    this.Es.eventsElt.appendChild(this.Es.eventDetailsElt);
    this.Es.eventDetailsElt.querySelector('#return_to_event_list').addEventListener('click', this.returnToEventsList.bind(this));
    this.Es.eventDetailsElt.querySelector('#editEvent').addEventListener(
      'click',
      (e) => {
        this.elt.hidden = true;
        this.app.form.editEvent(this.selectedEvent);
      }
    );
    this.Es.eventDetailsElt.querySelector('#deleteEvent').addEventListener(
      'click',
      (e) => {
        this.app.dem.displayAlertConfirmMessage('Vous êtes sur le point de supprimer cet événement, êtes-vous sûr de vouloir executer cet action ?',
          this.delete.bind(this)
        );
      }
    );
  }

  delete() {
    this.app.em.deleteEvent(
      this.selectedEvent.id,
      this.deleteEvent.bind(this),
      this.app.dem.setErrorMessage.bind(this.app.dem)
    );
  }

  deleteEvent() {
    this.app.cm.currentCalendar.initializeCalendar();
    this.app.cm.currentCalendar.getEventsCalendar();
    this.elt.hidden = true;
    this.Es.eventsbloc_btnElt.hidden = false;
    this.Es.eventDetailsElt.hidden = true;
    this.app.cm.currentCalendar.calendarElt.hidden = false;
    this.app.dem.setSuccessMessage('L\'évenement a bien été supprimé');
  }

  returnToEventsList(e) {
    this.Es.eventsh2Elt.textContent = this.h2Text;
    this.Es.listElt.hidden = false;
    this.Es.eventsbloc_btnElt.hidden = false;
    this.Es.eventDetailsElt.hidden = true;
  }

  /* Retourn au calendrier */
  returnToCalendar() {
    this.elt.hidden = true;
    this.app.cm.currentCalendar.calendarElt.hidden = false;
    this.app.cm.currentCalendar.initializeCalendar();
    this.app.cm.currentCalendar.getEventsCalendar();
  }
}
