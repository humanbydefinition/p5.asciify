precision highp float;

uniform sampler2D u_image; // The image, whose colors get inverted
varying vec2 v_texCoord; // Texture coordinates from vertex shader

void main() {
    // Sample the color from the image
    vec4 color = texture2D(u_image, v_texCoord);

    // Invert the color
    color.rgb = 1.0 - color.rgb;

    // Output the inverted color
    gl_FragColor = color;
}