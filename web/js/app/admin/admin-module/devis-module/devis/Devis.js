export default class Devis {

  get Id() {
    return this._Id;
  }

  set Id(Id) {
    this._Id = Id;
  }

  get lastname() {
    return this._lastname;
  }

  set lastname(lastname) {
    this._lastname = lastname;
  }

  get firstname() {
    return this._firstname;
  }

  set firstname(firstname) {
    this._firstname = firstname;
  }
  get tel() {
    return this._tel;
  }

  get prosPart() {
    return this._prosPart;
  }

  set prosPart(prosPart) {
    this._prosPart = prosPart;
  }

  set tel(tel) {
    this._tel = tel;
  }

  get birthDate() {
    return this._birthDate;
  }

  set birthDate(birthDate) {
    this._birthDate = birthDate;
  }

  get postalCode() {
    return this._postalCode;
  }

  set postalCode(postalCode) {
    this._postalCode = postalCode;
  }

  get city() {
    return this._city;
  }

  set city(city) {
    this._city = city;
  }

  get email() {
    return this._email;
  }

  set email(email) {
    this._email = email;
  }

  get insuranceType() {
    return this._insuranceType;
  }

  set insuranceType(insuranceType) {
    this._insuranceType = insuranceType;
  }

  get santeData() {
    return this._santeData;
  }

  set santeData(santeData) {
    this._santeData = santeData;
  }

  get autoData() {
    return this._autoData;
  }

  set autoData(autoData) {
    this._autoData = autoData;
  }

  get pretData() {
    return this._pretData;
  }

  set pretData(pretData) {
    this._pretData = pretData;
  }

  get habitationData() {
    return this._habitationData;
  }

  set habitationData(habitationData) {
    this._habitationData = habitationData;
  }

  get prevoyanceData() {
    return this._prevoyanceData;
  }

  set prevoyanceData(prevoyanceData) {
    this._prevoyanceData = prevoyanceData;
  }

  get dateCreation() {
    return this._dateCreation;
  }

  set dateCreation(dateCreation) {
    let d = dateCreation.substr(0, 10).split('-'),
      h = dateCreation.substr(11).split(':');
    this._dateCreation = new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), parseInt(h[0]), parseInt(h[1]), parseInt(h[2]));
  }

  getAssuranceText() {
    let assuranceText = '';
    switch (this.insuranceType) {
      case 'sante':
        assuranceText = this.getSanteText();
        break;
      case 'auto':
        assuranceText = this.getAutoText();
        break;
      case 'pret':
        assuranceText = this.getPretText();
        break;
      case 'prevoyance':
        assuranceText = this.getPrevoyanceText();
        break;
      case 'habitation':
        assuranceText = this.getHabitationText();
    }
    return assuranceText;
  }

  getSanteText() {
    return `
      <h3><strong>Santé</strong></h3>
      <ul>
        <li>Hospitalisation : ${this.santeData.hospitalisation}</li>
        <li>Medecine : ${this.santeData.medecine}</li>
        <li>Dentaire : ${this.santeData.dentaire}</li>
        <li>Optique : ${this.santeData.optique}</li>
      </ul>
    `;
  }

  getAutoText() {
    return `
      <h3><strong>Auto</strong></h3>
      <ul>
        <li>Assuré(e) actuellement : <strong>${+this.autoData.assureActuellement === 1 ? 'non' : 'oui'}</strong></li>
        <li>Bonus : <strong>${+this.autoData.bonus === 1 ? 'non' : 'oui'}</strong></li>
        <li>Garantie souhaitée : <strong>${this.autoData.garantieSouhaite}</strong></li>
      </ul>
    `;
  }

  getPretText() {
    return `
      <h3><strong>Prêt</strong></h3>
      <ul>
        <li>Assuré(e) actuellement : <strong>${+this.pretData.assureActuellement === 1 ? 'non' : 'oui'}</strong></li>
        <li>Résidence principale : <strong>${+this.pretData.residencePrincipale === 1 ? 'non' : 'oui'}</strong></li>
      </ul>
    `;
  }

  getHabitationText() {
    return `
      <h3><strong>Habitation</strong></h3>
      <ul>
        <li>Habitation actuelle : <strong>${this.habitationData.habitationActuelle}</strong></li>
        <li>Nombre de pièces : <strong>${+this.habitationData.nbPieces}</strong></li>
      </ul>
    `;
  }

  getPrevoyanceText() {
    return `
      <h3><strong>Prévoyance</strong></h3>
      <ul>
        <li>Assurance décès : <strong>${+this.prevoyanceData.assuranceDeces === 1 ? 'non' : 'oui'}</strong></li>
        <li>Accident de la vie : <strong>${+this.prevoyanceData.accidentVie === 1 ? 'non' : 'oui'}</strong></li>
      </ul>
    `;
  }

  getText() {
    return `
      ${this.getAssuranceText()}
      </h4><strong>Coordonnées</strong></h4>
      <p>${this.prosPart}</p>
      <ul>
        <li>Nom : <strong>${this.lastname}</strong></li>
        <li>Prénom : <strong>${this.firstname}</strong></li>
        <li>Code Postal : <strong>${this.postalCode}</strong></li>
        <li>Ville : <strong>${this.city}</strong></li>
        <li>E-mail : <a href="mailto:${this.email}">${this.email}</a></li>
        <li>Tel : <a href="tel:${this.tel}">${this.tel}</a></li>
      </ul>
    `;
  }
}
