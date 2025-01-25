precision mediump float;

uniform sampler2D u_pushFramebuffer;        // Texture containing the push values
uniform vec2 u_textureSize;                  // Size of the pushFramebuffer texture (e.g., [64, 64])

uniform sampler2D u_colorPaletteTexture;     // Texture containing the color palette
uniform vec2 u_paletteSize;                  // Dimensions of the color palette (e.g., [8, 1])

void main() {
    // Normalize fragment coordinates
    vec2 pos = (gl_FragCoord.xy) / u_textureSize;

    // Ensure pos is within [0, 1] to prevent out-of-bounds sampling
    pos = clamp(pos, 0.0, 1.0);

    // Retrieve the push color from the framebuffer
    vec4 pushColor = texture2D(u_pushFramebuffer, pos);

    // Decode the integer index from the red channel
    float index = floor(pushColor.r * 255.0 + 0.5);

    // Ensure the index wraps around if it exceeds the palette size
    float wrappedIndex = mod(index, u_paletteSize.x);

    // Calculate the normalized x-coordinate in the color palette texture
    // Adding 0.5 to sample at the center of the texel
    float x_coord = (wrappedIndex + 0.5) / u_paletteSize.x;

    // Define the palette coordinate (assuming a single row)
    vec2 paletteCoord = vec2(x_coord, 0.5); // y-coordinate centered

    // Fetch the color from the palette texture
    vec4 paletteColor = texture2D(u_colorPaletteTexture, paletteCoord);

    // Output the final color with full opacity
    gl_FragColor = vec4(paletteColor.rgb, 1.0);
}
