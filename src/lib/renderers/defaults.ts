/** Default configuration options for brightness-based ASCII renderer */
export const BRIGHTNESS_OPTIONS = {
    /** Enable/disable the renderer */
    enabled: true,
    /** Characters used for brightness mapping (from darkest to brightest) */
    characters: "0123456789",
    /** Color of the ASCII characters */
    characterColor: "#FFFFFF",
    /** Character color blend mode (0: static, 1: source) */
    characterColorMode: 0,
    /** Background color */
    backgroundColor: "#000000",
    /** Background color blend mode (0: static, 1: source) */
    backgroundColorMode: 1,
    /** Invert the brightness mapping */
    invertMode: false,
    /** Rotation angle of characters in degrees */
    rotationAngle: 0,
};

/** Default configuration options for accurate ASCII renderer */
export const ACCURATE_OPTIONS = {
    /** Enable/disable the renderer */
    enabled: false,
    /** Characters used for pattern matching */
    characters: "0123456789",
    /** Color of the ASCII characters */
    characterColor: "#FFFFFF",
    /** Character color blend mode (0: static, 1: source) */
    characterColorMode: 0,
    /** Background color */
    backgroundColor: "#000000",
    /** Background color blend mode (0: static, 1: source) */
    backgroundColorMode: 1,
    /** Invert the pattern matching */
    invertMode: false,
    /** Rotation angle of characters in degrees */
    rotationAngle: 0,
}

/** Default configuration options for gradient-based ASCII renderer */
export const GRADIENT_OPTIONS = {
    /** Enable/disable the renderer */
    enabled: false,
    /** Color of the ASCII characters */
    characterColor: "#FFFFFF",
    /** Character color blend mode (0: static, 1: source) */
    characterColorMode: 0,
    /** Background color */
    backgroundColor: "#000000",
    /** Background color blend mode (0: static, 1: source) */
    backgroundColorMode: 1,
    /** Invert the gradient mapping */
    invertMode: false,
    /** Rotation angle of characters in degrees */
    rotationAngle: 0,
};

/** Default configuration options for edge detection ASCII renderer */
export const EDGE_OPTIONS = {
    /** Enable/disable the renderer */
    enabled: false,
    /** Characters used for edge representation (8 characters for different angles) */
    characters: "-/|\\-/|\\",
    /** Color of the ASCII characters */
    characterColor: "#FFFFFF",
    /** Character color blend mode (0: static, 1: source) */
    characterColorMode: 0,
    /** Background color */
    backgroundColor: "#000000",
    /** Background color blend mode (0: static, 1: source) */
    backgroundColorMode: 1,
    /** Invert the edge detection */
    invertMode: false,
    /** Threshold for Sobel edge detection (0.0 to 1.0) */
    sobelThreshold: 0.5,
    /** Sampling threshold for edge detection */
    sampleThreshold: 16,
    /** Rotation angle of characters in degrees */
    rotationAngle: 0,
};

/** Default configuration options for custom ASCII renderer */
export const CUSTOM_OPTIONS = {
    /** Enable/disable the renderer */
    enabled: false,
    /** Invert the rendering */
    invertMode: false,
    /** Rotation angle of characters in degrees */
    rotationAngle: 0,
};