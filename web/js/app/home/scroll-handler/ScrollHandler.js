export default class ScrollHandler {
  constructor() {
    this.topHeader = $('nav').offset().top;
    this.separateur1 = document.querySelector('div.separateur');
    $('.scrollTop').on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 800);
    });
    $('.nav-link').on('click', function(e) {
      e.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top - 40
      }, 800);
    });
    $('.devis-pros-part').on('click', function(e) {
      e.preventDefault();
      $('#collapseFormDevis').collapse('show');
      $('html, body').animate({
        scrollTop: $('#formulaire').offset().top - 200
      }, 800, function() {
        let value = e.currentTarget.dataset.type;
        $('input#' + value).prop('checked', true);
      });
    });
    $(window).on('scroll', this.logoCurrent.bind(this));
    $('.btn-devis .devis').on('click', function(e) {
      $('#collapseFormDevis').collapse('show');
      $('html, body').animate({
        scrollTop: $('#formulaire').offset().top - 80
      }, 800, function() {
        let value = e.target.dataset.type;
        $('.type-assurance').val(value);
        $('.questions').hide();
        $('.questions-' + value).show();
      });
    });
    $('.questions-sante').show();
    $('.type-assurance').val('sante');
  }

  headerStyle() {
    if ($('nav').length) {
      let windowpos = $(window).scrollTop();
      if (windowpos >= this.topHeader) {
        $('nav').addClass('fixed');
        $(this.separateur1).addClass('margin-top');
      } else {
        $('nav').removeClass('fixed');
        $(this.separateur1).removeClass('margin-top');
      }
    }
  }

  logoCurrent() {
    $('.rubrique').each(function() {
      if ($(this).offset().top - 200 <= $(window).scrollTop() && ($(this).height() + $(this).offset().top) >= $(window).scrollTop()) {
        $('.logos').removeClass('current');
        $('.' + $(this).attr('id')).addClass('current');
      }
    });
    this.headerStyle();
  }
}
