import DaysOfWeekHandler from './../days-of-week-handler/DaysOfWeekHandler';

export default class EveryDaysOfWeekHandler extends DaysOfWeekHandler {

  constructor(app) {
    super(app);
  }
  
  setAvailableRange(event) {
    super.setAvailableRange(event, this.app.cm.weekendNb);
  }
}
