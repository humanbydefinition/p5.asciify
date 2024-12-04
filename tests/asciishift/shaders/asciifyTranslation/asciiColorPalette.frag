#version 100
precision mediump float;

uniform sampler2D u_pushFramebuffer;        // Texture containing the push values
uniform vec2 u_textureSize;                  // Size of the pushFramebuffer texture (e.g., [64, 64])

uniform sampler2D u_colorPaletteTexture;     // Texture containing the color palette
uniform vec2 u_paletteSize;                  // Dimensions of the color palette (e.g., [64, 64])
uniform float u_pixelRatio;                  // Device pixel ratio (e.g., 1.0 for standard DPI, 2.0 for Retina)

void main() {
    // Adjust fragment coordinates based on pixel ratio and normalize
    vec2 pos = (gl_FragCoord.xy / u_pixelRatio) / u_textureSize;

    // Ensure pos is within [0, 1] to prevent out-of-bounds sampling
    pos = clamp(pos, 0.0, 1.0);

    // Retrieve the push color from the framebuffer
    vec4 pushColor = texture2D(u_pushFramebuffer, pos);

    // Decode and offset the color index from the red channel
    // Assumes that pushColor.r encodes the index as a fractional value
    float m = mod(pushColor.r * 100.0, u_paletteSize.x);

    // Calculate normalized x-coordinate for the palette
    float x_coord = m / u_paletteSize.x;

    // Define the palette coordinate (assuming a single row)
    vec2 paletteCoord = vec2(x_coord, 0.0);

    // Fetch the color from the palette texture
    vec4 paletteColor = texture2D(u_colorPaletteTexture, paletteCoord);

    // Output the final color with full opacity
    gl_FragColor = vec4(paletteColor.rgb, 1.0);
}
