/** Default configuration options for brightness-based ASCII renderer */
export declare const BRIGHTNESS_OPTIONS: {
    /** Enable/disable the renderer */
    enabled: boolean;
    /** Characters used for brightness mapping (from darkest to brightest) */
    characters: string;
    /** Color of the ASCII characters */
    characterColor: string;
    /** Character color blend mode (0: static, 1: source) */
    characterColorMode: number;
    /** Background color */
    backgroundColor: string;
    /** Background color blend mode (0: static, 1: source) */
    backgroundColorMode: number;
    /** Invert the brightness mapping */
    invertMode: boolean;
    /** Rotation angle of characters in degrees */
    rotationAngle: number;
};
/** Default configuration options for accurate ASCII renderer */
export declare const ACCURATE_OPTIONS: {
    /** Enable/disable the renderer */
    enabled: boolean;
    /** Characters used for pattern matching */
    characters: string;
    /** Color of the ASCII characters */
    characterColor: string;
    /** Character color blend mode (0: static, 1: source) */
    characterColorMode: number;
    /** Background color */
    backgroundColor: string;
    /** Background color blend mode (0: static, 1: source) */
    backgroundColorMode: number;
    /** Invert the pattern matching */
    invertMode: boolean;
    /** Rotation angle of characters in degrees */
    rotationAngle: number;
};
/** Default configuration options for gradient-based ASCII renderer */
export declare const GRADIENT_OPTIONS: {
    /** Enable/disable the renderer */
    enabled: boolean;
    /** Color of the ASCII characters */
    characterColor: string;
    /** Character color blend mode (0: static, 1: source) */
    characterColorMode: number;
    /** Background color */
    backgroundColor: string;
    /** Background color blend mode (0: static, 1: source) */
    backgroundColorMode: number;
    /** Invert the gradient mapping */
    invertMode: boolean;
    /** Rotation angle of characters in degrees */
    rotationAngle: number;
};
/** Default configuration options for edge detection ASCII renderer */
export declare const EDGE_OPTIONS: {
    /** Enable/disable the renderer */
    enabled: boolean;
    /** Characters used for edge representation (8 characters for different angles) */
    characters: string;
    /** Color of the ASCII characters */
    characterColor: string;
    /** Character color blend mode (0: static, 1: source) */
    characterColorMode: number;
    /** Background color */
    backgroundColor: string;
    /** Background color blend mode (0: static, 1: source) */
    backgroundColorMode: number;
    /** Invert the edge detection */
    invertMode: boolean;
    /** Threshold for Sobel edge detection (0.0 to 1.0) */
    sobelThreshold: number;
    /** Sampling threshold for edge detection */
    sampleThreshold: number;
    /** Rotation angle of characters in degrees */
    rotationAngle: number;
};
/** Default configuration options for custom ASCII renderer */
export declare const CUSTOM_OPTIONS: {
    /** Enable/disable the renderer */
    enabled: boolean;
    /** Invert the rendering */
    invertMode: boolean;
    /** Rotation angle of characters in degrees */
    rotationAngle: number;
};
