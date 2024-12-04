#version 100
precision mediump float;

// Uniforms
uniform sampler2D u_sketchTexture;
uniform bool u_previousRendererEnabled;
uniform sampler2D u_previousColorTexture;
uniform sampler2D u_sampleTexture;
uniform vec2 u_gridCellDimensions;
uniform int u_sampleMode;
uniform vec4 u_staticColor;

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

    // Check if the sample texture is black
    bool isBlackSample = texture2D(u_sampleTexture, cellCenterTexCoord) == vec4(vec3(0.0), 1.0);

    if (isBlackSample && u_previousRendererEnabled) {
        gl_FragColor = texture2D(u_previousColorTexture, cellCenterTexCoord);
    } else if (u_sampleMode == 0) {
        gl_FragColor = texture2D(u_sketchTexture, cellCenterTexCoord);
    } else {
        gl_FragColor = u_staticColor;
    }
}
