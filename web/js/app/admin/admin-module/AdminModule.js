import Xhr from './../../../xhr/Xhr';
import DOMManager from './../../../dom-manager/DOMManager';
import AdminAction from './admin-action/AdminAction';

export default class AdminModule {

  constructor(pm) {
    this.pm = pm;
    this.xhr = new Xhr();
    this.dem = new DOMManager();
    this.dem.setElement(['#devis', '#calendar', '#users','#planning','#rdv']);
    this.dem.setElements(['.page_button']);
    this.Es = this.dem.getElements();
    let Es = this.Es;
    this.pages = {
      Calendar: Es.calendarElt,
      Utilisateurs: Es.usersElt,
      Planning: Es.planningElt,
      RDV: Es.rdvElt,
      DEVIS: Es.devisElt
    };
    this.page = this.Es.calendarElt;
    this.page.hidden = false;
  }

}
