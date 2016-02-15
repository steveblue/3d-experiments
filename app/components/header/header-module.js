(function ( define, angular ) {
  'use strict';

  define([
      'components/header/header-directive'
    ],
    function (
      HeaderDirective
    ){
      var moduleName = 'app.GlobalHeader';

      angular.module( moduleName, [] )
        .directive( 'globalHeader', HeaderDirective );

      return moduleName;
    }
  );

}( define, angular ));
