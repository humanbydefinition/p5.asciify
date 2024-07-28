#version 300 es
precision highp float;

uniform sampler2D u_image; // The image to be brightness adjusted
uniform float u_brightness; // Brightness adjustment factor
in vec2 v_texCoord; // Texture coordinates from vertex shader

out vec4 fragColor; // Output color

void main() {
    // Sample the color from the image
    vec4 color = texture(u_image, v_texCoord);

    // Adjust the color's brightness
    color.rgb += u_brightness;

    // Clamp the results to the valid range [0, 1] to avoid invalid colors
    color.rgb = clamp(color.rgb, 0.0f, 1.0f);

    // Output the brightness-adjusted color
    fragColor = color;
}