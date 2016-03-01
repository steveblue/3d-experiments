(function( define ) {
  'use strict';

  /**
   * Register the Controller class with RequireJS
   */
  define([
      // Deps,
    ],
    function (
      // Deps Vars
    ){

      var SliderDirective = function( /* angular deps injection */ ){
            // Returns Directive Creation Object
            return {
              restrict: 'AE',
              templateUrl: './components/ui/ui-slider/ui-slider.html',
              requires: 'ngModel',
              scope: {
                uiOptions: '=ngModel'
              },
              link: {
                pre: function(scope, elem, attrs) {
                  // Before child scopes have been linked
                },
                post: function(scope, elem, attrs) {
                  // after child scopes have been linked

                }
              }
            };
          }; // End Directive def


      // If Using Angular Dep Injection
      //return [ '$rootScope', SliderDirective ];

      return SliderDirective;
    } // end require function
  ); // end define call

}( define ));
