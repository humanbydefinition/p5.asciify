precision highp float;

uniform sampler2D u_image; // The image to rotate
uniform float u_angle; // The rotation angle
varying vec2 v_texCoord; // Texture coordinates from vertex shader

void main() {
    // Translate texture coordinates to the center
    vec2 centeredCoord = v_texCoord - 0.5;

    // Rotate texture coordinates
    vec2 rotatedCoord;
    rotatedCoord.x = centeredCoord.x * cos(u_angle) - centeredCoord.y * sin(u_angle);
    rotatedCoord.y = centeredCoord.x * sin(u_angle) + centeredCoord.y * cos(u_angle);

    // Re-translate coordinates back
    vec2 finalCoord = rotatedCoord + 0.5;

    // Flip the y-coordinate
    finalCoord.y = 1.0 - finalCoord.y;

    // Sample the color from the image using the rotated and flipped coordinates
    vec4 color = texture2D(u_image, finalCoord);

    // Output the color
    gl_FragColor = color;
}