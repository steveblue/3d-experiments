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


      this.camera.lookAt({x:0,y:0,z:0});



      this.light = new THREE.AmbientLight( 0xffffff ); // soft white light
      this.scene.add( this.light );


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
      this.videoPlane = new THREE.Mesh(this.screenGeometry, this.movieMaterial);
      this.videoPlane.position.z = -2;
      this.videoPlane.scale.set(5,5,5);
      this.videoPlane.rotation.x = 0.1;

      this.scene.add(this.videoPlane);
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
