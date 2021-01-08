
if(window.location.pathname === '/prettydigital') {
    
    console.log('josh is a little bitch');
    const loader = new GLTFLoader();
    // const dracoLoader = new DRACOLoader();
    // dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
    // loader.setDRACOLoader( dracoLoader );
    // Load a glTF resource
loader.load(
	// resource URL
	'./assests/models/tester.gltf',
	// called when the resource is loaded
	function ( gltf ) {
        console.log('hitting here');
        scene.add( gltf.scene );
        gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
    },
	// called while loading is progressing
	function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
	// called when loading has errors
	function ( error ) {
        console.log( 'An error happened' );
    }
);

}