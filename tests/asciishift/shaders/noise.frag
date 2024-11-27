precision lowp float;

varying vec2 v_texCoord;

// Uniforms
uniform int u_bins;                   // Number of bins for quantization
uniform vec2 u_dimensions;            // Dimensions of the texture (width, height)
uniform float u_frameCount;           // Frame count for time-based movement
uniform int u_blockSize;              // Size of noise blocks (e.g., 2 for 2x2 blocks, 3 for 3x3 blocks)

// Hash function to generate pseudo-random numbers based on a vec2 value
float rand(vec2 co, float seed) {
    return fract(sin(dot(co, vec2(12.9898, 78.233)) + seed) * 43758.5453);
}

void main() {
    // Convert v_texCoord to pixel coordinates
    vec2 pixelCoord = v_texCoord * u_dimensions;
    ivec2 ipixelCoord = ivec2(floor(pixelCoord));

    // Snap coordinates to the nearest block based on u_blockSize
    ivec2 blockCoord = (ipixelCoord / u_blockSize) * u_blockSize;

    // Determine if the current pixel is on the boundary
    bool isBoundary = (ipixelCoord.x == 0) ||
                      (ipixelCoord.x == int(u_dimensions.x) - 1) ||
                      (ipixelCoord.y == 0) ||
                      (ipixelCoord.y == int(u_dimensions.y) - 1);

    if (isBoundary) {
        // Generate a seed that changes over time
        float timeSeed = u_frameCount * 0.01;

        // Generate random values for each channel using block coordinates
        float redRandom   = rand(vec2(float(blockCoord.x), float(blockCoord.y)), timeSeed);

        // Red channel: Quantize to (u_bins) levels scaled by 0.01
        float redIndex = floor(redRandom * float(u_bins));
        float redValue = redIndex * 0.01;

        // Set the fragment color with computed noise value for red channel
        gl_FragColor = vec4(redValue, 0.0, 0.0, 1.0);
    } else {
        // For non-boundary pixels, set color to black
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
}
