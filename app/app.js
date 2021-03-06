/* global res */
(function ( define ) {
  'use strict';

  define([
      //providers
      'providers/route-manager',
      //filters
      'filters/filters',
      //services
      'services/scroll',
      //components
      'components/header/header-module',
      'components/nav/nav-module',
      'components/footer/footer-module',
      'components/sketch/sketch-module'
      ],
    function (
      RouteManager,
      AppFilters,
      ScrollService,
      GlobalHeader,
      GlobalNav,
      GlobalFooter,
      SketchModule
    ){

      var app, appName = 'app';

      app = angular
              .module(appName, [
                'ui.router',
                'ngSanitize',
                'app.filters',
                GlobalHeader,
                GlobalNav,
                GlobalFooter,
                SketchModule
              ])
              .config( RouteManager )
              .service('$scroll', ScrollService );

      angular.bootstrap( document.getElementsByTagName('html')[0], [ appName ]);


      return app;
    }
  );

}( define ));
