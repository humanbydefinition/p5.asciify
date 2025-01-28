import { P5Asciifier } from './Asciifier';
import p5 from 'p5';
/**
 * Extends the global window object with a preload function, in case the user doesn't provide one.
 */
declare global {
    interface Window {
        preload?: () => void;
        p5asciify: P5Asciifier;
    }
}
/**
 * Extends the p5.js instance typing with the p5.asciify library properties and methods.
 * Also adds existing p5.js properties and methods that are not included or properly defined in the types/p5/index.d.ts file.
 */
declare module 'p5' {
    interface Shader {
        setUniform(uniformName: string, value: p5.Framebuffer | number | boolean | number[] | Image | Graphics | MediaElement): void;
    }
    interface Color {
        _array: number[];
    }
    interface Framebuffer {
        loadPixels(): void;
        updatePixels(): void;
    }
    let RendererGL: any;
    interface p5InstanceExtensions {
        loadAsciiFont(font: string | Font, callback?: () => void): void;
        setupAsciify(): void;
        drawAsciify(): void;
        _setupDone: boolean;
        _renderer: {
            drawingContext: WebGLRenderingContext | WebGL2RenderingContext;
        };
        _incrementPreload(): void;
        _decrementPreload(): void;
        registerMethod(name: 'init' | 'pre' | 'post' | 'remove' | 'afterSetup', f: (this: p5) => void): void;
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
 * which is used for extracting glyph information in the {@link P5AsciifyFontTextureAtlas} class.
 */
export type OpenTypeGlyph = {
    unicode: number;
    unicodes: number[];
    getPath(x: number, y: number, fontSize: number): {
        getBoundingBox(): {
            x1: number;
            y1: number;
            x2: number;
            y2: number;
        };
    };
    r?: number;
    g?: number;
    b?: number;
};
