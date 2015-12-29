(function( define ) {
  'use strict';

  /**
   * Register the Controller class with RequireJS
   */
  define([
      'components/sketch/scene.js'
    ],
    function (
      World
    ){

      var SketchDirective = function( /* angular deps injection */ ){
            // Returns Directive Creation Object
            return {
              restrict: 'AE',
              templateUrl: './components/sketch/sketch.html',
              link: {
                pre: function(scope, elem, attrs) {
                  // Before child scopes have been linked
                },
                post: function(scope, elem, attrs) {
                  // after child scopes have been linked
                  console.log(elem);
                  var scene = new World(elem);
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
