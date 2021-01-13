'use strict'
console.log('shader loaded');

const _VS = `
varying vec3 v_Normal;
varying vec2 vUv;
uniform float jtime;
void main() {
    vUv = uv;
    
    //multiple scale to distort
    vec3 scale = vec3(2.0, 1.0, 1.0);
    //gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4((position*(scale+sin(jtime)+0.5)), 1.0);
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
