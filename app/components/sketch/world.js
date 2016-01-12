/* global THREE */
(function(define) {
  'use strict';

  define([

  ], function() {

    var World = function(Scene, elem, light, helper) {

      var s = this,
          i = 0;

      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.angle = Math.PI / 180;

      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.aspect = this.width / this.height;

      this.frame = 0;
      this.speed = this.frame / 100;


      this.clock = new THREE.Clock();

      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0xD6F1FF, 0.0005);

      this.camera = new THREE.PerspectiveCamera(90, s.width / s.height, 0.1, 10);


      this.camera.position.y = 0.2;

      //
      this.camera.lookAt(new THREE.Vector3(0,0,0));

      this.controls = new THREE.FirstPersonControls( this.camera );
      this.controls.movementSpeed = 4;
      this.controls.lookSpeed = 0.05;
      this.controls.noFly = true;
      this.controls.lookVertical = false;


      this.renderer = new THREE.WebGLRenderer({antialias: true});
      this.renderer.setClearColor(new THREE.Color(0x000000, 1.0));
      this.renderer.setSize(s.width, s.height);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      //

      this.scene.add(new THREE.AmbientLight(0x666666));

      this.sunLight = new THREE.DirectionalLight(0xdfebff, 1.75);
      this.sunLight.position.set(300, 400, 50);
      this.sunLight.position.multiplyScalar(1.3);

      this.sunLight.castShadow = true;
      // this.sunLight.shadowCameraVisible = true;

      this.sunLight.shadowMapWidth = 512;
      this.sunLight.shadowMapHeight = 512;

      var d = 200;

      this.sunLight.shadowCameraLeft = -d;
      this.sunLight.shadowCameraRight = d;
      this.sunLight.shadowCameraTop = d;
      this.sunLight.shadowCameraBottom = -d;

      this.sunLight.shadowCameraFar = 20;
      this.sunLight.shadowDarkness = 0.2;

      this.scene.add(this.sunLight);


      elem[0].appendChild(this.renderer.domElement);

      var ratio;
      var geometry = new THREE.PlaneGeometry(20, 20, 120, 120);
      geometry.verticesNeedUpdate = true;
      // create a simple square shape. We duplicate the top left and bottom right
      // vertices because each vertex needs to appear once per triangle.

      var material = new THREE.MeshDepthMaterial({wireframe: false});

      // var material = new THREE.MeshPhongMaterial( { color: 0xffffff, emissive: 0xffffff, fog: true, wireframeLinewidth: 1, wireframe: false, shading: THREE.FlatShading } );

      this.mesh = new THREE.Mesh( geometry, material );
      this.mesh.rotation.x = -Math.PI/2;
      this.mesh.position.y = -1;
      this.mesh.castShadow = true;

      var scene = new Scene();
      console.log(scene);


      scene.fetch('models/death-valley.dem').then(function(data){

        ratio = Math.round(Math.sqrt(data[0].length));
        console.log(ratio, Math.sqrt(this.mesh.geometry.vertices.length), data[1]);

        this.mesh.geometry = new THREE.PlaneGeometry(ratio, ratio, ratio, ratio);




        for (var i = 0, l = this.mesh.geometry.vertices.length; i < l; i++) {
          this.mesh.geometry.vertices[i].z = data[0][i] / 65535 * 2;
          //console.log(mesh.geometry.vertices[i]);
        }

        this.mesh.geometry.verticesNeedUpdate = true;
        this.mesh.geometry.normalsNeedUpdate = true;
        this.mesh.geometry.computeVertexNormals();
        // this.mesh.geometry.computeFaceNormals();

      }.bind(this));

      this.scene.add(this.mesh);

      if(helper) {
        var gridHelper = new THREE.GridHelper( 10, 1 );
        gridHelper.rotation.x = 1.5708;
        gridHelper.setColors (0x00ff00, 0x004400);
        this.scene.add( gridHelper );
      }

      this.update();


      window.addEventListener('resize', function(){

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width / this.height;
        elem[0].setAttribute('width', this.width);
        elem[0].setAttribute('height', this.height);

      }.bind(this));


    };


    World.prototype.update = function() {


      this.controls.update(this.clock.getDelta());

      this.mesh.geometry.verticesNeedUpdate = true;
      this.mesh.geometry.normalsNeedUpdate = true;
      this.mesh.geometry.computeVertexNormals();
      this.mesh.geometry.computeFaceNormals();
      // this.mesh.geometry.normalizeNormals();
      //this.camera.position.z =


      this.renderer.render(this.scene, this.camera);

      this.frame++;

      window.requestAnimationFrame(this.update.bind(this));

    };

    return World;

  });

}(define));
