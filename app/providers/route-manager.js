(function ( define ) {
  'use strict';

  define([
    'models/terrain.js',
    'models/prism.js',
    'models/bowie.js',
    'models/mirror.js',
    'models/octagon.js',
    'components/scene/terrain-scene.js',
    'components/scene/prism-scene.js',
    'components/scene/bowie-scene.js',
    'components/scene/mirror-scene.js',
    'components/scene/lighting-scene.js',
    'components/scene/octagon-scene.js'

  ],
  function (
    TerrainModel,
    PrismModel,
    BowieModel,
    MirrorModel,
    OctagonModel,
    TerrainWorld,
    PrismWorld,
    BowieWorld,
    MirrorWorld,
    SunsetWorld,
    OctagonWorld
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
            })
            .state('prism', {
              url: '/prism',
              templateUrl: 'views/default.html',
              controller  : function($scope){

                  $scope.model = PrismModel;
                  $scope.world = PrismWorld;

              }
            })
            .state('bowie', {
              url: '/bowie',
              templateUrl: 'views/bowie.html',
              controller  : function($scope){

                  $scope.model = BowieModel;
                  $scope.world = BowieWorld;

              }
            })
            .state('mirror', {
              url: '/mirror',
              templateUrl: 'views/mirror.html',
              controller  : function($scope){

                  $scope.model = MirrorModel;
                  $scope.world = MirrorWorld;

              }
            })
            .state('sunset', {
              url: '/sunset',
              templateUrl: 'views/terrain.html',
              controller  : function($scope){

                  $scope.model = TerrainModel;
                  $scope.world = SunsetWorld;

              }
            })
            .state('ui', {
              url: '/ui',
              templateUrl: 'views/ui.html',
              controller  : function($scope){

                $scope.model = MirrorModel;
                $scope.world = MirrorWorld;

                $scope.sliderVertNode = {
                  currentValue : 0.0,
                  min: 0.0,
                  max: 255.0,
                  orient: 'is--vert',
                  node: {
                    origin: [0.0, 0.0, 0.0],
                    translate: [0.0, 0.0, 0.0],
                    size: [44, 44, 1.0],
                    opacity: 0.3
                  },
                  start: function(e) {
                    // console.log('START');
                  },
                  drag: function(e) {
                    // console.log('DRAG');
                  },
                  stop: function(e) {
                    // console.log('STOP');
                  }
                };

                $scope.sliderHorNode = {
                  currentValue : 0.0,
                  min: 0.0,
                  max: 255.0,
                  orient: 'is--hor',
                  node: {
                    origin: [0.0, 0.0, 0.0],
                    translate: [0.0, 0.0, 0.0],
                    size: [32, 32, 1.0],
                    opacity: 0.3
                  },
                  start: function(e) {
                    // console.log('START');
                  },
                  drag: function(e) {
                    // console.log('DRAG');
                  },
                  stop: function(e) {
                    // console.log('STOP');
                  }
                };

                $scope.sliderJoystickNode = {
                  currentValue : [0.0, 0.0],
                  min: [0.0, 0.0],
                  max: [100.0, 100.0],
                  orient: 'is--joystick',
                  node: {
                    origin: [0.0, 0.0, 0.0],
                    translate: [0.0, 0.0, 0.0],
                    size: [44, 44, 1.0],
                    opacity: 0.3
                  },
                  start: function(e) {
                    // console.log('START');
                  },
                  drag: function(e) {
                    // console.log('DRAG');
                  },
                  stop: function(e) {
                    // console.log('STOP');
                  }
                };


              }
            })
            .state('octagon', {
              url: '/octagon',
              templateUrl: 'views/octagon.html',
              controller  : function($scope){

                  $scope.model = OctagonModel;
                  $scope.world = OctagonWorld;

              }
            })
            .state('header', {
              url: '/header-content-footer',
              templateUrl: 'views/header-content-footer.html',
              controller  : function($scope, $scroll){
                //
                // $scope.model = TerrainModel;
                // $scope.world = SunsetWorld;

                $scope.sections = [];

                for (var i=0; i<33; i++) {
                  $scope.sections.push({
                    index: i
                  });
                }

                $scroll.start();

              }
            });
          // end states
    };

    return ['$stateProvider', '$urlRouterProvider', '$locationProvider', RouteManager ];
  });

}( define ));
