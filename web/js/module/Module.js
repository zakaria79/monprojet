import Xhr from './../xhr/Xhr';
import DOMManager from './../dom-manager/DOMManager';

export default class Module {

  constructor() {
    this.xhr = new Xhr();
    this.dm = new DOMManager();
  }

}
