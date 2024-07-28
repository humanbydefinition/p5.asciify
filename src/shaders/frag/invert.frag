#version 300 es
precision highp float;

uniform sampler2D u_image; // The image, whose colors get inverted
in vec2 v_texCoord; // Texture coordinates from vertex shader

out vec4 fragColor; // Output color

void main() {
    // Sample the color from the image
    vec4 color = texture(u_image, v_texCoord);

    // Invert the color
    color.rgb = 1.0f - color.rgb;

    // Output the inverted color
    fragColor = color;
}