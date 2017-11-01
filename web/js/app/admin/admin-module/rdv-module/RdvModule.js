import AdminModule from './../AdminModule';
import RdvManager from './rdv/RdvManager';
import Action from './action/Action';
import DisplayRdv from './display-rdv/DisplayRdv';

export default class RdvModule extends AdminModule {

  constructor(pm) {
    super(pm);    
    this.rdvManager = new RdvManager(this);
    this.action = new Action(this);
    this.dRdv = new DisplayRdv(this);
  }

  run() {
    this.action.run();
  }
}
