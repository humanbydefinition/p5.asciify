#version 100
precision mediump float;

// Uniforms
uniform sampler2D u_sketchTexture;
uniform bool u_previousRendererEnabled;
uniform sampler2D u_previousColorTexture;
uniform sampler2D u_sampleTexture;
uniform sampler2D u_sampleReferenceTexture;
uniform vec2 u_gridCellDimensions;
uniform int u_sampleMode;
uniform vec4 u_staticColor;

void main() {
    // Get the cell coordinate (integer) using logical coordinates
    vec2 cellCoord = floor(gl_FragCoord.xy);
    
    // Compute the size of each cell in texture coordinates
    vec2 cellSizeInTexCoords = vec2(1.0) / u_gridCellDimensions;
    
    // Compute the center coordinate of the cell in texture coordinates
    vec2 cellCenterTexCoord = (cellCoord + vec2(0.5)) * cellSizeInTexCoords;
    
    // Check if the sample texture matches the reference texture
    bool isMatchingSample = texture2D(u_sampleTexture, cellCenterTexCoord) == texture2D(u_sampleReferenceTexture, cellCenterTexCoord);
    
    if (isMatchingSample && u_previousRendererEnabled) {
        gl_FragColor = texture2D(u_previousColorTexture, cellCenterTexCoord);
        return;
    } else if (u_sampleMode == 0) {
        gl_FragColor = texture2D(u_sketchTexture, cellCenterTexCoord);
    } else {
        gl_FragColor = u_staticColor;
    }
}
