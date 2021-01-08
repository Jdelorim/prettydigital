const main = () => {
    console.log('hellllloooo');
    //attaches to html id
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.autoClearColor = false;

    const camera = new THREE.OrthographicCamera(
        -1,1,1,-1,-1,1
    );

    const scene = new THREE.Scene();
    const plane = new THREE.PlaneBufferGeometry(2, 2);
    const material = new THREE.MeshBasicMaterial({
        color: 'red',
    });

    scene.add(new THREE.Mesh(plane, material));

    const resizeRendererToDisplaySize = (renderer) => {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if(needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }
    const render = () => {
        resizeRendererToDisplaySize(renderer);
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    
}

main();