'use strict'

if(window.location.pathname === '/prettydigital') {
   
    //const stats = new Stats();
    //document.body.appendChild(stats.domElement); 
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x5f5f0f);
     
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer( {antialias: true} );
    //renderer.physicallyCorrectLights = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement); 
    //vr
    let vr = true;
    if(vr === true) {
        document.body.appendChild( VRButton.createButton( renderer ) );
        renderer.xr.enabled = true;
    }

    const onWindowResize = () => {
        renderer.setSize( window.innerWidth, window.innerHeight );
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

    window.addEventListener( 'resize', onWindowResize, false );
    //SCENE
    const geo = new THREE.BoxGeometry(4,4,4,1,1,1);
    const mat = new THREE.MeshLambertMaterial({color: 0xffffff});
    const mesh = new THREE.Mesh(geo, mat);
    //LOADER
     ////////////GLTF Model Loading//////////
     let loadMesh;
    
     const loader = new THREE.GLTFLoader();
     
     loader.load( '../assests/models/test2.gltf', function ( gltf ) {
     loadMesh = gltf.scene;
     console.log(loadMesh);
     loadMesh.children[0].material = new THREE.MeshLambertMaterial();
     console.log('....', loadMesh.children[0].material);
     scene.add( loadMesh );
     loadMesh.position.z = -100;
    
     }, undefined, function ( error ) {
     console.error( error );
     });
     ///////////////////////////////////////

   
    //lighting
    const light = new THREE.PointLight('rgb(255,255,255)', 1, 50);
    light.position.set(-2,0,0);
    //mesh
    mesh.position.set(0,0,-10);
    scene.add(mesh);
    
    scene.add(light);

  
    const AniLoop = () => {
        renderer.setAnimationLoop(()=>{
            mesh.rotation.x += 0.006;
            mesh.rotation.y += 0.0035;
            renderer.render(scene, camera);
        });
    }
    
    AniLoop();

}