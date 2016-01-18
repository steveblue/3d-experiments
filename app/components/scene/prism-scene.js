/* global THREE */
(function(define) {
  'use strict';

  define([

  ], function( ) {

    var World = function(Prism, elem, light, helper) {

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

      this.camera = new THREE.PerspectiveCamera(65,  s.width / s.height, 0.1, 1000);
      this.camera.position.x = 0;
      this.camera.position.y = -5;
      this.camera.position.z = 20;


      this.renderer = new THREE.WebGLRenderer({antialias: true});
      this.renderer.setClearColor(new THREE.Color(0x000000, 1.0));
      this.renderer.setSize(s.width, s.height);

      elem[0].appendChild(this.renderer.domElement);

      var geometry = new THREE.BufferGeometry();
      // create a simple square shape. We duplicate the top left and bottom right
      // vertices because each vertex needs to appear once per triangle.

      var prism = new Prism();

      var glassVertexPositions = prism.glass;

      var glassVertices = new Float32Array( glassVertexPositions.length * 3 ); // three components per vertex

      // components of the position vector for each vertex are stored
      // contiguously in the buffer.
      for ( i = 0; i < glassVertexPositions.length; i++ )
      {
      	glassVertices[ i*3 + 0 ] = glassVertexPositions[i][0];
      	glassVertices[ i*3 + 1 ] = glassVertexPositions[i][1];
      	glassVertices[ i*3 + 2 ] = glassVertexPositions[i][2];
      }

      // itemSize = 3 because there are 3 values (components) per vertex
      geometry.addAttribute( 'position', new THREE.BufferAttribute( glassVertices, 3 ) );
      var material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframeLinewidth: 2, wireframe: true } );

      // var material = new THREE.MeshPhongMaterial( { color: 0x00b2fc, specular: 0x00ffff, shininess: 20, wireframeLinewidth: 2, wireframe: true } );

      var glassMesh = new THREE.Mesh( geometry, material );

      this.camera.lookAt(glassMesh.position);

      this.scene.add(glassMesh);

      if(light) {

      var lightInGeometry = new THREE.Geometry();
      var lightInMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        linewidth: 4
      });

      lightInGeometry.vertices.push(new THREE.Vector3(-30, 0, 0));
      lightInGeometry.vertices.push(new THREE.Vector3(-10, 0, 0));
      lightInGeometry.vertices.push(new THREE.Vector3(-6, 0, 0));

      var lightInMesh = new THREE.Line( lightInGeometry, lightInMaterial );

      this.scene.add(lightInMesh);

      var rainbowColors = [0xff0000, 0xff7700, 0xffdd00, 0x00ff00, 0x0000ff, 0x8a2be2, 0xc77df3];
      var lightOutGeo = [];
      var lightOutGroup = new THREE.Group();

      for( i = 0; i < rainbowColors.length; i++) {

        lightOutGeo.push({
          geo: new THREE.Geometry(),
          mat: new THREE.LineBasicMaterial({
            color: rainbowColors[i],
            linewidth: 3
          })
        });

        lightOutGeo[i].mesh = new THREE.Line( lightOutGeo[i].geo, lightOutGeo[i].mat );
        lightOutGeo[i].geo.translate( 0, 0, 0 );

        if( i === 0 ) {

          lightOutGeo[i].geo.vertices.push(new THREE.Vector3(0, 0, 0));
          lightOutGeo[i].geo.vertices.push(new THREE.Vector3(10, 0, 0));
          lightOutGeo[i].geo.vertices.push(new THREE.Vector3(30, 0, 0));
          lightOutGeo[i].mesh.rotation.z = 0.00;
        }

        if( i === 1 ) {

          lightOutGeo[i].geo.vertices.push(new THREE.Vector3(0, 0, 0));
          lightOutGeo[i].geo.vertices.push(new THREE.Vector3(10, 0, 0));
          lightOutGeo[i].geo.vertices.push(new THREE.Vector3(30, 0, 0));
          lightOutGeo[i].mesh.rotation.z = -0.011;
        }

        if( i === 2 ) {

          lightOutGeo[i].geo.vertices.push(new THREE.Vector3(0, 0, 0));
          lightOutGeo[i].geo.vertices.push(new THREE.Vector3(10, 0, 0));
          lightOutGeo[i].geo.vertices.push(new THREE.Vector3(30, 0, 0));
          lightOutGeo[i].mesh.rotation.z = -0.022;
        }

        if( i === 3 ) {

          lightOutGeo[i].geo.vertices.push(new THREE.Vector3(0, 0, 0));
          lightOutGeo[i].geo.vertices.push(new THREE.Vector3(10, 0, 0));
          lightOutGeo[i].geo.vertices.push(new THREE.Vector3(30, 0, 0));
          lightOutGeo[i].mesh.rotation.z = -0.033;
        }

        if( i === 4 ) {

          lightOutGeo[i].geo.vertices.push(new THREE.Vector3(0, 0, 0));
          lightOutGeo[i].geo.vertices.push(new THREE.Vector3(10, 0, 0));
          lightOutGeo[i].geo.vertices.push(new THREE.Vector3(30, 0, 0));
          lightOutGeo[i].mesh.rotation.z = -0.044;
        }

        if( i === 5 ) {

          lightOutGeo[i].geo.vertices.push(new THREE.Vector3(0, 0, 0));
          lightOutGeo[i].geo.vertices.push(new THREE.Vector3(10, 0, 0));
          lightOutGeo[i].geo.vertices.push(new THREE.Vector3(30, 0, 0));
          lightOutGeo[i].mesh.rotation.z = -0.055;
        }
        if( i === 6 ) {

          lightOutGeo[i].geo.vertices.push(new THREE.Vector3(0, 0, 0));
          lightOutGeo[i].geo.vertices.push(new THREE.Vector3(10, 0, 0));
          lightOutGeo[i].geo.vertices.push(new THREE.Vector3(30, 0, 0));
          lightOutGeo[i].mesh.rotation.z = -0.066;
        }


        lightOutGroup.add( lightOutGeo[i].mesh );

      }

      lightOutGroup.position.x = 6;
      this.scene.add(lightOutGroup);

      }

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

      var s = this;

      this.renderer.render(this.scene, this.camera);

      this.frame++;

      window.requestAnimationFrame(this.update.bind(this));

    };

    return World;

  });

}(define));
