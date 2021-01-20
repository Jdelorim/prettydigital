'use strict'

if(window.location.pathname === '/prettydigital') {
   console.log('jjjjj');
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
    //const mat = new THREE.MeshLambertMaterial({color: 0xffffff});
    const mat = new THREE.ShaderMaterial({
        uniforms: {
            sphereColor: {
                value: new THREE.Vector3(1, 1, 1)
            },
            uResolution: {
                value: new THREE.Vector2(1,1)
            },
            jtime: {
                value: 0.0
            },
        },
        //wireframe: true,
        uniformsNeedUpdate: true,
        vertexShader: _VS,
        fragmentShader: _FS,
        
    });
    const mat1 = new THREE.ShaderMaterial({
        uniforms: {
            sphereColor: {
                value: new THREE.Vector3(1, 1, 1)
            },
            uResolution: {
                value: new THREE.Vector2(5,5)
            },
            jtime: {
                value: 0.0
            },
        },
        wireframe: true,
        uniformsNeedUpdate: true,
        vertexShader: _VS,
        fragmentShader: _FS,
        
    });
    
    const mesh = new THREE.Mesh(geo, mat);
    //LOADER
     ////////////GLTF Model Loading//////////
     var loadMesh;
    
     const loader = new THREE.GLTFLoader();
     
     loader.load( '../assests/models/platonic1REV.gltf', function ( gltf ) {
     loadMesh = gltf.scene;
     
     //console.log('josh material',mat1);
     //loadMesh.material = mat1;
     
     loadMesh.material = new THREE.MeshLambertMaterial({
         fog: false,
         color: 'rgb(255,192,203)'
    });
     
     loadMesh.position.set(0,0,0);
     loadMesh.scale.set(5,5,5);
     console.log('sho my mesh', loadMesh);
     scene.add( loadMesh );
     
     }, undefined, function ( error ) {
     console.error( error );
     });
     

     ///////////////////////////////////////
    //lighting
    //const light = new THREE.PointLight('rgb(255,255,255)', 1, 50);
    //light.position.set(-2,0,0);
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
    directionalLight.position.set( 0, 40, 500 );
	scene.add( directionalLight );
    //mesh
    mesh.position.set(0,0,-10);
    scene.add(mesh);
    
    const AniLoop = () => {
        renderer.setAnimationLoop(()=>{
            mesh.rotation.x += 0.006;
            mesh.rotation.y += 0.0035;

            const c1 = new THREE.Vector3(1,0,0);
            const c2 = new THREE.Vector3(0,1,0);
            const jtime = performance.now()/1000.0;
            const jsin = Math.sin((jtime * 2.0) * 0.5 + 0.5);
            const newSphereColor = c1.lerp(c2, jsin);

            mat.uniforms.sphereColor.value = newSphereColor;
            mat.uniforms.jtime.value = jtime*2.0;
            
            if(loadMesh) {
                loadMesh.rotation.z += 0.0034;
                
            } 

            renderer.render(scene, camera);
        });
    }
    
    AniLoop();
}