/*global head, res, System */
var respond;
(function( window, head ) {
  'use strict';

  // Promise Shim
  if( typeof window.Promise === 'undefined' || typeof window.Promise.all !== 'function' ){
    head.load('lib/promise.js', function(){ console.log('Promise Shim Loaded'); });
  }

  head
    .load(
      'lib/angular.min.js',
      'lib/angular-ui-router.min.js',
      'lib/angular-sanitize.min.js',
      'lib/require.js',
      'lib/three.min.js',
      'components/util/ObjExporter.js',
      'components/util/TerrainLoader.js',
      'components/util/FirstPersonControls.js'
    )
    .ready('ALL', function() {

      // Main RequireJS Config
      require.config({
      //  baseUrl:'./',
        paths:{
          'routes'    : 'providers/route-manager'
        },
        shim:{
          'routes' : {
            init:function(){

            }
          }
        }
      });

      require( [ 'app' ], function( app ){

        /* Application has bootstrapped... needed for Firefox
        if( angular.resumeBootstrap && //check for firefox ){

          angular.resumeBootstrap();

        }
        */

      });

    }); // end .ready()
}( window, head ));
