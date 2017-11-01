export default class Route {

  constructor (page) {
    this.name = page.name;
    this.title = page.title;
    this.stateObj = {};
    this.titleElt = document.querySelector('h1');
    this.element = document.querySelector('#'+page.name);
    if (document.querySelector('.'+page.name+'_button')) {
      this.buttons = document.querySelectorAll('.'+page.name+'_button');
    }
    this.activeButton = document.querySelector('#'+page.name+'_button');
  }

  render() {
    this.activeButton.classList.add('active');
    this.titleElt.textContent = this.title;
    this.stateObj.pageName = this.name;
    window.history.pushState(this.stateObj, 'nextPage', this.name);
  }

}
