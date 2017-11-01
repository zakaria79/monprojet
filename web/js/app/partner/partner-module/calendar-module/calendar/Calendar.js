import AvailableRangeManager from './available-range-handler/available-range-manager/AvailableRangeManager';

export default class Calendar {

  constructor(app) {
    this.app = app;
    this.dateManager = app.dateManager;
    this.arm = new AvailableRangeManager(app);
    this.app.dm.setElement(['#date_to_string', '#current_date']);
    this.app.dm.setElements(['#calendar th', '#calendar td']);
    this.Es = this.app.dm.getElements();
    this.thElts = this.Es.calendarthElts;
    this.tdElts = this.Es.calendartdElts;
    this.dates = [];
    this.currentDate = new Date();
    this.dateToday = this.dateManager.setDate(new Date());
    this.Es.current_dateElt.innerHTML = `<em>${this.dateToday.dateText}</em>`;
    let startEventCalendar = new Date();
    this.startEventCalendar = new Date(
      startEventCalendar.getFullYear(),
      startEventCalendar.getMonth(),
      startEventCalendar.getDate(),
      0, 0, 0, 0
    );
    this.endEventCalendar = this.dateManager.add(this.startEventCalendar, 20);
    this.endEventCalendar.setHours(23);
    this.endEventCalendar.setMinutes(59);
    this.endEventCalendar.setSeconds(59);
    this.endEventCalendar.setMilliseconds(59);
  }

  goToNext() {
    this.dates[6].date.setDate(this.dates[6].day + 1);
    this.currentDate = this.dates[6].date;
    this.setDates();
    this.setCurrentDateText();
    this.fillCalendar();
  }

  goToPrevious() {
    this.dates[0].date.setDate(this.dates[0].day - 7);
    this.currentDate = this.dates[0].date;
    this.setDates();
    this.setCurrentDateText();
    this.fillCalendar();
  }

  backToTodayDate() {
    this.currentDate = new Date();
    this.setDates();
    this.setCurrentDateText();
    this.fillCalendar();
  }

  setCurrentDateText() {
    let dateText = 'Du  ' + this.dates[0].day + '/' + this.dates[0].month + '/' + this.dates[0].year + ' au  ' + this.dates[6].day + '/' + this.dates[6].month + '/' + this.dates[6].year;
    this.Es.date_to_stringElt.textContent = dateText;
  }

  setDates() {
    let i;
    this.today = false;
    this.currentDate = this.dateManager.setDateFirstDayInWeek(this.currentDate);
    for (i = 0; i <= 6; i++) {
      this.dates[i] = this.dateManager.setDate(this.dateManager.add(this.currentDate, i));
      if (this.dates[i].dateStandard === this.dateToday.dateStandard) {
        this.today = true;
        this.todayDatesIndex = i + 1;
      }
    }
  }

  fillCalendar() {
    let i, j, tdElts, tdElt;
    for (i = 1; i <= this.dates.length; i++) {
      tdElts = document.querySelectorAll('#calendar [data-column="' + i + '"]');
      this.thElts[i].innerHTML = `${this.dates[i - 1].weekDayToString.substr(0, 1)}.${this.dates[i - 1].day}`;
      for (j = 0; j < tdElts.length; j++) {
        tdElts[j].dataset.date = this.dates[i - 1].dateStandard;
        tdElts[j].dataset.weekday = this.dates[i - 1].weekDay;
      }
    }
    this.start = this.tdElts[1].dataset.date;
    this.end = this.tdElts[7 - this.app.cm.weekendNb].dataset.date;
    for (tdElt of this.Es.calendartdElts) {
      tdElt.dataset.rdvs = '0';
    }
    this.initializeCalendar();
    this.setStartAndEndDates();
    this.getEventsCalendar();
  }

  initializeCalendar() {
    let todayElt, todayElts, countEvent, countEvents, evElt;
    this.app.dm.removeClassIfExist('today');
    this.app.dm.removeClassIfExist('available');
    for (let td of document.querySelectorAll('#calendar td')) {
      td.available = false;
    }
    if (this.today) {
      todayElts = document.querySelectorAll('#calendar [data-column="' + this.todayDatesIndex + '"]');
      this.thElts[this.todayDatesIndex].innerHTML += '<span id="today">+</span>';
      for (todayElt of todayElts) {
        todayElt.classList.add('today');
      }
    }
  }

  setTodayClass() {
    if (document.querySelector('#calendar [data-date="' + this.dateToday.dateStandard + '"]')) {
      document.querySelector('#calendar [data-date="' + this.dateToday.dateStandard + '"]').classList.add('today');
    }
  }

  setStartAndEndDates() {
    let i, tdElts, tdElt;
    this.dateStart = new Date(this.start + ' '+this.app.cm.hourStart+':00:00');
    this.dateEnd = new Date(this.end + ' '+this.app.cm.hourEnd+':59:59');
    this.timeStart = this.dateStart.getTime();
    this.timeEnd = this.dateEnd.getTime();
    for (i = 0; i < this.dates.length -this.app.cm.weekendNb; i++) {
      if (this.dates[i].date.getTime() >= this.startEventCalendar.getTime() && this.dates[i].date.getTime() <= this.endEventCalendar.getTime()) {
        tdElts = document.querySelectorAll('#calendar [data-column="' + (i + 1) + '"]');
        for (tdElt of tdElts) {
          tdElt.classList.add('available');
          tdElt.available = true;
        }
      }
    }
  }

  getEventsCalendar() {
    this.app.cm.em.getEventsForCalendar(
      this.start, this.end,
      this.arm.eventsHandler.bind(this.arm),
      this.app.dm.setErrorMessage.bind(this.app.dm)
    );
  }

}
