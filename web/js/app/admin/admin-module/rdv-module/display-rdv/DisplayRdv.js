import getRdvClassFromRdvStatus from './../../../../utils/getRdvClassFromRdvStatus';
import {
  rdvClassByRdvStatus,
  status
} from './../../../../utils/rdv/status';
import {
  dateAndHourToStringFromDateObject
} from './../../../../../date/dateAndHourToStringFromDateObject';

export default class DisplayRdv {
  constructor(app) {
    this.app = app;
    this.dem = app.dem;
    this.dem.setElement(['#error_message', '#pagination_top', '#pagination_bottom', '#rdv_status', '#rdv', '#rdv_list']);
    this.dem.setElements(['#pagination_top .pagination_nb a', '#pagination_bottom .pagination_nb a']);
    this.Es = this.dem.getElements();
    this.page = 1;
  }

  display(e) {
    e.preventDefault();
    this.app.pm.changePage(this.Es.rdvElt);
    this.displayRdvList();
  }

  displayRdvList() {
    this.Es.rdv_listElt.innerHTML = '';
    this.Es.pagination_topElt.hidden = true;
    this.Es.pagination_bottomElt.hidden = true;
    this.app.rdvManager.getRdvs(
      this.page,
      (rdvsData, totalRdv) => {
        if (rdvsData) {
          this.Es.rdv_statusElt.hidden = false;
          for (let rdvData of rdvsData) {
            this.displayRdvHandler(rdvData);
          }
          if (totalRdv > 10) {
            this.setTotalRdv(totalRdv);
          }
          return;
        }
        this.Es.rdv_listElt.innerHTML = ` <h2>Il n'y a pas encore de RDVS</h2>`;
      }, (err = 'Une erreur est survenue lors de la requête vers le serveur') => {
        this.Es.error_messageElt.innerHTML = err;
        this.Es.error_messageElt.classList.remove('hide');
        window.setTimeout(() => {
          this.Es.error_messageElt.classList.add('hide');
        }, 10000);
      });
  }

  setTotalRdv(totalRdv) {
    this.totalRdv = totalRdv;
    this.Es.pagination_topElt.hidden = false;
    this.Es.pagination_bottomElt.hidden = false;
    this.numberOfPages = Math.ceil(totalRdv / 10);
    this.Es.pagination_toppagination_nbaElts[2].parentElement.hidden = this.numberOfPages < 3 ? true : false;
    this.Es.pagination_bottompagination_nbaElts[2].parentElement.hidden = this.numberOfPages < 3 ? true : false;
  }

  displayRdvHandler(rdvData) {
    let {
      rdv,
      user
    } = rdvData;
    this.Es.rdv_listElt.innerHTML += `
      <div class="rdv_info">
        <div class="alert ${getRdvClassFromRdvStatus(rdv.status)} info" data-class="${rdvClassByRdvStatus[rdv.statusId -1]}" data-id="${rdv.id}">
          <strong class="title" data-userid="${user.id}"> ${user.firstName} ${user.lastName.toUpperCase()} </strong> -
          ${dateAndHourToStringFromDateObject(rdv.start.date)} -
          <small class="status"><em>${rdv.status}</em></small>
          <div class="checkbox checkbox_status" truc><input class="checkbox" type="checkbox" name="rdv[]" value="${rdv.id}" truc></div>
        </div>
        <div class="rdv_details hide_collapse d-flex">
          <div>
            <div><h3>${user.role}</h3></div>
            <div><strong>${user.firstName} ${user.lastName.toUpperCase()}</strong></div>
            <div><a href="mailto:${user.mail}">${user.mail}</a></div>
            <div><a href="tel:${user.tel}">${user.tel}</a></div>
          </div>
          <div class="ml-5">
            <div><h3>Client</h3></div>
            <div><strong>${rdv.clientFirstName} ${rdv.clientName.toUpperCase()}</strong></div>
            <div><a href="mailto:${rdv.clientEmail}">${rdv.clientEmail}</a></div>
            <div><a href="tel:${rdv.clientTel}">${rdv.clientTel}</a></div>
          </div>
          <div class="ml-5">
            <div><h3>Objet</h3></div>
            <div>${rdv.object}</div>
          </div>
        </div>
      </div>
    `;
    for (let rdvElt of document.querySelectorAll('.rdv_info')) {
      this.displayDetailsHandler(rdvElt);
    }
  }

  displayDetailsHandler(rdvElt) {
    rdvElt.hide_collapse = true;
    rdvElt.addEventListener('click', (e) => {
      if (e.target.classList[0] === 'checkbox') {
        return;
      }
      let rdvDetailsElt = e.currentTarget.querySelector('.rdv_details');
      if (rdvElt.hide_collapse) {
        rdvDetailsElt.classList.remove('hide_collapse');
        rdvElt.hide_collapse = !rdvElt.hide_collapse;
      } else {
        rdvDetailsElt.classList.add('hide_collapse');
        rdvElt.hide_collapse = !rdvElt.hide_collapse;
      }
    });
  }

  setActivePage() {
    let activeElts = document.querySelectorAll('#rdv [data-page="' + this.page + '"]'),
      currentActiveElts = document.querySelectorAll('#rdv .active');
    for (let i = 0; i < 2; i++) {
      currentActiveElts[i].classList.remove('active');
      activeElts[i].parentElement.classList.add('active');
    }
  }

  setPagination(elts, values) {
    for (let i = 0; i < elts.length; i++) {
      elts[i].dataset.page = values[i];
      elts[i].textContent = values[i];
    }
  }

  getNextPage(e) {
    e.preventDefault();
    if (this.page < this.numberOfPages) {
      this.page++;
      if (+this.Es.pagination_toppagination_nbaElts[2].dataset.page < this.page) {
        let values = [this.page - 2, this.page - 1, this.page];
        this.setPagination(this.Es.pagination_toppagination_nbaElts, values);
        this.setPagination(this.Es.pagination_bottompagination_nbaElts, values);
      }
      this.setActivePage();
      this.displayRdvList();
    }
  }

  getPage(e) {
    e.preventDefault();
    this.page = +e.currentTarget.dataset.page;
    this.setActivePage();
    this.displayRdvList();
  }

  getPreviousPage(e) {
    e.preventDefault();
    if (this.page > 1) {
      this.page--;
      if (+this.Es.pagination_toppagination_nbaElts[0].dataset.page > this.page) {
        let values = [this.page, this.page + 1, this.page + 2];
        this.setPagination(this.Es.pagination_toppagination_nbaElts, values);
        this.setPagination(this.Es.pagination_bottompagination_nbaElts, values);
      }
      this.setActivePage();
      this.displayRdvList();
    }
  }


  onRdvStatusFormSubmit(e) {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    this.app.rdvManager.changeRdvStatus(data, (res) => {
      for (let rdv of res.rdv) {
        let rdvElt = document.querySelector('[data-id="' + rdv + '"]');
        rdvElt.classList.remove(rdvElt.dataset.class);
        rdvElt.classList.add(rdvClassByRdvStatus[+res.rdv_status - 1]);
        rdvElt.dataset.class = rdvClassByRdvStatus[+res.rdv_status -1];
        rdvElt.querySelector('.status').textContent = status[+res.rdv_status - 1];
        rdvElt.querySelector('input').checked = false;
      }
      // console.log(res);
    }, (err) => {
      console.log(err);
    });
  }
}
