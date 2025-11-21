#version 300 es
precision mediump float;

in vec2 v_texCoord;

uniform sampler2D u_framebuffer;
uniform vec3 u_palette[64];
uniform int u_paletteSize;

out vec4 fragColor;

// Calculate color distance (Euclidean distance in RGB space)
float colorDistance(vec3 c1, vec3 c2) {
    vec3 diff = c1 - c2;
    return dot(diff, diff);
}

// Find the closest color in the palette
vec3 findClosestColor(vec3 color) {
    float minDist = colorDistance(color, u_palette[0]);
    vec3 closestColor = u_palette[0];

    // Iterate up to the maximum palette capacity but stop when we reach the provided size.
    for (int i = 1; i < 64; i++) {
        if (i >= u_paletteSize) break;
        float dist = colorDistance(color, u_palette[i]);
        if (dist < minDist) {
            minDist = dist;
            closestColor = u_palette[i];
        }
    }

    return closestColor;
}

void main() {
    // Sample the original color from the framebuffer
    vec4 originalColor = texture(u_framebuffer, v_texCoord);
    
    // Find the closest palette color
    vec3 quantizedColor = findClosestColor(originalColor.rgb);
    
    // Output the quantized color with original alpha
    fragColor = vec4(quantizedColor, originalColor.a);
}
