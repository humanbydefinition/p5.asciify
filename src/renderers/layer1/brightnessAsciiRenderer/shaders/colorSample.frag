precision mediump float;

// Uniforms
uniform sampler2D u_sketchTexture;      // Texture containing the sketch
uniform vec2 u_gridCellDimensions;      // Number of cells in each dimension (e.g., [64.0, 64.0])
uniform float u_pixelRatio;             // Device pixel ratio (e.g., 1.0 for standard DPI, 2.0 for Retina)

void main() {
    // Adjust fragment coordinates based on pixel ratio to get logical coordinates
    vec2 logicalFragCoord = gl_FragCoord.xy / u_pixelRatio;
    
    // Get the integer cell coordinates
    vec2 cellCoord = floor(logicalFragCoord);
    
    // Compute the size of each cell in texture coordinates
    vec2 cellSizeInTexCoords = 1.0 / u_gridCellDimensions;
    
    // Compute the center coordinate of the cell in texture coordinates
    vec2 cellCenterTexCoord = (cellCoord + vec2(0.5)) * cellSizeInTexCoords;
    
    // Sample the sketch texture at the center of the cell
    vec4 sampledColor = texture2D(u_sketchTexture, cellCenterTexCoord);
    
    // Output the sampled color directly
    gl_FragColor = sampledColor;
}
