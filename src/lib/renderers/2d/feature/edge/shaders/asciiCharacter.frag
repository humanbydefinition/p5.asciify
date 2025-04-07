precision mediump float;

// Uniforms
uniform sampler2D u_sketchTexture;
uniform vec2 u_gridCellDimensions;

void main() {
    // Get the cell coordinate (integer) using logical coordinates
    vec2 cellCoord = floor(gl_FragCoord.xy);
    
    // Compute the size of each cell in texture coordinates
    vec2 cellSizeInTexCoords = vec2(1.0) / u_gridCellDimensions;
    
    // Compute the center coordinate of the cell in texture coordinates
    vec2 cellCenterTexCoord = (cellCoord + vec2(0.5)) * cellSizeInTexCoords;
    
    // Sample from color palette (use y=0.5 for 1D texture)
    gl_FragColor = texture2D(u_sketchTexture, cellCenterTexCoord);
}