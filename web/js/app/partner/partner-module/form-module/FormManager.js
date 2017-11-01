export default class FormManager {

  constructor(app) {
    this.app = app;
  }

  onSubmitForm(e) {
    e.preventDefault();
    this.app.fm.hideForm(e);
    let data = new FormData(e.currentTarget);
    data.append('rdv_date', this.app.dateManager.getStandardDate(this.app.fm.selectedDate));
    data.append('rdv_hour', this.app.fm.selectedDate.getHours());
    this.app.cm.em.addRdv(data, (e) => {
      this.app.cm.calendar.backToTodayDate();
    });
  }
  
}
