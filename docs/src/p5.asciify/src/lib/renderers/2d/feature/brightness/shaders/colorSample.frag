precision mediump float;

// Uniforms
uniform sampler2D u_sketchTexture;             // Texture containing the sketch
uniform vec2 u_gridCellDimensions;             // Number of cells in each dimension (e.g., [64.0, 64.0])

void main() {
    // Calculate the cell coordinates based on fragment position
    vec2 cellCoord = floor(gl_FragCoord.xy);

    // Compute the size of each cell in texture coordinates
    vec2 cellSizeInTexCoords = 1.0 / u_gridCellDimensions;

    // Determine the center texture coordinate of the current cell
    vec2 cellCenterTexCoord = (cellCoord + vec2(0.5)) * cellSizeInTexCoords;

    // Initialize the final color variable
    vec4 finalColor;

    finalColor = texture2D(u_sketchTexture, cellCenterTexCoord);

    // Output the final color
    gl_FragColor = finalColor;
}
