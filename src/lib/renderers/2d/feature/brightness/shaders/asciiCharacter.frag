precision mediump float;

uniform sampler2D u_colorSampleFramebuffer;
uniform sampler2D u_charPaletteTexture;
uniform vec2 u_charPaletteSize;
uniform vec2 u_textureSize;
uniform ivec2 u_brightnessRange;

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
    
    // Calculate brightness from input color (0.0 to 1.0)
    float brightness = dot(inputColor.rgb, vec3(0.299, 0.587, 0.114));
    
    // Convert to 0-255 range to match u_brightnessRange
    float brightness255 = brightness * 255.0;
    
    // Check if brightness is outside the specified range
    if (brightness255 < float(u_brightnessRange.x) || brightness255 > float(u_brightnessRange.y)) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        return;
    }
    
    // Remap brightness from the specified range to full palette range (0.0 to 1.0)
    float normalizedBrightness = (brightness255 - float(u_brightnessRange.x)) / 
                               (float(u_brightnessRange.y) - float(u_brightnessRange.x));
    
    // Map normalized brightness to palette index and clamp
    float index = clamp(floor(normalizedBrightness * u_charPaletteSize.x), 0.0, u_charPaletteSize.x - 1.0);
    
    // Sample character from palette and preserve input alpha
    vec3 charColor = texture2D(u_charPaletteTexture, vec2((index + 0.5) / u_charPaletteSize.x, 0.0)).rgb;
    gl_FragColor = vec4(charColor, inputColor.a);
}