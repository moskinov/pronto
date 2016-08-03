function MainManager_f() {

  this.init = function () {

    //fix basket row
    $(window).scroll(function(){

      var row = $('[data-row-fixed]');

      if($(this).scrollTop() > 180) {

        row.addClass('to-fix');

      } else {

        row.removeClass('to-fix');
      }
    });

    //select

    $('[data-btn-select]').selectpicker({
      style: 'btn-info',
      size: 4
    });


    //counter
    var btnCount = $('[data-btn-number]');
    var inputCount = $('[data-input-number]');

    btnCount.click(function(e){

        e.preventDefault();

        var fieldName = $(this).attr('data-field');
        var type = $(this).attr('data-type');
        var input = $("input[name='"+fieldName+"']");
        var currentVal = parseInt(input.val());

        if (!isNaN(currentVal)) {

          if(type == 'minus') {

            var minValue = parseInt(input.attr('min'));

            if(!minValue) minValue = 1;

            if(currentVal > minValue) {

              input.val(currentVal - 1).change();

            }

            if(parseInt(input.val()) == minValue) {

              $(this).attr('disabled', true);
            }

          } else if(type == 'plus') {

            var maxValue = parseInt(input.attr('max'));

            if(!maxValue) maxValue = 9999999999999;

            if(currentVal < maxValue) {

              input.val(currentVal + 1).change();
            }

            if(parseInt(input.val()) == maxValue) {

              $(this).attr('disabled', true);
            }

          }
        } else {
          input.val(0);
        }
      });

    inputCount
        .focusin(function(){
          $(this).data('oldValue', $(this).val());
        })
        .change(function() {

          var minValue = parseInt($(this).attr('min'));
          var maxValue = parseInt($(this).attr('max'));

          if(!minValue) minValue = 1;
          if(!maxValue) maxValue = 9999999999999;

          var valueCurrent = parseInt($(this).val());
          var name = $(this).attr('name');

          if(valueCurrent >= minValue) {

            $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled');

          } else {

            $(this).val($(this).data('oldValue'));
          }

          if(valueCurrent <= maxValue) {

            $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled');

          } else {

            $(this).val($(this).data('oldValue'));
          }
        })
        .keydown(function (e) {
              if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
                  (e.keyCode == 65 && e.ctrlKey === true) ||
                  (e.keyCode >= 35 && e.keyCode <= 39)) {
                return;
              }
              if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
              }
        });

  };

  this.showModal = function (template){

    var modal = $('#modal');

    modal.removeData('bs.modal');
    modal.modal({remote: './template/' + template +'.html'});
    modal.modal('show');
  };

  this.basket = function (col) {

    if(col != 0) {

      window.location.href = "/basket.html";

    } else {

      $('#basket').modal('show');
    }
  };

}
