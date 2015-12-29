/* global THREE */
(function(define) {
  'use strict';

  define([], function() {

    var World = function(elem) {

      var s = this;

      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.angle = Math.PI / 180;

      this.r = 4;
      this.s_r = this.r / 20 + Math.sin(0) * this.r / 20;

      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.aspect = this.width / this.height;


      this.frame = 0;
      this.speed = this.frame / 100;

      this.radiusOffset = this.waveHeight * this.sinePercent * Math.sin((this.angle + this.speed) * this.waveAmount);

      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(65,  s.width / s.height, 0.1, 1000);
      this.camera.position.x = 0;
      this.camera.position.y = 0;
      this.camera.position.z = 20;


      this.renderer = new THREE.WebGLRenderer({antialias: true});
      this.renderer.setClearColor(new THREE.Color(0x000000, 1.0));
      this.renderer.setSize(s.width, s.height);

      elem[0].appendChild(this.renderer.domElement);

      var geometry = new THREE.BufferGeometry();
      // create a simple square shape. We duplicate the top left and bottom right
      // vertices because each vertex needs to appear once per triangle.
      var vertexPositions = [

        [0.0, 0.0, 5.0],
        [-1.0, 3.0, 3.0],
        [1.0, 3.0, 3.0],

        [0.0, 0.0, 5.0],
        [-3.0, 1.0, 3.0],
        [-1.0, 3.0, 3.0],

        [0.0, 0.0, 5.0],
        [3.0, 1.0, 3.0],
        [1.0, 3.0, 3.0],

        [0.0, 0.0, 5.0],
        [-3.0, 1.0, 3.0],
        [-2.0, -2.0, 3.0],

        [0.0, 0.0, 5.0],
        [3.0, 1.0, 3.0],
        [2.0, -2.0, 3.0],

        [0.0, 0.0, 5.0],
        [-2.0, -2.0, 3.0],
        [0.0, -3.5, 3.0],

        [0.0, 0.0, 5.0],
        [2.0, -2.0, 3.0],
        [0.0, -3.5, 3.0],

        [-1.0, -6.75, 0.0],
        [1.0, -6.75, 0.0],
        [0.0, -3.5, 3.0],

        [1.0, -6.75, 0.0],
        [-1.0, -6.75, 0.0],
        [0.0, -10.0, 0.0],

        [0.0, -3.5, 3.0],
        [-4.0, -5.0, 0.0],
        [-1.0, -6.75, 0.0],

        [0.0, -3.5, 3.0],
        [4.0, -5.0, 0.0],
        [1.0, -6.75, 0.0],

        [0.0, -3.5, 3.0],
        [-4.0, -5.0, 0.0],
        [-2.0, -2.0, 3.0],

        [0.0, -3.5, 3.0],
        [4.0, -5.0, 0.0],
        [2.0, -2.0, 3.0],

        [-2.0, -2.0, 3.0],
        [-4.0, -5.0, 0.0],
        [-6.0, -1.0, 0.0],

        [2.0, -2.0, 3.0],
        [4.0, -5.0, 0.0],
        [6.0, -1.0, 0.0],

        [-2.0, -2.0, 3.0],
        [-3.0, 1.0, 3.0],
        [-6.0, -1.0, 0.0],

        [2.0, -2.0, 3.0],
        [3.0, 1.0, 3.0],
        [6.0, -1.0, 0.0],

        [-3.0, 1.0, 3.0],
        [-6.0, 1.0, 0.0],
        [-6.0, -1.0, 0.0],

        [3.0, 1.0, 3.0],
        [6.0, 1.0, 0.0],
        [6.0, -1.0, 0.0],

        [-3.0, 1.0, 3.0],
        [-6.0, 1.0, 0.0],
        [-4.0, 4.0, 0.0],

        [3.0, 1.0, 3.0],
        [6.0, 1.0, 0.0],
        [4.0, 4.0, 0.0],

        [0.0, 6.0, 0.0],
        [-1.0, 3.0, 3.0],
        [-4.0, 4.0, 0.0],

        [0.0, 6.0, 0.0],
        [1.0, 3.0, 3.0],
        [4.0, 4.0, 0.0]

      ];
      var vertices = new Float32Array( vertexPositions.length * 3 ); // three components per vertex

      // components of the position vector for each vertex are stored
      // contiguously in the buffer.
      for ( var i = 0; i < vertexPositions.length; i++ )
      {
      	vertices[ i*3 + 0 ] = vertexPositions[i][0];
      	vertices[ i*3 + 1 ] = vertexPositions[i][1];
      	vertices[ i*3 + 2 ] = vertexPositions[i][2];
      }

      // itemSize = 3 because there are 3 values (components) per vertex
      geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
      var material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframeLinewidth: 2, wireframe: true } );
      var mesh = new THREE.Mesh( geometry, material );

      this.camera.lookAt(mesh.position);

      this.scene.add(mesh);

      var gridHelper = new THREE.GridHelper( 10, 1 );
      gridHelper.rotation.x = 1.5708;
      gridHelper.setColors (0x00ff00, 0x004400);
      this.scene.add( gridHelper );

      this.update();

    };


    World.prototype.update = function() {

      var s = this;

      this.renderer.render(this.scene, this.camera);

      this.frame++;

      window.requestAnimationFrame(this.update.bind(this));

    };

    return World;

  });

}(define));
