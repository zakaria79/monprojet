document.addEventListener('DOMContentLoaded', () => {
  const oldPass = document.querySelector('#old_password'),
    newPass = document.querySelector('#new_password'),
    newPassConfirm = document.querySelector('#new_password_confirm'),
    errorValidation = document.querySelector('#error_validation'),
    form = document.querySelector('form'),
    errorMessage = '';

  const valid = function(elt) {
    elt.classList.remove('is-invalid');
    elt.classList.add('is-valid');
  };

  const invalid = function(elt) {
    elt.classList.remove('is-valid');
    elt.classList.add('is-invalid');
  };

  newPassConfirm.addEventListener('input', (e) => {
    if (e.currentTarget.value === newPass.value) {
      valid(e.currentTarget);
      return;
    }
    invalid(e.currentTarget);
  });

  newPass.addEventListener('input', (e) => {
    if (e.currentTarget.value.length < 8) {
      invalid(e.currentTarget);
      return;
    }
    valid(e.currentTarget);
  });

  const displayErrorMessage = function() {
    errorValidation.hidden = false;
    window.setTimeout(() => {
      errorValidation.hidden = true;
    }, 10000);
  };

  form.addEventListener('submit', (e) => {
    let error = false;
    if (newPass.value.length < 8) {
      error = true;
      errorValidation.innerHTML = 'Votre mot de passe doit contenir au moins 8 caractères'; 
    }
    if (newPass.value !== newPassConfirm.value) {
      error = true;
      errorValidation.innerHTML = 'Les deux mots de passe sont différents';
    }
    if (error) {
      e.preventDefault();
      displayErrorMessage();
      errorValidation.hidden = false;
    }
  });
});
