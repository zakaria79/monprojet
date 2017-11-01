export default class Event {

  get id() {
    return this._id;
  }

  set id(id) {
    if (id) {
      this._id = id;
    }
  }

  get interval() {
    return this._interval;
  }

  set interval(interval) {
    this._interval = parseInt(interval);
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

  get removed() {
    return this.removed;
  }

  set removed(removed) {
    this._removed = removed;
  }

  get status() {
    return this._status;
  }

  set status(status) {
    this._status = status;
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


  get end() {
    return this._end;
  }

  set end(end) {
    let d = end.substr(0, 10).split('-'),
      h = end.substr(11).split(':'),
      date = new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), parseInt(h[0]), parseInt(h[1]), parseInt(h[2]));
    this._end = {
      date: date,
      date_standard: end.substr(0, 10),
      year: end.substr(0, 4),
      month: end.substr(5, 2),
      day: end.substr(8, 2),
      weekday: date.getDay(),
      time: date.getTime(),
      hour: date.getHours(),
      minutes: date.getMinutes()
    };
  }

  getHourStart() {
    return this.isAllday() ? 8 : this.start.hour;
  }

  getHourEnd() {
    return this.isAllday() ? 19 : this.end.hour;
  }

  get allday() {
    return this._allday;
  }

  isAllday() {
    return this.allday === 2;
  }

  set allday(allday) {
    this._allday = parseInt(allday);
  }

  get dateEndRec() {
    return this._dateEndRec;
  }

  set dateEndRec(dateEndRec) {
    if (dateEndRec) {
      let d = dateEndRec.substr(0, 10).split('-'),
        h = dateEndRec.substr(11).split(':'),
        date = new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), parseInt(h[0]), parseInt(h[1]), parseInt(h[2]));
      this._dateEndRec = {
        date: date,
        date_standard: dateEndRec.substr(0, 10),
        year: dateEndRec.substr(0, 4),
        month: dateEndRec.substr(5, 2),
        day: dateEndRec.substr(8, 2),
        weekday: date.getDay(),
        time: date.getTime(),
        hour: date.getHours(),
        minutes: date.getMinutes()
      };
    }
  }

  get daysRec() {
    return this._daysRec;
  }

  set daysRec(daysRec) {
    if (daysRec) {
      this._daysRec = daysRec.split(',');
    }
  }

  get endRecType() {
    return this._endRecType;
  }

  set endRecType(endRecType) {
    this._endRecType = endRecType;
  }

  get recurrence() {
    return this._recurrence;
  }

  set recurrence(recurrence) {
    this._recurrence = parseInt(recurrence);
  }

  get startEndDiff() {
    return this._startEndDiff;
  }

  set startEndDiff(startEndDiff) {
    this._startEndDiff = parseInt(startEndDiff);
  }

}
