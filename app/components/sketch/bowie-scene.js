/* global THREE */
(function(define) {
  'use strict';

  define([

  ], function() {

    navigator.getUserMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);

    var World = function(Bolt, elem, light, helper) {

      var s = this,
        i = 0;

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

      this.camera = new THREE.PerspectiveCamera(65, s.width / s.height, 0.1, 1000);
      this.camera.position.x = 0;
      this.camera.position.y = 0;
      this.camera.position.z = 15;


      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: true
      });
      this.renderer.setClearColor(new THREE.Color(0xffffff, 1.0));
      this.renderer.setSize(s.width, s.height);

      elem[0].appendChild(this.renderer.domElement);

      var geometry = new THREE.BufferGeometry();
      // create a simple square shape. We duplicate the top left and bottom right
      // vertices because each vertex needs to appear once per triangle.

      var bolt = new Bolt();

      var redVertexPositions = bolt.bolt;

      var redVertices = new Float32Array(redVertexPositions.length * 3); // three components per vertex

      // components of the position vector for each vertex are stored
      // contiguously in the buffer.
      for (i = 0; i < redVertexPositions.length; i++) {
        redVertices[i * 3 + 0] = redVertexPositions[i][0];
        redVertices[i * 3 + 1] = redVertexPositions[i][1];
        redVertices[i * 3 + 2] = redVertexPositions[i][2];
      }

      // itemSize = 3 because there are 3 values (components) per vertex
      geometry.addAttribute('position', new THREE.BufferAttribute(redVertices, 3));

      var material = new THREE.MeshPhongMaterial({
        color: 0xf71312,
        wireframeLinewidth: 2,
        wireframe: false,
        specular: 0xffffff,
        shininess: 50,
        metal: true,
        opacity: 0.65,
        transparent: true
      });

      // var material = new THREE.MeshPhongMaterial( { color: 0x00b2fc, specular: 0x00ffff, shininess: 20, wireframeLinewidth: 2, wireframe: true } );

      var redMesh = new THREE.Mesh(geometry, material);

      this.camera.lookAt(redMesh.position);

      redMesh.matrixAutoUpdate = false;
		  redMesh.updateMatrix();

      this.scene.add(redMesh);

      var blueGeometry = new THREE.BufferGeometry();
      var blueVertexPositions = bolt.bolt;

      var blueVertices = new Float32Array(blueVertexPositions.length * 3); // three components per vertex

      // components of the position vector for each vertex are stored
      // contiguously in the buffer.
      for (i = 0; i < blueVertexPositions.length; i++) {
        blueVertices[i * 3 + 0] = blueVertexPositions[i][0];
        blueVertices[i * 3 + 1] = blueVertexPositions[i][1];
        blueVertices[i * 3 + 2] = blueVertexPositions[i][2];
      }

      // itemSize = 3 because there are 3 values (components) per vertex
      blueGeometry.addAttribute('position', new THREE.BufferAttribute(blueVertices, 3));
      var blueMaterial = new THREE.MeshBasicMaterial({
        color: 0x5771b6,
        wireframeLinewidth: 2,
        wireframe: false,
        specular: 0xffffff,
        shininess: 50,
        metal: true,
        opacity: 0.65,
        transparent: true
      });

      // var material = new THREE.MeshPhongMaterial( { color: 0x00b2fc, specular: 0x00ffff, shininess: 20, wireframeLinewidth: 2, wireframe: true } );

      var blueMesh = new THREE.Mesh(blueGeometry, blueMaterial);
      blueMesh.position.x = -0.3;
      blueMesh.position.z = -0.2;



      this.camera.lookAt(blueMesh.position);

      this.scene.add(blueMesh);


      this.light = new THREE.AmbientLight( 0xffffff ); // soft white light
      this.scene.add( this.light );


      // if(helper) {
      // var gridHelper = new THREE.GridHelper( 10, 1 );
      // gridHelper.rotation.x = 1.5708;
      // gridHelper.setColors (0x00ff00, 0x004400);
      // this.scene.add( gridHelper );
      // }

      this.video = document.createElement('video');
      document.body.appendChild(this.video);

      var localMediaStream = null;


      this.videoTexture = new THREE.Texture(this.video);
      this.videoTexture.minFilter = THREE.LinearFilter;
      this.videoTexture.magFilter = THREE.LinearFilter;

      this.movieMaterial = new THREE.MeshBasicMaterial({
        map: this.videoTexture,
        overdraw: true,
        opacity: 1.0,
        transparent: false
      });

      // the geometry on which the movie will be displayed;
      //      movie image will be scaled to fit these dimensions.
      this.screenGeometry = new THREE.PlaneGeometry(16, 9, 16, 9);
      this.movieScreen = new THREE.Mesh(this.screenGeometry, this.movieMaterial);
      this.movieScreen.position.z = -2;
      this.movieScreen.scale.set(5,5,5);
      this.movieScreen.rotation.x = 0.1;

      this.scene.add(this.movieScreen);
      var screenshots = 0;

      var videoSnapshot = function() {
        if (localMediaStream) {

          var link = document.createElement('a');
          document.querySelectorAll('.message')[0].appendChild(link);
          screenshots++;
          link.setAttribute('download', 'bowie-tribute-screenshot'+screenshots+'.png');
          link.innerHTML = 'Screenshot'+ screenshots;
          link.setAttribute('href', s.renderer.domElement.toDataURL("image/png").replace("image/png", "image/octet-stream"));


        }
      };

      var videoErrorCallback = function() {
          alert('Please try to view this website with Google Chrome.');
      };

      this.renderer.domElement.addEventListener('click', videoSnapshot, false);

      // Not showing vendor prefixes or code that works cross-browser.
      navigator.getUserMedia({
        video: true
      }, function(stream) {
        s.video.src = window.URL.createObjectURL(stream);
        localMediaStream = stream;
      }, videoErrorCallback);


      this.update();






    };


    World.prototype.update = function() {

      var s = this;

      this.renderer.render(this.scene, this.camera);

      if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
        if (this.videoTexture) {
          this.videoTexture.needsUpdate = true;
        }
        if (this.movieMaterial) {
          this.movieMaterial.needsUpdate = true;
        }
      }

      this.frame++;

      window.requestAnimationFrame(this.update.bind(this));

    };

    return World;

  });

}(define));
