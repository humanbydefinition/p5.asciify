export const generateCharacterSelectionShader = (sampleSize: number) => `
precision mediump float;

// Uniforms for character texture and its grid dimensions
uniform sampler2D u_characterTexture;
uniform float u_charsetCols;
uniform float u_charsetRows;

// Uniforms for the sketch texture and grid configurations
uniform sampler2D u_sketchTexture;
uniform vec2 u_gridPixelDimensions;      
uniform vec2 u_gridCellDimensions;       

uniform sampler2D u_charPaletteTexture;
uniform vec2 u_charPaletteSize;          

const float SAMPLE_SIZE = float(${sampleSize});
const float SAMPLE_COUNT = SAMPLE_SIZE * SAMPLE_SIZE;

void main() {
    vec2 logicalFragCoord = floor(gl_FragCoord.xy);
    vec2 cellCoord = floor(logicalFragCoord.xy);
    vec2 cellSizeInPixels = u_gridPixelDimensions / u_gridCellDimensions;
    vec2 cellStartTexCoord = (cellCoord * cellSizeInPixels) / u_gridPixelDimensions;
    vec2 cellEndTexCoord = ((cellCoord + vec2(1.0)) * cellSizeInPixels) / u_gridPixelDimensions;
    vec2 cellSizeTexCoord = cellEndTexCoord - cellStartTexCoord;

    // Check if cell is fully transparent first
    bool isFullyTransparent = true;
    float invSampleSize = 1.0 / SAMPLE_SIZE;
    
    for (int dy = 0; dy < ${sampleSize}; dy++) {
        if (!isFullyTransparent) break;
        for (int dx = 0; dx < ${sampleSize}; dx++) {
            if (!isFullyTransparent) break;
            vec2 sampleOffset = vec2(float(dx) + 0.5, float(dy) + 0.5) * invSampleSize;
            vec2 sketchSampleCoord = cellStartTexCoord + sampleOffset * cellSizeTexCoord;
            vec4 sketchPixel = texture2D(u_sketchTexture, sketchSampleCoord);
            
            if (sketchPixel.a > 0.0) {
                isFullyTransparent = false;
            }
        }
    }

    // If fully transparent, output transparent pixel
    if (isFullyTransparent) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        return;
    }

    float minError = 1.0e20;
    float bestCharIndex = 0.0;
    float paletteCount = u_charPaletteSize.x;

    for (int i = 0; i < 1024; i++) {
        if (float(i) >= paletteCount) break;

        vec2 paletteUV = vec2((float(i) + 0.5) / paletteCount, 0.5 / u_charPaletteSize.y);
        vec4 encoded = texture2D(u_charPaletteTexture, paletteUV);

        float R = encoded.r * 255.0;
        float G = encoded.g * 255.0;
        float B = encoded.b * 255.0;
        float decodedCharIndex = R + G * 256.0 + B * 65536.0;

        float charRow = floor(decodedCharIndex / u_charsetCols);
        float charCol = decodedCharIndex - u_charsetCols * charRow;

        vec2 charBaseCoord = vec2(charCol / u_charsetCols, charRow / u_charsetRows);
        vec2 charSize = vec2(1.0 / u_charsetCols, 1.0 / u_charsetRows);

        float error = 0.0;

        for (int dy = 0; dy < ${sampleSize}; dy++) {
            for (int dx = 0; dx < ${sampleSize}; dx++) {
                vec2 sampleOffset = vec2(float(dx) + 0.5, float(dy) + 0.5) * invSampleSize;
                
                vec2 sketchSampleCoord = cellStartTexCoord + sampleOffset * cellSizeTexCoord;
                vec4 sketchSample = texture2D(u_sketchTexture, sketchSampleCoord);
                float sketchPixel = sketchSample.r;

                vec2 charSampleCoord = charBaseCoord + sampleOffset * charSize;
                float charPixel = texture2D(u_characterTexture, charSampleCoord).r;

                float diff = sketchPixel - charPixel;
                error += diff * diff;
            }
        }

        error /= SAMPLE_COUNT;

        if (error < minError) {
            minError = error;
            bestCharIndex = decodedCharIndex;
        }
    }

    float lowerByte = mod(bestCharIndex, 256.0);
    float upperByte = floor(bestCharIndex / 256.0);

    float encodedR = lowerByte / 255.0;
    float encodedG = upperByte / 255.0;

    gl_FragColor = vec4(encodedR, encodedG, 0.0, 1.0);
}
`;



export const generateBrightnessSampleShader = (samplesPerRow: number, samplesPerColumn: number) => `
precision mediump float;

// Uniforms
uniform sampler2D u_inputImage;
uniform vec2 u_inputImageSize;
uniform int u_gridCols;
uniform int u_gridRows;

// Constants
const int SAMPLES_PER_ROW = ${samplesPerRow};
const int SAMPLES_PER_COL = ${samplesPerColumn};

void main() {
    // Adjust fragment coordinates based on pixel ratio to get logical pixel position
    vec2 logicalFragCoord = floor(gl_FragCoord.xy);
    
    // Calculate the size of each grid cell in logical pixels
    vec2 cellSize = u_inputImageSize / vec2(float(u_gridCols), float(u_gridRows));

    // Determine the current fragment's grid position in the input image
    vec2 inputGridPos = logicalFragCoord * cellSize;

    // Initialize brightness accumulator
    float brightnessSum = 0.0;

    // Total number of samples
    float totalSamples = float(SAMPLES_PER_ROW * SAMPLES_PER_COL);

    // Iterate over sample points within the grid cell
    for(int i = 0; i < SAMPLES_PER_ROW; i++) {
        for(int j = 0; j < SAMPLES_PER_COL; j++) {
            // Calculate normalized texture coordinates for the sample
            vec2 offset = (vec2(float(i), float(j)) + 0.5) * (cellSize / vec2(float(SAMPLES_PER_ROW), float(SAMPLES_PER_COL)));
            vec2 texCoord = (inputGridPos + offset) / u_inputImageSize;

            // Clamp texture coordinates to [0, 1] to prevent sampling outside the image
            texCoord = clamp(texCoord, 0.0, 1.0);

            // Sample the color from the input image
            vec4 sampledColor = texture2D(u_inputImage, texCoord);

            // Calculate brightness using luminance formula
            float brightness = 0.299 * sampledColor.r + 0.587 * sampledColor.g + 0.114 * sampledColor.b;

            // Accumulate brightness
            brightnessSum += brightness;
        }
    }

    // Compute average brightness
    float averageBrightness = brightnessSum / totalSamples;

    // Output the average brightness as a grayscale color with full opacity
    gl_FragColor = vec4(vec3(averageBrightness), 1.0);
}

`;

export const generateColorSampleShader = (numSlots: number, samplesPerRow: number, samplesPerColumn: number) => `
precision mediump float;

// Uniforms
uniform sampler2D u_inputImage;        // Original input image
uniform sampler2D u_inputImageBW;      // Black and white image
uniform vec2 u_inputImageSize;         // Size of the input image (e.g., 800.0, 800.0)
uniform int u_gridCols;                // Number of grid columns (e.g., 100)
uniform int u_gridRows;                // Number of grid rows (e.g., 100)
uniform int u_colorRank;               // Color rank (e.g., 1 or 2)

// Constants
const int NUM_SLOTS = ${numSlots};
const int SAMPLES_PER_ROW = ${samplesPerRow};
const int SAMPLES_PER_COL = ${samplesPerColumn};

void main() {
    // Adjust fragment coordinates based on pixel ratio to get logical pixel position
    vec2 logicalFragCoord = floor(gl_FragCoord.xy);

    // Calculate the size of each grid cell in logical pixels
    vec2 cellSize = u_inputImageSize / vec2(float(u_gridCols), float(u_gridRows));

    // Determine the current fragment's grid position in the input image
    vec2 inputGridPos = logicalFragCoord * cellSize;

    // Calculate the center texture coordinate for saving the initial pixel color
    vec2 centerOffset = cellSize * 0.5;
    vec2 centerTexCoord = (inputGridPos + centerOffset) / u_inputImageSize;
    vec4 savedColor = texture2D(u_inputImage, centerTexCoord);

    // Initialize color slots and counts
    vec4 colors[NUM_SLOTS];
    float counts[NUM_SLOTS];
    for(int i = 0; i < NUM_SLOTS; i++) {
        colors[i] = vec4(0.0);
        counts[i] = 0.0;
    }

    // Iterate over sample points within the grid cell
    for(int i = 0; i < SAMPLES_PER_ROW; i++) {
        for(int j = 0; j < SAMPLES_PER_COL; j++) {
            // Calculate normalized texture coordinates for the sample
            vec2 offset = (vec2(float(i), float(j)) + 0.5) * (cellSize / vec2(float(SAMPLES_PER_ROW), float(SAMPLES_PER_COL)));
            vec2 texCoord = (inputGridPos + offset) / u_inputImageSize;

            // Clamp texture coordinates to [0, 1] to prevent sampling outside the image
            texCoord = clamp(texCoord, 0.0, 1.0);

            // Sample the color from the input image
            vec4 sampledColor = texture2D(u_inputImage, texCoord);

            // Sample the corresponding pixel from the black and white image
            vec4 bwColor = texture2D(u_inputImageBW, texCoord);
            float isWhite = step(0.5, bwColor.r); // Assuming grayscale, check if red channel is >= 0.5

            // Determine if the current pixel should be considered based on u_colorRank
            bool shouldConsider = false;
            if(u_colorRank == 1 && isWhite > 0.5) {
                shouldConsider = true;
            }
            else if(u_colorRank == 2 && isWhite <= 0.5) {
                shouldConsider = true;
            }

            // Skip this pixel if it doesn't meet the criteria
            if(!shouldConsider) {
                continue;
            }

            // Find a matching color slot
            bool matched = false;
            for(int k = 0; k < NUM_SLOTS; k++) {
                if(sampledColor.rgb == colors[k].rgb) {
                    counts[k] += 1.0;
                    matched = true;
                    break;
                }
            }

            // Assign to a new slot if no match is found
            if(!matched) {
                for(int k = 0; k < NUM_SLOTS; k++) {
                    if(counts[k] == 0.0) {
                        colors[k] = sampledColor;
                        counts[k] = 1.0;
                        break;
                    }
                }
            }
        }
    }

    // Track the top color based on counts
    float topCount = 0.0;
    vec4 topColor = vec4(0.0);

    for(int k = 0; k < NUM_SLOTS; k++) {
        float currentCount = counts[k];
        vec4 currentColor = colors[k];

        if(currentCount > topCount) {
            topCount = currentCount;
            topColor = currentColor;
        }
    }

    // If u_colorRank is 2 and no pixels were considered, use the savedColor instead of black
    if(u_colorRank == 2 && topCount == 0.0) {
        topColor = savedColor;
    }

    // Output the color with full opacity
    gl_FragColor = vec4(topColor.rgb, 1.0);
}
`;