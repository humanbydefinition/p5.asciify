precision mediump float;

uniform sampler2D u_pushFramebuffer;        // Texture containing the push values
uniform sampler2D u_charPaletteTexture;      // Texture containing the character palette
uniform vec2 u_charPaletteSize;              // Number of characters in the palette (e.g., [8, 1])
uniform vec2 u_textureSize;                  // Size of the pushFramebuffer texture (e.g., [64, 64])

void main() {
    // Normalize fragment coordinates
    vec2 pos = (gl_FragCoord.xy) / u_textureSize;

    // Sample the pushFramebuffer texture at the calculated position
    vec4 pushColor = texture2D(u_pushFramebuffer, pos);

    // Decode the integer index from the red channel
    float index = floor(pushColor.r * 255.0 + 0.5);

    // Ensure the index wraps around if it exceeds the palette size
    float wrappedIndex = mod(index, u_charPaletteSize.x);

    // Calculate the normalized x-coordinate in the character palette texture
    // Adding 0.5 to sample at the center of the texel
    float x_coord = (wrappedIndex + 0.5) / u_charPaletteSize.x;

    // Define the character position in the palette (assuming a single row)
    vec2 charPos = vec2(x_coord, 0.5); // y-coordinate centered

    // Sample the character color from the palette texture
    vec4 charColor = texture2D(u_charPaletteTexture, charPos);

    // Output the final color with full opacity
    gl_FragColor = vec4(charColor.rgb, 1.0);
}
