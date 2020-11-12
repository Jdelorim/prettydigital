'use strict'

if(window.location.pathname === '/prettydigital') {
console.log('sup dawg');
//sound
    const sound = new Audio();
    sound.src = '../assests/sound/pd.mp3';
    sound.play();
//

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer( {antialias: true} );

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const onWindowResize = () => {
    renderer.setSize( window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

window.addEventListener( 'resize', onWindowResize, false );

////////////
const geo = new THREE.BoxGeometry(4,4,4,1,1,1);
const mat = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh(geo, mat);
const light = new THREE.PointLight('rgb(255,255,255)', 1, 50);

light.position.set(-5,0,0);

cube.position.z = -10.0;
cube.position.x = 0.0;
cube.position.y = 0.0;

scene.add(cube);
scene.add(light);

const render = () => {
    renderer.render(scene, camera);
}   

const GameLoop = () => {
    requestAnimationFrame( GameLoop );
    render();
}


    GameLoop();
}
