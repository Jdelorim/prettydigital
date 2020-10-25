'use strict'

console.log('hello josh');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const onWindowResize = () => {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}
window.addEventListener( 'resize', onWindowResize, false );

var geo = new THREE.BoxBufferGeometry(4,4,4,1,1,1);
var mat = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var cube = new THREE.Mesh(geo, mat);
var light = new THREE.DirectionalLight('rgb(255,255,255)', 1, 50);
light.position.set(2,0,0);
scene.add(light);
scene.add(cube);


const render = () => {
    renderer.render(scene, camera);
}   

const GameLoop = () => {
    requestAnimationFrame( GameLoop );
    render();
}


