import elementList from './element-list';
import elementsList from './elements-list';

export default class Form {

  constructor(app) {
    this.app = app;
    this.dem = app.dem;
    this.dates = {};
    this.weekDaysRecurrenceArray = [];
    this.selectedColor = 'blue';
    this.recurrence = [false, 'tous les jours', 'toutes les semaines', 'tous les jours de la semaine', 'les jours ouvrables', 'tous les mois', 'tous les ans', ];
    this.dem.setElement(elementList);
    this.dem.setElements(elementsList);
    this.Es = this.dem.getElements();
    this.elt = this.Es.event_formElt;
    this.currentSelectedColor = this.Es.selectedColorElt.classList[0];
    this.Es.categoryElt.value = '2';
  }

  onChangeCategory(e) {
    let elt;
    if (e.currentTarget.value === '1') {
      this.Es.client_infosElt.hidden = false;
      this.Es.alldayElt.disabled = true;
      this.Es.availableElt.disabled = true;
      this.Es.visibilityElt.disabled = true;
      this.Es.recurrenceElt.disabled = true;
      for (elt of this.Es.endselectElts) {
        elt.disabled = true;
      }
      return;
    }
    this.Es.alldayElt.disabled = false;
    this.Es.availableElt.disabled = false;
    this.Es.visibilityElt.disabled = false;
    this.Es.recurrenceElt.disabled = false;
    for (elt of this.Es.endselectElts) {
      elt.disabled = false;
    }
    this.Es.client_infosElt.hidden = true;
  }

  makeDates(date, hour) {
    return new Date(date.year, date.month - 1, date.day, hour.getHours(), hour.getMinutes());
  }

  refreshDateFieldValues() {
    this.fillDateField(this.Es.startselectElts, this.dates.start, true);
    this.fillDateField(this.Es.endselectElts, this.dates.end, true);
    if (this.dates.endRec) {
      this.fillDateField(this.Es.endRecselectElts, this.dates.endRec, false);
    }
  }

  makeDatesFromFieldValues(dateName) {
    this.dates[dateName] = new Date(this.Es[dateName + 'selectElts'][2].value, this.Es[dateName + 'selectElts'][1].value - 1, this.Es[dateName + 'selectElts'][0].value);
    if (dateName !== 'endRec') {
      this.dates[dateName].setHours(this.Es[dateName + 'selectElts'][3].value);
      this.dates[dateName].setMinutes(this.Es[dateName + 'selectElts'][4].value);
    }
  }

  onChangeDate(e) {
    let dateName = e.currentTarget.parentElement.dataset.date;
    this.validateMonth(this.Es[dateName + 'selectElts']);
    this.makeDatesFromFieldValues(dateName);
    this.checkFormDatesValues();
    this.refreshResume();
  }

  validateMonth(elts) {
    let year = elts[2],
      month = elts[1],
      day = elts[0],
      date = new Date(year.value, 1, 29);
    if (this.app.dm.shortMonths.includes(month.value)) {
      if (month.value === '2') {
        if (date.getMonth() === 2) {
          if (day.value === '30' || day.value === '31' || day.value === '29') {
            day.value = '28';
          }
          day.querySelector('[value="29"]').hidden = true;
          day.querySelector('[value="30"]').hidden = true;
          day.querySelector('[value="31"]').hidden = true;
        } else {
          day.querySelector('[value="29"]').hidden = false;
          day.querySelector('[value="30"]').hidden = true;
          day.querySelector('[value="31"]').hidden = true;
          if (day.value === '30' || day.value === '31') {
            day.value = '29';
          }
        }
        day.querySelector('[value="30"]').hidden = true;
      } else {
        day.querySelector('[value="31"]').hidden = true;
        day.querySelector('[value="29"]').hidden = false;
        day.querySelector('[value="30"]').hidden = false;
        if (day.value === '31') {
          day.value = '30';
        }
      }
    } else {
      day.querySelector('[value="31"]').hidden = false;
      day.querySelector('[value="30"]').hidden = false;
      day.querySelector('[value="29"]').hidden = false;
    }
  }

  fillDateField(elts, date, hour) {
    elts[0].value = date.getDate();
    elts[1].value = date.getMonth() + 1;
    elts[2].value = date.getFullYear();
    if (hour) {
      elts[3].value = date.getHours();
      elts[4].value = this.app.formatNumber(date.getMinutes());
    }
  }

  /* Affiche le formulaire pour éditer un nouvel évenement */
  display() {
    let app = this.app,
      Es = this.Es,
      selectedDateData = app.evElt.selectedDateData,
      dateNow = new Date();
    this.initialize();
    this.idEventToEdit = false;
    this.dates.start = this.makeDates(selectedDateData, dateNow);
    this.dates.end = this.makeDates(selectedDateData, dateNow);
    this.dates.endRec = this.makeDates(selectedDateData, dateNow);
    this.refreshDateFieldValues();
    app.evElt.elt.hidden = true;
    this.elt.hidden = false;
    this.refreshResume();
  }

  /*  Retourn à la liste des évenements */
  returnToEventsList() {
    this.elt.hidden = true;
    this.app.evElt.elt.hidden = false;
  }

  checkFormDatesValues() {
    let i;
    if (this.dates.start > this.dates.end || (this.dates.end > this.dates.endRec && this.Es.toDateRadioElt.checked)) {
      for (i = 0; i < this.Es.dateBlockElts.length; i++) {
        this.Es.dateBlockElts[i].classList.add('has-error');
      }
      if (this.dates.start > this.dates.end) {
        this.Es.form_errorElt.textContent = 'La date de fin doit être posterieur à la date du début de l\'évenement';
      } else {
        this.Es.form_errorElt.textContent = 'La date de fin de la récurence doit être posterieur à la date de la fin de l\'évenement';
      }
      this.Es.form_errorElt.hidden = false;
    } else {
      this.Es.form_errorElt.hidden = true;
      for (i = 0; i < this.Es.dateBlockElts.length; i++) {
        this.Es.dateBlockElts[i].classList.remove('has-error');
      }
    }
  }

  initialize() {
    this.Es.alldayElt.checked = false;
    this.Es.neverElt.checked = true;
    this.Es.recurrenceElt.value = '1';
    this.initializeRecurrenceElements();
    this.currentRecurrence = parseInt(this.Es.recurrenceElt.value);
    this.currentIntervalValue = this.Es.intervalElt.value;
  }

  initializeRecurrenceElements() {
    let i, recElt;
    for (recElt of this.Es.recurrenceEltElts) {
      recElt.hidden = true;
    }
    for (i = 0; i < 7; i++) {
      this.Es.weekDaysBlockinputElts[i].checked = false;
    }
  }

  displayEnRecElements() {
    let i;
    this.Es.neverElt.checked = true;
    this.Es.recurrenceEndBlockElt.hidden = false;
    for (i = 0; i < 3; i++) {
      this.Es.endRecselectElts[i].disabled = true;
    }
  }

  recurrenceElementsHandler(recurrence) {
    let i;
    this.currentRecurrence = recurrence;
    if (this.currentRecurrence === 1) {
      this.initializeRecurrenceElements();
    } else {
      this.displayEnRecElements();
      if ([2, 3, 6, 7].includes(this.currentRecurrence)) {
        this.Es.intervalBlockElt.hidden = false;
        this.Es.afterNbSelectElt.disabled = true;
        switch (this.currentRecurrence) {
          case 6:
            this.Es.intervalBeforeElt.textContent = 'Tous les ';
            this.Es.intervalAfterElt.textContent = 'mois';
            break;
          case 7:
            this.Es.intervalBeforeElt.textContent = 'Tous les ';
            this.Es.intervalAfterElt.textContent = 'ans';
            break;
          case 2:
            this.Es.intervalBeforeElt.textContent = 'Tous les ';
            this.Es.intervalAfterElt.textContent = 'jours';
            break;
        }
        if (this.currentRecurrence === 3) {
          this.Es.intervalBeforeElt.textContent = 'Toutes les ';
          this.Es.intervalAfterElt.textContent = 'semaines';
          this.Es.weekDaysBlockElt.hidden = false;
          for (i = 0; i < 7; i++) {
            this.Es.weekDaysBlockinputElts[i].checked = false;
          }
        } else {
          this.Es.weekDaysBlockElt.hidden = true;
        }
      } else {
        this.Es.intervalBlockElt.hidden = true;
        this.Es.weekDaysBlockElt.hidden = true;
      }
    }
    this.refreshResume();
  }

  // Gère l'affichage et l'activation des champs de la récurence
  onChangeRecurrence() {
    this.recurrenceElementsHandler(parseInt(this.Es.recurrenceElt.value));
  }

  endRecValueHandler(currentEndRecValue) {
    let i;
    this.currentEndRecValue = currentEndRecValue;
    if (this.currentEndRecValue === '3') {
      for (i = 0; i < 3; i++) {
        this.Es.endRecselectElts[i].disabled = false;
      }
      this.Es.afterNbSelectElt.disabled = true;
    } else if (this.currentEndRecValue === '2') {
      for (i = 0; i < 3; i++) {
        this.Es.endRecselectElts[i].disabled = true;
      }
      this.Es.afterNbSelectElt.disabled = false;
    } else {
      for (i = 0; i < 3; i++) {
        this.Es.endRecselectElts[i].disabled = true;
      }
      this.Es.afterNbSelectElt.disabled = true;
    }
    this.checkFormDatesValues();
    this.refreshResume();
  }

  // Active et désactive les champs de fin de récurence suivant le type séléctionné
  onChangeEndRecValue(e) {
    this.endRecValueHandler(e.currentTarget.value);
  }

  // Désactive et active les champs 'hours' si la case 'toute la journée est séléctionnée' et met à jour le résumé
  checkAllDay() {
    let i;
    for (i = 3; i < 5; i++) {
      this.Es.startselectElts[i].disabled = this.Es.alldayElt.checked;
      this.Es.endselectElts[i].disabled = this.Es.alldayElt.checked;
    }
    this.refreshResume();
  }

  setColor(newColor) {
    let currentColor = this.Es.selectedColorElt.dataset.selectedcolor;
    this.Es.selectedColorElt.classList.remove(currentColor);
    this.Es.selectedColorElt.dataset.selectedcolor = newColor;
    this.Es.selectedColorElt.classList.add(newColor);
    document.querySelector(`[data-color="${newColor}"]`).querySelector('i').hidden = false;
    document.querySelector(`[data-color="${currentColor}"]`).querySelector('i').hidden = true;
  }

  // Affiche la couleur séléctionnée dans la première div
  onSelectColor(e) {
    this.setColor(e.currentTarget.dataset.color);
  }

  onChangeWeekDaysRec(e) {
    this.setWeekDaysInArray(e.currentTarget);
    this.refreshResume();
  }

  // Ajoute ou supprime les jours de la semaine du tableau des jours de la semaine
  setWeekDaysInArray(elt) {
    let index;
    if (elt.checked) {
      if (this.weekDaysRecurrenceArray.includes(elt.value) === false) {
        this.weekDaysRecurrenceArray.push(elt.value);
      }
    } else {
      index = this.weekDaysRecurrenceArray.indexOf(elt.value);
      if (index !== -1) {
        this.weekDaysRecurrenceArray.splice(index, 1);
      }
    }
    this.weekDaysRecurrenceArray = this.weekDaysRecurrenceArray.sort();
  }

  setWeekDaysFromEvent() {
    if (this.currentEventForm.daysRec) {
      this.weekDaysRecurrenceArray = this.currentEventForm.daysRec;
      for (let weekDay of this.weekDaysRecurrenceArray) {
        this.Es.weekDaysBlockinputElts[parseInt(weekDay) - 1].checked = true;
      }
    }
  }

  onChangeInvervalValue(e) {
    this.currentIntervalValue = e.currentTarget.value;
    this.refreshResume();
  }

  // Renvoi le type de récurence sous chaine de caractère : 'toutes les 5 semaines, le lundi, le mardi…'
  getRecurrenceText() {
    let recurrenceText = '',
      rec = this.recurrence[this.currentRecurrence - 1],
      i;
    if (this.currentRecurrence !== 1) {
      if (this.currentIntervalValue > 1 && this.currentRecurrence != 3 && this.currentRecurrence != 4) {
        rec = rec.replace(/(les)/, ' $1 ' + this.currentIntervalValue);
      }
      recurrenceText += '  ' + rec;
      if (this.currentRecurrence === 3) {
        if (this.weekDaysRecurrenceArray.length) {
          for (i = 0; i < this.weekDaysRecurrenceArray.length; ++i) {
            recurrenceText += ' le ' + this.app.dm.daysOfWeek[parseInt(this.weekDaysRecurrenceArray[i]) - 1] + ', ';
          }
        }
      }
    }
    return recurrenceText;
  }

  // Met à jour la phrase de résumé suivant les champs séléctionné
  refreshResume() {
    let resume = this.getDateToString(this.dates.start, this.dates.end);
    resume += this.getRecurrenceText();
    resume += this.app.getRangeTimeInDay(this.dates.start, this.dates.end, this.Es.alldayElt.checked);
    if (this.currentRecurrence !== 0) {
      resume += this.getDateEndRecText();
    }
    this.Es.resumeElt.textContent = resume;
  }

  onChangeAfterNbRecurrence(e) {
    this.afterNb = e.currentTarget.value;
    this.refreshResume();
  }

  // Ajoute dans le résumé la fin de la récurence
  getDateEndRecText() {
    let weekDayNb;
    if (this.currentEndRecValue === '2') {
      return ' (l\'évenement sera répété ' + this.Es.afterNbSelectElt.value + ' fois)';
    } else if (this.currentEndRecValue === '3') {
      weekDayNb = this.dates.endRec.getDay();
      if (weekDayNb === 0) {
        weekDayNb = 7;
      }
      return ' (l\'évement sera répété jusqu\'au ' + this.app.dm.daysOfWeek[weekDayNb - 1] + ' ' + this.dates.endRec.getDate() + ' ' +
        this.app.dm.months[this.dates.endRec.getMonth()] + ' ' + this.dates.endRec.getFullYear() + ')';
    }
    return '';
  }

  // Formate la date : 'du mardi 5 mai au jeudi 23 juin 2017…'
  getDateToString(start, end) {
    let dateToString, startWeekDayNb = start.getDay() === 0 ? 7 : start.getDay(),
      endWeekDayNb = end.getDay() === 0 ? 7 : end.getDay(),
      startToString =
      this.app.dm.daysOfWeek[startWeekDayNb - 1] + ' ' + start.getDate() + ' ' +
      this.app.dm.months[start.getMonth()] + ' ' + start.getFullYear();
    if (start.toLocaleDateString() === end.toLocaleDateString()) {
      dateToString = ' Le ' + startToString;
    } else {
      dateToString = ' Du ' + startToString + ' au ' + this.app.dm.daysOfWeek[endWeekDayNb - 1] + ' ' + end.getDate() + ' ' + this.app.dm.months[end.getMonth()] + ' ' + end.getFullYear();
    }
    return dateToString;
  }

  // Lors de la soumission du formulaire 
  onSendForm(e) {
    e.preventDefault();
    let app = this.app,
      start, end, data;
    this.Es.saveEventElt.textContent = 'Chargement…';
    this.Es.saveEventElt.disabled = true;
    data = new FormData(e.currentTarget);
    data.append('color', this.Es.selectedColorElt.dataset.selectedcolor);
    if (this.idEventToEdit) {
      data.append('event_Id', this.idEventToEdit);
      this.app.em.updateEvent(data, this.updateEvent.bind(this), this.error.bind(this));
    } else {
      this.app.em.addEvent(data, this.validate.bind(this), this.error.bind(this));
    }
  }

  updateEvent(res) {
    this.afterSubmit('L\'évènement à été modifié avec succès');
  }

  error(mess = 'Une erreur est survenue lors de la requête vers le serveur') {
    this.dem.setErrorMessage(mess);
    this.Es.saveEventElt.disabled = false;
    this.Es.saveEventElt.textContent = 'Enregistrer';
  }

  afterSubmit(message) {
    this.dem.setSuccessMessage(message);
    this.Es.saveEventElt.disabled = false;
    this.Es.saveEventElt.textContent = 'Enregistrer';
    this.elt.hidden = true;
    this.Es.eventDetailsElt.hidden = true;
    this.Es.eventsbloc_btnElt.hidden = false;
    this.app.cm.currentCalendar.calendarElt.hidden = false;
    this.app.cm.currentCalendar.initializeCalendar();
    this.app.cm.currentCalendar.getEventsCalendar();
  }

  // Après la soumission du formulaire
  validate(res) {
    this.afterSubmit('L\'évènement à été enregistré avec succès');
  }

  // Affiche le formulaire pour modifier un évenement 
  editEvent(event) {
    this.currentEventForm = event;
    this.idEventToEdit = event.id;
    this.Es.titleElt.value = event.title;
    this.Es.commentElt.value = event.comment;
    this.dates.start = event.start.date;
    this.dates.end = event.end.date;
    if (event.endRecType === '1') {
      this.dates.endRec = event.end.date;
    } else {
      this.dates.endRec = event.dateEndRec.date;
      this.Es.toDateRadioElt.checked = true;
    }
    this.refreshDateFieldValues();
    this.currentIntervalValue = event.interval;
    this.Es.intervalElt.value = this.currentIntervalValue;
    this.Es.availableElt.checked = event.available === '1' ? false : true;
    this.Es.categoryElt.value = event.category;
    this.Es.visibilityElt.value = event.visibility;
    this.Es.recurrenceElt.value = event.recurrence;
    this.setColor(event.color);
    this.recurrenceElementsHandler(event.recurrence);
    this.setWeekDaysFromEvent();
    if (event.endRecType) {
      this.endRecValueHandler(event.endRecType);
      this.Es.recurrenceEndBlockinputElts[event.endRecType -1].checked = true;
    }
    this.elt.hidden = false;
  }
}
