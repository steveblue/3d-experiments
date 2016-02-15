(function( define ) {
  'use strict';

  /**
   * Register the Controller class with RequireJS
   */
  define([],
    function (){

      var FooterDirective = function( $scroll ){
            // Returns Directive Creation Object
            return {
              restrict: 'AE',
              templateUrl: './components/footer/footer.html',
              scope: {
                model: '=ngModel'
              },
              link: {
                pre: function(scope, elem, attrs) {
                  // Before child scopes have been linked
                  $scroll.register(elem[0]);
                },
                post: function(scope, elem, attrs) {
                  // after child scopes have been linked
                  var footer = elem[0].children[0];

                  var showFooter = function() {
                    elem[0].children[0].style.opacity = 1;
                    if(!footer.classList.contains('is--open')) {
                      footer.classList.add('is--open');
                    }
                  };

                  var hideFooter = function() {
                    if(footer.classList.contains('is--open')) {
                      footer.classList.remove('is--open');
                    }
                  };

                  var scrollHandler = function(ev) {
                    if( ev.detail.hitEnd || ev.detail.hitStart ) {
                      showFooter();
                    }
                    if( ev.detail.hitStart === false && ev.detail.hitEnd === false ) {
                      hideFooter();
                    }
                  };
                  elem[0].addEventListener("appScroll", scrollHandler, false);
                },
              }
            };
          }; // End Directive def


      // If Using Angular Dep Injection
      return [ '$scroll', FooterDirective ];

      // return FooterDirective;
    } // end require function
  ); // end define call

}( define ));
