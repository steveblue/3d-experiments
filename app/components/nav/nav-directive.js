(function( define ) {
  'use strict';

  /**
   * Register the Controller class with RequireJS
   */
  define([],
    function (){

      var NavDirective = function( $scroll ){
            // Returns Directive Creation Object
            return {
              restrict: 'AE',
              templateUrl: './components/nav/nav.html',
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
                  var nav = elem[0].children[0];

                  var scrollHandler = function(ev) {

                    if(nav.classList.contains('is--open')) {
                      nav.classList.remove('is--open');
                    }

                  };

                  elem[0].addEventListener("appScroll", scrollHandler, false);

                  scope.toggleNav = function() {
                    if(nav.classList.contains('is--open')) {
                      nav.classList.remove('is--open');
                    } else {
                      nav.classList.add('is--open');
                    }
                  };

                },
              }
            };
          }; // End Directive def


      // If Using Angular Dep Injection
      return [ '$scroll', NavDirective ];

      // return NavDirective;
    } // end require function
  ); // end define call

}( define ));
