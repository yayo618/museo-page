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
var wiw = window.innerWidth/64;
var wih = window.innerHeight/64;
console.log(wiw,wih);
var newcamera = new THREE.OrthographicCamera(wiw,-wiw,wih,-wih,1,40);
newcamera.position.y = 5;
newcamera.rotation.x = -Math.PI/2;
var helper = new THREE.Mesh(
	new THREE.PlaneGeometry(0,0),
	new THREE.MeshBasicMaterial({color:0x00ff00,wireframe:true})
);
helper.rotation.x += Math.PI/2;
//helper.rotation.z = -Math.PI/2;
scene.add(helper);

var ptGeo = new THREE.PlaneGeometry(7.5,8.8,10,10);
var txtPiso = new THREE.TextureLoader();
var pisoTxt = new txtPiso.load("models/piso.png");
var piso = new THREE.Mesh(
    ptGeo,
    new THREE.MeshBasicMaterial({color:0xffffff, map:pisoTxt}));
piso.rotation.x = Math.PI/2;//camera orto no lo ve
piso.rotation.z = Math.PI/2;
piso.position.y = -1.5;
var txtTicho = new THREE.TextureLoader();
var tichoTxt = new txtTicho.load("models/techo.png");
var ticho = new THREE.Mesh(
    ptGeo,
    new THREE.MeshBasicMaterial({color:0xffffff, map:tichoTxt}));
ticho.rotation.x = Math.PI/2;
ticho.rotation.z = Math.PI/2;
ticho.position.y = -1.5+2.25;


var txtPared = new THREE.TextureLoader();
var paredTxt = new txtPared.load("models/pared1.png");
var paMat = new THREE.MeshBasicMaterial({color:0xffffff, map:paredTxt});
var txtParedb = new THREE.TextureLoader();
var paredbTxt = new txtParedb.load("models/pared2.png");
paredbTxt.center = new THREE.Vector2(0.5,0.5);
paredbTxt.rotation = Math.PI/2;
var pbMat = new THREE.MeshBasicMaterial({color:0xffffff, map:paredbTxt});

var paGeo = new THREE.PlaneGeometry(8.8, 2.25);
var pbGeo = new THREE.PlaneGeometry(7.5, 2.25);

var pared1 = new THREE.Mesh(paGeo, paMat);
var pared2 = new THREE.Mesh(paGeo, paMat);
var pared3 = new THREE.Mesh(pbGeo, pbMat);
var pared4 = new THREE.Mesh(pbGeo, pbMat);
pared1.position.set(0, -0.375, -3.75);
pared2.position.set(0, -0.375, 3.75);
pared2.rotation.y = Math.PI;
pared3.position.set(4.4, -0.375, 0);
pared3.rotation.y = -Math.PI/2;
pared4.position.set(-4.4, -0.375, 0);
pared4.rotation.y = Math.PI/2;
//scene.add(piso, ticho, pared1, pared2, pared3, pared4);
scene.add(piso, pared1, pared2, pared3, pared4);
//aqui estaban cuadro

var geo = new THREE.BoxGeometry(1,1,1);
var mat = new THREE.MeshStandardMaterial({color:0xffffff});
var cube = new THREE.Mesh(geo, mat);
//cube.castShadow=true;
cube.receiveShadow=true;
cube.position.y = -1;
cube.position.x = -1;
cube.scale.set(0.5,1,0.5);
var cube2 = new THREE.Mesh(geo, mat);
//cube2.castShadow=true;
cube2.receiveShadow=true;
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
	  borders.push({x:-9000,          z:-5000+(i*1000), w:1000, h:1000});
      }
      for (var i = 0; i < 19; i++) {
	  borders.push({x:-9000+(i*1000), z:5000,           w:1000, h:1000});
      }
      for (var i = 0; i < 19; i++) {
	  borders.push({x:-9000+(i*1000), z:-5000,          w:1000, h:1000});
      }
      for (var i = 0; i < 9; i++) {
	  borders.push({x:9000,           z:-5000+(i*1000), w:1000, h:1000});
      }
console.log(borders);
console.log(borders[0].x,borders[0].z);
	//collision helper
var wireGeo = new THREE.PlaneGeometry(0,0);
var wireMat = new THREE.MeshBasicMaterial({color:0xa00000,wireframe:true});

for (let i = 0; i< borders.length; i++) {//console.log(borders);}
xx = borders[i].x/1000;
zz = borders[i].z/1000;
	var wireC = new THREE.Mesh(wireGeo,wireMat);
	wireC.rotation.x += Math.PI/2;
	wireC.position.set(xx,-1,zz);
	scene.add(wireC);
}

ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
ambientLight.castShadow=true;
scene.add(ambientLight);

light = new THREE.DirectionalLight(0xffffff, 0.8, 18);
light.position.set(0,6,0);
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
		//mesh.castShadow=true;
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
				node.castShadow = true;
				node.receiveShadow = true;
				//node.material.emmisive = (1,1,1);
			}
		});

		scene.add(mesh);
		//mesh.castShadow=true;
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
/*
var paredLoader = new THREE.MTLLoader();
paredLoader.load("models/paredes.mtl", function(materials){
	materials.preload();
	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials(materials);

	objLoader.load("models/paredes.obj", function(mesh){
		var texture = new THREE.TextureLoader().load('models/bg3.png');
		mesh.traverse(function(node){
			if( node instanceof THREE.Mesh ){
				node.material.map = texture;
				node.castShadow = true;
				node.receiveShadow = true;
			}
		});


		mesh.position.set(0,-1.5,0);
		//mesh.scale.set(0.7,0.7,0.7);
		//mesh.rotation.y = -Math.PI/4;
		scene.add(mesh);
	});
});
 */

var animate = function(){
	requestAnimationFrame(animate);
	renderer.render(scene, newcamera);
	mueve();
}
animate();
