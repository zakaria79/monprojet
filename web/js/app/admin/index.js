import Tether from 'tether';
import bootstrap from 'bootstrap';
import CalendarModule from './admin-module/calendar-module/CalendarModule';
import UserModule from './admin-module/user-module/UserModule';
import RdvModule from './admin-module/rdv-module/RdvModule';
import DevisModule from './admin-module/devis-module/DevisModule';
import PageManager from './admin-module/page-manager/PageManager';

document.addEventListener('DOMContentLoaded', () => {
  let pm = new PageManager(),
    calendarModule = new CalendarModule(pm),
    userModule = new UserModule(pm),
    rdvModule = new  RdvModule(pm),
    devisModule = new DevisModule(pm);
  calendarModule.run();
  userModule.run();
  rdvModule.run();
  devisModule.run();
});
