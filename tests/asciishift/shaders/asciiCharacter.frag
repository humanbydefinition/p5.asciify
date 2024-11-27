#version 100
precision lowp float;

uniform sampler2D u_pushFramebuffer;
uniform sampler2D u_charPaletteTexture;
uniform vec2 u_charPaletteSize;
uniform vec2 u_textureSize;

void main() {
    vec2 pos = gl_FragCoord.xy / u_textureSize;

        vec4 pushColor = texture2D(u_pushFramebuffer, pos);

        float m = pushColor.r * 100.0;

        m = mod(m, u_charPaletteSize.x);

        float x_coord = (m) / u_charPaletteSize.x;

        vec2 charPos = vec2(x_coord, 0);
        vec4 charColor = texture2D(u_charPaletteTexture, charPos);

        gl_FragColor = vec4(charColor.rgb, 1.0);
}