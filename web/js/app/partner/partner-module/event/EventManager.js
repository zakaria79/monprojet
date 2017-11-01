import Xhr from './../../../../xhr/Xhr';
import Event from './Event';

export default class EventManager extends Xhr {

  constructor(app) {
    super();
    this.app = app;
    this.req = this.getXhr();
    this.dm = app.dm;
    this.Es = this.dm.getElements();
  }

  buildEventObjectForList(data) {
    let event = new Event();
    event.id = data.rdv_Id;
    event.start = data.start;
    event.clientName = data.client_name;
    event.clientFirstName = data.client_first_name;
    event.object = data.rdv_object;
    event.removed = data.rdv_removed;
    event.clientTel = data.client_tel;
    event.status = data.rdv_status;
    event.clientEmail = data.client_email;
    return event;
  }

  buildEventObjectForCalendar(data) {
    let event = new Event();
    event.id = data.event_Id;
    event.endRecType = data.end_rec_type;
    event.allday = data.allday;
    event.dateEndRec = data.date_end_rec;
    event.daysRec = data.days_rec;
    event.end = data.end;
    event.interval = data.event_interval;
    event.recurrence = data.recurrence;
    event.start = data.start;
    event.startEndDiff = data.start_end_diff;
    return event;
  }

  buildRdvsObjectForCalendar(data) {
    let rdv = new Event();
    rdv.start = data.start;
    rdv.id = data.event_Id;
    return rdv;
  }

  getEventsForCalendar(start, end, success, reject) {
    let eventsArray = [],
      rdvsArray = [],
      events, event;
    this.req.open('GET', `calendarevents/${start}/${end}`);
    this.req.setRequestHeader("my-method", "XMLHttpRequest");
    this.req.onreadystatechange = () => {
      if (this.req.readyState === XMLHttpRequest.DONE) {
        if (this.req.status === 200) {
          events = JSON.parse(this.req.responseText);
          if (events[0].length > 0) {
            for (event of events[0]) {
              eventsArray.push(this.buildEventObjectForCalendar(event));
            }
            success(eventsArray, false);
          }
          if (events[1].length > 0) {
            for (let rdv of events[1]) {
              rdvsArray.push(this.buildRdvsObjectForCalendar(rdv));
            }
            success(rdvsArray, true);
          }
          success(null);
          return;
        } else {
          reject(this.req.responseText === 'Connexion expirée' ? 'La connexion est expirée veullez raffraichir la page pour vous reconnecter' : undefined);
        }
      }
    };
    this.req.send(null);
  }

  // Récupère les évenements depuis le serveur
  getEvents(page, success, reject) {
    let eventsArray = [],
      apayer = [],
      events, event, pageNb;
    this.req.open('GET', 'events/'+page);
    this.req.setRequestHeader("my-method", "XMLHttpRequest");
    this.req.onreadystatechange = () => {
      if (this.req.readyState === XMLHttpRequest.DONE) {
        if (this.req.status === 200) {
          events = JSON.parse(this.req.responseText);
          if (events.length > 0) {
            if (events[0].length > 0) {
              for (event of events[0]) {
                eventsArray.push(this.buildEventObjectForList(event));
              }
            }
          }
          success(
            eventsArray.length > 0 ? eventsArray : null,
            events[1].length > 0 ? events[1] : null,
            +events[2].total > 10 ? +events[2].total : null
          );
        } else {
          reject(this.req.responseText === 'Connexion expirée' ? 'La connexion est expirée veullez raffraichir la page pour vous reconnecter' : undefined);
        }
      }
    };
    this.req.send(null);
  }

  addRdv(data, success, reject) {
    let res;
    this.req.open('POST', 'rdv');
    this.req.setRequestHeader("my-method", "XMLHttpRequest");
    this.req.onreadystatechange = () => {
      if (this.req.readyState === XMLHttpRequest.DONE) {
        if (this.req.status === 200) {
          res = JSON.parse(this.req.responseText);
          success();
        } else {
          reject(this.req.responseText === 'Connexion expirée' ? 'La connexion est expirée veullez raffraichir la page pour vous reconnecter' : undefined);
        }
      }
    };
    this.req.send(data);
  }
}
