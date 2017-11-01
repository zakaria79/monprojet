export default class Rdv {
  
  get id () {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get object() {
    return this._object;
  }

  set object(object) {
    this._object = object;
  }

  get clientName() {
    return this._clientName;
  }

  set clientName(clientName) {
    this._clientName = clientName;
  }

  get clientEmail() {
    return this._clientEmail;
  }

  set clientEmail(clientEmail) {
    this._clientEmail = clientEmail;
  }

  get clientTel() {
    return this._clientTel;
  }

  set clientTel(clientTel) {
    this._clientTel = clientTel;
  }

  get clientFirstName() {
    return this._clientFirstName;
  }

  get status() {
    return this._status;
  }

  set status(status) {
    this._status = status;
  }

  get statusId() {
    return this._statusId;
  }

  set statusId(statusId) {
    this._statusId = statusId;
  }

  set clientFirstName(clientFirstName) {
    this._clientFirstName = clientFirstName;
  }

  get start() {
    return this._start;
  }

  set start(start) {
    let d = start.substr(0, 10).split('-'),
      h = start.substr(11).split(':'),
      date = new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), parseInt(h[0]), parseInt(h[1]), parseInt(h[2]));
    this._start = {
      date: date,
      date_standard: start.substr(0, 10),
      year: start.substr(0, 4),
      month: start.substr(5, 2),
      day: start.substr(8, 2),
      weekday: date.getDay(),
      time: date.getTime(),
      hour: date.getHours(),
      minutes: date.getMinutes()
    };
  }

  get dateCreation() {
    return this._dateCreation;
  }

  set dateCreation(dateCreation) {
    this._dateCreation = dateCreation;
  }

  get user() {
    return this._user;
  }

  set user(user) {
    this._user = user;
  }

  get userRole() {
    return this._userRole;
  }

  set userRole(userRole) {
    this._userRole = userRole;
  }
}
