import xhr from './../../../../../xhr/Xhr';
import User from './User';

export default class UserManager extends xhr {

  constructor() {
    super();
    this.req = this.getXhr();
  }

  makeUserArrayById(users) {
    let userArrayById = [];
    for (let user of users) {
      userArrayById[user.Id] = user;
    }
    return userArrayById;
  }

  // Récupère les évenemenst depuis le serveur
  getUsers(usertype, success, reject) {
    let usersArray = [], userArrayById = [], users, user, userObject;
    this.req.open('GET', 'admin/users/'+usertype);
    this.req.setRequestHeader("my-method", "XMLHttpRequest");
    this.req.onreadystatechange = () => {
      if (this.req.readyState === XMLHttpRequest.DONE) {
        if (this.req.status === 200) {
          users = JSON.parse(this.req.responseText);
          if (users) {
            for (user of users) {
              usersArray.push(this.buildUserObject(user));
            } 
            userArrayById = this.makeUserArrayById(usersArray);
          }
          
          success(usersArray, this.makeUserArrayById(usersArray));
        } else {
          reject(this.req.responseText === 'Connexion expirée' ? 'La connexion est expirée veullez raffraichir la page pour vous reconnecter' : undefined);
        }
      }
    };
    this.req.send(null);
  }

  buildUserObject(data) {
    let user = new User();
    user.address = data.address;
    user.city = data.city;
    user.codePostal = data.code_postal;
    user.mail = data.mail;
    user.roleId = data.role_Id;
    user.tel = data.tel;
    user.Id = data.user_Id;
    user.firstName = data.user_first_name;
    user.lastName = data.user_name;
    user.roleName = data.role_name;
    return user;
  }

  getTextFromResponse(response) {
    let text = '';
    switch (response) {
      case 'Connexion expirée':
        text = 'La connexion est expirée, veuillez raffraichir la page pour vous reconnecter'; 
        break;
      case 'User exists':
        text = 'Un utilisateur existe déjà avec cette adresse e-mail';
        break;
      default:
        text = undefined;
    }
    return text;
  }

  addUser(data, success, reject) {
    this.req.open('POST', 'admin/adduser');
    this.req.setRequestHeader("my-method", "XMLHttpRequest");
    this.req.onreadystatechange = () => {
      if (this.req.readyState === XMLHttpRequest.DONE) {
        if (this.req.status === 200) {
          success(this.req.responseText);
        } else {
          reject(this.getTextFromResponse(this.req.responseText));
        }
      }
    };
    this.req.send(data);
  }
}
