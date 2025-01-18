/** Default configuration options for brightness-based ASCII renderer */
export const BRIGHTNESS_DEFAULT_OPTIONS = {
    /** Enable/disable the renderer */
    enabled: true,
    /** Characters used for brightness mapping (from darkest to brightest) */
    characters: "0123456789",
    /** Color of the ASCII characters. Only used when `characterColorMode` is set to `1` */
    characterColor: "#FFFFFF",
    /** Character color mode (0: `sampled`, 1: `fixed`) */
    characterColorMode: 0,
    /** Cell background color. Only used when `characterColorMode` is set to `1` */
    backgroundColor: "#000000",
    /** Background color mode (0: `sampled`, 1: `fixed`) */
    backgroundColorMode: 1,
    /** Swap the cells ASCII character colors with it's cell background colors */
    invertMode: false,
    /** Rotation angle of all characters in the grid in degrees */
    rotationAngle: 0,
};

/** Default configuration options for accurate ASCII renderer */
export const ACCURATE_DEFAULT_OPTIONS = {
    /** Enable/disable the renderer */
    enabled: false,
    /** Characters used for pattern matching */
    characters: "0123456789",
    /** Color of the ASCII characters. Only used when `characterColorMode` is set to `1` */
    characterColor: "#FFFFFF",
    /** Character color mode (0: `sampled`, 1: `fixed`) */
    characterColorMode: 0,
    /** Cell background color. Only used when `characterColorMode` is set to `1` */
    backgroundColor: "#000000",
    /** Background color mode (0: `sampled`, 1: `fixed`) */
    backgroundColorMode: 1,
    /** Swap the cells ASCII character colors with it's cell background colors */
    invertMode: false,
    /** Rotation angle of all characters in the grid in degrees */
    rotationAngle: 0,
}

/** Default configuration options for gradient-based ASCII renderer */
export const GRADIENT_DEFAULT_OPTIONS = {
    /** Enable/disable the renderer */
    enabled: false,
    /** Color of the ASCII characters. Only used when `characterColorMode` is set to `1` */
    characterColor: "#FFFFFF",
    /** Character color mode (0: `sampled`, 1: `fixed`) */
    characterColorMode: 0,
    /** Cell background color. Only used when `characterColorMode` is set to `1` */
    backgroundColor: "#000000",
    /** Background color mode (0: `sampled`, 1: `fixed`) */
    backgroundColorMode: 1,
    /** Swap the cells ASCII character colors with it's cell background colors */
    invertMode: false,
    /** Rotation angle of all characters in the grid in degrees */
    rotationAngle: 0,
};

/** Default configuration options for edge detection ASCII renderer */
export const EDGE_DEFAULT_OPTIONS = {
    /** Enable/disable the renderer */
    enabled: false,
    /** Characters used for edge representation (8 characters for different angles) */
    characters: "-/|\\-/|\\",
    /** Color of the ASCII characters. Only used when `characterColorMode` is set to `1` */
    characterColor: "#FFFFFF",
    /** Character color mode (0: `sampled`, 1: `fixed`) */
    characterColorMode: 0,
    /** Cell background color. Only used when `characterColorMode` is set to `1` */
    backgroundColor: "#000000",
    /** Background color mode (0: `sampled`, 1: `fixed`) */
    backgroundColorMode: 1,
    /** Swap the cells ASCII character colors with it's cell background colors */
    invertMode: false,
    /** Threshold for Sobel edge detection. Responsible for edge detection sensitivity */
    sobelThreshold: 0.5,
    /** Sampling threshold for edge detection. In this case, 16 pixels in a grid cell need to contain an edge to render it */
    sampleThreshold: 16,
    /** Rotation angle of all characters in the grid in degrees */
    rotationAngle: 0,
};

/** Default configuration options for custom ASCII renderer */
export const CUSTOM_DEFAULT_OPTIONS = {
    /** Enable/disable the renderer */
    enabled: false,
    /** Swap the cells ASCII character colors with it's cell background colors */
    invertMode: false,
    /** Rotation angle of all characters in the grid in degrees */
    rotationAngle: 0,
};

/** Default font size for the ASCII rendering */
export const DEFAULT_FONT_SIZE = 16;

/** 
 * The default background color used behind the ASCII grid.
 * This color fills the space not occupied by the centered ASCII grid.
 * @default "#000000"
 */
export const DEFAULT_BACKGROUND_COLOR = "#000000";