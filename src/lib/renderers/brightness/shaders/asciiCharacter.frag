precision mediump float;

uniform sampler2D u_colorSampleFramebuffer;
uniform sampler2D u_charPaletteTexture;
uniform vec2 u_charPaletteSize;
uniform vec2 u_textureSize;

void main() {
    // Get logical pixel position
    vec2 pos = (floor(gl_FragCoord.xy) + 0.5) / u_textureSize;
    
    // Sample input color including alpha
    vec4 inputColor = texture2D(u_colorSampleFramebuffer, pos);
    
    // If pixel is transparent, output transparent pixel
    if (inputColor.a == 0.0) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        return;
    }
    
    // Calculate brightness from input color
    float brightness = dot(inputColor.rgb, vec3(0.299, 0.587, 0.114));
    
    // Map brightness to palette index and clamp
    float index = clamp(floor(brightness * u_charPaletteSize.x), 0.0, u_charPaletteSize.x - 1.0);
    
    // Sample character from palette and preserve input alpha
    vec3 charColor = texture2D(u_charPaletteTexture, vec2((index + 0.5) / u_charPaletteSize.x, 0.0)).rgb;
    gl_FragColor = vec4(charColor, inputColor.a);
}