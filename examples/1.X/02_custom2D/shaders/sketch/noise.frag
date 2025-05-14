precision mediump float;

varying vec2 v_texCoord;

// Uniforms
uniform int u_bins;                // Number of bins for quantization (e.g., 8)
uniform vec2 u_dimensions;         // Dimensions of the texture (width, height)
uniform float u_frameCount;        // Frame count for time-based movement

// Hash function using a deterministic pseudo-random approach
float rand(vec2 co, float seed) {
    return fract(sin(dot(co, vec2(127.1, 311.7)) + seed) * 43758.5453);
}

void main() {
    // Convert normalized texture coordinates to absolute pixel coordinates
    vec2 pixelCoord = v_texCoord * u_dimensions;
    ivec2 ipixelCoord = ivec2(floor(pixelCoord));

    // Determine if the current pixel is on the single outermost boundary
    bool isBoundary = (ipixelCoord.x == 0) ||
                      (ipixelCoord.x == int(u_dimensions.x) - 1) ||
                      (ipixelCoord.y == 0) ||
                      (ipixelCoord.y == int(u_dimensions.y) - 1);

    if (isBoundary) {
        // Incorporate time-based variation to animate noise over frames
        float timeSeed = u_frameCount * 0.01;

        // Generate a unique seed for each boundary pixel by combining coordinates and time
        vec2 seedCoord = vec2(float(ipixelCoord.x), float(ipixelCoord.y)) + vec2(timeSeed);

        // Generate a pseudo-random value for the red channel based on the seed
        float redRandom = rand(seedCoord, timeSeed);

        // Quantize the random value into discrete bins
        float redIndex = floor(redRandom * float(u_bins));

        // Encode the index as a normalized value by dividing by 255.0
        float redValue = redIndex / 255.0;

        // Assign the quantized red value with full opacity
        gl_FragColor = vec4(redValue, redValue, redValue, 1.0);
    } else {
        // Non-boundary pixels are rendered as black
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
}
