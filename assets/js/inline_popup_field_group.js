(function ($) {

  'use strict';

  Drupal.behaviors.fieldGroupPopupFake = {
    attach: function (context) {

      // Callback comune alla chiusura di una FakePopup
      var closeFakePopup = function(targetFs) {
        $("body").removeClass('popupFakeOpened');
        targetFs.fadeOut(300).removeClass('popupOpened');
        $(document).off('keyup');
      };

      // Solo una volta - genero il div sottostante per opacizzare il contenuto
      $('body', context).once('adminParagraphsBehavior').each(function () {
        if(!$("body").hasClass('popupFakeEnhanced')) {
          $("body").append('<div class="popupFakeOverlay"></div>').addClass('popupFakeEnhanced');
        }
      })

      // Wrapping dei pulsanti azione insieme
      $(".form-wrapper").each(function(){
        var myButtons = $(this).find("> .button.popupFakeOpener:not('wrapped')");
        if(myButtons.length > 0) {
          myButtons.addClass('wrapped').wrapAll('<div class="fakeButtonsWrp" />');
        }
      });

      // Azione al click sul bottone di apertura
      $(context).find('.button.popupFakeOpener').once('popupFakeOpener').each(function () {
        var $this = $(this);

        $this.on("click", function(e){
          e.preventDefault();
          var targetId  = $this.attr('data-target'),
              targetFs  = $(".form-wrapper.field-group-popup-fake[id='"+targetId+"']");

          $("body").addClass('popupFakeOpened');
          targetFs.fadeIn(300).addClass('popupOpened');

          // Mi metto in ascolto del pulsante ESC
          $(document).on('keyup',function(evt) {
            if(parseInt(evt.keyCode) === 27) { closeFakePopup(targetFs); }
          });
        });
      });

      // Azione al click sul bottone di chiusura
      $(context).find('.form-wrapper.field-group-popup-fake .closer').once('popupFakeCloser').each(function () {
        var $this = $(this);

        $this.on("click", function(e){
          e.preventDefault();
          closeFakePopup($this.closest(".form-wrapper.field-group-popup-fake"));
        });
      });

      // Azione al click sull'overlay
      $(context).find('.popupFakeOverlay').once('popupFakeOverlay').each(function () {
        var $this = $(this);

        $this.on("click", function(e) {
          e.preventDefault();
          closeFakePopup($(".form-wrapper.field-group-popup-fake.popupOpened"));
        });
      });

    }
  };

})(jQuery);
