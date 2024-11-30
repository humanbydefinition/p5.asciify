#version 100
precision lowp float;

uniform sampler2D u_pushFramebuffer; // Texture containing the push values, with red channel representing the character index
uniform sampler2D u_charPaletteTexture; // Texture containing the character palette, corresponding to the red channel noise values
uniform vec2 u_charPaletteSize; // Number of characters in the palette
uniform vec2 u_textureSize; // Size of the texture

void main() {
    vec2 pos = gl_FragCoord.xy / u_textureSize;

    vec4 pushColor = texture2D(u_pushFramebuffer, pos);

    float m = mod(pushColor.r * 100.0, u_charPaletteSize.x);

    float x_coord = (m) / u_charPaletteSize.x;

    vec2 charPos = vec2(x_coord, 0);
    vec4 charColor = texture2D(u_charPaletteTexture, charPos);

    gl_FragColor = vec4(charColor.rgb, 1.0);
}