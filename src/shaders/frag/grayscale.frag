precision highp float;

uniform sampler2D u_image; // The image
varying vec2 v_texCoord; // Texture coordinates from vertex shader

void main() {
    vec4 color = texture2D(u_image, v_texCoord);
    float luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
    color.rgb = vec3(luminance);
    gl_FragColor = color;
}