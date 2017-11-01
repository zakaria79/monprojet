import getRdvClassFromRdvStatus from './../../../../utils/getRdvClassFromRdvStatus';
import {
  rdvClassByRdvStatus,
  status
} from './../../../../utils/rdv/status';
import {
  dateAndHourToStringFromDateObject
} from './../../../../../date/dateAndHourToStringFromDateObject';

export default class DisplayDevis {
  constructor(app) {
    this.app = app;
    this.dem = app.dem;
    this.dem.setElement(['#devis_accordion', '#devis_data', '#error_message', '#devis_pagination_top', '#devis_pagination_bottom', '#devis_delete', '#rdv', '#rdv_list']);
    this.dem.setElements(['#devis_pagination_top .pagination_nb a', '#devis_pagination_bottom .pagination_nb a']);
    this.Es = this.dem.getElements();
    this.page = 1;
  }

  display(e) {
    e.preventDefault();
    this.app.pm.changePage(this.Es.devis_dataElt);
    this.displayDevisList();
  }

  displayDevisList() {
    this.Es.devis_accordionElt.innerHTML = '';
    this.Es.devis_pagination_topElt.hidden = true;
    this.Es.devis_pagination_bottomElt.hidden = true;
    this.app.devisManager.getDevis(
      this.page,
      (devisData, totalDevis) => {
        if (devisData) {
          this.Es.devis_deleteElt.hidden = false;
          for (let devData of devisData) {
            this.displayDevisHandler(devData);
          }
          if (totalDevis > 10) {
            this.setTotalDevis(totalDevis);
          }
          return;
        }
        this.Es.devis_accordionElt.innerHTML = ` <h2>Il n'y a pas encore de Devis</h2>`;
      }, (err = 'Une erreur est survenue lors de la requête vers le serveur') => {
        this.Es.error_messageElt.innerHTML = err;
        this.Es.error_messageElt.classList.remove('hide');
        window.setTimeout(() => {
          this.Es.error_messageElt.classList.add('hide');
        }, 10000);
      });
  }

  setTotalDevis(totalDevis) {
    this.totalDevis = totalDevis;
    this.Es.devis_pagination_topElt.hidden = false;
    this.Es.devis_pagination_bottomElt.hidden = false;
    this.numberOfPages = Math.ceil(totalDevis / 10);
    this.Es.devis_pagination_toppagination_nbaElts[2].parentElement.hidden = this.numberOfPages < 3 ? true : false;
    this.Es.devis_pagination_bottompagination_nbaElts[2].parentElement.hidden = this.numberOfPages < 3 ? true : false;
  }

  displayDevisHandler(devis) {
    this.Es.devis_accordionElt.innerHTML += `
      <div class="card" data-id="${devis.Id}">
        <div class="card-header" role="tab" id="headingOne${devis.Id}">
          <h5 class="mb-0">
            <div class="d-flex justify-content-between">
              <a class="collapsed" data-toggle="collapse" href="#collapseOne${devis.Id}" aria-expanded="false" aria-controls="collapseOne${devis.Id}">
                <strong class="title"> ${devis.insuranceTypeTitle} </strong> - ${devis.dateCreation.toLocaleString()}
              </a>
              <div class="checkbox"><input class="checkbox" type="checkbox" name="devis[]" value="${devis.Id}"></div>
            </div>
          </h5>
        </div>
        <div id="collapseOne${devis.Id}" class="collapse" role="tabpanel" aria-labelledby="headingOne${devis.Id}" data-parent="#devis_accordion">
          <div class="card-body">
            ${devis.getText()}
          </div>
        </div>
      </div>
    `;
  }

  setActivePage() {
    let activeElts = document.querySelectorAll('#devis_data [data-page="' + this.page + '"]'),
      currentActiveElts = document.querySelectorAll('#devis_data .active');
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
      if (+this.Es.devis_pagination_toppagination_nbaElts[2].dataset.page < this.page) {
        let values = [this.page - 2, this.page - 1, this.page];
        this.setPagination(this.Es.devis_pagination_toppagination_nbaElts, values);
        this.setPagination(this.Es.devis_pagination_bottompagination_nbaElts, values);
      }
      this.setActivePage();
      this.displayDevisList();
    }
  }

  getPage(e) {
    e.preventDefault();
    this.page = +e.currentTarget.dataset.page;
    this.setActivePage();
    this.displayDevisList();
  }

  getPreviousPage(e) {
    e.preventDefault();
    if (this.page > 1) {
      this.page--;
      if (+this.Es.devis_pagination_toppagination_nbaElts[0].dataset.page > this.page) {
        let values = [this.page, this.page + 1, this.page + 2];
        this.setPagination(this.Es.devis_pagination_toppagination_nbaElts, values);
        this.setPagination(this.Es.devis_pagination_bottompagination_nbaElts, values);
      }
      this.setActivePage();
      this.displayDevisList();
    }
  }


  onDevisFormSubmit(e) {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    this.app.devisManager.deleteDevis(data, (res) => {
      for (let devisId of res.devis) {
        let devisElt = document.querySelector('.card[data-id="' + devisId + '"]');
        devisElt.parentElement.removeChild(devisElt);
      }
    }, (err) => {
    });
  }
}
