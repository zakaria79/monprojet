import PartnerModule from './../PartnerModule';

export default class Action extends PartnerModule {

  constructor() {
    super();
    this.dm.setElement(['#pagination_previous', '#pagination_next', '#btn_annul', '#calendar td', '#rdv_form form', '#current_date', '#reporting_button', '#calendar_button','#previous_button', '#next_button']);
    this.dm.setElements(['.pagination_nb a', '.pagination_previous', '.pagination_next']);
  }

  addEventListeners (elts,action,fun) {
    for (let elt of elts) { elt.addEventListener(action, fun); }
  }

  run () {
    let Es = this.dm.getElements();
    // Affiche le reporting
    Es.reporting_buttonElt.addEventListener('click', this.rm.onChangeRoute.bind(this.rm));
    // Affiche le calendrier
    Es.calendar_buttonElt.addEventListener('click', this.rm.onChangeRoute.bind(this.rm));
    // Affiche la semaine suivante
    Es.next_buttonElt.addEventListener('click', this.cm.calendar.goToNext.bind(this.cm.calendar));
    // Affiche la semaine précédent
    Es.previous_buttonElt.addEventListener('click', this.cm.calendar.goToPrevious.bind(this.cm.calendar));
    // Remet le calendrier au jour d'aujourd'hui
    Es.current_dateElt.addEventListener('click', this.cm.calendar.backToTodayDate.bind(this.cm.calendar));
    // À la soumission du formulaire
    Es.rdv_formformElt.addEventListener('submit', this.fm.formManager.onSubmitForm.bind(this.fm.formManager));
    // Affiche le formulaire pour fixer un rdv
    this.addEventListeners(Es.calendartdElts, 'click', this.fm.display.bind(this.fm));
    // Cache le forlulaire et affiche le calendrier
    Es.btn_annulElt.addEventListener('click', this.fm.hideForm.bind(this.fm));
    // Va à la page précédente des rdvs
    this.addEventListeners(Es.pagination_previousElts, 'click', this.rp.getPreviousPage.bind(this.rp));
    // Va à la page suivante des rdvs
    this.addEventListeners(Es.pagination_nextElts, 'click', this.rp.getNextPage.bind(this.rp));
    // Récupère une page précise
    this.addEventListeners(Es.pagination_nbaElts, 'click', this.rp.getPage.bind(this.rp));
  }

}

