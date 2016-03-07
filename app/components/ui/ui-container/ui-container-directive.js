(function( define ) {
  'use strict';

  /**
   * Register the Controller class with RequireJS
   */
  define([
      'components/ui/util/ui-component'
    ],
    function (
      UIComponent
    ){

      var ContainerDirective = function( /* angular deps injection */ ){
            // Returns Directive Creation Object
            return {
              restrict: 'AE',
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
                  
                  if(scope.uiOptions.node) {
                      var component = new UIComponent(scope.uiOptions.node, elem[0]);
                  }

                }
              }
            };
          }; // End Directive def


      // If Using Angular Dep Injection
      //return [ '$rootScope', SliderDirective ];

      return ContainerDirective;
    } // end require function
  ); // end define call

}( define ));
