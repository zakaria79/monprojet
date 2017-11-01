export default class UserForm {

  constructor(app) {
    this.app = app;
    this.dem = app.dem;
    this.dem.setElement(['#user_tel', '#user_email','#user_email2', '#user_password', '#user_password2', '#user_add_form_success', '#user_add_form_error', '#user_add_form form', '#add_user_confirm_message', '#password_confirmation', '#role', '#add_user_confirm', '#message_confirm']);
    this.Es = this.dem.getElements();
    this.Es.roleElt.value = '2';
  }

  error(error = 'Une erreur est survenue lors de la requête vers le serveur') {
    this.dem.setMessage(this.Es.user_add_form_errorElt, error);
  }

  annulAddAdminUser(e) {
    this.Es.add_user_confirmElt.hidden = true;
    this.dem.cover.hidden = true;
  }

  removeConfirmationAddAdminUser() {
    this.Es.add_user_confirmElt.hidden = true;
    this.dem.cover.hidden = true;
    this.success();
  }

  confirmationAddAdminUserError(error) {
    if (error === 'Mot de passe invalide') {
      this.Es.add_user_confirm_messageElt.innerHTML = error;
      return;
    }
    this.Es.add_user_confirmElt.hidden = true;
    this.dem.cover.hidden = true;
    this.dem.setMessage(this.Es.user_add_form_errorElt, error);
  }

  success() {
    this.Es.user_add_form_errorElt.hidden = true;
    this.Es.user_add_form_successElt.hidden = false;
    this.dem.setMessage(this.Es.user_add_form_successElt, 'Le compte à été créé avec succès');
  }

  confirmationAddAdminUser(e) {
    if (this.Es.password_confirmationElt.value.length > 0) {
      this.submit(this.removeConfirmationAddAdminUser, this.confirmationAddAdminUserError);
      return;
    }
    this.Es.add_user_confirm_messageElt.innerHTML = `<div class="text-danger">Vous devez taper votre mot de passe pour effectuer cette action</div>`;
  }

  submit(success, error) {
    let data = new FormData(this.Es.user_add_formformElt);
    this.app.um.addUser(data, success.bind(this), error.bind(this));
  }

  testTelPattern(text) {
    return /^0\d([-\s.]?(\d){2}){4}$/.test(text);
  }

  onSubmit(e) {
    e.preventDefault();
    let telPattern = /^\d{4}(-\d{2}){2}$/;
    if (this.Es.user_passwordElt.value !== this.Es.user_password2Elt.value) {
      this.dem.setMessage(this.Es.user_add_form_errorElt, 'Les deux mots de passe ne correspondent pas');
      return;
    }
    if (this.Es.user_emailElt.value !== this.Es.user_email2Elt.value) {
      this.dem.setMessage(this.Es.user_add_form_errorElt, 'Les deux adresses e-mail ne correspondent pas');
      return;
    }
    if (!this.testTelPattern(this.Es.user_telElt.value)) {
      this.dem.setMessage(this.Es.user_add_form_errorElt, 'Le numéro de téléphone est invalide');
      return;
    }
    if (this.Es.roleElt.value === '1') {
      this.Es.add_user_confirmElt.hidden = false;
      this.dem.cover.hidden = false;
      return;
    }
    this.submit(this.success, this.error);
  }
}
