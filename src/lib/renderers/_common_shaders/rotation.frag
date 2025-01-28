precision mediump float;

// Common uniforms
uniform sampler2D u_sampleTexture;
uniform sampler2D u_previousRotationTexture;
uniform vec2 u_gridCellDimensions;
uniform vec3 u_rotationColor;

// Mode selection uniforms
uniform bool u_useReferenceMode;
uniform vec3 u_compareColor;
uniform sampler2D u_sampleReferenceTexture;

void main() {
    // Get the cell coordinate (integer) using logical coordinates
    vec2 cellCoord = floor(gl_FragCoord.xy);
    
    // Compute the size of each cell in texture coordinates
    vec2 cellSizeInTexCoords = vec2(1.0) / u_gridCellDimensions;
    
    // Compute the center coordinate of the cell in texture coordinates
    vec2 cellCenterTexCoord = (cellCoord + vec2(0.5)) * cellSizeInTexCoords;
    
    bool shouldRotate;
    if (u_useReferenceMode) {
        // Reference texture comparison mode
        shouldRotate = texture2D(u_sampleTexture, cellCenterTexCoord) != 
                      texture2D(u_sampleReferenceTexture, cellCenterTexCoord);
    } else {
        // Color comparison mode
        shouldRotate = texture2D(u_sampleTexture, cellCenterTexCoord).rgb != u_compareColor;
    }

    if (shouldRotate) {
        gl_FragColor = vec4(u_rotationColor, 1.0);
    } else {
        gl_FragColor = texture2D(u_previousRotationTexture, cellCenterTexCoord);
    }
}