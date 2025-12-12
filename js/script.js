      var friction = 0.2;
      var xspeed = 0;
      var zspeed = 0;
      var nsx = 0;
      var nsz = 0;
      var det = false;
      var angle = 0;
      var cosy, siny;
      var x = 0;
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
	new THREE.MeshPhongMaterial({color:0xffffff})
);
cube.position.y = -1;
cube.position.x = -1;
cube.scale.set(0.5,1,0.5);
var cube2 = new THREE.Mesh(
	new THREE.BoxGeometry(1,1,1),
	new THREE.MeshPhongMaterial({color:0xffffff})
);
cube2.position.y = -1;
cube2.position.x = 1;
cube2.scale.set(0.5,1,0.5);
scene.add(cube, cube2);
//camera.position.z = 0.5;//truco estranio
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
	  
ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

	light = new THREE.PointLight(0xffffff, 0.8, 18);
	light.position.set(-3,6,-3);
	light.castShadow = true;
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 25;
	scene.add(light);
/*
const loader = new FBXLoader();
const object = await loader.loadAsync( 'models/balsatop.fbx' );
scene.add( object );
*/
const loader = new THREE.MTLLoader();
loader.load("models/balsatop.mtl", function(materials){
	
	materials.preload();
	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials(materials);
		
	objLoader.load("models/balsatop.obj", function(mesh){
		
		mesh.traverse(function(node){
			if( node instanceof THREE.Mesh ){
				node.castShadow = true;
				node.receiveShadow = true;
			}
		});
		
		scene.add(mesh);
		mesh.position.set(-0.07, -1.32, 0.09);
		mesh.scale.set(0.8,0.8,0.8);
		//mesh.rotation.y = -Math.PI/2;
	});
});
	  
const mtlLoader = new THREE.MTLLoader();
mtlLoader.load("models/balsa79.mtl", function(materials){
		
	materials.preload();
	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials(materials);
		
	objLoader.load("models/balsa79.obj", function(mesh){
		
		var texture = new THREE.TextureLoader().load('models/bg.jpg');
		mesh.traverse(function(node){
			if( node instanceof THREE.Mesh ){
				node.material.map = texture;
				//node.castShadow = true;
				//node.receiveShadow = true;
				//node.material.emmisive = (1,1,1);
			}
		});
		
		scene.add(mesh);
		mesh.position.set(-1, -0.5, 0);
		mesh.scale.set(0.1,0.1,0.1);
		//mesh.rotation.y = -Math.PI/4;
	});
		
});
	
var ranaLoader = new THREE.MTLLoader();
ranaLoader.load("models/rana.mtl", function(materials){
	materials.preload();
	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials(materials);
		
	objLoader.load("models/rana.obj", function(mesh){
		
		mesh.traverse(function(node){
			if( node instanceof THREE.Mesh ){
				node.castShadow = true;
				node.receiveShadow = true;
			}
		});
		
		scene.add(mesh);
		mesh.position.set(0.3, -1.2, -0.5);
		mesh.scale.set(0.7,0.7,0.7);
		mesh.rotation.y = -Math.PI/4;
	});
});
   

var animate = function(){
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	mueve();
}
animate();

