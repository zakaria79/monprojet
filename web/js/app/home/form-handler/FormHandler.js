import Xhr from './../../../xhr/Xhr';

export default class FormHandler {
  constructor() {
    let xhr = new Xhr();
    this.req = xhr.getXhr();
    // Lors du changement du select "type assurance"
    $('.type-assurance').on('change', this.onChangeTypeInsurance.bind(this));
    // Ajoute un tiret entre deux chiffres et empèche l'utilisateur de taper plus de 10 chiffres
    document.querySelector('#tel').addEventListener('input', this.setDashAndLimit.bind(this));
    // Valide le numéro de téléphone
    $('#tel').on('input', this.validTelephoneNumber.bind(this));
    $('#datepicker').on('input', this.validDate.bind(this));
    // Valide l'adresse mail pendant que l'utilisateur tape
    $('#email').on('input', this.validEmail.bind(this));
    // Lors de la soumission du formulaire
    $('#formulaire').on('submit', this.onSubmit.bind(this));
  }

  validDate(e) {
    if (this.testDate(e.currentTarget.value)) {
      this.valid(e.currentTarget);
    } else {
      this.invalid(e.currentTarget);
    }
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.validateEmail($('#email').val())) {
      this.setErrorMessage('L\'adresse email est invalide');
      return;
    }
    if (!this.testTelPattern($('#tel').val())) {
      this.setErrorMessage('Le numéro de téléphone est invalide');
      return;
    }
    if (!this.testDate($('#datepicker').val())) {
      this.setErrorMessage('La date de naissance est innvalide');
      return;
    }
    $('#formulaire button[type="submit"]').text('Envoie...').prop('disabled', true);
    let data = new FormData(e.currentTarget);
    if ($('#type-assurance').val() === 'sante') {
      for (let type of this.getSanteStarsData(['hospitalisation', 'optique', 'medecine', 'dentaire'])) {
        data.append(type.name, type.starNumber);
      }
    }
    this.req.open('POST', '/devis');
    this.req.onreadystatechange = () => {
      if (this.req.readyState === XMLHttpRequest.DONE) {
        if (this.req.status === 200) {
          $('#form_devis_success_message')
            .text('Merci, votre formulaire à bien été envoyé, un conseillé va vous contacter pour vous proposer la meilleur solution à votre besoin')
            .fadeIn()
            .delay('5000')
            .fadeOut();
          window.setTimeout(() => {
            $('#formulaire button[type="submit"]').text('Valider mes informations').prop('disabled', false);
          }, 3000);
          window.setTimeout(() => {
            $('#collapseFormDevis').collapse('hide');
          }, 5000);
        } else {
          this.setErrorMessage('Le formulaire n\a pas pu être envoyé');
          window.setTimeout(() => {
            $('#formulaire button[type="submit"]').text('Valider mes informations').prop('disabled', false);
          }, 3000);
        }
      }
    };
    this.req.send(data);
  }

  getSanteStarsData(types) {
    let typesDataArray = [],
      type, elts;
    for (type of types) {
      elts = $(`#${type}-star .star-selected`).get();
      typesDataArray.push({
        name: type,
        starNumber: elts.length
      });
    }
    return typesDataArray;
  }

  setErrorMessage(mess) {
    $('.form-message.alert-danger').fadeIn().text(mess).delay('10000').fadeOut();
  }

  onChangeTypeInsurance(e) {
    let value = e.currentTarget.value;
    $('.questions').hide();
    $('.questions-' + e.currentTarget.value).show();
  }

  validEmail(e) {
    if (this.validateEmail(e.currentTarget.value)) {
      this.valid(e.currentTarget);
      return;
    }
    this.invalid(e.currentTarget);
  }

  validateEmail(value) {
    return /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(value);
  }

  validTelephoneNumber(e) {
    e.currentTarget.value = e.currentTarget.value.replace(/-/g, '');
    e.currentTarget.value = e.currentTarget.value.replace(/(\d{2})/g, '$1-');
    e.currentTarget.value = e.currentTarget.value.replace(/-$/, '');
    if (this.testTelPattern(e.currentTarget.value)) {
      this.valid(e.currentTarget);
    } else {
      this.invalid(e.currentTarget);
    }
  }

  setDashAndLimit(e) {
    let val = e.currentTarget.value,
      len = val.replace(/-/g, '').length;
    if (!/[0-9]/.test(val.charAt(val.length - 1)) || len > 10) {
      e.currentTarget.value = val.substring(0, val.length - 1);
    }
  }

  invalid(elt) {
    elt.classList.remove('is-valid');
    elt.classList.add('is-invalid');
  }

  valid(elt) {
    elt.classList.remove('is-invalid');
    elt.classList.add('is-valid');
  }

  testTelPattern(text) {
    return /^0\d([-\s.]?(\d){2}){4}$/.test(text);
  }
  testDate(date) {
    return /^[0-3][0-9]\/[01]?[0-9]\/[12][09]\d{2}$/.test(date);
  }
}
