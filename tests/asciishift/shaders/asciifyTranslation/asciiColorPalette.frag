#version 100
precision lowp float;

uniform sampler2D u_pushFramebuffer;
uniform vec2 u_textureSize;

uniform sampler2D u_colorPaletteTexture;
uniform vec2 u_paletteSize; // Changed from float to vec2

void main() {
    // Normalize fragment coordinates
    vec2 pos = gl_FragCoord.xy / u_textureSize;

    // Retrieve the push color
    vec4 pushColor = texture2D(u_pushFramebuffer, pos);

    // Decode and offset the color index
    float m = mod(pushColor.r * 100.0, u_paletteSize.x);

    // Calculate normalized texture coordinates for the palette
    float x_coord = m / u_paletteSize.x;
    vec2 paletteCoord = vec2(x_coord, 0.0); // Set y-coordinate to 0.0

    // Fetch the color from the palette
    vec4 paletteColor = texture2D(u_colorPaletteTexture, paletteCoord);

    // Output the final color with full opacity
    gl_FragColor = vec4(paletteColor.rgb, 1.0);
}
