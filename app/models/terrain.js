/* global THREE */
(function( define ) {
  'use strict';

  define( [], function ()
  {
    var Scene = function() {

      return {

        landscape: [

          [0, 0, 0],
          [0, 1, 0],
          [0, 1, 1]

        ],
        fetch : function(path) {
          var terrainLoader = new THREE.TerrainLoader();

          return new Promise(function(res,rej){
            terrainLoader.load(path, function(data) {
              res([data, path]);
            });
          });

        }
      };

    };

    return Scene;

  });

}( define ));
