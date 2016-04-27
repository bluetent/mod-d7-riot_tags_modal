/**
 * An updated version of modalEffects.js by http://www.codrops.com
 */
var overlay = document.querySelector( '.md-overlay' );
var RiotModal = {

  ModalUtils: {

    hasClass: function (ele, cls) {
      return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    },

    addClass: function (ele, cls) {
      if (!this.hasClass(ele, cls)) {
        ele.className += " " + cls;
      }
    },

    removeClass: function (ele, cls) {
      var reg;
      if (this.hasClass(ele, cls)) {
        reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
      }
    },

    generateOverlay: function() {
      var ov = document.createElement('DIV');
      ov.className = 'md-overlay';
      document.body.appendChild(ov);
      return ov;
    }
  },

  init: function(){

    if(!overlay) {
      overlay = this.ModalUtils.generateOverlay();
    }

    this.on('updated', function() {
      this.updateModals();
    });

  },

  updateModals: function() {
    var self = this, modal, close;
    [].slice.call( this.root.querySelectorAll( '.md-trigger' ) ).forEach( function( el, i ) {
      modal = self.root.querySelector( '#' + el.getAttribute( 'data-modal' ) );
      close = modal.querySelector( '.md-close' );

      function removeModal( hasPerspective ) {
        self.ModalUtils.removeClass( modal, 'md-show' );
        self.ModalUtils.removeClass( overlay, 'show' );

        if( hasPerspective ) {
          self.ModalUtils.removeClass( this.root.documentElement, 'md-perspective' );
        }
      }

      function removeModalHandler() {
        removeModal( self.ModalUtils.hasClass( el, 'md-setperspective' ) );
      }

      el.addEventListener( 'click', function( ev ) {
        self.ModalUtils.addClass( modal, 'md-show' );
        self.ModalUtils.addClass( overlay, 'show' );
        overlay.removeEventListener( 'click', removeModalHandler );
        overlay.addEventListener( 'click', removeModalHandler );

        if( self.ModalUtils.hasClass( el, 'md-setperspective' ) ) {
          setTimeout( function() {
            self.ModalUtils.addClass( modal, 'md-perspective' );
          }, 25 );
        }
      });

      close.addEventListener( 'click', function( ev ) {
        ev.stopPropagation();
        removeModalHandler();
      });

    } );
  }

};

riot.mixin('RiotModal', RiotModal);
