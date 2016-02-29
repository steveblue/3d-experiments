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
              scope: {},
              link: {
                pre: function(scope, elem, attrs) {
                  // Before child scopes have been linked
                  var options = JSON.parse(attrs.uiNode);

                  scope.uiOptions = {
                      node: options,
                      orient: options.type || 'is--vert',
                      start: function(e) {
                        console.log('START');
                      },
                      drag: function(e) {
                        console.log('DRAG');
                      },
                      stop: function(e) {
                        console.log('STOP');
                      },

                  };
                },
                post: function(scope, elem, attrs) {
                  // after child scopes have been linked

                },
              }
            };
          }; // End Directive def


      // If Using Angular Dep Injection
      //return [ '$rootScope', SliderDirective ];

      return SliderDirective;
    } // end require function
  ); // end define call

}( define ));