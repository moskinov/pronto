$(document).ready(function(){

  $('[data-children-slider]').each(function(){
    var length = $(this).find('.item').length;
    var col;
    var nav;

    if(length > 2) {

      col = 3;

    } else {

      col = length;
    }

    if(length > 3){

      nav = true;

    } else {

      nav = false;
    }
    $(this).on('initialized.owl.carousel', function(event) {
      MainManager.initHeight();
    });
    $(this).owlCarousel({
      items: col,
      nav: nav,
      navRewind: false,
      pullDrag: false,
      navText: ['','']
    });
  });

  var single = $('[data-children-slider-single]');
  var length2 = single.find('.item').length;
  var nav2;

  if(length2 > 1){

    nav2 = true;

  } else {

    nav2 = false;
  }

  single.owlCarousel({
    items: 1,
    nav: nav2,
    navRewind: false,
    pullDrag: false,
    navText: ['','']
  });





});