$(document).ready(function(){

  $('[data-constructor-slider]').each(function(){
    var length = $(this).find('.item').length;
    var nav;

    if(length > 6){

      nav = true;

    } else {

      nav = false;
    }

    $(this).on('initialized.owl.carousel resize.owl.carousel refreshed.owl.carousel', function(event) {
      var top = $(event.target).find('img').height();
      $(event.target).find('.owl-nav div').css('top',top/2-7);
      MainManager.initHeight();
    });

    $(this).owlCarousel({
      nav: nav,
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
  });
});