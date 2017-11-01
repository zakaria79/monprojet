export default class User {

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
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

  get role() {
    return this._role;
  }

  set role(role) {
    this._role = role;
  }

  get mail() {
    return this._mail;
  }

  set mail(mail) {
    this._mail = mail;
  }

  get tel() {
    return this._tel;
  }

  set tel(tel) {
    this._tel = tel;
  }

}
