import DaysOfWeekHandler from './../days-of-week-handler/DaysOfWeekHandler';

export default class WorkingDaysHandler extends DaysOfWeekHandler {

  constructor(app) {
    super(app);
  }
  
  setAvailableRange(event) {
    super.setAvailableRange(event, 2);
  }
}
