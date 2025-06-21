var m = Object.defineProperty;
var _ = (e, r, t) => r in e ? m(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var i = (e, r, t) => _(e, typeof r != "symbol" ? r + "" : r, t);
import { renderers as a } from "p5.asciify";
const c = (e) => `
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

const float SAMPLE_SIZE = float(${e});
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
    
    for (int dy = 0; dy < ${e}; dy++) {
        if (!isFullyTransparent) break;
        for (int dx = 0; dx < ${e}; dx++) {
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

        for (int dy = 0; dy < ${e}; dy++) {
            for (int dx = 0; dx < ${e}; dx++) {
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
`, d = (e, r) => `
precision mediump float;

// Uniforms
uniform sampler2D u_inputImage;
uniform vec2 u_inputImageSize;
uniform int u_gridCols;
uniform int u_gridRows;

// Constants
const int SAMPLES_PER_ROW = ${e};
const int SAMPLES_PER_COL = ${r};

void main() {
    // Adjust fragment coordinates based on pixel ratio to get logical pixel position
    vec2 logicalFragCoord = floor(gl_FragCoord.xy);
    
    // Calculate the size of each grid cell in logical pixels
    vec2 cellSize = u_inputImageSize / vec2(float(u_gridCols), float(u_gridRows));

    // Determine the current fragment's grid position in the input image
    vec2 inputGridPos = logicalFragCoord * cellSize;

    // Check if all sampled pixels are transparent first
    bool hasOpaquePixels = false;
    float brightnessSum = 0.0;
    float opaquePixelCount = 0.0;

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

            // Check if pixel has any opacity
            if (sampledColor.a > 0.0) {
                hasOpaquePixels = true;
                
                // Calculate brightness using luminance formula
                float brightness = 0.299 * sampledColor.r + 0.587 * sampledColor.g + 0.114 * sampledColor.b;
                
                // Accumulate brightness
                brightnessSum += brightness;
                opaquePixelCount += 1.0;
            }
        }
    }

    // If no opaque pixels found, output transparent
    if (!hasOpaquePixels) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        return;
    }

    // Compute average brightness from opaque pixels only
    float averageBrightness = brightnessSum / opaquePixelCount;

    // Output the average brightness as a grayscale color with full opacity
    gl_FragColor = vec4(vec3(averageBrightness), 1.0);
}

`, u = (e, r, t) => `
precision mediump float;

// Uniforms
uniform sampler2D u_inputImage;        // Original input image
uniform sampler2D u_inputImageBW;      // Black and white image
uniform vec2 u_inputImageSize;         // Size of the input image (e.g., 800.0, 800.0)
uniform int u_gridCols;                // Number of grid columns (e.g., 100)
uniform int u_gridRows;                // Number of grid rows (e.g., 100)
uniform int u_colorRank;               // Color rank (e.g., 1 or 2)

// Constants
const int NUM_SLOTS = ${e};
const int SAMPLES_PER_ROW = ${r};
const int SAMPLES_PER_COL = ${t};

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
`, S = `precision mediump float;\r
\r
// Uniforms\r
uniform sampler2D u_inputImage;        // Original input image\r
uniform sampler2D u_brightnessTexture; // Average brightness texture\r
uniform vec2 u_inputImageSize;         // Size of the input image (e.g., 800.0, 800.0)\r
uniform int u_gridCols;                // Number of grid columns (e.g., 100)\r
uniform int u_gridRows;                // Number of grid rows (e.g., 100)\r
uniform float u_pixelRatio;            // Device pixel ratio\r
\r
// Constants\r
const float EPSILON = 0.01;           // Epsilon threshold for floating-point comparison\r
\r
void main() {\r
    // Adjust fragment coordinates based on pixel ratio to get logical pixel position\r
    vec2 logicalFragCoord = floor(gl_FragCoord.xy / u_pixelRatio);\r
\r
    // Calculate the size of each grid cell in logical pixels\r
    float cellWidth = u_inputImageSize.x / float(u_gridCols);\r
    float cellHeight = u_inputImageSize.y / float(u_gridRows);\r
\r
    // Calculate which grid cell this pixel belongs to\r
    float gridX = floor(logicalFragCoord.x / cellWidth);\r
    float gridY = floor(logicalFragCoord.y / cellHeight);\r
\r
    gridX = clamp(gridX, 0.0, float(u_gridCols - 1));\r
    gridY = clamp(gridY, 0.0, float(u_gridRows - 1));\r
\r
    // Sample the brightness texture to check if this grid cell is transparent\r
    vec2 brightnessTexCoord = (vec2(gridX, gridY) + 0.5) / vec2(float(u_gridCols), float(u_gridRows));\r
    vec4 brightnessData = texture2D(u_brightnessTexture, brightnessTexCoord);\r
    \r
    // If the brightness sample determined this grid cell is transparent, respect that decision\r
    if (brightnessData.a < EPSILON) {\r
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\r
        return;\r
    }\r
\r
    // For opaque grid cells, perform brightness split processing\r
    vec2 imageTexCoord = logicalFragCoord / u_inputImageSize;\r
    vec4 originalColor = texture2D(u_inputImage, imageTexCoord);\r
    \r
    float averageBrightness = brightnessData.r;\r
    float fragmentBrightness = 0.299 * originalColor.r + 0.587 * originalColor.g + 0.114 * originalColor.b;\r
    float brightnessDifference = fragmentBrightness - averageBrightness;\r
\r
    float finalColorValue = brightnessDifference < -EPSILON ? 0.0 : 1.0;\r
    gl_FragColor = vec4(vec3(finalColorValue), 1.0);\r
}`, o = `precision mediump float;\r
\r
attribute vec3 aPosition;\r
attribute vec2 aTexCoord;\r
\r
varying vec2 v_texCoord;\r
\r
void main() {\r
    vec4 positionVec4 = vec4(aPosition, 1.0);\r
\r
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;\r
\r
    gl_Position = positionVec4;\r
\r
    v_texCoord = aTexCoord;\r
}`, h = {
  /** Enable/disable the renderer */
  enabled: !0,
  /** Characters used for pattern matching */
  characters: " .:-=+*%@#",
  /** Color of the ASCII characters. Only used when `characterColorMode` is set to `fixed` */
  characterColor: "#FFFFFF",
  /** Character color mode */
  characterColorMode: "sampled",
  /** Cell background color. Only used when `characterColorMode` is set to `fixed` */
  backgroundColor: "#000000",
  /** Background color mode */
  backgroundColorMode: "sampled",
  /** Swap the cells ASCII character colors with it's cell background colors */
  invertMode: !1,
  /** Rotation angle of all characters in the grid in degrees */
  rotationAngle: 0,
  /** Flip the ASCII characters horizontally */
  flipHorizontally: !1,
  /** Flip the ASCII characters vertically */
  flipVertically: !1
}, C = () => {
  if (typeof a < "u" && a.renderer2d && a.renderer2d.feature && typeof a.renderer2d.feature.P5AsciifyAbstractFeatureRenderer2D < "u")
    return a.renderer2d.feature.P5AsciifyAbstractFeatureRenderer2D;
  if (typeof window < "u" && window.P5AsciifyAbstractFeatureRenderer2D && typeof window.P5AsciifyAbstractFeatureRenderer2D == "function")
    return window.P5AsciifyAbstractFeatureRenderer2D;
  const e = typeof window < "u" ? Object.keys(window).filter(
    (r) => r.toLowerCase().includes("asciify") || r.toLowerCase().includes("p5")
  ) : [];
  throw new Error(
    "`P5AsciifyAbstractFeatureRenderer2D` not found. Please ensure p5.asciify is loaded before this plugin. " + (e.length > 0 ? `Found related globals: ${e.join(", ")}` : "No related globals found.")
  );
};
let l = null;
const b = () => (l === null && (l = C()), l);
class x extends b() {
  /**
   * Creates a new `"accurate"` ASCII renderer instance.
   * @param p5Instance The p5 instance.
   * @param captureFramebuffer The framebuffer to apply the ASCII effect to.
   * @param grid Grid object containing the relevant grid information.
   * @param fontManager The font texture atlas containing the ASCII characters texture.
   * @param options The options for the ASCII renderer.
   * @ignore
   */
  constructor(t, s, n, f, g = h) {
    const p = { ...h, ...g };
    super(t, s, n, f, p);
    i(this, "_characterSelectionShader");
    i(this, "_brightnessSampleShader");
    i(this, "_colorSampleShader");
    i(this, "_brightnessSplitShader");
    i(this, "_brightnessSampleFramebuffer");
    i(this, "_brightnessSplitFramebuffer");
    this._characterSelectionShader = this._p.createShader(o, c(this._fontManager.fontSize)), this._brightnessSampleShader = this._p.createShader(o, d(this._grid.cellHeight, this._grid.cellWidth)), this._colorSampleShader = this._p.createShader(o, u(16, this._grid.cellHeight, this._grid.cellWidth)), this._brightnessSplitShader = this._p.createShader(o, S), this._brightnessSampleFramebuffer = this._p.createFramebuffer({
      density: 1,
      width: this._grid.cols,
      height: this._grid.rows,
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    }), this._brightnessSplitFramebuffer = this._p.createFramebuffer({
      density: 1,
      width: this._captureFramebuffer.width,
      height: this._captureFramebuffer.height,
      depthFormat: this._p.UNSIGNED_INT,
      textureFiltering: this._p.NEAREST
    });
  }
  resizeFramebuffers() {
    super.resizeFramebuffers(), this._brightnessSampleFramebuffer.resize(this._grid.cols, this._grid.rows), this._brightnessSplitFramebuffer.resize(this._captureFramebuffer.width, this._captureFramebuffer.height);
  }
  resetShaders() {
    this._characterSelectionShader = this._p.createShader(o, c(this._fontManager.fontSize)), this._brightnessSampleShader = this._p.createShader(o, d(this._grid.cellHeight, this._grid.cellWidth)), this._colorSampleShader = this._p.createShader(o, u(16, this._grid.cellHeight, this._grid.cellWidth));
  }
  render() {
    this._brightnessSampleFramebuffer.begin(), this._p.clear(), this._p.shader(this._brightnessSampleShader), this._brightnessSampleShader.setUniform("u_inputImage", this._captureFramebuffer), this._brightnessSampleShader.setUniform("u_inputImageSize", [this._captureFramebuffer.width, this._captureFramebuffer.height]), this._brightnessSampleShader.setUniform("u_gridCols", this._grid.cols), this._brightnessSampleShader.setUniform("u_gridRows", this._grid.rows), this._p.rect(0, 0, this._brightnessSampleFramebuffer.width, this._brightnessSampleFramebuffer.height), this._brightnessSampleFramebuffer.end(), this._brightnessSplitFramebuffer.begin(), this._p.clear(), this._p.shader(this._brightnessSplitShader), this._brightnessSplitShader.setUniform("u_inputImage", this._captureFramebuffer), this._brightnessSplitShader.setUniform("u_brightnessTexture", this._brightnessSampleFramebuffer), this._brightnessSplitShader.setUniform("u_inputImageSize", [this._captureFramebuffer.width, this._captureFramebuffer.height]), this._brightnessSplitShader.setUniform("u_gridCols", this._grid.cols), this._brightnessSplitShader.setUniform("u_gridRows", this._grid.rows), this._brightnessSplitShader.setUniform("u_pixelRatio", this._p.pixelDensity()), this._p.rect(0, 0, this._brightnessSplitFramebuffer.width, this._brightnessSplitFramebuffer.height), this._brightnessSplitFramebuffer.end(), this._primaryColorFramebuffer.begin(), this._options.characterColorMode === 1 ? this._p.background(this._options.characterColor) : (this._p.clear(), this._p.shader(this._colorSampleShader), this._colorSampleShader.setUniform("u_inputImage", this._captureFramebuffer), this._colorSampleShader.setUniform("u_inputImageBW", this._brightnessSplitFramebuffer), this._colorSampleShader.setUniform("u_inputImageSize", [this._captureFramebuffer.width, this._captureFramebuffer.height]), this._colorSampleShader.setUniform("u_gridCols", this._grid.cols), this._colorSampleShader.setUniform("u_gridRows", this._grid.rows), this._colorSampleShader.setUniform("u_colorRank", 1), this._p.rect(0, 0, this._primaryColorFramebuffer.width, this._primaryColorFramebuffer.height)), this._primaryColorFramebuffer.end(), this._secondaryColorFramebuffer.begin(), this._options.backgroundColorMode === 1 ? this._p.background(this._options.backgroundColor) : (this._p.clear(), this._p.shader(this._colorSampleShader), this._colorSampleShader.setUniform("u_inputImage", this._captureFramebuffer), this._colorSampleShader.setUniform("u_inputImageBW", this._brightnessSplitFramebuffer), this._colorSampleShader.setUniform("u_inputImageSize", [this._captureFramebuffer.width, this._captureFramebuffer.height]), this._colorSampleShader.setUniform("u_gridCols", this._grid.cols), this._colorSampleShader.setUniform("u_gridRows", this._grid.rows), this._colorSampleShader.setUniform("u_colorRank", 2), this._p.rect(0, 0, this._secondaryColorFramebuffer.width, this._secondaryColorFramebuffer.height)), this._secondaryColorFramebuffer.end(), this._transformFramebuffer.begin(), this._p.background(this._options.invertMode ? 255 : 0, this._options.flipHorizontally ? 255 : 0, this._options.flipVertically ? 255 : 0), this._transformFramebuffer.end(), this._rotationFramebuffer.begin(), this._p.background(this._options.rotationAngle), this._rotationFramebuffer.end(), this._characterFramebuffer.begin(), this._p.clear(), this._p.shader(this._characterSelectionShader), this._characterSelectionShader.setUniform("u_characterTexture", this._fontManager.texture), this._characterSelectionShader.setUniform("u_charsetCols", this._fontManager.textureColumns), this._characterSelectionShader.setUniform("u_charsetRows", this._fontManager.textureRows), this._characterSelectionShader.setUniform("u_charPaletteTexture", this._characterColorPalette.framebuffer), this._characterSelectionShader.setUniform("u_charPaletteSize", [this._characterColorPalette.colors.length, 1]), this._characterSelectionShader.setUniform("u_sketchTexture", this._brightnessSplitFramebuffer), this._characterSelectionShader.setUniform("u_gridCellDimensions", [this._grid.cols, this._grid.rows]), this._characterSelectionShader.setUniform("u_gridPixelDimensions", [this._grid.width, this._grid.height]), this._p.rect(0, 0, this._characterFramebuffer.width, this._characterFramebuffer.height), this._characterFramebuffer.end();
  }
}
const v = {
  id: "accurate",
  name: "Accurate ASCII Renderer",
  description: "An ASCII renderer that attempts picking the most fitting ASCII representation to accurately represent the input sketch using the available ASCII characters.",
  version: "1.0.0",
  author: "humanbydefinition",
  /**
   * Creates a new instance of the accurate ASCII renderer.
   * @param p The p5 instance.
   * @param captureFramebuffer The framebuffer to apply the ASCII effect to.
   * @param grid The grid to use.
   * @param fontManager The font manager to use.
   * @param options The options to use.
   * @returns The new instance of the accurate ASCII renderer.
   */
  create(e, r, t, s, n) {
    return new x(
      e,
      r,
      t,
      s,
      n || h
    );
  }
};
typeof window < "u" && (window.AccurateRendererPlugin = v);
export {
  v as AccurateRendererPlugin
};
