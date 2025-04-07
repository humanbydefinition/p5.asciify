precision mediump float;

// Uniforms
uniform sampler2D u_sampleTexture;
uniform vec2 u_gridCellDimensions;
uniform bool u_invert;
uniform vec3 u_compareColor;

void main() {
    // Get the cell coordinate (integer) using logical coordinates
    vec2 cellCoord = floor(gl_FragCoord.xy);

    // Compute the size of each cell in texture coordinates
    vec2 cellSizeInTexCoords = vec2(1.0) / u_gridCellDimensions;

    // Compute the center coordinate of the cell in texture coordinates
    vec2 cellCenterTexCoord = (cellCoord + vec2(0.5)) * cellSizeInTexCoords;

    bool shouldInvert;

        // Color comparison mode
    shouldInvert = texture2D(u_sampleTexture, cellCenterTexCoord).rgb != u_compareColor;

    if(shouldInvert) {
        gl_FragColor = u_invert ? vec4(1.0) : vec4(vec3(0.0), 1.0);
        return;
    } else {
        gl_FragColor = vec4(0.0);
    }
}