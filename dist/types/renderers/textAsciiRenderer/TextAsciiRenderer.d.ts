import p5 from 'p5';
import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';
import { P5AsciifyGrid } from '../../Grid';
import { AsciiRenderer } from '../AsciiRenderer';
interface TextAsciiRendererOptions {
    enabled: boolean;
    invertMode: boolean;
    characterColor: string;
    backgroundColor: string;
    characterColorMode: number;
    backgroundColorMode: number;
}
export default class TextAsciiRenderer {
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
    constructor(p: p5, asciiFontTextureAtlas: P5AsciifyFontTextureAtlas, grid: P5AsciifyGrid, fontBase64: string, fontFileType: string, _options: TextAsciiRendererOptions);
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
export {};
