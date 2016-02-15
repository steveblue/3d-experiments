(function( define ) {
  'use strict';

  /**
   * Register the Controller class with RequireJS
   */
  define([],
    function (){

      var HeaderDirective = function( $scroll ){
            // Returns Directive Creation Object
            return {
              restrict: 'AE',
              templateUrl: './components/header/header.html',
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
                  var header = elem[0].children[0];

                  var showHeader = function() {
                    elem[0].children[0].style.opacity = 1;
                    if(!header.classList.contains('is--open')) {
                      header.classList.add('is--open');
                    }
                  };

                  var hideHeader = function() {
                    if(header.classList.contains('is--open')) {
                      header.classList.remove('is--open');
                    }
                  };

                  var scrollHandler = function(ev) {
  
                    if( ev.detail.hitEnd || ev.detail.hitStart ) {
                      showHeader();
                    }
                    if( ev.detail.hitStart === false && ev.detail.hitEnd === false ) {
                      hideHeader();
                    }
                  };

                  elem[0].addEventListener("appScroll", scrollHandler, false);
                },
              }
            };
          }; // End Directive def


      // If Using Angular Dep Injection
      return [ '$scroll', HeaderDirective ];

      // return HeaderDirective;
    } // end require function
  ); // end define call

}( define ));
