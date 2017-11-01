export default class Action {

  constructor(app) {
    this.app = app;
    this.dem = app.dem;
    this.dem.setElement(['#add_user_confirm_annul_button', '#add_user_confirm_button', '#user_add_form form']);
    this.dem.setElements(['.users_page_button']);
  }

  addListeners(elts, type, fun) {
    for (let elt of elts) { elt.addEventListener(type, fun); }
  }
  
  run() {
    let app = this.app, Es = this.dem.getElements();
    // Affiche les page "Utilisateurs"
    this.addListeners(Es.users_page_buttonElts, 'click', app.du.display.bind(app.du));
    // Soumission du formulaire d'ajout d'utilisateurs
    Es.user_add_formformElt.addEventListener('submit', app.uf.onSubmit.bind(app.uf));
    // Confirmation d'ajout d'un compte Administrateur
    Es.add_user_confirm_buttonElt.addEventListener('click',app.uf.confirmationAddAdminUser.bind(app.uf));
    // Annule la création de compte Administrateur
    Es.add_user_confirm_annul_buttonElt.addEventListener('click', app.uf.annulAddAdminUser.bind(app.uf));
  }

}
