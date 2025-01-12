export const generateSampleShader = (MAX_HISTOGRAM_SIZE: number, SAMPLES_PER_ROW: number, SAMPLES_PER_COL: number) => `
precision mediump float;

// Uniforms
uniform sampler2D u_image;
uniform vec2 u_imageSize;             // Size of the input image in logical pixels (width, height)
uniform vec2 u_gridCellDimensions;    // Number of cells in the grid (columns, rows)
uniform int u_threshold;              // Threshold for non-black pixel count

// Constants
const vec3 BLACK = vec3(0.0, 0.0, 0.0);
const int MAX_HISTOGRAM_SIZE = ${MAX_HISTOGRAM_SIZE};
const int SAMPLES_PER_ROW = ${SAMPLES_PER_ROW};
const int SAMPLES_PER_COL = ${SAMPLES_PER_COL};

// Histograms
vec3 colorHistogram[MAX_HISTOGRAM_SIZE];
int countHistogram[MAX_HISTOGRAM_SIZE];

// Utility function for rounding
float roundFloat(float value) {
    return floor(value + 0.5);
}

void main() {
    // Adjust fragment coordinates based on pixel ratio to get logical pixel position
    vec2 logicalFragCoord = floor(gl_FragCoord.xy);
    
    // Retrieve grid cell indices
    ivec2 coords = ivec2(logicalFragCoord);
    int gridX = coords.x;
    int gridY = coords.y;

    // Compute the size of each grid cell in logical pixels
    vec2 cellSizeInPixels = u_imageSize / u_gridCellDimensions;

    // Calculate the origin of the cell in the image
    ivec2 cellOrigin = ivec2(roundFloat(float(gridX) * cellSizeInPixels.x), roundFloat(float(gridY) * cellSizeInPixels.y));
    int nonBlackCount = 0;

    // Initialize histograms
    for (int i = 0; i < MAX_HISTOGRAM_SIZE; i++) {
        colorHistogram[i] = BLACK;
        countHistogram[i] = 0;
    }

    // Iterate over the cell and populate the histograms
    for (int i = 0; i < SAMPLES_PER_COL; i++) {
        for (int j = 0; j < SAMPLES_PER_ROW; j++) {
            ivec2 pixelCoords = cellOrigin + ivec2(j, i); // Note: j corresponds to x, i to y
            
            // Check bounds
            if (pixelCoords.x < 0 || pixelCoords.y < 0 || 
                pixelCoords.x >= int(u_imageSize.x) || pixelCoords.y >= int(u_imageSize.y)) {
                continue;
            }
            
            // Normalize pixel coordinates for texture sampling
            vec2 normalizedCoords = (vec2(pixelCoords) + 0.5) / u_imageSize; // +0.5 for pixel center
            vec3 color = texture2D(u_image, normalizedCoords).rgb;

            // Ignore black pixels
            if (distance(color, BLACK) < 0.001) { // Using epsilon for comparison
                continue;
            }

            nonBlackCount++;

            // Check if the color already exists in the histogram
            bool found = false;
            for (int k = 0; k < MAX_HISTOGRAM_SIZE; k++) {
                if (distance(color, colorHistogram[k]) < 0.001) { // Using epsilon for comparison
                    countHistogram[k]++;
                    found = true;
                    break;
                }
            }

            // If the color was not found, add it to the histogram at the first available slot
            if (!found) {
                for (int m = 0; m < MAX_HISTOGRAM_SIZE; m++) {
                    if (countHistogram[m] == 0) {
                        colorHistogram[m] = color;
                        countHistogram[m] = 1;
                        break;
                    }
                }
            }
        }
    }

    vec3 mostFrequentColor = BLACK;
    int highestCount = 0;

    // Find the most frequent color
    for (int k = 0; k < MAX_HISTOGRAM_SIZE; k++) {
        if (countHistogram[k] > highestCount) {
            mostFrequentColor = colorHistogram[k];
            highestCount = countHistogram[k];
        }
    }

    // If the number of non-black pixels is below the threshold, output black; otherwise, output the most frequent color
    if (nonBlackCount < u_threshold) {
        gl_FragColor = vec4(BLACK, 1.0);
    } else {
        gl_FragColor = vec4(mostFrequentColor, 1.0);
    }
}
`;

