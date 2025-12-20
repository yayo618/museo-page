//cuadro1
var txt1 = new THREE.TextureLoader().load("cuadros/c1.jpg");
var cdr1 = new THREE.Mesh(
    new THREE.PlaneGeometry(1.4,0.88),
    new THREE.MeshBasicMaterial({color:0xffffff,map:txt1})
);
//borde cuadro 1
var cdrB1 = new THREE.Mesh(
    new THREE.BoxGeometry(1.4,0.88,0.05,0),
    new THREE.MeshBasicMaterial({color:0x46284B})
);
cdr1.position.set(0,0,-3.7);
cdrB1.position.set(0,0,-3.72);
scene.add(cdr1,cdrB1);


