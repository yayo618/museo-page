var cuadroGeo =  new THREE.PlaneGeometry(1.4,0.88);
var cuadroBG = new THREE.BoxGeometry(1.4,0.88,0.05,0);
var cuadroBM = new THREE.MeshBasicMaterial({color:0x46284B});
var cuadroWG = new THREE.PlaneGeometry(1.4,0.05);
var cuadroWM = new THREE.MeshBasicMaterial({color:0xff0000,wireframe:true});


for (let i = 0; i < 4; i++){//arriba
	/*
	//wire cuadro
	var wireC = new THREE.Mesh(cuadroWG,cuadroWM);
	wireC.rotation.x = Math.PI/2;//gira para ver wire
	wireC.position.set(-3+i*2,0,-3.72);
	scene.add(wireC);
	*/
var txt1 = new THREE.TextureLoader().load(`cuadros/${i+1}.jpg`);
var cuadroMat =  new THREE.MeshBasicMaterial({color:0xffffff,map:txt1});
//cuadro1
var cdr1 = new THREE.Mesh(cuadroGeo, cuadroMat);
//borde cuadro 1
var cdrB1 = new THREE.Mesh(cuadroBG, cuadroBM);
cdr1.position.set( -3+i*2,0,-3.7 );
cdrB1.position.set(-3+i*2,0,-3.72);
scene.add(cdr1,cdrB1);
}
for (let i = 0; i < 4; i++){//izq
	//wire cuadro
	var wireC = new THREE.Mesh(cuadroWG,cuadroWM);
	wireC.rotation.x = Math.PI/2;
	wireC.rotation.z = Math.PI/2;
	wireC.position.set(-4.375,0,-2.7+i*1.8);
	scene.add(wireC);
}
for (let i = 0; i < 4; i++){//der
	//wire cuadro
	var wireC = new THREE.Mesh(cuadroWG,cuadroWM);
	wireC.rotation.x = Math.PI/2;//gira para ver wire
	wireC.rotation.z = Math.PI/2;
	wireC.position.set(4.375,0,-2.7+i*1.8);
	scene.add(wireC);
}
