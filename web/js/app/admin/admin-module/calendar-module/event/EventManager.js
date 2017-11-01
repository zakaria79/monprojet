import xhr from './../../../../../xhr/Xhr';
import Event from './Event';

export default class EventManager extends xhr {

  constructor(app) {
    super();
    this.app = app;
    this.dm = app.dm;
    this.debbugElt = document.querySelector('#debbug');
    this.debbugElt.classList.remove('hide');
    this.debbugElt.hidden = true;
    this.visibilities = ['Administrateurs', 'Apporteurs d\'affaires', 'Commerciaux', 'Public'];
    this.categories = ['RDV', 'Meeting', 'Congés', 'Fériés'];
    this.recurrences = ['noRecurrent', 'everyDay', 'everyWeek', 'everyDaysOfWeek', 'workingDays', 'everyMonth', 'everyYear'];
    this.recurrencesText = ['Aucune', 'tous les jours', 'toutes les semaines', 'tous les jours de la semaine', 'les jours ouvrables', 'tous les mois', 'tous les ans'];
  }

  getRecurrenceText(event) {
    if ([1, 4, 5, ].includes(event.recurrence)) {
      return this.recurrencesText[event.recurrence - 1];
    }
    let interval = event.interval > 0 ? event.interval : '';
    return `${this.recurrencesText[event.recurrence -1].replace(/(les)/, '$1 ' +interval)}`;
  }

  getWeekDaysRecurrenceText(event) {
    if (event.recurrence !== 3) {
      return '';
    }
    if (event.daysRec.length) {
      let text = '',
        dayRec;
      for (dayRec of event.daysRec) {
        text += ' le ' + this.dm.daysOfWeek[parseInt(dayRec) - 1] + ', ';
      }
      return ', ' + text;
    }
    return '';
  }

  getDateEndRecText(event) {
    if (event.endRecType) {
      return 'Jusqu\'au ' + this.dm.getStringFromOneDate(event.dateEndRec.date);
    }
    return '';
  }

  getFullRecurrenceText(event) {
    return `${this.getRecurrenceText(event)} ${this.getWeekDaysRecurrenceText(event)} ${this.getDateEndRecText(event)}`;
  }

  buildEventObjectForCalendar(data) {
    let event = new Event();
    event.id = data.event_Id;
    event.title = data.title;
    event.color = data.color;
    event.startEndDiff = data.start_end_diff;
    event.recurrence = data.recurrence;
    event.start = data.start;
    event.end = data.end;
    event.endRecType = data.end_rec_type;
    event.dateEndRec = data.date_end_rec;
    event.interval = data.event_interval;
    event.daysRec = data.days_rec;
    return event;
  }

  // Construit un tableau d'évenements avec les id en index
  buildEventArrayById(events) {
    this.eventIds = [];
    this.eventsArrayById = [];
    for (let event of events) {
      this.eventIds.push(event.id);
      this.eventsArrayById[event.id] = event;
    }
  }

  buildEventArrayByIdForList(events) {
    let eventsArrayById = [];
    for (let event of events) {
      eventsArrayById[event.id] = event;
    }
    return eventsArrayById;
  }

  buildEventObjectForList(data) {
    let event = this.buildEventObjectForCalendar(data);
    event.category = data.category_Id;
    event.available = data.available;
    event.visibility = data.visibility_Id;
    event.user = data.user_Id;
    event.dateCreation = data.event_date_creation;
    event.lastModif = data.last_modif;
    event.visibilityToString = this.visibilities[event.visibility_Id - 1];
    event.categoryToString = this.categories[event.category_Id - 1];
    event.recurrenceToString = this.recurrences[event.recurrence - 1];
    event.comment = data.comment;
    event.user_name = data.user_name;
    event.user_first_name = data.user_first_name;
    event.userRole = data.role;
    return event;
  }

  // Récupère les évenemenst depuis le serveur
  getEventsByIds(ids, success, reject) {
    let req = this.getXhr(),
      eventsArray = [],
      events, event;
    req.open('GET', '/admin/calendar/eventsids/' + ids);
    req.setRequestHeader("my-method", "XMLHttpRequest");
    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          events = JSON.parse(req.responseText);
          if (events.length > 0) {
            for (event of events) {
              eventsArray.push(this.buildEventObjectForList(event));
            }
            success(this.buildEventArrayByIdForList(eventsArray));
            return;
          }
          success(null);
          return;
        } else {
          // this.debbugElt.hidden = false;
          // this.debbugElt.classList.remove('hide');
          // this.debbugElt.textContent = req.responseText;
          reject(req.responseText === 'Connexion expirée' ? 'La connexion est expirée veullez raffraichir la page pour vous reconnecter' : undefined);
        }
      }
    };
    req.send(null);
  }

  // Récupère les évenemenst depuis le serveur
  getEvents(url, success, reject) {
    let req = this.getXhr(),
      eventsArray = [],
      events, event;
    req.open('GET', '/admin/calendar/' + url);
    req.setRequestHeader("my-method", "XMLHttpRequest");
    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          events = JSON.parse(req.responseText);
          if (events.length > 0) {
            for (event of events) {
              eventsArray.push(this.buildEventObjectForCalendar(event));
            }
            success(eventsArray);
            this.buildEventArrayById(eventsArray);
            return;
          }
          success(null);
          return;
        } else {
          // this.debbugElt.hidden = false;
          // this.debbugElt.classList.remove('hide');
          // this.debbugElt.textContent = req.responseText;
          reject(req.responseText === 'Connexion expirée' ? 'La connexion est expirée veullez raffraichir la page pour vous reconnecter' : undefined);
        }
      }
    };
    req.send(null);
  }

  updateEvent(data, success, reject) {
    let req = this.getXhr();
    req.open('POST', '/admin/calendar/updateevent');
    req.setRequestHeader("my-method", "XMLHttpRequest");
    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          console.log(req.responseText);
          success(req.responseText);
        } else {
          console.log(req.responseText);
          // this.debbugElt.hidden = false;
          // this.debbugElt.classList.remove('hide');
          // this.debbugElt.textContent = req.responseText;
          reject(req.responseText === 'Connexion expirée' ? 'La connexion est expirée veullez raffraichir la page pour vous reconnecter' : undefined);
        }
      }
    };
    req.send(data);
  }

  addEvent(data, success, reject) {
    let req = this.getXhr();
    req.open('POST', '/admin/calendar/addevent');
    req.setRequestHeader("my-method", "XMLHttpRequest");
    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          console.log(JSON.parse(req.responseText));
          success(req.responseText);
        } else {
          console.log(req.responseText);
          reject(req.responseText === 'Connexion expirée' ? 'La connexion est expirée veullez raffraichir la page pour vous reconnecter' : undefined);
          // this.debbugElt.hidden = false;
          // this.debbugElt.classList.remove('hide');
          // this.debbugElt.textContent = req.responseText;
          // reject('L\'événement n\'a pas pu être enregistré');
        }
      }
    };
    req.send(data);
  }

  deleteEvent(id, success, reject) {
    let req = this.getXhr();
    req.open('GET', `/admin/calendar/${id}/delete`);
    req.setRequestHeader("my-method", "XMLHttpRequest");
    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 204) {
          success();
        } else {
          // this.debbugElt.hidden = false;
          // this.debbugElt.classList.remove('hide');
          // this.debbugElt.textContent = req.responseText;
          reject(req.responseText === 'Connexion expirée' ? 'La connexion est expirée veullez raffraichir la page pour vous reconnecter' : undefined);
        }
      }
    };
    req.send(null);
  }
}
