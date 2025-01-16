import { P5Asciifier } from './Asciifier';
import { P5AsciifyGradient } from './gradients/Gradient';
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
    }

    interface p5InstanceExtensions {
        // Extended properties relevant to the p5.asciify library
        p5asciify: P5Asciifier;
        loadAsciiFont(font: string | Font, callback?: () => void): void;
        setAsciifyBorderColor(hex: string): void;
        setAsciifyFontSize(fontSize: number): void;
        removeAsciiGradient(gradientInstance: P5AsciifyGradient): void;
        setAsciifyPostSetupFunction(postSetupFunction: () => void): void;
        setAsciifyPostDrawFunction(postDrawFunction: () => void): void;
        addAsciiGradient(
            gradientName: string,
            brightnessStart: number,
            brightnessEnd: number,
            characters: string,
            userParams?: Record<string, any>
        ): P5AsciifyGradient;

        // Existing properties in the p5.js library, which do not exist in types/p5/index.d.ts
        _setupDone: boolean;
        _renderer: {
            drawingContext: | WebGLRenderingContext | WebGL2RenderingContext;
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
 * Extends the opentype.js `Glyph` class with r, g, and b properties for color.
 * Currently doesn't actually `extend` the class, but rather defines a new interface, 
 * since there is no typing provided for the opentype.js library.
 */
export type OpenTypeGlyph = {
    unicode: number;
    unicodes: number[];
    getPath(x: number, y: number, fontSize: number): {
        getBoundingBox(): { x1: number; y1: number; x2: number; y2: number };
    };
    r?: number;
    g?: number;
    b?: number;
};
