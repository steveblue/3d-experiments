(function( define ) {
  'use strict';

  define( [], function ()
  {
    var Mirrors = function() {

      return {

        planes: [{
          position: {x: -10, y: 0, z: 0},
          rotation: -45
        },
        {
          position: {x: 2, y: 0, z: -2},
          rotation: 45
        },
        {
          position: {x: -5, y: 0, z: -10},
          rotation: 25
        },
        {
          position: {x: 0, y: 0, z: -7},
          rotation: -25
        }
        ]

      };

    };

    return Mirrors;

  });

}( define ));
