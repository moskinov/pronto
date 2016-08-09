function MainManager_f() {

  this.init = function () {

    //parallax

    var scene = document.getElementById('parallax');
    if(scene != null) {
      var parallax = new Parallax(scene);
    }

    var count1 = $('[data-include-counter]');
    var count2 = $('[data-include-counter-2]');

    if(count1.length !=0) {
      //загружает шаблон с контролами для товара и после вызываем их функции
      count1.loadTemplate("./template/view-counter.html",'', {
        complete: function(){

          //инит селекта
          $('[data-btn-select]').selectpicker();

          $('[data-dropdown-menu]').click(function(event){

            if(event.target.className != 'close-icon') {
              event.stopPropagation();
            }

          });

          MainManager.initCounter();

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
    }

    if(count2.length !=0) {
      count2.loadTemplate("./template/view-counter_2.html",'', {
        complete: function(){
          MainManager.initCounter();
        }
      });
    }


    //загружает шаблон шапки и футера
    $('[data-header]').loadTemplate("./template/view-header.html",'', '');
    $('[data-footer]').loadTemplate("./template/view-footer.html",'', '');

    //загружает шаблон слайдера с товарами
    $('[data-include-slider]').loadTemplate("./template/view-slider.html",'', {
      complete: function(){


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

        MainManager.initCounter();
        MainManager.initHeight();
      }
    });

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

  //количество товара +/-
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

  //выравнивает блоки с описанием товара по высоте
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
