import EventManager from './../event/EventManager';

export default class ReportingModule {

  constructor(app) {
    this.app = app;
    this.dm = app.dm;
    this.em = new EventManager(app);
    this.dm.setElement(['#rdv_sold', '#pagination_top', '#pagination_bottom', '#rdv_content', '#paye', '#apayer', '#reporting', '#calendar']);
    this.Es = this.dm.setElements(['#pagination_top .pagination_nb a', '#pagination_bottom .pagination_nb a']);
    this.Es = this.dm.getElements();
    this.page = 1;
  }

  getClassFromStatus(status) {
    let rdvClass;
    switch (status) {
      case 'à venir':
        rdvClass = 'alert-primary';
        break;
      case 'annulé':
        rdvClass = 'alert-danger';
        break;
      case 'à payer':
        rdvClass = 'alert-info';
        break;
      case 'payé':
        rdvClass = 'alert-success';
        break;
      case 'sans issue':
        rdvClass = 'alert-warning';
        break;
    }
    return rdvClass;
  }

  setActivePage() {
    let activeElts = document.querySelectorAll('[data-page="'+this.page+'"]'),
      currentActiveElts = document.querySelectorAll('.active');
    for(let i = 0; i < 2; i++) {
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
        let values = [this.page -2, this.page -1, this.page];
        this.setPagination(this.Es.pagination_toppagination_nbaElts, values);
        this.setPagination(this.Es.pagination_bottompagination_nbaElts, values);
      }
      this.setActivePage();
      this.refresh();
    }
  }

  getPage(e) {
    e.preventDefault();
    this.page = +e.currentTarget.dataset.page;
    this.setActivePage();
    this.refresh();
  }

  getPreviousPage(e) {
    e.preventDefault();
    if (this.page > 1) {
      this.page--;
      if (+this.Es.pagination_toppagination_nbaElts[0].dataset.page > this.page) {
        let values = [this.page, this.page +1, this.page +2];
        this.setPagination(this.Es.pagination_toppagination_nbaElts, values);
        this.setPagination(this.Es.pagination_bottompagination_nbaElts, values);
      }
      this.setActivePage();
      this.refresh();
    }
  }

  setTotalRdv(totalRdv) {
    this.totalRdv = totalRdv;
    this.Es.pagination_topElt.hidden = false;
    this.Es.pagination_bottomElt.hidden = false;
    this.numberOfPages = Math.ceil(totalRdv / 10);
    this.Es.pagination_toppagination_nbaElts[2].parentElement.hidden = this.numberOfPages < 3 ? true : false;
    this.Es.pagination_bottompagination_nbaElts[2].parentElement.hidden = this.numberOfPages < 3 ? true : false;
  }

  setSolde(paye, apayer) {
    this.Es.rdv_soldElt.innerHTML = '';
    if (+paye > 0) {
      this.Es.rdv_soldElt.innerHTML += `
        <div class="alert alert-success text-right" role="alert">
          <strong>Payé : </strong> <em>${+paye * 20} euros</em>
        </div>
        `;
    }
    if (+apayer > 0) {
      this.Es.rdv_soldElt.innerHTML += `
        <div class="alert alert-info text-right" role="alert">
          <strong>À payé : </strong> <em>${+apayer * 20} euros</em>
        </div>
        `;
    }
  }

  setRdvs(rdvs) {
    let rdv;
    for (rdv of rdvs) {
      this.Es.rdv_contentElt.innerHTML += `
        <div class="rdv_info">
          <div class="alert ${this.getClassFromStatus(rdv.status)} info" data-id="${rdv.id}">
            <strong class="title">${rdv.clientName} ${rdv.clientFirstName} </strong> -
            ${this.app.dateManager.getStringDateAndHourFromDateObject(rdv.start.date)} -
            <small><em>${rdv.status}</em></small>
          </div>
          <div class="rdv_details hide_collapse">
            <div><a href="mailto:${rdv.clientEmail}">${rdv.clientEmail}</a></div>
            <div><a href="tel:${rdv.clientTel}">${rdv.clientTel}</a></div>
            <div>${rdv.object}</div>
          </div>
        </div>
        `;
    }
    for (let rdvElt of document.querySelectorAll('.rdv_info')) {
      this.displayDetails(rdvElt);
    }
  }

  refresh() {
    let event;
    this.Es.rdv_contentElt.innerHTML = '';
    this.Es.pagination_topElt.hidden = true;
    this.Es.pagination_bottomElt.hidden = true;
    this.em.getEvents(
      this.page,
      (events, apayer, totalRdv) => {
        if (totalRdv) {
          this.setTotalRdv(totalRdv);
        }
        if (apayer) {
          this.setSolde(apayer[1].apayer, apayer[0].apayer);
        }
        if (events) {
          this.setRdvs(events);
        }
      },
      (res) => {
        console.log(res);
      }
    );
  }

  display() {
    this.dm.fadeIn(this.Es.reportingElt);
    this.dm.fadeOut(this.Es.calendarElt);
    this.refresh();
  }

  displayDetails(rdvElt) {
    rdvElt.hide_collapse = true;
    rdvElt.addEventListener('click', (e) => {
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
}
