export default class Action {

  constructor(app) {
    this.app = app;
    this.dem = app.dem;
    this.fin_recurrence_block_radioElts = document.querySelectorAll('#fin_recurrence_block [type="radio"]');
    this.dem.setElement( [ '#list','#editEvent','#deleteEvent', '#current_date', '#next_button', '#previous_button', '#display_form_add_event_button', '#return_to_calendar_button', '#add_event_form', '#eventFormButton', '#returnToEventsList', '#recurrence', '#allday', '#interval', '#afterNbSelect', '#saveEvent' ]);
    this.dem.setElements( ['#category', '.calendar td', '.change_calendar_button', '.colorRec .color', '.dateBlock select', '#recurrenceEndBlock input', '.color.change', '#weekDaysBlock input' ]);
  }

  addEventListeners (elts,action,fun) {
    let i;
    for (i = 0; i < elts.length; i++) {
      elts[i].addEventListener(action,fun);
    }
  }

  start () {
    let app = this.app, Es = this.dem.getElements();
    // Affichage du calendrier précédent
    Es.previous_buttonElt.addEventListener('click',app.cm.changeTime.bind(app.cm));
    // Affichage du calendrier suivant
    Es.next_buttonElt.addEventListener('click',app.cm.changeTime.bind(app.cm));
    // Retour à la date d'aujourd'hui dans le calendrier courant
    Es.current_dateElt.addEventListener('click',app.cm.backToTodayDate.bind(app.cm));
    // Changement de vue du calendrier (mois, semaine, 4 jours, jour)
    this.addEventListeners(Es.change_calendar_buttonElts,'click',app.cm.changeCalendar.bind(app.cm));
    // Affichage des événements Lors du click sur une plage du calendrier
    this.addEventListeners(Es.calendartdElts,'click',app.evElt.display.bind(app.evElt));
    // Affichage du formulaire d'ajout d'évenements
    Es.eventFormButtonElt.addEventListener('click', app.form.display.bind(app.form));
    // Retour au calendrier
    Es.return_to_calendar_buttonElt.addEventListener('click', app.evElt.returnToCalendar.bind(app.evElt));
    // Retour à la liste des évenements
    Es.returnToEventsListElt.addEventListener('click', app.form.returnToEventsList.bind(app.form));
    // Lors du changement des champs de date du formulair
    this.addEventListeners(Es.dateBlockselectElts,'change',app.form.onChangeDate.bind(app.form));
    // Lors du changement de récurence (Tous les jours, semaines…)
    Es.recurrenceElt.addEventListener('change', app.form.onChangeRecurrence.bind(app.form));
    // Gère le type de fin de récurence (date, nombre de répétitions, jamais)
    this.addEventListeners(Es.recurrenceEndBlockinputElts, 'change', app.form.onChangeEndRecValue.bind(app.form));
    // Lorsque la checkbox "toute la journée" est cochée, les champs "heures" sont désactivés
    Es.alldayElt.addEventListener('change', app.form.checkAllDay.bind(app.form));
    // Lors de la selection de la couleur de l'évenement
    for (var i = 0; i < Es.colorchangeElts.length; i++) {
      Es.colorchangeElts[i].addEventListener('click', app.form.onSelectColor.bind(app.form));
    }
    // Lorsque les jours de la semaine sont cochés
    this.addEventListeners(Es.weekDaysBlockinputElts, 'change', app.form.onChangeWeekDaysRec.bind(app.form));
    // Lors de la sélection de l'interval de récurence
    Es.intervalElt.addEventListener('change', app.form.onChangeInvervalValue.bind(app.form));
    // Lorsque le type de fin de récurence choisi est "nombre de répétitions"
    Es.afterNbSelectElt.addEventListener('change', app.form.onChangeAfterNbRecurrence.bind(app.form));
    // Lors de la soumission du formulaire
    Es.add_event_formElt.addEventListener('submit', app.form.onSendForm.bind(app.form));
    // Au changement du champs select "category"
    Es.categoryElt.addEventListener('click', app.form.onChangeCategory.bind(app.form));
  }
}
