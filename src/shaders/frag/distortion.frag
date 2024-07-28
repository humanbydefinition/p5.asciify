#version 300 es
precision highp float;

in vec2 v_texCoord;

uniform sampler2D u_image;
uniform float u_time;
uniform float u_frequency;
uniform float u_amplitude;

out vec4 fragColor;

void main() {
    vec2 uv = v_texCoord;

    float sineWave = sin(uv.y * u_frequency + u_time) * u_amplitude;

    vec2 distort = vec2(sineWave, sineWave);

    vec4 texColor = texture(u_image, mod(uv + distort, 1.0f));

    fragColor = texColor;
}