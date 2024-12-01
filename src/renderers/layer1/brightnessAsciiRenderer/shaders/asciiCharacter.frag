#version 100
precision mediump float;

uniform sampler2D u_pushFramebuffer;
uniform sampler2D u_charPaletteTexture;
uniform vec2 u_charPaletteSize;
uniform vec2 u_textureSize;
uniform float u_pixelRatio;

void main() {
    // Get logical pixel position
    vec2 pos = (floor(gl_FragCoord.xy / u_pixelRatio) + 0.5) / u_textureSize;
    
    // Calculate brightness from push color
    float brightness = dot(texture2D(u_pushFramebuffer, pos).rgb, vec3(0.299, 0.587, 0.114));
    
    // Map brightness to palette index and clamp
    float index = clamp(floor(brightness * u_charPaletteSize.x), 0.0, u_charPaletteSize.x - 1.0);
    
    // Sample character from palette
    gl_FragColor = vec4(texture2D(u_charPaletteTexture, vec2((index + 0.5) / u_charPaletteSize.x, 0.0)).rgb, 1.0);
}