precision mediump float;

// Uniforms
uniform sampler2D u_sketchTexture;
uniform sampler2D u_sampleTexture;             // Texture used for sampling
uniform vec2 u_gridCellDimensions;             // Number of cells in each dimension (e.g., [64.0, 64.0])
uniform int u_sampleMode;                      // Mode for sampling (e.g., 0 for sketch, 1 for static color)
uniform vec4 u_staticColor;                    // Static color to use when not matching

void main() {
    // Calculate the cell coordinates based on fragment position
    vec2 cellCoord = floor(gl_FragCoord.xy);

    // Compute the size of each cell in texture coordinates
    vec2 cellSizeInTexCoords = 1.0 / u_gridCellDimensions;

    // Determine the center texture coordinate of the current cell
    vec2 cellCenterTexCoord = (cellCoord + vec2(0.5)) * cellSizeInTexCoords;

    // Initialize the final color variable
    vec4 finalColor;

    vec4 sampleColor = texture2D(u_sampleTexture, cellCenterTexCoord);

    if(sampleColor != vec4(0.0, 0.0, 0.0, 0.0)) {
        if(u_sampleMode == 0) {
            // If not black and sample mode is 0, use the sketch texture
            finalColor = texture2D(u_sketchTexture, cellCenterTexCoord);
        } else {
            // Otherwise, use the static color
            finalColor = u_staticColor;
        }
    } 

    // Output the final color
    gl_FragColor = finalColor;
}
