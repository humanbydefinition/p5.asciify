#version 100
precision mediump float;

// Uniforms
uniform sampler2D u_sketchTexture;
uniform sampler2D u_colorPaletteTexture;
uniform sampler2D u_previousAsciiCharacterTexture;
uniform vec2 u_gridCellDimensions;
uniform int u_totalChars;

// New Uniform for Pixel Ratio
uniform float u_pixelRatio;

void main() {
    // Adjust fragment coordinates based on pixel ratio to get logical pixel position
    vec2 logicalFragCoord = floor(gl_FragCoord.xy / u_pixelRatio);
    
    // Get the cell coordinate (integer) using logical coordinates
    vec2 cellCoord = floor(logicalFragCoord);
    
    // Compute the size of each cell in texture coordinates
    vec2 cellSizeInTexCoords = vec2(1.0) / u_gridCellDimensions;
    
    // Compute the center coordinate of the cell in texture coordinates
    vec2 cellCenterTexCoord = (cellCoord + vec2(0.5)) * cellSizeInTexCoords;
    
    // Early exit - use previous frame's data for black pixels
    if(texture2D(u_sketchTexture, cellCenterTexCoord) == vec4(vec3(0.0), 1.0)) {
        gl_FragColor = texture2D(u_previousAsciiCharacterTexture, cellCenterTexCoord);
        return;
    }
    
    // Sample the sketch texture at the center of the cell
    vec4 sketchColor = texture2D(u_sketchTexture, cellCenterTexCoord);
    
    // Compute brightness
    float brightness = dot(sketchColor.rgb, vec3(0.299, 0.587, 0.114));
    
    // Map brightness to character index
    int charIndex = int(brightness * float(u_totalChars));
    
    // Clamp the character index to valid range
    if(charIndex > u_totalChars - 1) {
        charIndex = u_totalChars - 1;
    }
    
    // Convert character index to texture coordinate for 1D palette
    float paletteCoord = (float(charIndex) + 0.5) / float(u_totalChars);
    
    // Sample from color palette (use y=0.5 for 1D texture)
    gl_FragColor = texture2D(u_colorPaletteTexture, vec2(paletteCoord, 0.5));
}
