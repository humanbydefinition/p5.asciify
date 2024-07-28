#version 300 es
precision highp float;

uniform sampler2D u_image;
in vec2 v_texCoord;

out vec4 fragColor;

void main() {
    vec4 color = texture(u_image, v_texCoord);
    float luminance = 0.299f * color.r + 0.587f * color.g + 0.114f * color.b;
    color.rgb = vec3(luminance);
    fragColor = color;
}