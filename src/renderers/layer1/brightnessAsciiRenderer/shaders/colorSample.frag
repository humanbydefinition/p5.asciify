precision mediump float;

uniform sampler2D u_sketchTexture;
uniform vec2 u_gridCellDimensions;

void main() {
    // Get the cell coordinate (integer)
    vec2 cellCoord = floor(gl_FragCoord.xy);

    // Compute the size of each cell in texture coordinates
    vec2 cellSizeInTexCoords = vec2(1.0) / u_gridCellDimensions;

    // Compute the center coordinate of the cell in texture coordinates
    vec2 cellCenterTexCoord = (cellCoord + vec2(0.5)) * cellSizeInTexCoords;

    // Sample the sketch texture at the center of the cell
    vec4 sampledColor = texture2D(u_sketchTexture, cellCenterTexCoord);

    // Output the sampled color directly
    gl_FragColor = sampledColor;
}