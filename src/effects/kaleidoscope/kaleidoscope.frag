precision mediump float;

uniform sampler2D u_image; // The image to apply the mirror effect
uniform int u_segments; // Number of kaleidoscope segments
uniform float u_angle; // Rotation angle for the kaleidoscope

#define PI 3.1415926535897932384626433832795

varying vec2 v_texCoord; // Texture coordinates from vertex shader

void main() {

    if(u_segments == 1) {
        vec2 mirroredCoord = v_texCoord;

    // Check if the current fragment is on the right half
        if(v_texCoord.x > 0.5) {
        // Mirror the x coordinate across the vertical center line
            mirroredCoord.x = 1.0 - mirroredCoord.x;
        }

    // Sample the color from the image using the (possibly mirrored) coordinates
        vec4 color = texture2D(u_image, mirroredCoord);

    // Output the color
        gl_FragColor = color;
    } else {
        // Calculate the angle per segment
        float angle = 2.0 * PI / float(u_segments);

    // Translate texture coordinates to the center
        vec2 centeredCoord = v_texCoord - 0.5;

    // Rotate texture coordinates
        float currentAngle = atan(centeredCoord.y, centeredCoord.x);
        float radius = length(centeredCoord);
        currentAngle = mod(currentAngle, angle);

    // Mirror the segments
        currentAngle = angle / 2.0 - abs(currentAngle - angle / 2.0);

    // Apply the kaleidoscope rotation angle
        currentAngle += u_angle;

    // Convert polar coordinates back to Cartesian
        vec2 rotatedCoord = vec2(cos(currentAngle), sin(currentAngle)) * radius;

    // Re-translate coordinates back
        vec2 finalCoord = rotatedCoord + 0.5;

    // Sample the color from the image using the manipulated coordinates
        vec4 color = texture2D(u_image, finalCoord);

    // Output the color
        gl_FragColor = color;
    }
}
