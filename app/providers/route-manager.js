(function ( define ) {
  'use strict';

  define([
    'models/scene.js',
    'models/prism.js',
    'models/bowie.js',
    'components/sketch/world.js',
    'components/sketch/prism-scene.js',
    'components/sketch/bowie-scene.js'

  ],
  function (
    TerrainModel,
    PrismModel,
    BowieModel,
    TerrainWorld,
    PrismWorld,
    BowieWorld
  ){

    var RouteManager = function ( $stateProvider, $urlRouterProvider, $locationProvider ){

          $locationProvider.html5Mode(false);

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
            }).state('bowie', {
              url: '/bowie',
              templateUrl: 'views/default.html',
              controller  : function($scope){

                  $scope.model = BowieModel;
                  $scope.world = BowieWorld;

              }
            });
          // end states
    };

    return ['$stateProvider', '$urlRouterProvider', '$locationProvider', RouteManager ];
  });

}( define ));
