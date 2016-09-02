function MainManager_f() {

  this.init = function () {

    var scene = document.getElementById('parallax');
    if(scene != null) {
      var parallax = new Parallax(scene);
    }

    MainManager.initCounter();
    MainManager.initHeight();

    $('[data-btn-select]').selectpicker();

    $('[data-dropdown-menu]').click(function(event){

      if(event.target.className != 'close-icon') {
        event.stopPropagation();
      }

    });

    $('[data-scroll]').mCustomScrollbar({
      autoHideScrollbar: false,
      scrollInertia: 400,
      advanced: {
        updateOnContentResize:true
      },
      callbacks:{
        onInit: function(){

        }
      }
    });

    var owl = $('[data-product-slider]');
    owl.on('initialized.owl.carousel resize.owl.carousel refreshed.owl.carousel', function(event) {console.log(event)
      var top = $(event.target).find('img').height();
      $(event.target).find('.owl-nav div').css('top',top/2-7);
    });

    owl.owlCarousel({
      nav: true,
      items:6,
      dots:false,
      navRewind: false,
      navText: ['',''],
      responsive:{
        0:{
          items:2
        },
        640:{
          items:3
        },
        700:{
          items:4
        },
        930:{
          items:6
        }
      }
    });

    $(window).scroll(function(){

      var row = $('[data-row-fixed]');

      if($(this).scrollTop() > 180) {

        row.addClass('to-fix');

      } else {

        row.removeClass('to-fix');
      }
    });

  };

  this.initCounter = function(){

    var btnCount = $('[data-btn-number]');

    btnCount.click(function(e){

      e.preventDefault();
      var type = $(this).attr('data-type');
      var input = $(this).parent().find('[data-input-number]');
      var currentVal = parseFloat(input.val());
      var max = parseFloat(input.attr('max'));
      var min = parseFloat(input.attr('min'));

      if (!currentVal || currentVal == "" || currentVal == "NaN") currentVal = 0;
      if (max == "" || max == "NaN") max = '';
      if (min == "" || min == "NaN") min = 0;

      if (type == 'plus') {
        if (max && (max == currentVal || currentVal > max)) {
          input.val(max);
        } else {
          input.val(currentVal + 1);
        }
      } else if(type == 'minus') {
        if (min && (min == currentVal || currentVal < min)) {
          input.val(min);
        } else if (currentVal > 0) {
          input.val(currentVal - 1);
        }
      }

      input.trigger('change');

    });
  };

  this.initHeight = function(){

    var box = $('[data-height]');
    var big = -1;

    box.each(function() {
      big = big > $(this).height() ? big : $(this).height();
    });

    box.each(function() {
      $(this).css('min-height',big);
    });
  };

  this.showModal = function (template){

    var modal = $('#modal');
    modal.removeData('bs.modal').removeClass('phone authorization registration reviews');
    modal.modal({
      backdrop: 'static',
      remote: './template/' + template +'.html'
    });

    modal.addClass(template);
    modal.modal('show');

  };

  this.basket = function (col) {

    if(col != 0) {

      window.location.href = "/basket.html";

    } else {

      $('#basket').modal('show');
    }
  };

  this.getFileName = function (el) {
    var name = $(el).val().replace(/C:\\fakepath\\/i, '');
    $('[data-list-'+$(el).attr('id')+']').append('<li>' +
        '<span class="close-icon" onclick="MainManager.clear(this)"></span>'+ name +'</li>');

  };

  this.clear = function (el) {
    var el = $(el);
    el.parent().remove();
    $('[data-input-file]').val('');

  }

  this.showAlert = function (type) {
    var text;
    var boxAlert = $('[data-alert]');
    var boxAlertText = $('[data-alert-text]');

    if(type == "personal") {

      text = 'Личные данные сохранены'

    } else if(type == "addr"){

      text = 'Изменения успешно внесены'

    } else if(type == "password") {

      text = 'Пароль успешно изменен'

    } else {

      text = 'Данные сохранены'

    }

    boxAlertText.html(text);
    boxAlert.addClass('show');

    setTimeout(function(){
      boxAlert.removeClass('show');
      boxAlertText.html('');
    },1500)


  };

  this.addrAdd = function () {
    var s = $('[data-addr-street]').val();
    var h = $('[data-addr-house]').val();

    if(s != '' && h != '') {
      $('[data-addr-list]').append('<button class="btn border">'+s+','+h+'</button>')
    }
  };

  this.staticActivate = function (n) {
    $('[data-activate-input="'+n+'"]').toggleClass('true');
    $('[data-activate-box="'+n+'"]').toggleClass('true');
  };

  this.showAlertProduct = function () {
    $('[data-alert-by]').addClass('show');
  };
  this.hideAlertProduct = function () {
    $('[data-alert-by]').removeClass('show');
  }

  this.showMenu = function (m) {

    var b = $('[data-back]');

    b.addClass('anim show');
    $('['+m+']').addClass('anim show');

    $('['+m+'] li a, [data-back] ').on('click',function(){

      $('['+m+']').removeClass('anim show');
      b.removeClass('anim show');

    });


  }

}
