'use strict'

const main = () => {
    
    var ctx = new (window.AudioContext || window.webkitAudioContext)();
    var analyser = ctx.createAnalyser();
    
    var audio = document.getElementById('PD');
    audio.play();
    var audioSrc = ctx.createMediaElementSource(audio);
    audioSrc.connect(analyser);
    audioSrc.connect(ctx.destination);
    var freqData = new Uint8Array(analyser.frequencyBinCount);
    
    console.log(analyser);
    
    let x =0;

    const render = () => {
        requestAnimationFrame( render );
        analyser.getByteFrequencyData(freqData);
        console.log(freqData);
        
    }
    render();
}

if(window.location.pathname === '/audioviz') {
    window.onload = main();
}

