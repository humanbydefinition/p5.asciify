import { P5AsciifierManager } from './AsciifierManager';
import { P5AsciifyFontManager } from './FontManager';
import p5 from 'p5';

/**
 * Extends the global window object with a preload function, in case the user doesn't provide one.
 */
declare global {
    interface Window {
        preload?: () => void;
        p5asciify: P5AsciifierManager;
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
    interface Shader {
        setUniform(
            uniformName: string,
            value: p5.Framebuffer | number | boolean | number[] | Image | Graphics | MediaElement
        ): void;
    }

    interface Color {
        _array: number[];
    }

    interface Framebuffer {
        loadPixels(): void;
        updatePixels(): void;
        width: number;
        height: number;
    }

    let RendererGL: any;

    interface p5InstanceExtensions extends P5AsciifyExtensions {
        _setupDone: boolean;
        _renderer: {
            drawingContext: WebGLRenderingContext | WebGL2RenderingContext;
        };
        _incrementPreload(): void;
        _decrementPreload(): void;

        registerMethod(
            name: 'init' | 'pre' | 'post' | 'remove' | 'afterSetup',
            f: (this: p5) => void
        ): void;

        createFramebuffer(options?: object): p5.Framebuffer;
    }
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
        getBoundingBox(): { x1: number; y1: number; x2: number; y2: number };
        toSVG(): string;
    };
    r?: number;
    g?: number;
    b?: number;
};
