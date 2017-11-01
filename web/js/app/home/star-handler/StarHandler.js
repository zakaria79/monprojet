export default class StarHandler {
  constructor() {
    this.faStar = document.querySelectorAll('.fa-star');
    this.stars = document.querySelectorAll('.stars');

    for (let faStar of this.faStar) {
      faStar.addEventListener('mouseover', this.starHover.bind(this));
      faStar.addEventListener('click', this.starSelected.bind(this));
      faStar.addEventListener('mouseleave', this.starLeave.bind(this));
    }
  }

  addPrevAll(element, classToAdd) {
    element.classList.add(classToAdd);
    let prevSibling = element.previousElementSibling;
    while (null != prevSibling) {
      prevSibling.classList.add(classToAdd);
      prevSibling = prevSibling.previousElementSibling;
    }
  }

  removeNexAll(element, classToRemove) {
    let nextSibling = element.nextElementSibling;
    while (null != nextSibling) {
      nextSibling.classList.remove(classToRemove);
      nextSibling = nextSibling.nextElementSibling;
    }
  }

  starHover(e) {
    this.addPrevAll(e.target, 'star-hover');
  }

  starSelected(e) {
    this.addPrevAll(e.target, 'star-selected');
    this.removeNexAll(e.target, 'star-selected');
  }

  starLeave() {
    for (let faStar of this.faStar) {
      faStar.classList.remove('star-hover');
    }
  }
}
