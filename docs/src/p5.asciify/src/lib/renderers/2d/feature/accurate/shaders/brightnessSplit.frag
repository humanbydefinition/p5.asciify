precision mediump float;

// Uniforms
uniform sampler2D u_inputImage;        // Original input image
uniform sampler2D u_brightnessTexture; // Average brightness texture
uniform vec2 u_inputImageSize;         // Size of the input image (e.g., 800.0, 800.0)
uniform int u_gridCols;                // Number of grid columns (e.g., 100)
uniform int u_gridRows;                // Number of grid rows (e.g., 100)
uniform float u_pixelRatio;            // Device pixel ratio

// Constants
const float EPSILON = 0.01;           // Epsilon threshold for floating-point comparison

void main() {
    // Adjust fragment coordinates based on pixel ratio to get logical pixel position
    vec2 logicalFragCoord = floor(gl_FragCoord.xy / u_pixelRatio);

    // Calculate the size of each grid cell in logical pixels
    float cellWidth = u_inputImageSize.x / float(u_gridCols);
    float cellHeight = u_inputImageSize.y / float(u_gridRows);

    // Normalize fragment coordinates to [0, 1] for sampling the original image
    vec2 imageTexCoord = logicalFragCoord / u_inputImageSize;

    // Sample the original image color at the current fragment
    vec4 originalColor = texture2D(u_inputImage, imageTexCoord);

    // Early return if pixel is transparent
    if (originalColor.a < EPSILON) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        return;
    }

    // Rest of the brightness processing for non-transparent pixels
    float gridX = floor(logicalFragCoord.x / cellWidth);
    float gridY = floor(logicalFragCoord.y / cellHeight);

    gridX = clamp(gridX, 0.0, float(u_gridCols - 1));
    gridY = clamp(gridY, 0.0, float(u_gridRows - 1));

    vec2 brightnessTexCoord = (vec2(gridX, gridY) + 0.5) / vec2(float(u_gridCols), float(u_gridRows));
    float averageBrightness = texture2D(u_brightnessTexture, brightnessTexCoord).r;

    float fragmentBrightness = 0.299 * originalColor.r + 0.587 * originalColor.g + 0.114 * originalColor.b;
    float brightnessDifference = fragmentBrightness - averageBrightness;

    float finalColorValue = brightnessDifference < -EPSILON ? 0.0 : 1.0;
    gl_FragColor = vec4(vec3(finalColorValue), 1.0);
}
