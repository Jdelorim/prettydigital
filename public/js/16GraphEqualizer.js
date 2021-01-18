'use strict'

const maingraph = () => {
    console.log('sup dawwwg');
    //helper func
    const map =(value,  min1,  max1,  min2,  max2)=> {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }

   //stats 
    const stats = new Stats();
    document.body.appendChild(stats.domElement); 
   //FFT//loadAudio
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 32;
    const audio = document.getElementById('PD');
    audio.play();
    const audioSrc = ctx.createMediaElementSource(audio);
    audioSrc.connect(analyser);
    audioSrc.connect(ctx.destination);
    const freqData = new Uint8Array(analyser.frequencyBinCount);

    //THREE setup
    const scene = new THREE.Scene();
    //scene.background = new THREE.Color('rgb(0,0,255)');
   
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer( {antialias: true} );
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
    
    const geo = new THREE.BoxGeometry(4,4,4,1,1,1);
    const mat = new THREE.MeshLambertMaterial({color: 'rgb(255,0,0)'});
   // const mesh = new THREE.Mesh(geo, mat);
    const ran = Math.random()*360;
    const ran2 = Math.random()*360;
    const ran3 = Math.random()*360;

    class MyCube {
        constructor() {
            this.c = new THREE.Mesh(geo, mat);
            this.c.rotation.set(Math.random()*360, Math.random()*360, Math.random()*360);
        }
    }

    const cubeHolder = [];
    for(let i =0;i<freqData.length; i++) {
        cubeHolder.push(new MyCube());
        cubeHolder[i].c.position.set((i-12),0,-10);
        cubeHolder[i].c.position.x += i+2;
        cubeHolder[i].c.scale.set = (1,1,1);
        scene.add(cubeHolder[i].c);
    }

   // mesh.position.set(0, 0, -10);
   // scene.add(mesh); 

    const directionalLight =  new THREE.DirectionalLight('rgb(255,255,255)', 0.9);
    directionalLight.position.set(0, 0, 10);
    scene.add( directionalLight );

    const freqRange = [];
    
    const render = () => {
       
       renderer.setAnimationLoop(()=>{
       analyser.getByteFrequencyData(freqData);
       //console.log(freqData);
      
       // mesh.rotation.x += 0.01;
      // mesh.rotation.y += 0.008;
       
       for(let i=0; i<freqData.length; i++)  {
        freqRange[i] = map(freqData[i],0,255,0,1);
        cubeHolder[i].c.rotation.x += 0.01;
        cubeHolder[i].c.rotation.y += 0.008;
        cubeHolder[i].c.scale.x = Math.abs(freqRange[i]*4.0);
       }
       
      // mesh.scale.x = freqRange[4];
       stats.update();
       
       renderer.render(scene, camera);
       });
    }

    
    render();
}

if(window.location.pathname === '/audioviz') {
    window.onload = maingraph();
}
