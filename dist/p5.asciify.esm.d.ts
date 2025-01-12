import { default as default_2 } from 'p5';

/**
 * Abstract class for shader-based ASCII Renderers.
 */
declare abstract class AsciiRenderer<T extends AsciiRendererOptions = AsciiRendererOptions> {
    protected _options: T;
    protected p: default_2;
    grid: P5AsciifyGrid;
    characterSet: P5AsciifyCharacterSet;
    protected _primaryColorSampleFramebuffer: default_2.Framebuffer;
    protected _secondaryColorSampleFramebuffer: default_2.Framebuffer;
    protected _asciiCharacterFramebuffer: default_2.Framebuffer;
    protected _outputFramebuffer: default_2.Framebuffer;
    constructor(p5Instance: default_2, grid: P5AsciifyGrid, characterSet: P5AsciifyCharacterSet, options: T);
    /**
     * Resizes all framebuffers based on the grid dimensions.
     */
    resizeFramebuffers(): void;
    /**
     * Resets shaders. To be implemented by subclasses.
     */
    resetShaders(): void;
    /**
     * Updates renderer options.
     * @param newOptions - The new options to update.
     */
    updateOptions(newOptions: Partial<AsciiRendererOptions>): void;
    /**
     * Render ASCII based on the input framebuffer.
     * @param inputFramebuffer - The input framebuffer to base ASCII rendering on.
     */
    abstract render(inputFramebuffer: default_2.Framebuffer, previousAsciiRenderer: AsciiRenderer, isFirstRenderer: boolean): void;
    get outputFramebuffer(): default_2.Framebuffer;
    get options(): T;
    get primaryColorSampleFramebuffer(): default_2.Framebuffer;
    get secondaryColorSampleFramebuffer(): default_2.Framebuffer;
    get asciiCharacterFramebuffer(): default_2.Framebuffer;
}

declare interface AsciiRendererOptions {
    enabled: boolean;
    characters: string;
    characterColorMode: number;
    characterColor: default_2.Color;
    backgroundColorMode: number;
    backgroundColor: default_2.Color;
    invertMode: number;
    rotationAngle: number;
}

declare interface ConicalGradientParams {
    centerX: number;
    centerY: number;
    speed: number;
}

declare type GradientParams = {
    linear: LinearGradientParams;
    zigzag: ZigZagGradientParams;
    spiral: SpiralGradientParams;
    radial: RadialGradientParams;
    conical: ConicalGradientParams;
    noise: NoiseGradientParams;
};

declare type GradientType = 'linear' | 'zigzag' | 'spiral' | 'radial' | 'conical' | 'noise';

declare interface LinearGradientParams {
    direction: number;
    angle: number;
    speed: number;
}

declare interface NoiseGradientParams {
    noiseScale: number;
    speed: number;
    direction: number;
}

declare class P5Asciifier {
    private borderColor;
    private _fontSize;
    rendererManager: RendererManager;
    private font;
    private postSetupFunction;
    private postDrawFunction;
    private p;
    asciiFontTextureAtlas: P5AsciifyFontTextureAtlas;
    grid: P5AsciifyGrid;
    private events;
    sketchFramebuffer: default_2.Framebuffer;
    constructor();
    /**
     * Initialize the p5 instance for the Asciifier
     * @param p The p5 instance
     */
    instance(p: default_2): void;
    /**
     * Adds the p5 instance in p5.js global mode. Is called automatically on init by p5.js.
     * Currently a bit confusing with the `instance()` method above, which is relevant for instance mode,
     * where the user has to call it manually.
     * @param p The p5 instance
     */
    addP5Instance(p: default_2): void;
    /**
     * Sets up the P5Asciify library with the specified options
     */
    setup(): void;
    /**
     * Emit an event with data
     * @param eventName - Name of the event to emit
     * @param data - Data to pass with the event
     */
    emit(eventName: string, data: any): void;
    /**
     * Register an event listener
     * @param eventName - Name of the event to listen for
     * @param callback - Callback function to execute
     */
    on(eventName: string, callback: (data: any) => void): void;
    /**
     * Remove an event listener
     * @param eventName - Name of the event to remove
     * @param callback - Callback function to remove
     */
    off(eventName: string, callback: (data: any) => void): void;
    /**
     * Runs the rendering pipeline for the P5Asciify library
     */
    asciify(): void;
    get fontSize(): number;
    set fontSize(fontSize: number);
}

declare const p5asciify: P5Asciifier;
export default p5asciify;

/**
 * Represents a set of characters to be used by an ASCII renderer.
 */
declare class P5AsciifyCharacterSet {
    private p;
    asciiFontTextureAtlas: P5AsciifyFontTextureAtlas;
    private _characters;
    private characterColors;
    characterColorPalette: P5AsciifyColorPalette;
    constructor(p: default_2, asciiFontTextureAtlas: P5AsciifyFontTextureAtlas, characters: string);
    /**
     * Validates the characters to ensure they are supported by the current font.
     * @param characters The characters to validate.
     * @returns The validated characters as a list of characters.
     * @throws {P5AsciifyError} If any characters are not supported by the font
     */
    private validateCharacters;
    /**
     * Sets the characters to be used in the character set and updates the texture.
     * @param characters The string of characters to use.
     */
    setCharacterSet(characters: string): void;
    get characters(): string[];
}

/**
 * A 1D color palette for use with the P5Asciify library.
 */
declare class P5AsciifyColorPalette {
    _colors: [number, number, number][];
    framebuffer: default_2.Framebuffer;
    p5Instance: default_2;
    constructor(colors: [number, number, number][]);
    /**
     * Setup the color palette with a p5 instance.
     * @param p5Instance The p5 instance to use for creating the framebuffer.
     */
    setup(p5Instance: default_2): void;
    /**
     * Update the framebuffer with the current colors.
     */
    updateFramebuffer(): void;
    /**
     * Set the colors of the palette and update the framebuffer.
     * @param newColors The new colors to set.
     */
    setColors(newColors: [number, number, number][]): void;
    get colors(): [number, number, number][];
}

/**
 * Creates a texture atlas containing all characters in a font, and provides utility methods for working with the atlas.
 */
declare class P5AsciifyFontTextureAtlas {
    private p;
    private font;
    private _fontSize;
    private _characters;
    private _characterGlyphs;
    private _maxGlyphDimensions;
    private _texture;
    private _charsetCols;
    private _charsetRows;
    constructor(p: default_2, font: default_2.Font, _fontSize: number);
    /**
     * Loads all glyphs with unicode values from the font and assigns colors to them.
     * @returns An array of opentype.js glyphs, extended with r, g, and b properties for color.
     */
    private _loadCharacterGlyphs;
    /**
     * Calculates the maximum width and height of the glyphs in the font.
     * @param fontSize - The font size to use for calculations.
     * @returns An object containing the maximum width and height of the glyphs.
     */
    private _getMaxGlyphDimensions;
    /**
     * Sets the font object and resets the whole atlas.
     * @param font - The new font object.
     */
    setFontObject(font: default_2.Font): void;
    /**
     * Sets the font size, recalculates the maximum glyph dimensions, and recreates the texture.
     * @param fontSize - The new font size.
     */
    setFontSize(fontSize: number): void;
    /**
     * Creates a texture containing all characters in the font, arranged in a 2d grid that is as square as possible.
     * @param fontSize - The font size to use for creating the texture.
     */
    private _createTexture;
    /**
     * Draws characters onto the texture.
     * @param fontSize - The font size to use for drawing the characters on the texture.
     */
    private drawCharacters;
    /**
     * Gets an array of RGB colors for a given string or array of characters.
     * @param input - Either a string or array of characters
     * @returns Array of RGB color values
     * @throws P5AsciifyError If a character is not found in the texture atlas
     */
    getCharsetColorArray(input: string | string[]): Array<[number, number, number]>;
    /**
     * Returns an array of characters that are not supported by the current font.
     * @param characters - The string of characters to check.
     * @returns An array of unsupported characters.List is empty if all characters are supported.
     */
    getUnsupportedCharacters(characters: string): string[];
    get maxGlyphDimensions(): {
        width: number;
        height: number;
    };
    get texture(): default_2.Framebuffer;
    get characters(): string[];
    get charsetCols(): number;
    get charsetRows(): number;
    get fontSize(): number;
}

declare class P5AsciifyGradient {
    private _shader;
    characters: string;
    protected _brightnessStart: number;
    protected _brightnessEnd: number;
    protected _enabled: boolean;
    protected _onPaletteChangeCallback?: (gradient: P5AsciifyGradient, value: string[]) => void;
    protected _palette: P5AsciifyColorPalette;
    constructor(_shader: default_2.Shader, brightnessStart: number, brightnessEnd: number, characters: string);
    registerPaletteChangeCallback(callback: (gradient: P5AsciifyGradient, value: string[]) => void): void;
    setup(p5Instance: default_2, shader: default_2.Shader, colors: [number, number, number][]): void;
    setUniforms(p5: default_2, framebuffer: default_2.Framebuffer, referenceFramebuffer: default_2.Framebuffer): void;
    set palette(value: string[]);
    get enabled(): boolean;
    set enabled(value: boolean);
    get brightnessStart(): number;
    set brightnessStart(value: number);
    get brightnessEnd(): number;
    set brightnessEnd(value: number);
    get shader(): default_2.Shader;
    get palette(): P5AsciifyColorPalette;
}

declare class P5AsciifyGradientManager {
    private _gradientParams;
    private gradientShaders;
    private _gradientConstructors;
    private _setupQueue;
    private _gradients;
    private fontTextureAtlas;
    private p5Instance;
    setup(fontTextureAtlas: P5AsciifyFontTextureAtlas): void;
    addInstance(p5Instance: default_2): void;
    private setupGradientQueue;
    private getGradientParams;
    addGradient(gradientName: GradientType, brightnessStart: number, brightnessEnd: number, characters: string, params: Partial<GradientParams[typeof gradientName]>): P5AsciifyGradient;
    removeGradient(gradient: P5AsciifyGradient): void;
    private handleGradientPaletteChange;
    private setupShaders;
    get gradientConstructors(): Record<GradientType, (shader: default_2.Shader, brightnessStart: number, brightnessEnd: number, characters: string[], params: any) => P5AsciifyGradient>;
    get gradientParams(): GradientParams;
    get gradients(): P5AsciifyGradient[];
}

/**
 * Represents a 2D grid, handling the dimensions and resizing of the grid.
 */
declare class P5AsciifyGrid {
    private p;
    private _cellWidth;
    private _cellHeight;
    private _cols;
    private _rows;
    private _width;
    private _height;
    private _offsetX;
    private _offsetY;
    constructor(p: default_2, _cellWidth: number, _cellHeight: number);
    /**
     * Reset the grid to the default number of columns and rows based on the current canvas and cell dimensions.
     */
    reset(): void;
    /**
     * Reset the total grid width/height and the offset to the outer canvas.
     */
    private _resizeGrid;
    /**
     * Calculate the number of columns and rows in the grid based on the current canvas and cell dimensions.
     * @returns The number of columns and rows in the grid.
     */
    private _calculateGridSize;
    /**
     * Re-assign the grid cell dimensions and reset the grid.
     * @param newCellWidth The new cell width.
     * @param newCellHeight The new cell height.
     */
    resizeCellPixelDimensions(newCellWidth: number, newCellHeight: number): void;
    get cellWidth(): number;
    get cellHeight(): number;
    get cols(): number;
    get rows(): number;
    get width(): number;
    get height(): number;
    get offsetX(): number;
    get offsetY(): number;
}

declare interface RadialGradientParams {
    direction: number;
    centerX: number;
    centerY: number;
    radius: number;
}

/**
 * Manages the available ASCII renderers and handles rendering the ASCII output to the canvas.
 */
declare class RendererManager {
    private p;
    private grid;
    private fontTextureAtlas;
    private currentCanvasDimensions;
    private gradientCharacterSet;
    private _renderers;
    textAsciiRenderer: TextAsciiRenderer;
    gradientManager: P5AsciifyGradientManager;
    private lastRenderer;
    private fontBase64;
    private fontFileType;
    constructor();
    /**
     * Sets up the renderer manager with the specified default options.
     * @param p5Instance The p5 instance
     * @param grid The grid instance
     * @param fontTextureAtlas The font texture atlas instance
     */
    setup(p5Instance: default_2, grid: P5AsciifyGrid, fontTextureAtlas: P5AsciifyFontTextureAtlas): void;
    /**
     * Renders the ASCII output to the canvas.
     * @param inputFramebuffer The input framebuffer to transform into ASCII.
     * @param borderColor The border color of the canvas, which is not occupied by the centered ASCII grid.
     */
    render(inputFramebuffer: any, borderColor: any): void;
    /**
     * Continuously checks if the canvas dimensions have changed.
     * If they have, the grid is reset and the renderers are resized.
     */
    private checkCanvasDimensions;
    get renderers(): AsciiRenderer[];
}

declare interface SpiralGradientParams {
    direction: number;
    centerX: number;
    centerY: number;
    speed: number;
    density: number;
}

declare class TextAsciiRenderer {
    private p;
    private asciiFontTextureAtlas;
    private grid;
    private fontBase64;
    private fontFileType;
    private _options;
    private backgroundColor;
    private foregroundColor;
    private styleEl;
    private textAsciiRenderer;
    private asciiArtContainer;
    private lineDivs;
    private charSpans;
    private previousTexts;
    private previousColors;
    private previousBgColors;
    constructor(p: default_2, asciiFontTextureAtlas: P5AsciifyFontTextureAtlas, grid: P5AsciifyGrid, fontBase64: string, fontFileType: string, _options: TextAsciiRendererOptions);
    /**************************************************
     * Initialization Methods
     **************************************************/
    private initFontFace;
    private initMainContainer;
    private initAsciiArtContainer;
    private initCharacterGrids;
    /**************************************************
     * Color and Style Updates
     **************************************************/
    updateOptions(options: Partial<TextAsciiRendererOptions>): void;
    updateFont(fontBase64: string, fontFileType: string): void;
    updateColors(): void;
    updateFontSize(): void;
    updateInvertMode(): void;
    private applyContainerStyles;
    updateCharacterColor(): void;
    updateBackgroundColor(): void;
    updateCharacterColorMode(): void;
    /**************************************************
     * DOM and Data Structures
     **************************************************/
    private initializeLineDivs;
    private initializeCharSpans;
    private initializePreviousColors;
    /**************************************************
     * Main Rendering Logic
     **************************************************/
    outputAsciiToHtml(asciiRenderer: AsciiRenderer): void;
    private getPixelsIfModeEnabled;
    private getCharacterFromPixels;
    private updateCharSpanContent;
    /**************************************************
     * Color Application Helpers
     **************************************************/
    private applyPrimaryColorMode;
    private applySecondaryColorMode;
    private applyDefaultColorIfNeeded;
    private resetIfNotPrimaryMode;
    private resetIfNotSecondaryMode;
    private clearPerCharacterStyles;
    /**************************************************
     * Style Update Utility Methods
     **************************************************/
    private rgbFromPixels;
    private updateTextColorForCharSpan;
    private updateBackgroundColorForCharSpan;
    private clearBackgroundColorForCharSpan;
    private resetCharSpanColors;
    /**************************************************
     * Dimensions & Visibility
     **************************************************/
    updateDimensions(): void;
    toggleVisibility(): void;
    get options(): TextAsciiRendererOptions;
}

declare interface TextAsciiRendererOptions {
    enabled: boolean;
    invertMode: boolean;
    characterColor: string;
    backgroundColor: string;
    characterColorMode: number;
    backgroundColorMode: number;
}

declare interface ZigZagGradientParams {
    direction: number;
    angle: number;
    speed?: number;
}

export { }
