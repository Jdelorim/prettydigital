'use strict'
if(window.location.pathname === '/prettydigital') {
    console.log('helloo');
    //const stats = new Stats();
    //document.body.appendChild(stats.domElement); 
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement); 
    //vr
    let vr = true;
    if(vr === true) {
        document.body.appendChild( VRButton.createButton( renderer ) );
        renderer.vr.enabled = true;
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
    //lighting
    const light = new THREE.PointLight('rgb(255,255,255)', 1, 50);
    light.position.set(-2,0,0);
    //mesh
    mesh.position.set(0,0,-10);
    scene.add(mesh);
    scene.add(light);

    const render = () => {
        renderer.render(scene, camera);
        mesh.rotation.x += 0.006;
        mesh.rotation.y += 0.0035;
    }   
    
    const AniLoop = () => {
        requestAnimationFrame( AniLoop );
        render();
    }
    AniLoop();

}