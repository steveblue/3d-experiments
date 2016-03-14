(function( define ) {
  'use strict';

  /**
   * Register the Controller class with RequireJS
   */
  define([],
    function (){

      var SketchDirective = function( /* angular deps injection */ ){
            // Returns Directive Creation Object
            return {
              restrict: 'AE',
              templateUrl: './components/sketch/sketch.html',
              scope: {
                world: '=world',
                model: '=ngModel'
              },
              link: {
                pre: function(scope, elem, attrs) {
                  // Before child scopes have been linked
                },
                post: function(scope, elem, attrs) {
                  // after child scopes have been linked
                  var scene = new scope.world(scope.model, elem, false);

                },
              }
            };
          }; // End Directive def


      // If Using Angular Dep Injection
      //return [ '$rootScope', NewDirective ];

      return SketchDirective;
    } // end require function
  ); // end define call

}( define ));
