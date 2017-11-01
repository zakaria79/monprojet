export default class Calendar {

  constructor(app, calendarName, titleName, elementsArray, elementArray) {
    this.app = app;
    this.dm = app.dm;
    this.dem = app.dem;
    this.calendarName = calendarName;
    this.name = calendarName + 'Calendar';
    this.titleName = titleName;
    this.dem.setElements(elementsArray);
    this.dem.setElement(elementArray);
    this.Es = this.dem.getElements();
    this.calendarElt = this.Es[calendarName + 'Elt'];
    this.buttonElt = this.Es[calendarName + '_calendar_buttonElt'];
  }

  setTodayClass() {
    if (document.querySelector('#month [data-date="' + this.app.dateToday.dateStandard + '"]')) {
      document.querySelector('#month [data-date="' + this.app.dateToday.dateStandard + '"]').classList.add('today');
    }
  }

  setStartAndEndDates() {
    this.dateStart = new Date(this.start + ' 00:00:00');
    this.dateEnd = new Date(this.end + ' 23:59:59');
    this.timeStart = this.dateStart.getTime();
    this.timeEnd = this.dateEnd.getTime();
  }

  getEventsCalendar() {
    this.app.em.getEvents(
      'events/' + this.start + '/' + this.end,
      this.setEventsOnCalendar.bind(this),
      this.dem.setErrorMessage.bind(this.dem)
    );
  }

  removeEventElement(event) {
    // console.log(event);
  }

  eventElementHandler(event, callback) {
    this.eventHandlers[event.recurrence -1][callback](event);
  }

  setEventsOnCalendar(events) {
    if (events && events.length > 0) {
      for (let event of events) {
        this.eventElementHandler(event, 'setEvent');
      }
    }
  }

  initializeCalendar() {
    this.dem.emptyElements(this.eventElts);
    this.dem.removeClassIfExist('today');
  }

  fillCalendar() {
    this.initializeCalendar();
  }
}
