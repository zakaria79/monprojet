import Xhr from './../../../../../xhr/Xhr';
import Rdv from './../../../../utils/rdv/Rdv.js';
import User from './../../../../utils/user/User';

export default class RdvManager extends Xhr {
  constructor(app) {
    super();
    this.req = this.getXhr();
  }

  getRdvs(page, success, reject) {
    let rdvsArray = [],
      rdvs, rdv;
    this.req.open('GET', '/admin/rdvs/' + page);
    this.req.setRequestHeader("my-method", "XMLHttpRequest");
    this.req.onreadystatechange = () => {
      if (this.req.readyState === XMLHttpRequest.DONE) {
        if (this.req.status === 200) {
          rdvs = JSON.parse(this.req.responseText);
          if (+rdvs.total > 0) {
            for (rdv of rdvs.rdv) {
              rdvsArray.push(this.buildRdvObject(rdv));
            }
            success(rdvsArray, +rdvs.total);
            return;
          }
          success(null);
        }
        reject(this.req.responseText === 'Connexion expirée' ? 'La connexion est expirée veullez raffraichir la page pour vous reconnecter' : undefined);
      }
    };
    this.req.send(null);
  }

  buildRdvObject(data) {
    let rdv = new Rdv(),
      user = new User();
    rdv.id = data.rdv_Id;
    rdv.object = data.rdv_object;
    rdv.clientEmail = data.client_email;
    rdv.clientFirstName = data.client_first_name;
    rdv.clientName = data.client_name;
    rdv.clientTel = data.client_tel;
    rdv.dateCreation = data.date_creation;
    rdv.object = data.rdv_object;
    rdv.start = data.start;
    rdv.status = data.rdv_status;
    rdv.statusId = data.rdv_status_Id;
    user.role = data.role_name;
    user.lastName = data.user_name;
    user.firstName = data.user_first_name;
    user.mail = data.user_mail;
    user.tel = data.user_tel;
    user.id = data.user_Id;
    return {
      rdv,
      user
    };
  }

  changeRdvStatus(data, success, reject) {
    this.req.open('POST', '/admin/rdvs/status');
    this.req.setRequestHeader("my-method", "XMLHttpRequest");
    this.req.onreadystatechange = () => {
      if (this.req.readyState === XMLHttpRequest.DONE) {
        if (this.req.status === 200) {
          success(JSON.parse(this.req.responseText));
          return;
        }
        reject(this.req.responseText === 'Connexion expirée' ? 'La connexion est expirée veullez raffraichir la page pour vous reconnecter' : undefined);
      }
    };
    this.req.send(data);
  }
}
