(function ( define ) {
  'use strict';

  define([
    'models/scene.js',
    'models/prism.js',
    'components/sketch/world.js',
    'components/sketch/prism-scene.js'

  ],
  function (
    TerrainModel,
    PrismModel,
    TerrainWorld,
    PrismWorld
  ){

    var RouteManager = function ( $stateProvider, $urlRouterProvider, $locationProvider ){

          $locationProvider.html5Mode(true);

          // states
          $stateProvider
            .state('index', {
              url: '/',
              templateUrl: 'views/default.html',
              controller  : function($scope){

                  $scope.model = TerrainModel;
                  $scope.world = TerrainWorld;

              }
            }).state('prism', {
              url: '/prism',
              templateUrl: 'views/default.html',
              controller  : function($scope){

                  $scope.model = PrismModel;
                  $scope.world = PrismWorld;

              }
            });
          // end states
    };

    return ['$stateProvider', '$urlRouterProvider', '$locationProvider', RouteManager ];
  });

}( define ));
