import getRdvClassFromRdvStatus from './../getRdvClassFromRdvStatus';
import { dateAndHourToStringFromDateObject } from './../../../date/dateAndHourToStringFromDateObject';

export const displayRdvHandler = function(rdvData, elt) {
  let { rdv, user } = rdvData;
  elt.innerHTML += `
    <div class="rdv_info">
      <div class="alert ${getRdvClassFromRdvStatus(rdv.status)} info" data-id="${rdv.id}">
        <strong class="title">${rdv.clientName} ${rdv.clientFirstName} </strong> -
        ${dateAndHourToStringFromDateObject(rdv.start.date)} -
        <small><em>${rdv.status}</em></small>
      </div>
      <div class="rdv_details hide_collapse">
        <div><a href="mailto:${rdv.clientEmail}">${rdv.clientEmail}</a></div>
        <div><a href="tel:${rdv.clientTel}">${rdv.clientTel}</a></div>
        <div>${rdv.object}</div>
      </div>
    </div>
  `;
  for (let rdvElt of document.querySelectorAll('.rdv_info')) {
    displayDetailsHandler(rdvElt);
  }
};

const displayDetailsHandler = function(rdvElt) {
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
};
