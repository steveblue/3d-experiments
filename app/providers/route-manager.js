(function ( define ) {
  'use strict';

  define([
    'models/terrain.js',
    'models/prism.js',
    'models/bowie.js',
    'components/scene/terrain-scene.js',
    'components/scene/prism-scene.js',
    'components/scene/bowie-scene.js'

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

          $locationProvider.html5Mode(true);

          // states
          $stateProvider
            .state('index', {
              url: '/',
              templateUrl: 'views/index.html',
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
              templateUrl: 'views/bowie.html',
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
