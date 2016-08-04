$(document).ready(function() {

  MainManager = new MainManager_f();
  MainManager.init();
  MainManager.initHeight();
  $(window).resize(function(){MainManager.initHeight()});

});
