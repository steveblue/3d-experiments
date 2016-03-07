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

      var SliderDirective = function( /* angular deps injection */ ){
            // Returns Directive Creation Object
            return {
              restrict: 'AE',
              templateUrl: './components/ui/ui-button/ui-button.html',
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

                  var button = angular.element(elem[0].children[0]);

                  button.on('click', function(ev) {

                    if( button.hasClass('is--active') ) {
                       button.removeClass('is--active');
                       //scope.uiOptions.node.state = 'is--inactive';
                    } else {
                      button.addClass('is--active');
                      //scope.uiOptions.node.state = 'is--active';
                    }

                    scope.uiOptions.onTap(ev);

                  });



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
