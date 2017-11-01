export default class Action {

  constructor(app) {
    this.app = app;
    this.dem = app.dem;
    this.dem.setElement(['#devis_list_form', '#devis_page_button']);
    this.dem.setElements(['#devis_data .pagination_nb a', '#devis_data .pagination_previous', '#devis_data .pagination_next']);
  }

  addListeners(elts, type, fun) {
    for (let elt of elts) { elt.addEventListener(type, fun); }
  }
  
  run() {
    let app = this.app, Es = this.dem.getElements();
    // Affiche les page "Devis"
    Es.devis_page_buttonElt.addEventListener('click', app.dDevis.display.bind(app.dDevis));
    // Lors de la soumission du formulaire
    Es.devis_list_formElt.addEventListener('submit', app.dDevis.onDevisFormSubmit.bind(app.dDevis));
    // Va à la page précédente des devis
    this.addListeners(Es.devis_datapagination_previousElts, 'click', app.dDevis.getPreviousPage.bind(app.dDevis));
    // Va à la page suivante des devis
    this.addListeners(Es.devis_datapagination_nextElts, 'click', app.dDevis.getNextPage.bind(app.dDevis));
    // Récupère une page précise
    this.addListeners(Es.devis_datapagination_nbaElts, 'click', app.dDevis.getPage.bind(app.dDevis));
  }
}
