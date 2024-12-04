#version 100
precision mediump float;

uniform sampler2D u_pushFramebuffer;        // Texture containing the push values
uniform sampler2D u_charPaletteTexture;      // Texture containing the character palette
uniform vec2 u_charPaletteSize;              // Number of characters in the palette (e.g., [64, 64])
uniform vec2 u_textureSize;                  // Size of the pushFramebuffer texture (e.g., [64, 64])

void main() {
    // Adjust fragment coordinates based on pixel ratio and normalize
    vec2 pos = (gl_FragCoord.xy) / u_textureSize;

    // Sample the pushFramebuffer texture at the calculated position
    vec4 pushColor = texture2D(u_pushFramebuffer, pos);

    // Calculate the character index from the red channel
    float m = mod(pushColor.r * 100.0, u_charPaletteSize.x);

    // Determine the x-coordinate in the character palette texture
    float x_coord = m / u_charPaletteSize.x;

    // Define the character position in the palette (assuming a single row)
    vec2 charPos = vec2(x_coord, 0.0);

    // Sample the character color from the palette texture
    vec4 charColor = texture2D(u_charPaletteTexture, charPos);

    // Output the final color with full opacity
    gl_FragColor = vec4(charColor.rgb, 1.0);
}
