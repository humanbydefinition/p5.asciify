/** Default configuration options for brightness-based ASCII renderer */
export declare const BRIGHTNESS_DEFAULT_OPTIONS: {
    /** Enable/disable the renderer */
    enabled: boolean;
    /** Characters used for brightness mapping (from darkest to brightest) */
    characters: string;
    /** Color of the ASCII characters. Only used when `characterColorMode` is set to `1` */
    characterColor: string;
    /** Character color mode (0: `sampled`, 1: `fixed`) */
    characterColorMode: number;
    /** Cell background color. Only used when `characterColorMode` is set to `1` */
    backgroundColor: string;
    /** Background color mode (0: `sampled`, 1: `fixed`) */
    backgroundColorMode: number;
    /** Swap the cells ASCII character colors with it's cell background colors */
    invertMode: boolean;
    /** Rotation angle of all characters in the grid in degrees */
    rotationAngle: number;
};
/** Default configuration options for accurate ASCII renderer */
export declare const ACCURATE_DEFAULT_OPTIONS: {
    /** Enable/disable the renderer */
    enabled: boolean;
    /** Characters used for pattern matching */
    characters: string;
    /** Color of the ASCII characters. Only used when `characterColorMode` is set to `1` */
    characterColor: string;
    /** Character color mode (0: `sampled`, 1: `fixed`) */
    characterColorMode: number;
    /** Cell background color. Only used when `characterColorMode` is set to `1` */
    backgroundColor: string;
    /** Background color mode (0: `sampled`, 1: `fixed`) */
    backgroundColorMode: number;
    /** Swap the cells ASCII character colors with it's cell background colors */
    invertMode: boolean;
    /** Rotation angle of all characters in the grid in degrees */
    rotationAngle: number;
};
/** Default configuration options for gradient-based ASCII renderer */
export declare const GRADIENT_DEFAULT_OPTIONS: {
    /** Enable/disable the renderer */
    enabled: boolean;
    /** Color of the ASCII characters. Only used when `characterColorMode` is set to `1` */
    characterColor: string;
    /** Character color mode (0: `sampled`, 1: `fixed`) */
    characterColorMode: number;
    /** Cell background color. Only used when `characterColorMode` is set to `1` */
    backgroundColor: string;
    /** Background color mode (0: `sampled`, 1: `fixed`) */
    backgroundColorMode: number;
    /** Swap the cells ASCII character colors with it's cell background colors */
    invertMode: boolean;
    /** Rotation angle of all characters in the grid in degrees */
    rotationAngle: number;
};
/** Default configuration options for edge detection ASCII renderer */
export declare const EDGE_DEFAULT_OPTIONS: {
    /** Enable/disable the renderer */
    enabled: boolean;
    /** Characters used for edge representation (8 characters for different angles) */
    characters: string;
    /** Color of the ASCII characters. Only used when `characterColorMode` is set to `1` */
    characterColor: string;
    /** Character color mode (0: `sampled`, 1: `fixed`) */
    characterColorMode: number;
    /** Cell background color. Only used when `characterColorMode` is set to `1` */
    backgroundColor: string;
    /** Background color mode (0: `sampled`, 1: `fixed`) */
    backgroundColorMode: number;
    /** Swap the cells ASCII character colors with it's cell background colors */
    invertMode: boolean;
    /** Threshold for Sobel edge detection. Responsible for edge detection sensitivity */
    sobelThreshold: number;
    /** Sampling threshold for edge detection. In this case, 16 pixels in a grid cell need to contain an edge to render it */
    sampleThreshold: number;
    /** Rotation angle of all characters in the grid in degrees */
    rotationAngle: number;
};
/** Default configuration options for custom ASCII renderer */
export declare const CUSTOM_DEFAULT_OPTIONS: {
    /** Enable/disable the renderer */
    enabled: boolean;
    /** Swap the cells ASCII character colors with it's cell background colors */
    invertMode: boolean;
    /** Rotation angle of all characters in the grid in degrees */
    rotationAngle: number;
};
/** Default font size for the ASCII rendering */
export declare const DEFAULT_FONT_SIZE = 16;
/** Default background color behind the ASCII grid */
export declare const DEFAULT_BACKGROUND_COLOR = "#000000";
