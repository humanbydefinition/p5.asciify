#version 100
precision lowp float;

uniform sampler2D u_pushFramebuffer;
uniform vec2 u_textureSize;

uniform sampler2D u_colorPaletteTexture;
uniform float u_paletteSize; // Number of colors in the palette

void main() {
    vec2 pos = gl_FragCoord.xy / u_textureSize;

    vec4 pushColor = texture2D(u_pushFramebuffer, pos);

    // Decode and offset the column index
    float m = mod(pushColor.r * 100.0, u_paletteSize);

    // Calculate the texture coordinate for the color palette
    vec2 paletteCoord = vec2(m / u_paletteSize, 0.5);

    // Fetch the color from the palette
    vec4 paletteColor = texture2D(u_colorPaletteTexture, paletteCoord);

    gl_FragColor = vec4(paletteColor.rgb, 1.0);
}