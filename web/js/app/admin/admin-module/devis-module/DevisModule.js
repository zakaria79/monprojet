import AdminModule from './../AdminModule';
import DevisManager from './devis/DevisManager';
import Action from './action/Action';
import DisplayDevis from './display-devis/DisplayDevis';

export default class DevisModule extends AdminModule {

  constructor(pm) {
    super(pm);    
    this.devisManager = new DevisManager(this);
    this.action = new Action(this);
    this.dDevis = new DisplayDevis(this);
  }

  run() {
    this.action.run();
  }
}
