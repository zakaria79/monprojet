import NoRecurrentHandler from './../no-recurrent-handler/NoRecurrentHandler';
import EveryDayHandler from './../every-day-handler/EveryDayHandler';
import EveryWeekHandler from './../every-week-handler/EveryWeekHandler';
import EveryDaysOfWeekHandler from './../every-days-of-week-handler/EveryDaysOfWeekHandler';
import WorkingDaysHandler from './../working-days-handler/WorkingDaysHandler';
import EveryMonthHandler from './../every-month-handler/EveryMonthHandler';
import EveryYearHandler from './../every-year-handler/EveryYearHandler';

export default class AvailableRangeHandler {
  constructor(app) {
    this.app = app;
    this.availableRangeHandlers = [
      new NoRecurrentHandler(app),
      new EveryDayHandler(app),
      new EveryWeekHandler(app),
      new EveryDaysOfWeekHandler(app),
      new WorkingDaysHandler(app),
      new EveryMonthHandler(app),
      new EveryYearHandler(app)
    ];
  }

  rdvHandler(rdv) {
    let tdElts = document.querySelectorAll('#calendar [data-date="'+rdv.start.date_standard+'"]'),
      tdElt = tdElts[rdv.start.hour -8];
    if (+tdElt.dataset.rdvs > 0) {
      tdElt.classList.remove('available');
      tdElt.available = false;
      return;
    }
    tdElt.dataset.rdvs = +tdElt.dataset.rdvs +1;
  }

  eventsHandler(events, rdvs) {
    if (rdvs) {
      for (let rdv of events) {
        this.rdvHandler(rdv);
      }
      return;
    }
    if (events && events.length > 0) {
      if (document.querySelector('#calendar .available')) {
        for (let event of events) {
          this.availableRangeHandler(event);
        }
      }
    }
  }

  availableRangeHandler(event) {
    if (document.querySelector('#calendar .available')) {
      this.availableRangeHandlers[event.recurrence - 1].setAvailableRange(event);
    }
  }
}
