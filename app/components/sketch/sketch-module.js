(function ( define, angular ) {
  'use strict';

  define([
      'components/sketch/sketch-directive'
    ],
    function (
      NewDirective
    ){
      var moduleName = 'app.Sketch';

      angular.module( moduleName, [] )
        .directive( 'sketch', NewDirective );

      return moduleName;
    }
  );

}( define, angular ));
