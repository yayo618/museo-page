function mueve () {
    if (det) {
	xspeed *= friction;
	zspeed *= friction;
	nsx = 0;
	nsz = 0;
    }
    xspeed = (Math.cos(-angle * Math.PI/180)*nsx)
	+(-Math.sin(-angle * Math.PI/180)*nsz);
    zspeed = (-Math.sin(angle * Math.PI/180)*nsx)
	+(Math.cos(angle * Math.PI/180)*nsz);

    //eventos teclas
    

    //coll
    let hRect = {
	x: x + xspeed,
	z: z,
	w: 1000,
	h: 1000
    }
    let vRect = {
	x: x,
	z: z + zspeed,
	w: 1000,
	h: 1000
    }
    for (let i = 0; i< borders.length; i++) {
	let bRect = {
	    x: borders[i].x,
	    z: borders[i].z,
	    w: borders[i].w,
	    h: borders[i].h
	}
	if (checkIn(hRect, bRect)) {
	    while (checkIn(hRect, bRect)) {
		//hRect.x -= Math.sign(xspeed);
		if (xspeed<0) {hRect.x-=-1;}
		else {hRect.x-=1;}
	    }
	    x = hRect.x;
	    xspeed = 0;
	}
	if (checkIn(vRect, bRect)) {
	    while (checkIn(vRect, bRect)) {
		//vRect.z -= Math.sign(zspeed);
		if (zspeed<0) {vRect.z-=-1;}
		else {vRect.z-=1;}
	    }
	    z = vRect.z;
	    zspeed = 0;
	}
    }

    x += xspeed;
    z += zspeed;
    camera.position.x = x/1000;
    camera.position.z = z/1000;

}
function rotando (ang) {
    camera.rotation.y = ang * Math.PI/180;
}

function checkIn (r1, r2) {
    if (r1.x >= r2.x + r2.w) {return false;}
    else if (r1.x + r1.w <= r2.x) {return false;}
    else if (r1.z >= r2.z + r2.h) {return false;}
    else if (r1.z + r1.h <= r2.z) {return false;}
    else {return true;}
}

//

var body = document.body;
var priP = {x:0, y:0};
var segP = {x:0, y:0};
var rott;

body.addEventListener("touchstart", function (e) {
    det = false;
    priP.x = e.touches[0].clientX;
    priP.y = e.touches[0].clientY;
}, false);
body.addEventListener("touchmove", function (e) {
    nToque = e.touches.length;
    segP.x = e.touches[0].clientX;
    segP.y = e.touches[0].clientY;
    
    if (nToque == 1) { 
	nsx = -(segP.x - priP.x);
	nsz = -(segP.y - priP.y);
    }
    if (nToque == 2) {
	rott = (segP.x - priP.x)*0.2;
	rotando(angle -= rott);
    }

    priP.x = segP.x;
    priP.y = segP.y;

}, false); 
body.addEventListener("touchend", function (e) {
    det = true;
}, false);

document.addEventListener("keydown", function (e) {
    if (e.key === "w" || e.key === "ArrowUp") {nsz = -7; det = false;}
    if (e.key === "s" || e.key === "ArrowDown") {nsz = 7; det = false;}
    if (e.key === "a") {nsx = -7; det = false;}
    if (e.key === "d") {nsx = 7; det = false;}
    if (e.key === "ArrowLeft") {rotando(angle += 1);}
    if (e.key === "ArrowRight") {rotando(angle -= 1);}
});
document.addEventListener("keyup", function (e) {
    det = true;
/*
    if (e.key === "w") {det = true;}
    if (e.key === "s") {det = true;}
    if (e.key === "a") {det = true;}
    if (e.key === "d") {det = true;}
*/
});
