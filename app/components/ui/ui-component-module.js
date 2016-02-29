(function ( define, angular ) {
  'use strict';

  define([
      'components/ui/ui-draggable/ui-draggable-directive',
      'components/ui/ui-slider/ui-slider-directive'
    ],
    function (
      DraggableDirective,
      SliderDirective
    ){
      var moduleName = 'app.UIComponents';

      angular.module( moduleName, [] )
        .directive( 'uiDraggable', DraggableDirective )
        .directive( 'uiSlider', SliderDirective );

      return moduleName;
    }
  );

}( define, angular ));
