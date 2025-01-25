precision mediump float;

// Uniforms
uniform sampler2D u_sampleTexture;
uniform sampler2D u_sampleReferenceTexture;
uniform sampler2D u_previousInversionTexture;
uniform vec2 u_gridCellDimensions;
uniform bool u_invert;

void main() {
    // Get the cell coordinate (integer) using logical coordinates
    vec2 cellCoord = floor(gl_FragCoord.xy);
    
    // Compute the size of each cell in texture coordinates
    vec2 cellSizeInTexCoords = vec2(1.0) / u_gridCellDimensions;
    
    // Compute the center coordinate of the cell in texture coordinates
    vec2 cellCenterTexCoord = (cellCoord + vec2(0.5)) * cellSizeInTexCoords;
    
    // Check if the sample texture matches the reference texture
    bool isMatchingSample = texture2D(u_sampleTexture, cellCenterTexCoord) == texture2D(u_sampleReferenceTexture, cellCenterTexCoord);
    
    if (!isMatchingSample) {
        if (u_invert) {
            gl_FragColor = vec4(1.0);
        } else {
            gl_FragColor = vec4(vec3(0.0), 1.0);
        }
        return;
    } else  {
        gl_FragColor = texture2D(u_previousInversionTexture, cellCenterTexCoord);
    } 
}
