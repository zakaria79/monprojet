export default class Action {

  constructor(app) {
    this.app = app;
    this.dem = app.dem;
    this.dem.setElement(['#rdv_list_form', '#rdv_page_button']);
    this.dem.setElements(['#rdv .pagination_nb a', '#rdv .pagination_previous', '#rdv .pagination_next']);
  }

  addListeners(elts, type, fun) {
    for (let elt of elts) { elt.addEventListener(type, fun); }
  }
  
  run() {
    let app = this.app, Es = this.dem.getElements();
    // Affiche les page "RDV"
    Es.rdv_page_buttonElt.addEventListener('click', app.dRdv.display.bind(app.dRdv));
    // Lors de la soumission du formulaire de changement de status de rdv
    Es.rdv_list_formElt.addEventListener('submit', app.dRdv.onRdvStatusFormSubmit.bind(app.dRdv));
    // Va à la page précédente des rdvs
    this.addListeners(Es.rdvpagination_previousElts, 'click', app.dRdv.getPreviousPage.bind(app.dRdv));
    // Va à la page suivante des rdvs
    this.addListeners(Es.rdvpagination_nextElts, 'click', app.dRdv.getNextPage.bind(app.dRdv));
    // Récupère une page précise
    this.addListeners(Es.rdvpagination_nbaElts, 'click', app.dRdv.getPage.bind(app.dRdv));
  }

}

