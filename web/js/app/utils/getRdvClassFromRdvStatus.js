export default function(status) {
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
