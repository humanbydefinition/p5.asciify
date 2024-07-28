#version 300 es
precision highp float;

uniform sampler2D u_image; // The image to apply the kaleidoscope effect
uniform int u_segments; // Number of kaleidoscope segments
uniform float u_angle; // Rotation angle for the kaleidoscope

in vec2 v_texCoord; // Texture coordinates from vertex shader
out vec4 fragColor; // Output color

#define PI 3.1415926535897932384626433832795

void main() {
    // Calculate the angle per segment
    float angle = 2.0f * PI / float(u_segments);

    // Translate texture coordinates to the center
    vec2 centeredCoord = v_texCoord - 0.5f;

    // Rotate texture coordinates
    float currentAngle = atan(centeredCoord.y, centeredCoord.x);
    float radius = length(centeredCoord);
    currentAngle = mod(currentAngle, angle);

    // Mirror the segments
    currentAngle = angle / 2.0f - abs(currentAngle - angle / 2.0f);

    // Apply the kaleidoscope rotation angle
    currentAngle += u_angle;

    // Convert polar coordinates back to Cartesian
    vec2 rotatedCoord = vec2(cos(currentAngle), sin(currentAngle)) * radius;

    // Re-translate coordinates back
    vec2 finalCoord = rotatedCoord + 0.5f;

    // Sample the color from the image using the manipulated coordinates
    vec4 color = texture(u_image, finalCoord);

    // Output the color
    fragColor = color;
}