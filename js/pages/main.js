$(document).ready(function(){

  $('[data-main-slider]').owlCarousel({
    items: 1,
    nav: true,
    navRewind: false,
    navText: ['','']
  });

  var scene = document.getElementById('parallax-top');
  var parallaxTop = new Parallax(scene);

  var scene2 = document.getElementById('parallax-bottom');
  var parallaxBottom = new Parallax(scene2);

});