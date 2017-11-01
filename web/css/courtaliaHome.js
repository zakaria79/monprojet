/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var xhr = function () {
  function xhr() {
    _classCallCheck(this, xhr);

    this.xhr = false;
  }

  _createClass(xhr, [{
    key: "getXhr",
    value: function getXhr() {
      if (this.xhr) {
        return this.xhr;
      }
      if (window.XMLHttpRequest) {
        this.xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        try {
          this.xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
          try {
            this.xhr = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (e) {}
        }
      }
      if (!this.xhr) {
        alert('Abandon : Impossible de crée une instance XMLHTTP');
        return false;
      }
      return this.xhr;
    }
  }, {
    key: "sendContact",
    value: function sendContact(data, callback) {
      var req = this.req();
      req.open('POST', 'contact');
      req.onreadystatechange = function () {
        if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
          callback(req.responseText);
        }
      };
      req.send(data);
    }
  }]);

  return xhr;
}();

exports.default = xhr;

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _StarHandler = __webpack_require__(23);

var _StarHandler2 = _interopRequireDefault(_StarHandler);

var _ScrollHandler = __webpack_require__(24);

var _ScrollHandler2 = _interopRequireDefault(_ScrollHandler);

var _FormHandler = __webpack_require__(25);

var _FormHandler2 = _interopRequireDefault(_FormHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var starHandler = new _StarHandler2.default(),
      srollHandler = new _ScrollHandler2.default(),
      formHandler = new _FormHandler2.default();
  $(function () {
    $("#datepicker").datepicker({
      changeMonth: true,
      changeYear: true
    });
  });
});

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StarHandler = function () {
  function StarHandler() {
    _classCallCheck(this, StarHandler);

    this.faStar = document.querySelectorAll('.fa-star');
    this.stars = document.querySelectorAll('.stars');

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.faStar[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var faStar = _step.value;

        faStar.addEventListener('mouseover', this.starHover.bind(this));
        faStar.addEventListener('click', this.starSelected.bind(this));
        faStar.addEventListener('mouseleave', this.starLeave.bind(this));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  _createClass(StarHandler, [{
    key: 'addPrevAll',
    value: function addPrevAll(element, classToAdd) {
      element.classList.add(classToAdd);
      var prevSibling = element.previousElementSibling;
      while (null != prevSibling) {
        prevSibling.classList.add(classToAdd);
        prevSibling = prevSibling.previousElementSibling;
      }
    }
  }, {
    key: 'removeNexAll',
    value: function removeNexAll(element, classToRemove) {
      var nextSibling = element.nextElementSibling;
      while (null != nextSibling) {
        nextSibling.classList.remove(classToRemove);
        nextSibling = nextSibling.nextElementSibling;
      }
    }
  }, {
    key: 'starHover',
    value: function starHover(e) {
      this.addPrevAll(e.target, 'star-hover');
    }
  }, {
    key: 'starSelected',
    value: function starSelected(e) {
      this.addPrevAll(e.target, 'star-selected');
      this.removeNexAll(e.target, 'star-selected');
    }
  }, {
    key: 'starLeave',
    value: function starLeave() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.faStar[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var faStar = _step2.value;

          faStar.classList.remove('star-hover');
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }]);

  return StarHandler;
}();

exports.default = StarHandler;

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScrollHandler = function () {
  function ScrollHandler() {
    _classCallCheck(this, ScrollHandler);

    this.topHeader = $('nav').offset().top;
    this.separateur1 = document.querySelector('div.separateur');
    $('.scrollTop').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 800);
    });
    $('.nav-link').on('click', function (e) {
      e.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top - 40
      }, 800);
    });
    $('.devis-pros-part').on('click', function (e) {
      e.preventDefault();
      $('#collapseFormDevis').collapse('show');
      $('html, body').animate({
        scrollTop: $('#formulaire').offset().top - 200
      }, 800, function () {
        var value = e.currentTarget.dataset.type;
        $('input#' + value).prop('checked', true);
      });
    });
    $(window).on('scroll', this.logoCurrent.bind(this));
    $('.btn-devis .devis').on('click', function (e) {
      $('#collapseFormDevis').collapse('show');
      $('html, body').animate({
        scrollTop: $('#formulaire').offset().top - 80
      }, 800, function () {
        var value = e.target.dataset.type;
        $('.type-assurance').val(value);
        $('.questions').hide();
        $('.questions-' + value).show();
      });
    });
    $('.questions-sante').show();
    $('.type-assurance').val('sante');
  }

  _createClass(ScrollHandler, [{
    key: 'headerStyle',
    value: function headerStyle() {
      if ($('nav').length) {
        var windowpos = $(window).scrollTop();
        if (windowpos >= this.topHeader) {
          $('nav').addClass('fixed');
          $(this.separateur1).addClass('margin-top');
        } else {
          $('nav').removeClass('fixed');
          $(this.separateur1).removeClass('margin-top');
        }
      }
    }
  }, {
    key: 'logoCurrent',
    value: function logoCurrent() {
      $('.rubrique').each(function () {
        if ($(this).offset().top - 200 <= $(window).scrollTop() && $(this).height() + $(this).offset().top >= $(window).scrollTop()) {
          $('.logos').removeClass('current');
          $('.' + $(this).attr('id')).addClass('current');
        }
      });
      this.headerStyle();
    }
  }]);

  return ScrollHandler;
}();

exports.default = ScrollHandler;

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Xhr = __webpack_require__(0);

var _Xhr2 = _interopRequireDefault(_Xhr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormHandler = function () {
  function FormHandler() {
    _classCallCheck(this, FormHandler);

    var xhr = new _Xhr2.default();
    this.req = xhr.getXhr();
    // Lors du changement du select "type assurance"
    $('.type-assurance').on('change', this.onChangeTypeInsurance.bind(this));
    // Ajoute un tiret entre deux chiffres et empèche l'utilisateur de taper plus de 10 chiffres
    $('#tel').on('keypress', this.setDashAndLimit.bind(this));
    // Valide le numéro de téléphone
    $('#tel').on('input', this.validTelephoneNumber.bind(this));
    // Date picker pour empècher l'utilisateur de 
    $('#datepicker').on('input', function (e) {
      e.preventDefault();
    });
    // Valide l'adresse mail pendant que l'utilisateur tape
    $('#email').on('input', this.validEmail.bind(this));
    // Lors de la soumission du formulaire
    $('#formulaire').on('submit', this.onSubmit.bind(this));
  }

  _createClass(FormHandler, [{
    key: 'onSubmit',
    value: function onSubmit(e) {
      var _this = this;

      e.preventDefault();
      if (!this.validateEmail($('#email').val())) {
        this.setErrorMessage('L\'adresse email est invalide');
        return;
      }
      if (!this.testTelPattern($('#tel').val())) {
        this.setErrorMessage('Le numéro de téléphone est invalide');
        return;
      }
      var data = new FormData(e.currentTarget);
      if ($('#type-assurance').val() === 'sante') {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.getSanteStarsData(['hospitalisation', 'optique', 'medecine', 'dentaire'])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var type = _step.value;

            data.append(type.name, type.starNumber);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
      this.req.open('POST', 'devis');
      this.req.onreadystatechange = function () {
        if (_this.req.readyState === XMLHttpRequest.DONE) {
          if (_this.req.status === 200) {
            // Succes
          } else {
              // Erreur
            }
        }
      };
      this.req.send(data);
    }
  }, {
    key: 'getSanteStarsData',
    value: function getSanteStarsData(types) {
      var typesDataArray = [],
          type = void 0,
          elts = void 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = types[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          type = _step2.value;

          elts = $('#' + type + '-star .star-selected').get();
          typesDataArray.push({
            name: type,
            starNumber: elts.length
          });
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return typesDataArray;
    }
  }, {
    key: 'setErrorMessage',
    value: function setErrorMessage(mess) {
      $('.form-message.alert-danger').fadeIn().text(mess).delay('10000').fadeOut();
    }
  }, {
    key: 'onChangeTypeInsurance',
    value: function onChangeTypeInsurance(e) {
      var value = e.currentTarget.value;
      $('.questions').hide();
      $('.questions-' + e.currentTarget.value).show();
    }
  }, {
    key: 'validEmail',
    value: function validEmail(e) {
      if (this.validateEmail(e.currentTarget.value)) {
        this.valid(e.currentTarget);
        return;
      }
      this.invalid(e.currentTarget);
    }
  }, {
    key: 'validateEmail',
    value: function validateEmail(value) {
      return (/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(value)
      );
    }
  }, {
    key: 'validTelephoneNumber',
    value: function validTelephoneNumber(e) {
      if (this.testTelPattern(e.currentTarget.value)) {
        this.valid(e.currentTarget);
      } else {
        this.invalid(e.currentTarget);
      }
    }
  }, {
    key: 'setDashAndLimit',
    value: function setDashAndLimit(e) {
      var value = e.currentTarget.value,
          len = value.replace(/-/g, '').length;
      if (!/[0-9]/.test(e.key) || len === 10) {
        e.preventDefault();
      }
      if (len < 10 && /\d{2}/.test(value.substr(value.length - 2, 2))) {
        e.currentTarget.value += '-';
      }
    }
  }, {
    key: 'invalid',
    value: function invalid(elt) {
      elt.classList.remove('is-valid');
      elt.classList.add('is-invalid');
    }
  }, {
    key: 'valid',
    value: function valid(elt) {
      elt.classList.remove('is-invalid');
      elt.classList.add('is-valid');
    }
  }, {
    key: 'testTelPattern',
    value: function testTelPattern(text) {
      return (/^0\d([-\s.]?(\d){2}){4}$/.test(text)
      );
    }
  }]);

  return FormHandler;
}();

exports.default = FormHandler;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmU4OTc0NTEyYTdmN2ZhOGIzYzciLCJ3ZWJwYWNrOi8vLy4vd2ViL2pzL3hoci9YaHIuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2pzL2FwcC9ob21lL2luZGV4LmpzIiwid2VicGFjazovLy8uL3dlYi9qcy9hcHAvaG9tZS9zdGFyLWhhbmRsZXIvU3RhckhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2pzL2FwcC9ob21lL3Njcm9sbC1oYW5kbGVyL1Njcm9sbEhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2pzL2FwcC9ob21lL2Zvcm0taGFuZGxlci9Gb3JtSGFuZGxlci5qcyJdLCJuYW1lcyI6WyJ4aHIiLCJ3aW5kb3ciLCJYTUxIdHRwUmVxdWVzdCIsIkFjdGl2ZVhPYmplY3QiLCJlIiwiYWxlcnQiLCJkYXRhIiwiY2FsbGJhY2siLCJyZXEiLCJvcGVuIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsIkRPTkUiLCJzdGF0dXMiLCJyZXNwb25zZVRleHQiLCJzZW5kIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwic3RhckhhbmRsZXIiLCJzcm9sbEhhbmRsZXIiLCJmb3JtSGFuZGxlciIsIiQiLCJkYXRlcGlja2VyIiwiY2hhbmdlTW9udGgiLCJjaGFuZ2VZZWFyIiwiU3RhckhhbmRsZXIiLCJmYVN0YXIiLCJxdWVyeVNlbGVjdG9yQWxsIiwic3RhcnMiLCJzdGFySG92ZXIiLCJiaW5kIiwic3RhclNlbGVjdGVkIiwic3RhckxlYXZlIiwiZWxlbWVudCIsImNsYXNzVG9BZGQiLCJjbGFzc0xpc3QiLCJhZGQiLCJwcmV2U2libGluZyIsInByZXZpb3VzRWxlbWVudFNpYmxpbmciLCJjbGFzc1RvUmVtb3ZlIiwibmV4dFNpYmxpbmciLCJuZXh0RWxlbWVudFNpYmxpbmciLCJyZW1vdmUiLCJhZGRQcmV2QWxsIiwidGFyZ2V0IiwicmVtb3ZlTmV4QWxsIiwiU2Nyb2xsSGFuZGxlciIsInRvcEhlYWRlciIsIm9mZnNldCIsInRvcCIsInNlcGFyYXRldXIxIiwicXVlcnlTZWxlY3RvciIsIm9uIiwicHJldmVudERlZmF1bHQiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiaGFzaCIsImNvbGxhcHNlIiwidmFsdWUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInR5cGUiLCJwcm9wIiwibG9nb0N1cnJlbnQiLCJ2YWwiLCJoaWRlIiwic2hvdyIsImxlbmd0aCIsIndpbmRvd3BvcyIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJlYWNoIiwiaGVpZ2h0IiwiYXR0ciIsImhlYWRlclN0eWxlIiwiRm9ybUhhbmRsZXIiLCJnZXRYaHIiLCJvbkNoYW5nZVR5cGVJbnN1cmFuY2UiLCJzZXREYXNoQW5kTGltaXQiLCJ2YWxpZFRlbGVwaG9uZU51bWJlciIsInZhbGlkRW1haWwiLCJvblN1Ym1pdCIsInZhbGlkYXRlRW1haWwiLCJzZXRFcnJvck1lc3NhZ2UiLCJ0ZXN0VGVsUGF0dGVybiIsIkZvcm1EYXRhIiwiZ2V0U2FudGVTdGFyc0RhdGEiLCJhcHBlbmQiLCJuYW1lIiwic3Rhck51bWJlciIsInR5cGVzIiwidHlwZXNEYXRhQXJyYXkiLCJlbHRzIiwiZ2V0IiwicHVzaCIsIm1lc3MiLCJmYWRlSW4iLCJ0ZXh0IiwiZGVsYXkiLCJmYWRlT3V0IiwidmFsaWQiLCJpbnZhbGlkIiwidGVzdCIsImxlbiIsInJlcGxhY2UiLCJrZXkiLCJzdWJzdHIiLCJlbHQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEw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QUFDQWlFLFVBQUl4RSxTQUFKLENBQWNDLEdBQWQsQ0FBa0IsVUFBbEI7QUFDRDs7O21DQUVjNkQsSSxFQUFNO0FBQ25CLGFBQU8sNEJBQTJCSyxJQUEzQixDQUFnQ0wsSUFBaEM7QUFBUDtBQUNEOzs7Ozs7a0JBbkhrQnRCLFciLCJmaWxlIjoiY291cnRhbGlhSG9tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyZTg5NzQ1MTJhN2Y3ZmE4YjNjNyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHhociB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy54aHIgPSBmYWxzZTtcbiAgfVxuXG4gIGdldFhociAoKSB7XG4gICAgaWYgKHRoaXMueGhyKSB7XG4gICAgICByZXR1cm4gdGhpcy54aHI7XG4gICAgfVxuICAgIGlmICh3aW5kb3cuWE1MSHR0cFJlcXVlc3QpIHtcbiAgICAgIHRoaXMueGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgfSBlbHNlIGlmICh3aW5kb3cuQWN0aXZlWE9iamVjdCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy54aHIgPSBuZXcgQWN0aXZlWE9iamVjdChcIk1zeG1sMi5YTUxIVFRQXCIpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMueGhyID0gbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF0aGlzLnhocikge1xuICAgICAgYWxlcnQoJ0FiYW5kb24gOiBJbXBvc3NpYmxlIGRlIGNyw6llIHVuZSBpbnN0YW5jZSBYTUxIVFRQJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnhocjtcbiAgfVxuXG4gIHNlbmRDb250YWN0IChkYXRhLCBjYWxsYmFjaykge1xuICAgIGxldCByZXEgPSB0aGlzLnJlcSgpO1xuICAgIHJlcS5vcGVuKCdQT1NUJywnY29udGFjdCcpO1xuICAgIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAocmVxLnJlYWR5U3RhdGUgPT09IFhNTEh0dHBSZXF1ZXN0LkRPTkUgJiYgcmVxLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgIGNhbGxiYWNrKHJlcS5yZXNwb25zZVRleHQpO1xuICAgICAgfVxuICAgIH07XG4gICAgcmVxLnNlbmQoZGF0YSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9qcy94aHIvWGhyLmpzIiwiaW1wb3J0IFN0YXJIYW5kbGVyIGZyb20gJy4vc3Rhci1oYW5kbGVyL1N0YXJIYW5kbGVyLmpzJztcbmltcG9ydCBTY3JvbGxIYW5kbGVyIGZyb20gJy4vc2Nyb2xsLWhhbmRsZXIvU2Nyb2xsSGFuZGxlci5qcyc7XG5pbXBvcnQgRm9ybUhhbmRsZXIgZnJvbSAnLi9mb3JtLWhhbmRsZXIvRm9ybUhhbmRsZXIuanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBsZXQgc3RhckhhbmRsZXIgPSBuZXcgU3RhckhhbmRsZXIoKSxcbiAgICBzcm9sbEhhbmRsZXIgPSBuZXcgU2Nyb2xsSGFuZGxlcigpLFxuICAgIGZvcm1IYW5kbGVyID0gbmV3IEZvcm1IYW5kbGVyKCk7XG4gICQoZnVuY3Rpb24oKSB7XG4gICAgJChcIiNkYXRlcGlja2VyXCIpLmRhdGVwaWNrZXIoe1xuICAgICAgY2hhbmdlTW9udGg6IHRydWUsXG4gICAgICBjaGFuZ2VZZWFyOiB0cnVlXG4gICAgfSk7XG4gIH0pO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvanMvYXBwL2hvbWUvaW5kZXguanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFySGFuZGxlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZmFTdGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZhLXN0YXInKTtcbiAgICB0aGlzLnN0YXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN0YXJzJyk7XG5cbiAgICBmb3IgKGxldCBmYVN0YXIgb2YgdGhpcy5mYVN0YXIpIHtcbiAgICAgIGZhU3Rhci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCB0aGlzLnN0YXJIb3Zlci5iaW5kKHRoaXMpKTtcbiAgICAgIGZhU3Rhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc3RhclNlbGVjdGVkLmJpbmQodGhpcykpO1xuICAgICAgZmFTdGFyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLnN0YXJMZWF2ZS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gIH1cblxuICBhZGRQcmV2QWxsKGVsZW1lbnQsIGNsYXNzVG9BZGQpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NUb0FkZCk7XG4gICAgbGV0IHByZXZTaWJsaW5nID0gZWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgIHdoaWxlIChudWxsICE9IHByZXZTaWJsaW5nKSB7XG4gICAgICBwcmV2U2libGluZy5jbGFzc0xpc3QuYWRkKGNsYXNzVG9BZGQpO1xuICAgICAgcHJldlNpYmxpbmcgPSBwcmV2U2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU5leEFsbChlbGVtZW50LCBjbGFzc1RvUmVtb3ZlKSB7XG4gICAgbGV0IG5leHRTaWJsaW5nID0gZWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgd2hpbGUgKG51bGwgIT0gbmV4dFNpYmxpbmcpIHtcbiAgICAgIG5leHRTaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NUb1JlbW92ZSk7XG4gICAgICBuZXh0U2libGluZyA9IG5leHRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZztcbiAgICB9XG4gIH1cblxuICBzdGFySG92ZXIoZSkge1xuICAgIHRoaXMuYWRkUHJldkFsbChlLnRhcmdldCwgJ3N0YXItaG92ZXInKTtcbiAgfVxuXG4gIHN0YXJTZWxlY3RlZChlKSB7XG4gICAgdGhpcy5hZGRQcmV2QWxsKGUudGFyZ2V0LCAnc3Rhci1zZWxlY3RlZCcpO1xuICAgIHRoaXMucmVtb3ZlTmV4QWxsKGUudGFyZ2V0LCAnc3Rhci1zZWxlY3RlZCcpO1xuICB9XG5cbiAgc3RhckxlYXZlKCkge1xuICAgIGZvciAobGV0IGZhU3RhciBvZiB0aGlzLmZhU3Rhcikge1xuICAgICAgZmFTdGFyLmNsYXNzTGlzdC5yZW1vdmUoJ3N0YXItaG92ZXInKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9qcy9hcHAvaG9tZS9zdGFyLWhhbmRsZXIvU3RhckhhbmRsZXIuanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JvbGxIYW5kbGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50b3BIZWFkZXIgPSAkKCduYXYnKS5vZmZzZXQoKS50b3A7XG4gICAgdGhpcy5zZXBhcmF0ZXVyMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5zZXBhcmF0ZXVyJyk7XG4gICAgJCgnLnNjcm9sbFRvcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICB9LCA4MDApO1xuICAgIH0pO1xuICAgICQoJy5uYXYtbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciBoYXNoID0gdGhpcy5oYXNoO1xuICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICBzY3JvbGxUb3A6ICQoaGFzaCkub2Zmc2V0KCkudG9wIC0gNDBcbiAgICAgIH0sIDgwMCk7XG4gICAgfSk7XG4gICAgJCgnLmRldmlzLXByb3MtcGFydCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQoJyNjb2xsYXBzZUZvcm1EZXZpcycpLmNvbGxhcHNlKCdzaG93Jyk7XG4gICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgIHNjcm9sbFRvcDogJCgnI2Zvcm11bGFpcmUnKS5vZmZzZXQoKS50b3AgLSAyMDBcbiAgICAgIH0sIDgwMCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnR5cGU7XG4gICAgICAgICQoJ2lucHV0IycgKyB2YWx1ZSkucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCB0aGlzLmxvZ29DdXJyZW50LmJpbmQodGhpcykpO1xuICAgICQoJy5idG4tZGV2aXMgLmRldmlzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgJCgnI2NvbGxhcHNlRm9ybURldmlzJykuY29sbGFwc2UoJ3Nob3cnKTtcbiAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgc2Nyb2xsVG9wOiAkKCcjZm9ybXVsYWlyZScpLm9mZnNldCgpLnRvcCAtIDgwXG4gICAgICB9LCA4MDAsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgdmFsdWUgPSBlLnRhcmdldC5kYXRhc2V0LnR5cGU7XG4gICAgICAgICQoJy50eXBlLWFzc3VyYW5jZScpLnZhbCh2YWx1ZSk7XG4gICAgICAgICQoJy5xdWVzdGlvbnMnKS5oaWRlKCk7XG4gICAgICAgICQoJy5xdWVzdGlvbnMtJyArIHZhbHVlKS5zaG93KCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICAkKCcucXVlc3Rpb25zLXNhbnRlJykuc2hvdygpO1xuICAgICQoJy50eXBlLWFzc3VyYW5jZScpLnZhbCgnc2FudGUnKTtcbiAgfVxuXG4gIGhlYWRlclN0eWxlKCkge1xuICAgIGlmICgkKCduYXYnKS5sZW5ndGgpIHtcbiAgICAgIGxldCB3aW5kb3dwb3MgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICBpZiAod2luZG93cG9zID49IHRoaXMudG9wSGVhZGVyKSB7XG4gICAgICAgICQoJ25hdicpLmFkZENsYXNzKCdmaXhlZCcpO1xuICAgICAgICAkKHRoaXMuc2VwYXJhdGV1cjEpLmFkZENsYXNzKCdtYXJnaW4tdG9wJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKCduYXYnKS5yZW1vdmVDbGFzcygnZml4ZWQnKTtcbiAgICAgICAgJCh0aGlzLnNlcGFyYXRldXIxKS5yZW1vdmVDbGFzcygnbWFyZ2luLXRvcCcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGxvZ29DdXJyZW50KCkge1xuICAgICQoJy5ydWJyaXF1ZScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoJCh0aGlzKS5vZmZzZXQoKS50b3AgLSAyMDAgPD0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpICYmICgkKHRoaXMpLmhlaWdodCgpICsgJCh0aGlzKS5vZmZzZXQoKS50b3ApID49ICQod2luZG93KS5zY3JvbGxUb3AoKSkge1xuICAgICAgICAkKCcubG9nb3MnKS5yZW1vdmVDbGFzcygnY3VycmVudCcpO1xuICAgICAgICAkKCcuJyArICQodGhpcykuYXR0cignaWQnKSkuYWRkQ2xhc3MoJ2N1cnJlbnQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmhlYWRlclN0eWxlKCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9qcy9hcHAvaG9tZS9zY3JvbGwtaGFuZGxlci9TY3JvbGxIYW5kbGVyLmpzIiwiaW1wb3J0IFhociBmcm9tICcuLy4uLy4uLy4uL3hoci9YaHInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtSGFuZGxlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGxldCB4aHIgPSBuZXcgWGhyKCk7XG4gICAgdGhpcy5yZXEgPSB4aHIuZ2V0WGhyKCk7XG4gICAgLy8gTG9ycyBkdSBjaGFuZ2VtZW50IGR1IHNlbGVjdCBcInR5cGUgYXNzdXJhbmNlXCJcbiAgICAkKCcudHlwZS1hc3N1cmFuY2UnKS5vbignY2hhbmdlJywgdGhpcy5vbkNoYW5nZVR5cGVJbnN1cmFuY2UuYmluZCh0aGlzKSk7XG4gICAgLy8gQWpvdXRlIHVuIHRpcmV0IGVudHJlIGRldXggY2hpZmZyZXMgZXQgZW1ww6hjaGUgbCd1dGlsaXNhdGV1ciBkZSB0YXBlciBwbHVzIGRlIDEwIGNoaWZmcmVzXG4gICAgJCgnI3RlbCcpLm9uKCdrZXlwcmVzcycsIHRoaXMuc2V0RGFzaEFuZExpbWl0LmJpbmQodGhpcykpO1xuICAgIC8vIFZhbGlkZSBsZSBudW3DqXJvIGRlIHTDqWzDqXBob25lXG4gICAgJCgnI3RlbCcpLm9uKCdpbnB1dCcsIHRoaXMudmFsaWRUZWxlcGhvbmVOdW1iZXIuYmluZCh0aGlzKSk7XG4gICAgLy8gRGF0ZSBwaWNrZXIgcG91ciBlbXDDqGNoZXIgbCd1dGlsaXNhdGV1ciBkZSBcbiAgICAkKCcjZGF0ZXBpY2tlcicpLm9uKCdpbnB1dCcsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gICAgLy8gVmFsaWRlIGwnYWRyZXNzZSBtYWlsIHBlbmRhbnQgcXVlIGwndXRpbGlzYXRldXIgdGFwZVxuICAgICQoJyNlbWFpbCcpLm9uKCdpbnB1dCcsIHRoaXMudmFsaWRFbWFpbC5iaW5kKHRoaXMpKTtcbiAgICAvLyBMb3JzIGRlIGxhIHNvdW1pc3Npb24gZHUgZm9ybXVsYWlyZVxuICAgICQoJyNmb3JtdWxhaXJlJykub24oJ3N1Ym1pdCcsIHRoaXMub25TdWJtaXQuYmluZCh0aGlzKSk7XG4gIH1cblxuICBvblN1Ym1pdChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghdGhpcy52YWxpZGF0ZUVtYWlsKCQoJyNlbWFpbCcpLnZhbCgpKSkge1xuICAgICAgdGhpcy5zZXRFcnJvck1lc3NhZ2UoJ0xcXCdhZHJlc3NlIGVtYWlsIGVzdCBpbnZhbGlkZScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMudGVzdFRlbFBhdHRlcm4oJCgnI3RlbCcpLnZhbCgpKSkge1xuICAgICAgdGhpcy5zZXRFcnJvck1lc3NhZ2UoJ0xlIG51bcOpcm8gZGUgdMOpbMOpcGhvbmUgZXN0IGludmFsaWRlJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBkYXRhID0gbmV3IEZvcm1EYXRhKGUuY3VycmVudFRhcmdldCk7XG4gICAgaWYgKCQoJyN0eXBlLWFzc3VyYW5jZScpLnZhbCgpID09PSAnc2FudGUnKSB7XG4gICAgICBmb3IgKGxldCB0eXBlIG9mIHRoaXMuZ2V0U2FudGVTdGFyc0RhdGEoWydob3NwaXRhbGlzYXRpb24nLCdvcHRpcXVlJywnbWVkZWNpbmUnLCdkZW50YWlyZSddKSkge1xuICAgICAgICBkYXRhLmFwcGVuZCh0eXBlLm5hbWUsIHR5cGUuc3Rhck51bWJlcik7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucmVxLm9wZW4oJ1BPU1QnLCAnZGV2aXMnKTtcbiAgICB0aGlzLnJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5yZXEucmVhZHlTdGF0ZSA9PT0gWE1MSHR0cFJlcXVlc3QuRE9ORSkge1xuICAgICAgICBpZiAodGhpcy5yZXEuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAvLyBTdWNjZXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBFcnJldXJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5yZXEuc2VuZChkYXRhKTtcbiAgfVxuXG4gIGdldFNhbnRlU3RhcnNEYXRhKHR5cGVzKSB7XG4gICAgbGV0IHR5cGVzRGF0YUFycmF5ID0gW10sXG4gICAgICB0eXBlLCBlbHRzO1xuICAgIGZvciAodHlwZSBvZiB0eXBlcykge1xuICAgICAgZWx0cyA9ICQoYCMke3R5cGV9LXN0YXIgLnN0YXItc2VsZWN0ZWRgKS5nZXQoKTtcbiAgICAgIHR5cGVzRGF0YUFycmF5LnB1c2goe1xuICAgICAgICBuYW1lOiB0eXBlLFxuICAgICAgICBzdGFyTnVtYmVyOiBlbHRzLmxlbmd0aFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0eXBlc0RhdGFBcnJheTtcbiAgfVxuXG4gIHNldEVycm9yTWVzc2FnZShtZXNzKSB7XG4gICAgJCgnLmZvcm0tbWVzc2FnZS5hbGVydC1kYW5nZXInKS5mYWRlSW4oKS50ZXh0KG1lc3MpLmRlbGF5KCcxMDAwMCcpLmZhZGVPdXQoKTtcbiAgfVxuXG4gIG9uQ2hhbmdlVHlwZUluc3VyYW5jZShlKSB7XG4gICAgbGV0IHZhbHVlID0gZS5jdXJyZW50VGFyZ2V0LnZhbHVlO1xuICAgICQoJy5xdWVzdGlvbnMnKS5oaWRlKCk7XG4gICAgJCgnLnF1ZXN0aW9ucy0nICsgZS5jdXJyZW50VGFyZ2V0LnZhbHVlKS5zaG93KCk7XG4gIH1cblxuICB2YWxpZEVtYWlsKGUpIHtcbiAgICBpZiAodGhpcy52YWxpZGF0ZUVtYWlsKGUuY3VycmVudFRhcmdldC52YWx1ZSkpIHtcbiAgICAgIHRoaXMudmFsaWQoZS5jdXJyZW50VGFyZ2V0KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5pbnZhbGlkKGUuY3VycmVudFRhcmdldCk7XG4gIH1cblxuICB2YWxpZGF0ZUVtYWlsKHZhbHVlKSB7XG4gICAgcmV0dXJuIC9eW2EtejAtOS5fLV0rQFthLXowLTkuXy1dezIsfVxcLlthLXpdezIsNH0kLy50ZXN0KHZhbHVlKTtcbiAgfVxuXG4gIHZhbGlkVGVsZXBob25lTnVtYmVyKGUpIHtcbiAgICBpZiAodGhpcy50ZXN0VGVsUGF0dGVybihlLmN1cnJlbnRUYXJnZXQudmFsdWUpKSB7XG4gICAgICB0aGlzLnZhbGlkKGUuY3VycmVudFRhcmdldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW52YWxpZChlLmN1cnJlbnRUYXJnZXQpO1xuICAgIH1cbiAgfVxuXG4gIHNldERhc2hBbmRMaW1pdChlKSB7XG4gICAgbGV0IHZhbHVlID0gZS5jdXJyZW50VGFyZ2V0LnZhbHVlLFxuICAgICAgbGVuID0gdmFsdWUucmVwbGFjZSgvLS9nLCAnJykubGVuZ3RoO1xuICAgIGlmICghL1swLTldLy50ZXN0KGUua2V5KSB8fCBsZW4gPT09IDEwKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGlmIChsZW4gPCAxMCAmJiAvXFxkezJ9Ly50ZXN0KHZhbHVlLnN1YnN0cih2YWx1ZS5sZW5ndGggLSAyLCAyKSkpIHtcbiAgICAgIGUuY3VycmVudFRhcmdldC52YWx1ZSArPSAnLSc7XG4gICAgfVxuICB9XG5cbiAgaW52YWxpZChlbHQpIHtcbiAgICBlbHQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtdmFsaWQnKTtcbiAgICBlbHQuY2xhc3NMaXN0LmFkZCgnaXMtaW52YWxpZCcpO1xuICB9XG5cbiAgdmFsaWQoZWx0KSB7XG4gICAgZWx0LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWludmFsaWQnKTtcbiAgICBlbHQuY2xhc3NMaXN0LmFkZCgnaXMtdmFsaWQnKTtcbiAgfVxuXG4gIHRlc3RUZWxQYXR0ZXJuKHRleHQpIHtcbiAgICByZXR1cm4gL14wXFxkKFstXFxzLl0/KFxcZCl7Mn0pezR9JC8udGVzdCh0ZXh0KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2pzL2FwcC9ob21lL2Zvcm0taGFuZGxlci9Gb3JtSGFuZGxlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=