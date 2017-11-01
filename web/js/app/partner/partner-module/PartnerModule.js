import DateManager from './../../../date/DateManager';
import Module from './../../../module/Module';
import ReportingModule from './reporting-module/ReportingModule';
import CalendarModule from './calendar-module/CalendarModule';
import FormModule from './form-module/FormModule';
import RouteManager from './../../../route/RouteManager';
import routes from './route/routes';

export default class PartnerModule extends Module {

  constructor() {
    super();
    this.dateManager = new DateManager();
    this.rp = new ReportingModule(this);
    this.cm = new CalendarModule(this);
    this.fm = new FormModule(this);
    this.displayForm = this.fm.display.bind(this.fm);
    let reportingDisplay = this.rp.display.bind(this.rp),
      calendarDisplay = this.cm.display.bind(this.cm);
    this.rm = new RouteManager(
      routes, [
        'reporting',
        'calendar',
      ],
      'reporting', {
        'reporting': reportingDisplay,
        'calendar': calendarDisplay,
      }
    );
    this.rm.run();
  }

}
