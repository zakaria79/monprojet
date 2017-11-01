export default class User {

  get Id() {
    return this._Id;
  }

  set Id(Id) {
    this._Id = Id;
  }

  get firstName() {
    return this._firstName;
  }

  set firstName(firstName) {
    this._firstName = firstName;
  }

  get lastName() {
    return this._lastName;
  }
  
  set lastName(lastName) {
    this._lastName = lastName;
  }

  get tel() {
    return this._tel;
  }

  set tel(tel) {
    this._tel = tel;
  }

  get mail() {
    return this._mail;
  }

  set mail(mail) {
    this._mail = mail;
  }

  get address() {
    return this._address;
  }

  set address(address) {
    this._address = address;
  }

  get city() {
    return this._city;
  }

  set city(city) {
    this._city = city;
  }

  get codePostal() {
    return this._codePostal;
  }

  set codePostal(codePostal) {
    this._codePostal = codePostal;
  }
}
