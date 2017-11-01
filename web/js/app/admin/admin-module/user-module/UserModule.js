import AdminModule from './../AdminModule';
import UserManager from './user/UserManager';
import Action from './action/Action';
import DisplayUserList from './display-user-list/DisplayUserList';
import UserForm from './user-form/UserForm';

export default class UserModule extends AdminModule {

  constructor(pm) {
    super(pm);    
    this.um = new UserManager(this);
    this.action = new Action(this);
    this.du = new DisplayUserList(this);
    this.uf = new UserForm(this);
  }

  run() {
    this.action.run();
  }

}
