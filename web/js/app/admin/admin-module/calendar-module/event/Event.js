export default class Event {

  get id() {
    return this._id;
  }

  set id(id) {
    if (id) {
      this._id = id;
    }
  }

  get role() {
    return this._role;
  }

  set role(role) {
    this._role = role;
  }

  get user_name () {
    return this._user_name; 
  }

  set user_name (user_name) {
    this._user_name = user_name;
  }

  get user_first_name() {
    return this._user_first_name;
  }

  set user_first_name(user_first_name) {
    this._user_first_name = user_first_name;
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  get category_Id() {
    return this._category_Id;
  }

  set category_Id(category_Id) {
    this._category_Id = parseInt(category);
  }

  get category() {
    return this._category;
  }

  set category(category) {
    this._category = category;
  }

  get color() {
    return this._color;
  }

  set color(color) {
    this._color = color;
  }

  get available() {
    return this._available;
  }

  set available(available) {
    this._available = available;
  }

  get visibility_Id() {
    return this._visibility_Id;
  }

  set visibility_Id(visibility_Id) {
    this._visibility = parseInt(visibility);
  }

  get visibility() {
    return this._visibility;
  }

  set visibility(visibility) {
    this._visibility = visibility;
  }

  get user() {
    return this._user;
  }

  set user(user) {
    this._user = user ? user : false;
  }

  get startEndDiff() {
    return this._startEndDiff;
  }

  set startEndDiff(startEndDiff) {
    this._startEndDiff = parseInt(startEndDiff);
  }

  get recurrence() {
    return this._recurrence;
  }

  set recurrence(recurrence) {
    this._recurrence = parseInt(recurrence);
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
    };
    this.start.hour = date.getHours();
    this.start.minutes = date.getMinutes();
    // this.start.hour = this.isAllday() ? 8 : date.getHours();
    // this.start.minutes = this.isAllday() ? 0 : date.getMinutes();
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
      time: date.getTime()
    };
    this.end.hour = date.getHours();
    this.end.minutes = date.getMinutes();
  }

  get dateCreation() {
    return this._dateCreation;
  }

  set dateCreation(dateCreation) {
    let d = dateCreation.substr(0, 10).split('-'),
      h = dateCreation.substr(11).split(':'),
      date = new Date(parseInt(d[0]), parseInt(d[1]) -1, parseInt(d[2]), parseInt(h[0]), parseInt(h[1]), parseInt(h[2]));
    this._dateCreation = {
      date: date,
      // date_standard: dateCreation.substr(0,10),
      year: dateCreation.substr(0, 4),
      month: dateCreation.substr(5, 2),
      day: dateCreation.substr(8, 2),
      weekday: date.getDay(),
      hour: date.getHours(),
      minutes: date.getMinutes(),
      time: date.getTime()
    };
  }

  get lastModif() {
    return this._lastModif;
  }

  set lastModif(lastModif) {
    if (lastModif) {
      let d = lastModif.substr(0, 10).split('-'),
        h = lastModif.substr(11).split(':'),
        date = new Date(parseInt(d[0]), parseInt(d[1]) -1, parseInt(d[2]), parseInt(h[0]), parseInt(h[1]), parseInt(h[2]));
      this._lastModif = {
        date: date,
        // date_standard: lastModif.substr(0,10),
        year: lastModif.substr(0, 4),
        month: lastModif.substr(5, 2),
        day: lastModif.substr(8, 2),
        weekday: date.getDay()
          // time: date.getTime()
      };
    }
  }

  get comment() {
    return this._comment;
  }

  set comment(comment) {
    this._comment = comment;
  }

  get allday() {
    return parseInt(this._allday);
  }

  set allday(allday) {
    this._allday = allday;
  }

  get endRecType() {
    return this._endRecType;
  }

  set endRecType(endRecType) {
    this._endRecType = this._recurrence > 1 ? endRecType : false;
  }

  get dateEndRec() {
    return this._dateEndRec;
  }

  set dateEndRec(dateEndRec) {
    let date;
    if (this.recurrence > 1) {
      if (this._endRecType > 1) {
        date = new Date(dateEndRec);
      } else {
        date = new Date('2060-12-12'); 
      }
      this._dateEndRec = {
        date: date,
        date_standard: dateEndRec.substr(0, 10),
        year: dateEndRec.substr(0, 4),
        month: dateEndRec.substr(5, 2),
        day: dateEndRec.substr(8, 2),
        weekday: date.getDay(),
        time: date.getTime()
      };
    } else {
      this._dateEndRec = false;
    }
  }

  get interval() {
    return parseInt(this._interval);
  }

  set interval(interval) {
    this._interval = [2, 3, 6, 7].includes(this.recurrence) ? interval : 1;
  }

  get daysRec() {
    return this._daysRec;
  }

  set daysRec(daysRec) {
    if (daysRec && this.recurrence === 3) {
      this._daysRec = daysRec.split(',');
    }
  }

  isRecurrent() {
    return this.recurrence > 1;
  }

  isAllday() {
    return this.allday === 2;
  }

  formatNuber(nb) {
    return nb < 10 ? '0'+nb : nb;
  }

  getRangeTime() {
    if (this.isAllday()) {
      return 'toute la journée';
    }
    if (this.start.hour === this.end.hour && this.start.minutes === this.end.minutes) {
      return `à ${this.start.hour}:${this.formatNuber(this.start.minutes)}`;
    }
    return `de ${this._start.date.getHours()}:${this.formatNuber(this._start.date.getMinutes())} à ${this._end.date.getHours()}:${this.formatNuber(this._end.date.getMinutes())}`;
  }

  isOneDay() {
    return this.startEndDiff === 0;
  }

  getHourStart() {
    return this.isAllday() ? 7 : this.start.hour;
  }

  getHourEnd() {
    return this.isAllday() ? 19 : this.end.hour;
  }
}
