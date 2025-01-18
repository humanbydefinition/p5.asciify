/** Font size constraints for ASCII rendering */
export const FONT_SIZE_LIMITS = {
    /** Minimum allowed font size in pixels */
    MIN: 1,
    /** Maximum allowed font size in pixels */
    MAX: 128,
} as const;

/** Number of characters used in edge detection renderer's character set */
export const EDGE_CHARACTER_LENGTH = 8;