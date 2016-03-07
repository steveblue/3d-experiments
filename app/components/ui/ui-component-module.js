(function ( define, angular ) {
  'use strict';

  define([
      'components/ui/ui-draggable/ui-draggable-directive',
      'components/ui/ui-slider/ui-slider-directive',
      'components/ui/ui-button/ui-button-directive',
      'components/ui/ui-container/ui-container-directive.js'
    ],
    function (
      DraggableDirective,
      SliderDirective,
      ButtonDirective,
      UIContainerDirective
    ){
      var moduleName = 'app.UIComponents';

      angular.module( moduleName, [] )
        .directive( 'uiButton', ButtonDirective )
        .directive( 'uiDraggable', DraggableDirective )
        .directive( 'uiSlider', SliderDirective )
        .directive( 'uiContainer', UIContainerDirective );

      return moduleName;
    }
  );

}( define, angular ));
