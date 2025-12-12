      var friction = 0.2;
      var xspeed = 0;
      var zspeed = 0;
      var nsx = 0;
      var nsz = 0;
      var det = false;
      var angle = 0;
      var cosy, siny;
      var x = 8000;
      var z = 3000;
//import * as THREE from "./three.module.js";
//import { MapControls } from "./OrbitControls.js";
var scene, camera, renderer;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight);
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var cube = new THREE.Mesh(
	new THREE.BoxGeometry(1,1,1),
	new THREE.MeshBasicMaterial({color:0x00ff00, wireframe:true})
);
cube.position.z = -2;
scene.add(cube);
camera.position.z = 0.5;//truco estranio
/*
var controls = new MapControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.panSpeed = 4;
controls.keyPanSpeed = 20;
*/
      var borders = [];
      for (var i = 0; i < 9; i++) {
	  borders.push({x:-10000, z:-5000+(i*1000), w:1000, h:1000});
      }
      for (var i = 0; i < 19; i++) {
	  borders.push({x:-9000+(i*1000), z:5000, w:1000, h:1000});
      }
      for (var i = 0; i < 19; i++) {
	  borders.push({x:-9000+(i*1000), z:-5000, w:1000, h:1000});
      }
      for (var i = 0; i < 9; i++) {
	  borders.push({x:10000, z:-5000+(i*1000), w:1000, h:1000});
      }      
   

var animate = function(){
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	mueve();
}
animate();

