import * as THREE from "./three.module.js";
import { MapControls } from "./OrbitControls.js";
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

var controls = new MapControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.panSpeed = 4;
controls.keyPanSpeed = 20;

var animate = function(){
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
animate();

