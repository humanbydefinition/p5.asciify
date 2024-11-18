export const generateSampleShader = (MAX_HISTOGRAM_SIZE, SAMPLES_PER_ROW, SAMPLES_PER_COL) => `
precision mediump float;

uniform sampler2D u_image;
uniform vec2 u_imageSize;
uniform vec2 u_gridCellDimensions;
uniform int u_threshold;

const vec3 BLACK = vec3(0.0, 0.0, 0.0);
const int MAX_HISTOGRAM_SIZE = ${MAX_HISTOGRAM_SIZE};
const int SAMPLES_PER_ROW = ${SAMPLES_PER_ROW};
const int SAMPLES_PER_COL = ${SAMPLES_PER_COL};

vec3 colorHistogram[MAX_HISTOGRAM_SIZE];
int countHistogram[MAX_HISTOGRAM_SIZE];

float round(float value) {
    return floor(value + 0.5);
}

void main() {
    vec2 bufferDimensions = u_gridCellDimensions;
    vec2 imageDimensions = u_imageSize;
    vec2 gridCellDimensions = vec2(imageDimensions.x / bufferDimensions.x, imageDimensions.y / bufferDimensions.y);

    ivec2 coords = ivec2(gl_FragCoord.xy);
    int gridX = coords.x;
    int gridY = coords.y;

    // Calculate the origin of the cell in the image
    ivec2 cellOrigin = ivec2(round(float(gridX) * gridCellDimensions.x), round(float(gridY) * gridCellDimensions.y));
    int nonBlackCount = 0;

    // Initialize histograms
    for (int i = 0; i < MAX_HISTOGRAM_SIZE; i++) {
        colorHistogram[i] = BLACK;
        countHistogram[i] = 0;
    }

    // Iterate over the cell and populate the histograms
    for (int i = 0; i < SAMPLES_PER_COL; i++) {
        for (int j = 0; j < SAMPLES_PER_ROW; j++) {
            ivec2 pixelCoords = cellOrigin + ivec2(i, j);
            // Check bounds
            if (pixelCoords.x < 0 || pixelCoords.y < 0 || pixelCoords.x >= int(imageDimensions.x) || pixelCoords.y >= int(imageDimensions.y)) {
                continue;
            }
            
            // Normalize pixel coordinates when sampling from the texture
            vec2 normalizedCoords = (vec2(pixelCoords) + 0.5) / imageDimensions; // +0.5 for pixel center
            vec3 color = texture2D(u_image, normalizedCoords).rgb;

            // Ignore black pixels
            if (color == BLACK) {
                continue;
            }

            nonBlackCount++;

            // Check if the color already exists in the histogram
            bool found = false;
            for (int k = 0; k < MAX_HISTOGRAM_SIZE; k++) {
                // colorHistogram[k] can be checked directly
                // However, floating-point comparison can be imprecise; consider comparing within a small epsilon if needed
                if (colorHistogram[k] == color) {
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

    // If the number of non-black pixels is below the threshold, output black, otherwise output the most frequent color
    if (nonBlackCount < u_threshold) {
        gl_FragColor = vec4(BLACK, 1.0);
    } else {
        gl_FragColor = vec4(mostFrequentColor, 1.0);
    }
}
`;

