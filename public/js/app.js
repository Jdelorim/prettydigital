'use strict'

if(window.location.pathname === '/prettydigital') {
console.log('hello');
//SHADER
const _VS = `
varying vec3 v_Normal;
varying vec2 vUv;
void main() {
    vUv = uv;
    //multiple scale to distort
    vec3 scale = vec3(4.0, 1.0, 1.0);
    //gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
;

const _FS = `
#define iter 40.0
#define scaleSpeed 3.0
#define satSpeed 4.2
//#define jtime 0.5
uniform float jtime;
uniform vec2 uResolution;
uniform vec3 sphereColor;
varying vec3 v_Normal;
varying vec2 vUv;

float N2(vec2 p) {	
	vec3 p3  = fract(vec3(p.xyx) * vec3(443.897, 441.423, 437.195));
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.x + p3.y) * p3.z);
}

void main() {
    //create coordinates 
    //vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy)/uResolution.y;
    vec2 uv = vUv * uResolution.xy;
    //iterate to make grid
    uv*=iter;
    //give ID's for each square
	vec2 gv=fract(uv)-0.5;
    vec2 id=floor(uv);
    //random values
    float ran = N2(id);
    float ran2 = N2(id+64.0);
    //offset each grid
    vec2 d = abs(gv) - (abs(sin((jtime*scaleSpeed)*ran)*0.5)-0.05);
    //draw the square
    float rect = min(max(d.x, d.y),0.0) + length(max(d, 0.0));
	float r = step(0.0, rect);
    //combine square and offset to the color var
	vec3 col = vec3(1.-r)*vec3(abs(sin((jtime+4.0)*ran2))*0.8);
    //add green color
    col *= vec3(0.3,0.8,0.4);
    gl_FragColor = vec4(col*sphereColor, 1.0);
}
`
;

//sound
const LoadSound = () => {
    console.log('sound loaded');
    const sound = new Audio();
    sound.src = '../assests/sound/pd.mp3';
    sound.play();
    // var context = new AudioContext();
    // context.createMediaElementSource(sound);
    // var analyser = context.createAnalyser();
    // analyser.fftsize = 1024;
    // var array = new Uint8Array(analyser.frequencyBinCount);
}

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

const geo = new THREE.BoxGeometry(4,4,4,1,1,1);
//swap this back
//const mat = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
const mat = new THREE.ShaderMaterial({
    uniforms: {
        sphereColor:  {
            value: new THREE.Vector3(0, 0, 0)
        },
        uResolution: {
            value: new THREE.Vector2(1, 1)
        },
        jtime: {
            value: 0.0
        },
    },
    vertexShader: _VS,
    fragmentShader: _FS
});

const cube = new THREE.Mesh(geo, mat);
const light = new THREE.PointLight('rgb(255,255,255)', 1, 50);

light.position.set(-2, 0, 0);

cube.position.z = -10.0;
cube.position.x = 0.0;
cube.position.y = 0.0;

scene.add(cube);
scene.add(light);

//console.log(mat.uniforms.sphereColor.value.x);
const render = () => {
    renderer.render(scene, camera);
    
   const c1 = new THREE.Vector3(1,0,0);
   const c2 = new THREE.Vector3(0,1,0);
   const jtime = performance.now()/1000.0;
   const jsin = Math.sin((jtime * 2.0) * 0.5 + 0.5);
   const newSphereColor = c1.lerp(c2, jsin);
    
   cube.rotation.x += 0.003;
   cube.rotation.z += 0.0021;
    
   mat.uniforms.sphereColor.value = newSphereColor;
   mat.uniforms.jtime.value = jtime*2.0;
   
}   

const GameLoop = () => {
    requestAnimationFrame( GameLoop );
    render();
}
    LoadSound();
    GameLoop();
}
