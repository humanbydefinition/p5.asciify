#version 300 es
precision highp float;

uniform sampler2D u_image;

uniform vec2 u_gridCellDimensions; // New uniform to store the dimensions of the grid (number of columns and rows)
uniform int u_threshold;
out vec4 outColor;

const vec3 BLACK = vec3(0.0f, 0.0f, 0.0f);

// Increase the size of the histogram arrays to handle larger cells
const int MAX_HISTOGRAM_SIZE = 16;
vec3 colorHistogram[MAX_HISTOGRAM_SIZE];
int countHistogram[MAX_HISTOGRAM_SIZE];

void main() {
    vec2 bufferDimensions = u_gridCellDimensions;
    vec2 imageDimensions = vec2(textureSize(u_image, 0));
    vec2 gridCellDimensions = vec2(imageDimensions.x / bufferDimensions.x, imageDimensions.y / bufferDimensions.y);

    ivec2 coords = ivec2(gl_FragCoord.xy);
    int gridX = coords.x;
    int gridY = coords.y;

    ivec2 cellOrigin = ivec2(round(float(gridX) * gridCellDimensions.x), round(float(gridY) * gridCellDimensions.y));
    int histogramIndex = 0;
    int nonBlackCount = 0;

    // Initialize histograms
    for(int i = 0; i < MAX_HISTOGRAM_SIZE; i++) {
        colorHistogram[i] = BLACK;
        countHistogram[i] = 0;
    }

    // Iterate over the cell and populate the histograms
    for(int i = 0; i < int(round(gridCellDimensions.x)); i += 1) {
        for(int j = 0; j < int(round(gridCellDimensions.y)); j += 1) {
            ivec2 pixelCoords = cellOrigin + ivec2(i, j);
            if(pixelCoords.x >= int(imageDimensions.x) || pixelCoords.y >= int(imageDimensions.y)) continue; // Check bounds
            vec3 color = texelFetch(u_image, pixelCoords, 0).rgb;

            if(color == BLACK)
                continue;

            nonBlackCount++;
            bool found = false;
            for(int k = 0; k < histogramIndex; k++) {
                if(colorHistogram[k] == color) {
                    countHistogram[k]++;
                    found = true;
                    break;
                }
            }

            if(!found && histogramIndex < MAX_HISTOGRAM_SIZE) {
                colorHistogram[histogramIndex] = color;
                countHistogram[histogramIndex] = 1;
                histogramIndex++;
            }
        }
    }

    vec3 mostFrequentColor = BLACK;
    int highestCount = 0;

    // Find the most frequent color
    for(int k = 0; k < histogramIndex; k++) {
        if(countHistogram[k] > highestCount) {
            mostFrequentColor = colorHistogram[k];
            highestCount = countHistogram[k];
        }
    }

    // If the number of non-black pixels is below the threshold, output black, otherwise output the most frequent color
    if(nonBlackCount < u_threshold) {
        outColor = vec4(BLACK, 1.0f);
    } else {
        outColor = vec4(mostFrequentColor, 1.0f);
    }
}
