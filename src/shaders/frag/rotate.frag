#version 300 es
precision highp float;

uniform sampler2D u_image; // The image to rotate
uniform float u_angle; // The rotation angle
in vec2 v_texCoord; // Texture coordinates from vertex shader

out vec4 fragColor; // Output color

void main() {
    // Translate texture coordinates to the center
    vec2 centeredCoord = v_texCoord - 0.5f;

    // Rotate texture coordinates
    vec2 rotatedCoord;
    rotatedCoord.x = centeredCoord.x * cos(u_angle) - centeredCoord.y * sin(u_angle);
    rotatedCoord.y = centeredCoord.x * sin(u_angle) + centeredCoord.y * cos(u_angle);

    // Re-translate coordinates back
    vec2 finalCoord = rotatedCoord + 0.5f;

    // Flip the y-coordinate
    finalCoord.y = 1.0f - finalCoord.y;

    // Sample the color from the image using the rotated and flipped coordinates
    vec4 color = texture(u_image, finalCoord);

    // Output the color
    fragColor = color;
}