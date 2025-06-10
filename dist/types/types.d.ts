import { P5AsciifierManager } from './AsciifierManager';
import p5 from 'p5';
import { P5AsciifyAbstractFeatureRenderer2D } from './renderers/2d/feature';
import { P5AsciifyRenderer2D } from './renderers/2d';
import { P5AsciifyRenderer } from './renderers';
import { P5AsciifyErrorLevel } from './errors/ErrorHandler';
/**
 * Hook types supported by the p5.asciify hook manager.
 *
 * These hooks integrate with p5.js lifecycle methods to automatically handle
 * ASCII conversion setup and rendering without requiring manual intervention.
 *
 * By default, all hooks are activated, but you can selectively deactivate or re-activate them.
 *
 * - `'init'`: Called once after p5.js is initialized to initialize p5.asciify.
 *             Initializes the core library components.
 * - `'afterSetup'`: Called once after the p5.js `setup()` function is complete.
 *                   Fully sets up the library for use and calls user's `setupAsciify()` if defined.
 * - `'pre'`: Called before each p5.js `draw()` function execution.
 *            Starts capturing the canvas content for ASCII conversion.
 * - `'post'`: Called after each p5.js `draw()` function execution.
 *             Performs ASCII conversion, renders output to canvas, and calls user's `drawAsciify()` if defined.
 *
 * @example
 * ```typescript
 * // Activate specific hooks
 * p5asciify.activateHook('init');
 * p5asciify.activateHook('post');
 *
 * // Deactivate a hook
 * p5asciify.deactivateHook('pre');
 * ```
 */
export type HookType = 'init' | 'afterSetup' | 'pre' | 'post';
/**
 * Type for core hook handlers
 */
export type P5AsciifyHookHandlers = {
    handleInit: (p: p5) => void | Promise<void>;
    handleSetup: (p: p5) => void | Promise<void>;
    handlePreDraw: (p: p5) => void;
    handlePostDraw: (p: p5) => void;
};
/**
 * Extends the global window object with a preload function, in case the user doesn't provide one.
 */
declare global {
    interface Window {
        p5asciify: P5AsciifierManager;
        P5AsciifyAbstractFeatureRenderer2D: typeof P5AsciifyAbstractFeatureRenderer2D;
        P5AsciifyRenderer2D: typeof P5AsciifyRenderer2D;
        P5AsciifyRenderer: typeof P5AsciifyRenderer;
        P5AsciifyErrorLevel: typeof P5AsciifyErrorLevel;
        preload?: () => void;
        setupAsciify?: () => void;
        drawAsciify?: () => void;
    }
}
/**
 * Interface for additional properties and methods added to the `p5.js` instance by the `p5.asciify` library.
 */
export interface P5AsciifyExtensions {
    /**
     * Called once after the `setup()` of `p5.asciify` is complete.
     * Use this method to perform any additional setup steps after the asciify setup is complete.
     *
     * This is the place where you can safely start using the functionality provided by the {@link p5asciify} *({@link P5AsciifierManager})* object.
     * All properties can also be modified during run-time through the `draw()` loop before the ASCII conversion is executed.
     *
     * @example
     * ```javascript
     *  let asciifier;
     *
     *  function setupAsciify() {
     *      // Get the default asciifier instance.
     *      asciifier = p5asciify.asciifier();
     *
     *      // Set the font size of the default asciifier to 8.
     *      asciifier.fontSize(8);
     *
     *      // ... and so much more! ᓭᘏᒉ
     *  }
     *
     *  function draw() {
     *      // Draw anything on the canvas to asciify.
     *      clear();
     *      fill(255);
     *      rotateX(p.radians(p.frameCount * 3));
     *      rotateZ(p.radians(p.frameCount));
     *      directionalLight(255, 255, 255, 0, 0, -1);
     *      box(800, 100, 100);
     *
     *      // The asciified content will be drawn on the canvas after the draw loop
     *      // with the transformations applied to the grid.
     *  }
     *
     * ```
     */
    setupAsciify(): void;
    /**
     * Called once per frame after the `draw()` loop of `p5.asciify` is complete.
     * Use this method to perform any additional drawing steps after the asciified content is rendered.
     *
     * @example
     * ```javascript
     *  let asciifier;
     *
     *  function setupAsciify() {
     *      // Get the default asciifier instance.
     *      asciifier = p5asciify.asciifier();
     *  }
     *
     *  // Draw anything on the canvas to asciify.
     *  function draw() {
     *      clear();
     *      fill(255);
     *      rotateX(p.radians(p.frameCount * 3));
     *      rotateZ(p.radians(p.frameCount));
     *      directionalLight(255, 255, 255, 0, 0, -1);
     *      box(800, 100, 100);
     *  }
     *
     *  // After the asciified content is drawn to the canvas, draw an FPS counter on top of it.
     *  function drawAsciify() {
     *      textFont(p5asciify.asciifier().fontManager.font);
     *      textSize(64);
     *      fill(255, 255, 0);
     *      text("FPS:" + Math.min(Math.ceil(p.frameRate()), 60), -p.width / 2, p.height / 2);
     *
     *      // You can also access the framebuffer containing the asciified content
     *      // to do additional processing through `asciifier.texture`,
     *      // like applying the asciified texture onto a 3D object.
     *  }
     * ```
     */
    drawAsciify(): void;
}
/**
 * Since `p5.js` doesn't provide types and the ones provided by the `@types/p5` package are incomplete,
 * this file extends the `p5.js` types with additional properties and methods used by the `p5.asciify` library.
 */
declare module 'p5' {
    const VERSION: string;
    let RendererGL: RendererGLConstructor;
    interface Shader {
        setUniform(uniformName: string, value: p5.Framebuffer | number | boolean | number[] | Image | Graphics | MediaElement): void;
    }
    interface Color {
        _array: number[];
    }
    interface Font {
        data: {
            cmap: {
                tables: {
                    platformID: number;
                    encodingID: number;
                    map: Record<string, number>;
                    maxGlyphID: number;
                    glyphIndexMap: Record<string, number>;
                    [key: string]: any;
                }[];
                [key: string]: any;
            };
            glyf: {
                [glyphIndex: number]: any;
            };
            hmtx: {
                aWidth: number[];
                [key: string]: any;
            };
            head: {
                unitsPerEm: number;
                [key: string]: any;
            };
            [key: string]: any;
        };
        [key: string]: any;
    }
    interface Framebuffer {
        loadPixels(): void;
        updatePixels(): void;
        width: number;
        height: number;
    }
    interface RendererGLConstructor {
        prototype: {
            [key: string]: any;
            _getImmediateModeShader: () => any;
            _getNormalShader: () => any;
            _getColorShader: () => any;
            _getPointShader: () => any;
            _getLineShader: () => any;
            _getFontShader: () => any;
        };
        new (...args: any[]): any;
    }
    interface p5InstanceExtensions extends P5AsciifyExtensions {
        _setupDone: boolean;
        _isGlobal: boolean;
        _renderer: {
            drawingContext: WebGLRenderingContext | WebGL2RenderingContext;
        };
        _incrementPreload(): void;
        _decrementPreload(): void;
        registerMethod(name: 'init' | 'beforePreload' | 'afterPreload' | 'beforeSetup' | 'afterSetup' | 'pre' | 'post' | 'remove', f: (this: p5) => void): void;
        unregisterMethod(name: 'init' | 'beforePreload' | 'afterPreload' | 'beforeSetup' | 'afterSetup' | 'pre' | 'post' | 'remove', f: (this: p5) => void): void;
        createFramebuffer(options?: object): p5.Framebuffer;
        constructor: {
            Color: new (...args: any[]) => p5.Color;
            Font: new (...args: any[]) => p5.Font;
            RendererGL: RendererGLConstructor;
            VERSION: string;
        };
    }
    const registerAddon: (addon: (p5Core: any, fn: any, lifecycles: any) => void) => void;
}
/**
 * Extends the `opentype.js` `Glyph` class with r, g, and b properties for color.
 * Currently doesn't actually `extend` the class, but rather defines a new interface,
 * since there is no typing provided by the `opentype.js` library.
 *
 * @remarks
 * The `p5.js` `p5.Font` object contains a property `font` which is an instance of the `opentype.js` `Font` class,
 * which is used for extracting glyph information in the {@link P5AsciifyFontManager} class.
 *
 * @ignore
 */
export type OpenTypeGlyph = {
    unicode: number;
    unicodes: number[];
    advanceWidth: number;
    getPath(x: number, y: number, fontSize: number): {
        getBoundingBox(): {
            x1: number;
            y1: number;
            x2: number;
            y2: number;
        };
        toSVG(): string;
    };
    r?: number;
    g?: number;
    b?: number;
};
/**
 * Each character from a loaded font is represented as a `P5AsciifyCharacter` object.
 *
 * To receive the list of characters from a loaded font, use the {@link P5AsciifyFontManager} class.
 */
export type P5AsciifyCharacter = {
    /** The character represented by this glyph. */
    character: string;
    /** The unicode value of the character. */
    unicode: number;
    /**
     * Gets the outline path of this character positioned at specified coordinates.
     * @param x - The horizontal position to place the character
     * @param y - The vertical position to place the character
     * @param fontSize - The font size to scale the glyph to (in pixels)
     * @returns An object with methods to get the bounding box and SVG representation of the character
     */
    getPath(x: number, y: number, fontSize: number): {
        getBoundingBox(): {
            x1: number;
            y1: number;
            x2: number;
            y2: number;
        };
        toSVG(): string;
    };
    /** The advance width of the character. Only relevant for SVG export. To be removed in the future hopefully. */
    advanceWidth: number;
    /** The red component of the character color. */
    r: number;
    /** The green component of the character color. */
    g: number;
    /** The blue component of the character color. */
    b: number;
};
