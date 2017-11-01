import DOMManager from './../../../../dom-manager/DOMManager';

export default class PageManager {

  constructor() {
    this.dom = new DOMManager();
    this.dom.setElement(['#calendar', '#users']);
    this.Es = this.dom.getElements();
    this.page = this.Es.calendarElt;
  }

  changePage(page) {
    if (page.hidden) {
      this.page.hidden = true;
      this.page = page;
      this.page.hidden = false;
    }
  }
}
