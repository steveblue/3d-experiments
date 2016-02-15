(function ( define, angular ) {
  'use strict';

  define([
      'components/footer/footer-directive'
    ],
    function (
      FooterDirective
    ){
      var moduleName = 'app.GlobalFooter';

      angular.module( moduleName, [] )
        .directive( 'globalFooter', FooterDirective );

      return moduleName;
    }
  );

}( define, angular ));
