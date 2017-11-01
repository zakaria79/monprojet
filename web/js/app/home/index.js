import Tether from 'tether';
import bootstrap from 'bootstrap';
import StarHandler from './star-handler/StarHandler.js';
import ScrollHandler from './scroll-handler/ScrollHandler.js';
import FormHandler from './form-handler/FormHandler.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');
  let starHandler = new StarHandler(),
    srollHandler = new ScrollHandler(),
    formHandler = new FormHandler();
  $(function() {
    $("#datepicker").datepicker({
      changeMonth: true,
      changeYear: true,
      dayNamesMin: [ "Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa" ],
      firstDay: 1,
      monthNamesShort: [ "Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Dec" ],
      yearRange: "1900:+00",
      dateFormat: "dd/mm/yy"
    });
  });
});
