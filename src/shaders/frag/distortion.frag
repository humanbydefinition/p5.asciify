precision highp float;

uniform sampler2D u_image; // The image
uniform float u_time;
uniform float u_frequency;
uniform float u_amplitude;

varying vec2 v_texCoord;

void main() {
    vec2 uv = v_texCoord;

    float sineWave = sin(uv.y * u_frequency + u_time) * u_amplitude;

    vec2 distort = vec2(sineWave, sineWave);

    vec4 texColor = texture2D(u_image, mod(uv + distort, 1.0));

    gl_FragColor = texColor;
}