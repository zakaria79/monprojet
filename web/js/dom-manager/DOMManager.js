export default class DOMManager {

  constructor() {
    this.name = 'DOMManager';
    this.elts = {};
    this.errorMessageElt = document.querySelector('#error_message');
    this.successMessageElt = document.querySelector('#success_message');
    this.cover = document.querySelector('#cover');
    this.confirmButton = document.querySelector('#confirm');
    this.annulButton = document.querySelector('#annul');
    this.alertElt = document.querySelector('#alertConfirm');
    this.alertMessageElt = document.querySelector('#alertMessage');
  }

  fadeOut(elt) {
    window.setTimeout(() => {
      elt.hidden = true;
    }, 300);
    elt.classList.add('hide');
  }

  fadeIn(elt) {
    window.setTimeout(() => {
      elt.hidden = false;
    }, 300);
    elt.classList.remove('hide');

  }

  getElements() {
    return this.elts;
  }

  setElements(elts) {
    if (elts) {
      this.getElementss(selector => document.querySelectorAll(selector), elts, 'Elts');
    }
  }

  setErrorMessage(message) {
    this.setMessage(this.errorMessageElt, message);
  }

  hide(elt) {
    elt.classList.add('hide');
  }

  show(elt) {
    elt.classList.remove('hide');
  }

  setMessage(elt, message) {
    elt.textContent = message;
    this.fadeIn(elt);
    window.setTimeout(() => this.fadeOut(elt), 5000);
  }

  setSuccessMessage(message) {
    this.setMessage(this.successMessageElt, message);
  }

  setElement(elts) {
    if (elts) {
      this.getElementss(selector => document.querySelector(selector), elts, 'Elt');
    }
  }

  getElementss(callback, elts, suffix) {
    let elt, e;
    for (elt of elts) {
      e = elt.replace(/[#.\s-]/g, '') + suffix;
      if (typeof this.elts[elt] === 'undefined') {
        this.elts[e] = callback(elt);
      }
    }
  }

  removeElementIfExist(parentElement, selector) {
    if (parentElement.querySelector(selector)) {
      let elt;
      for (elt of parentElement.querySelectorAll(selector)) {
        elt.parentElement.removeChild(elt);
      }
    }
  }

  emptyElements(elts) {
    let elt;
    for (elt of elts) {
      elt.innerHTML = '';
    }
  }

  createElt(parent, type, content) {
    let elt = document.createElement(type);
    elt.innerHTML = content;
    parent.appendChild(elt);
  }

  strong(content) {
    return `<strong>${content}</strong>`;
  }

  displayAlertConfirmMessage(message, confirm) {
    this.fadeIn(this.cover);
    this.fadeIn(this.alertElt);
    this.alertMessageElt.innerHTML = message;
    this.confirmButton.addEventListener('click', (e) => {
      confirm();
      this.fadeOut(this.cover);
      this.fadeOut(this.alertElt);
    });
    this.annulButton.addEventListener('click', (e) => {
      this.fadeOut(this.cover);
      this.fadeOut(this.alertElt);
    });
  }

  removeClassIfExist(classToRemove) {
    let elts, elt;
    if (document.querySelector('.' + classToRemove)) {
      elts = document.querySelectorAll('.' + classToRemove);
      for (elt of elts) {
        elt.classList.remove(classToRemove);
      }
    }
  }
}
