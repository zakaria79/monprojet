export const displayRdvDetailsHandler = function() {
  for (let rdvElt of document.querySelectorAll('.rdv_info')) {
    this.displayDetails(rdvElt);
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
