(function ( define, angular ) {
  'use strict';

  define([
      'components/nav/nav-directive'
    ],
    function (
      NavDirective
    ){
      var moduleName = 'app.GlobalNav';

      angular.module( moduleName, [] )
        .directive( 'globalNav', NavDirective );

      return moduleName;
    }
  );

}( define, angular ));
