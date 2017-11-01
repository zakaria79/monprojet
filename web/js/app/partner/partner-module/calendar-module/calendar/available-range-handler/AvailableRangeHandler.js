export default class AvailableRangeHandler {

  constructor(app) {
    this.app = app;
  }

  removeAvailableClassFromColumn(hourStart, hourEnd, column) {
    let tdElts = document.querySelectorAll('#calendar [data-column="' + column + '"]'),
      i;
    hourStart = hourStart >= 8 ? hourStart : 8;
    hourEnd = hourEnd <= 19 ? hourEnd : 19;
    if (hourStart <= 19 && hourEnd >= 8) {
      for (i = hourStart; i <= hourEnd -1; i++) {
        tdElts[i - 8].classList.remove('available');
        tdElts[i-8].available = false;
      }
    }
  }

}
