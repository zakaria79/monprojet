export default class DisplayUserList {

  constructor(app) {
    this.app = app;
    this.dem = app.dem;
    this.dem.setElement(['#user_add_form', '#users h1', '#users', '#calendar', '#users_list']);
    this.Es = this.dem.getElements([]);
    this.currentSection = this.Es.users_listElt;
  }

  // displayPartenaireUsers() {
  //   if (this.Es.usersElt.hidden) {
  //     this.Es.calendarElt.hidden = true;
  //     this.Es.usersElt.hidden = false;
  //     this.Es.usersh1Elt.textContent = 'Partenaires';
  //     this.app.um.getUsers(
  //       this.setUsersList.bind(this),
  //       (res) => {
  //         console.log('Impossible de récupérer la liste des utilisateurs');
  //       });
  //   }
  // }

  display(e) {
    e.preventDefault();
    this.app.pm.changePage(this.Es.usersElt);
    this.Es.usersh1Elt.textContent = e.currentTarget.textContent;
    this[e.currentTarget.dataset.action](e.currentTarget);
  }

  usersList(elt) {
    if (this.Es.users_listElt.hidden) {
      this.currentSection.hidden = true;
      this.currentSection = this.Es.users_listElt;
      this.currentSection.hidden = false;
    }
    this.Es.users_listElt.innerHTML = '';
    this.app.um.getUsers(
      elt.dataset.usertype,
      (users, userArrayById) => {
        this.users = users;
        this.userArrayById = userArrayById;
        if (users.length > 0) {
          for (let user of users) {
            let user_listElt = document.createElement('div');
            user_listElt.dataset.id = user.Id;
            user_listElt.classList.add('user_list');
            user_listElt.innerHTML = `<strong>${user.firstName} ${user.lastName} : </strong> ${user.roleName}`;
            this.Es.users_listElt.appendChild(user_listElt);
            user_listElt.addEventListener('click',this.displayUserDetails.bind(this));
          }
        }
      },
      (err = 'impossible de récupérer la liste des utilisateurs') => {
        console.log(err);
      });
  }

  addUser() {
    if (this.Es.user_add_formElt.hidden) {
      this.currentSection.hidden = true;
      this.currentSection = this.Es.user_add_formElt;
      this.currentSection.hidden = false;
    }
  }

  displayUserDetails(e) {
    let user = this.userArrayById[e.currentTarget.dataset.id];
    this.Es.users_listElt.innerHTML = `
      <h2>${user.firstName} ${user.lastName}</h2>
      <h4>${user.roleName}</h4>
      <div><a href="tel:${user.tel}">${user.tel}</a></div>
      <div><a href="mailto:${user.mail}">${user.mail}</a></div>
      <div>${user.address}</div>
      <div>${user.codePostal}</div>
      <div>${user.city}</div>
    `;
    let returnToUserListButton = document.createElement('button');
    returnToUserListButton.classList.add('btn');
    returnToUserListButton.classList.add('btn-outline-primary');
    returnToUserListButton.textContent = 'Revenir à la liste des utilisateurs';
    returnToUserListButton.dataset.usertype = user.roleId;
    returnToUserListButton.addEventListener('click', this.usersList.bind(this, returnToUserListButton));
    returnToUserListButton.style.margin = '1rem 0';
    this.Es.users_listElt.appendChild(returnToUserListButton);
  }

}
