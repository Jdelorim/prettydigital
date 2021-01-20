'use strict'

const importModel = () => {
 //stats 
 const stats = new Stats();
 document.body.appendChild(stats.domElement); 
shadowMap.enabled = true;
 const scene = new THREE.Scene();
 scene.background = new THREE.Color(0xdddddd);
 
 const camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 5000);
 camera.rotation.y = 45/180*Math.PI;
camera.position.x = 800;
camera.position.y = 100;
camera.position.z = 1000;

 const renderer = new THREE.WebGLRenderer({antialias:true});
 renderer.setSize(window.innerWidth, window.innerHeight);
 document.body.appendChild(renderer.domElement);

 const hLight = new THREE.AmbientLight(0x404040, 100);
 scene.add(hLight);

 const directionalLight = new THREE.DirectionalLight(0xffffff, 100);
 directionalLight.position.set(0,1,0);
 directionalLight.castShadow = true;
 scene.add(directionalLight);

 const light = new THREE.PointLight(0xc4c4c4,10);
light.position.set(0,300,500);
scene.add(light);
 const light2 = new THREE.PointLight(0xc4c4c4,10);
light2.position.set(500,100,0);
scene.add(light2);
const light3 = new THREE.PointLight(0xc4c4c4,10);
light3.position.set(0,100,-500);
scene.add(light3);
const light4 = new THREE.PointLight(0xc4c4c4,10);
light4.position.set(-500,300,500);
scene.add(light4);

 //load model
 let car;
 let loader = new THREE.GLTFLoader();
 loader.load('./assests/models/platonic1.gltf', function(gltf){
    car = gltf.scene.children[0];
     console.log(car);
     car.scale.set(0.5,0.5,0.5);
     car.position.set(0,0,-200);
     scene.add(gltf.scene);
     render();
 });

 const render = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(render); 
    

 }


}


if(window.location.pathname === '/importModel') {
    window.onload = importModel();
}
