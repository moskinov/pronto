function MainManager_f() {

  this.init = function () {

    //parallax

    var scene = document.getElementById('parallax');
    if(scene != null) {
      var parallax = new Parallax(scene);
    }


    //загружает шаблон с контролами для товара и после вызываем их функции
    $('[data-include-counter]').loadTemplate("./template/view-counter.html",'', {
      complete: function(){

        //инит селекта
        $('[data-btn-select]').selectpicker();

        $('[data-dropdown-menu]').click(function(event){

          if(event.target.className != 'close-icon') {
            event.stopPropagation();
          }

        });

        //количество товара +/-

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

        //кастомный скроллбар
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

      }
    });

    $('[data-include-counter-2]').loadTemplate("./template/view-counter_2.html",'', {
      complete: function(){

        //количество товара +/-

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

        //кастомный скроллбар
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

      }
    });

    //загружает шаблон шапки и футера
    $('[data-header]').loadTemplate("./template/view-header.html",'', '');
    $('[data-footer]').loadTemplate("./template/view-footer.html",'', '');

    //фиксирует шапку
    $(window).scroll(function(){

      var row = $('[data-row-fixed]');

      if($(this).scrollTop() > 180) {

        row.addClass('to-fix');

      } else {

        row.removeClass('to-fix');
      }
    });

  };

  //выравнивает блоки с описанием товара по высоте
  this.initHeight = function(){

    //var title = $('[data-height-title]');
    var box = $('[data-height]');
    var big = -1;
    //var big2 = -1;

    box.each(function() {
      big = big > $(this).height() ? big : $(this).height();
    });

    //title.each(function() {
    //  big2 = big2 > $(this).height() ? big2 : $(this).height();
    //});

    box.each(function() {
      $(this).css('min-height',big);
    });

    //title.each(function() {
    //  $(this).css('min-height',big2);
    //});


  };

  //вызов модалок
  this.showModal = function (template){

    var modal = $('#modal');

    modal.removeData('bs.modal');
    modal.modal({remote: './template/' + template +'.html'});
    modal.modal('show');
  };

  //переход в корзину - если "col" 0, то показывает окно, иначе переход на страницу корзины
  this.basket = function (col) {

    if(col != 0) {

      window.location.href = "/basket.html";

    } else {

      $('#basket').modal('show');
    }
  };

}
