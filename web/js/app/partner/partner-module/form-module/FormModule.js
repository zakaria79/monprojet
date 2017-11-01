import FormManager from './FormManager';
import {
  months,
  days
} from './../../../../date/dates';
import {
  dateAndHourToStringFromDateObject
} from './../../../../date/dateAndHourToStringFromDateObject';

export default class FormModule {

  constructor(app) {
    this.dm = app.dm;
    this.app = app;
    this.formManager = new FormManager(app);
    this.dm.setElement(['#rdv_form', '#calendar', '#date_rdv']);
    this.Es = this.dm.getElements();
  }

  display(e) {
    if (e.currentTarget.available === true) {
      this.selectedDate = new Date(e.currentTarget.dataset.date);
      this.selectedDate.setHours(e.currentTarget.dataset.hour);
      this.selectedDate.setMinutes(0);
      let dateText = `Le ${dateAndHourToStringFromDateObject(this.selectedDate)}`;
      this.Es.date_rdvElt.textContent = dateText;
      this.dm.fadeIn(this.Es.rdv_formElt);
      this.dm.fadeOut(this.Es.calendarElt);
    }
  }

  hideForm() {
    this.dm.fadeIn(this.Es.calendarElt);
    this.dm.fadeOut(this.Es.rdv_formElt);
  }

  hideFormOnAnnul(e) {
    e.preventDefault();
    this.app.cm.calendar.backToTodayDate();
    this.hideForm();
  }

}
