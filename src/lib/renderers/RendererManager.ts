import p5 from 'p5';

import { P5AsciifyBrightnessRenderer } from './brightness/BrightnessAsciiRenderer';
import { P5AsciifyAccurateRenderer } from './accurate/AccurateAsciiRenderer';
import { P5AsciifyEdgeRenderer } from './edge/EdgeAsciiRenderer';
import { P5AsciifyGradientRenderer } from './gradient/GradientAsciiRenderer';
import { P5AsciifyRenderer } from './AsciiRenderer';

import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';

import { P5AsciifyError } from '../AsciifyError';

import { AsciiRendererOptions } from './types';

const RENDERER_TYPES = {
    'brightness': P5AsciifyBrightnessRenderer,
    'accurate': P5AsciifyAccurateRenderer,
    'gradient': P5AsciifyGradientRenderer,
    'edge': P5AsciifyEdgeRenderer,
    'custom': P5AsciifyRenderer,
} as const;

type RendererType = keyof typeof RENDERER_TYPES;

/**
 * Manages the available ASCII renderers and handles rendering the ASCII output to the canvas.
 */
export class P5AsciifyRendererManager {

    /** The current dimensions of the canvas. If the dimensions change, the grid is reset and the renderers are resized. */
    private _currentCanvasDimensions: { width: number, height: number };

    /** The list of available renderers. */
    private _renderers: { name: string, renderer: P5AsciifyRenderer }[];

    /** The last renderer used in the rendering pipeline. */
    public lastRenderer: P5AsciifyRenderer;

    /** The background color to use for the ASCII rendering for the offset space, not occupied by the centered ASCII grid. */
    private _backgroundColor: string | p5.Color | [number, number?, number?, number?] = "#000000";

    private _resultFramebuffer: p5.Framebuffer;

    constructor(
        /** The p5 instance. */
        private _p: p5,

        /** The grid instance. */
        private _grid: P5AsciifyGrid,

        /** The font texture atlas instance. */
        private _fontTextureAtlas: P5AsciifyFontTextureAtlas
    ) {
        this._currentCanvasDimensions = {
            width: this._p.width,
            height: this._p.height
        };

        this._renderers = [
            { name: "custom", renderer: new P5AsciifyRenderer(this._p, this._grid, _fontTextureAtlas) },
            { name: "edge", renderer: new P5AsciifyEdgeRenderer(this._p, this._grid, _fontTextureAtlas) },
            { name: "gradient", renderer: new P5AsciifyGradientRenderer(this._p, this._grid, _fontTextureAtlas) },
            { name: "accurate", renderer: new P5AsciifyAccurateRenderer(this._p, this._grid, _fontTextureAtlas) },
            { name: "brightness", renderer: new P5AsciifyBrightnessRenderer(this._p, this._grid, _fontTextureAtlas) },
        ];

        this._resultFramebuffer = this._p.createFramebuffer({
            depthFormat: this._p.UNSIGNED_INT,
            textureFiltering: this._p.NEAREST
        });

        this.lastRenderer = this._renderers[0].renderer;
    }

    /**
     * Renders the ASCII output to the result framebuffer.
     * 
     * **This method is called internally by the `p5asciify` instance every time the `draw()` function finishes.
     *  Should not be called manually, otherwise causing redundant computations.**
     * 
     * @param inputFramebuffer The input framebuffer to transform into ASCII.
     */
    public render(inputFramebuffer: p5.Framebuffer): void {
        let asciiOutput = inputFramebuffer;

        let currentRenderer = this._renderers[0].renderer;

        this._resultFramebuffer.begin();
        this._p.clear();
        this._p.background(this._backgroundColor as p5.Color);
        for (let i = this._renderers.length - 1; i >= 0; i--) {
            const renderer = this._renderers[i];
            if (renderer.renderer.options.enabled) {
                renderer.renderer.render(inputFramebuffer, currentRenderer);
                asciiOutput = renderer.renderer.outputFramebuffer;
                currentRenderer = renderer.renderer;
                this.lastRenderer = renderer.renderer;
            }
        }

        this._p.image(asciiOutput, -this._p.width / 2, -this._p.height / 2);
        this._resultFramebuffer.end();

        this.checkCanvasDimensions();
    }

    /**
     * Checks if the canvas dimensions have changed.
     * If they have, the grid is reset and the renderers are resized.
     */
    private checkCanvasDimensions(): void {
        if (this._currentCanvasDimensions.width !== this._p.width || this._currentCanvasDimensions.height !== this._p.height) {
            this._currentCanvasDimensions.width = this._p.width;
            this._currentCanvasDimensions.height = this._p.height;

            this._grid.reset();

            this.resetRendererDimensions();
        }
    }

    /**
     * Resets the dimensions of all renderers.
     * 
     * This method is automatically triggered when:
     * - Font properties are modified
     * - Canvas dimensions change
     * 
     * These changes affect the grid dimensions, requiring renderer framebuffers to be resized
     * and certain shaders to be reinitialized. Should be redundant to call manually.
     */
    public resetRendererDimensions(): void {
        this._renderers.forEach(renderer => {
            renderer.renderer.resizeFramebuffers();
            renderer.renderer.resetShaders();
        });
    }

    /**
     * Adds a new renderer to the list of renderers.
     * @param name The name of the renderer to add.
     * @param type The type of the renderer to add.
     * @param options The options to use for the renderer.
     * @returns The ASCII renderer instance that was added.
     * @throws {@link P5AsciifyError} - If the renderer name is an empty string or the renderer type is invalid.
     * 
     * @example
     * ```javascript
     * let brightnessAsciiRenderer;
     * 
     *  function setupAsciify() {
     *      // Clear all existing default renderers provided by `p5.asciify`.
     *      p5asciify.renderers().clear();
     * 
     *      // Add a new brightness renderer with custom options.
     *      brightnessAsciiRenderer = p5asciify.renderers().add('brightness', 'brightness', {
     *          enabled: true,
     *          characterColor: '#FF0000',
     *          backgroundColor: '#0000FF',
     *          characterColorMode: "fixed",
     *          backgroundColorMode: "fixed",
     *      });
     *  }
     * ```
     */
    public add(
        name: string,
        type: RendererType,
        options: AsciiRendererOptions
    ): P5AsciifyRenderer {
        if (typeof name !== 'string' || name.trim() === '') {
            throw new P5AsciifyError('Renderer name must be a non-empty string');
        }

        const RendererClass = RENDERER_TYPES[type];
        if (!RendererClass) {
            throw new P5AsciifyError(
                `Invalid renderer type: ${type}. Valid types are: ${Object.keys(RENDERER_TYPES).join(', ')}`
            );
        }

        const renderer = new RendererClass(this._p, this._grid, this._fontTextureAtlas, options);

        this._renderers.push({ name, renderer });

        return renderer;
    }

    /**
     * Gets the ASCII renderer instance with the given name.
     * @param rendererName The name of the renderer to get.
     * @returns The ASCII renderer instance with the given name.
     * 
     * @example
     * ```javascript
     *  let brightnessRenderer;
     * 
     *  function setupAsciify() {
     *      // Get the brightness renderer instance by name.
     *      brightnessRenderer = p5asciify.renderers().get('brightness');
     * 
     *      // Use the brightness renderer instance to modify its properties during run-time,
     *      // instead of constantly calling `p5asciify.renderers().get('brightness')`.
     *  }
     * ```
     */
    public get(rendererName: string): P5AsciifyRenderer {
        const renderer = this._renderers.find(r => r.name === rendererName)?.renderer;

        if (!renderer) {
            throw new P5AsciifyError(
                `Renderer '${rendererName}' not found. Available renderers: ${this._renderers.map(r => r.name).join(', ')}`
            );
        }

        return renderer;
    }

    /**
     * Moves a renderer down in the list of renderers, meaning it will be rendered later in the pipeline.
     * @param renderer The renderer to move down in the list.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Move the `"brightness"` renderer down in the list of renderers.
     *      p5asciify.renderers().moveDown('brightness');
     * 
     *      // Alternatively, you can also pass the renderer instance itself.
     *  }
     * ```
     */
    public moveDown(renderer: string | P5AsciifyRenderer): void {
        const index = this._getRendererIndex(renderer);
        if (index <= 0) return;
        this.swap(renderer, this._renderers[index + 1].renderer);
    }

    /**
     * Moves a renderer up in the list of renderers, meaning it will be rendered earlier in the pipeline.
     * @param renderer The renderer to move up in the list.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Move the `"accurate"` renderer up in the list of renderers.
     *      p5asciify.renderers().moveUp('accurate');
     * 
     *      // Alternatively, you can also pass the renderer instance itself.
     *  }
     * ```
     */
    public moveUp(renderer: string | P5AsciifyRenderer): void {
        const index = this._getRendererIndex(renderer);
        if (index === -1 || index >= this._renderers.length - 1) return;
        this.swap(renderer, this._renderers[index - 1].renderer);
    }

    /**
     * Removes a renderer from the list of renderers.
     * @param renderer The name of the renderer or the renderer instance itself.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Remove the `"brightness"` renderer from the list of renderers.
     *      p5asciify.renderers().remove('brightness');
     * 
     *      // Alternatively, you can also pass the renderer instance itself.
     * }
     * ```
     */
    public remove(renderer: string | P5AsciifyRenderer): void {
        const index = this._getRendererIndex(renderer);
        if (index === -1) {
            throw new P5AsciifyError(`Renderer not found.`);
        }
        this._renderers.splice(index, 1);
    }

    /**
     * Clears the list of renderers. 
     * Can be useful when you want to start fresh without the default renderers provided by `p5.asciify`.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Clear all existing renderers.
     *      p5asciify.renderers().clear();
     * 
     *     // With no renderers, you can add your own custom renderer.
     *     // Otherwise, `p5.asciify` will now render the input image without any ASCII effects.
     *  }
     * ```
     */
    public clear() {
        this._renderers = [];
    }

    /**
     * Swaps the positions of two renderers in the renderer list.
     * @param renderer1 The name of the first renderer or the renderer instance itself.
     * @param renderer2 The name of the second renderer or the renderer instance itself.
     * @throws {@link P5AsciifyError} - If one or more renderers are not found.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Swap the positions of the `"brightness"` and `"accurate"` renderers.
     *      p5asciify.renderers().swap('brightness', 'accurate');
     * 
     *      // Alternatively, you can also pass the renderer instances themselves.
     *  }
     * ```
     */
    public swap(renderer1: string | P5AsciifyRenderer, renderer2: string | P5AsciifyRenderer): void {
        const index1 = this._getRendererIndex(renderer1);
        const index2 = this._getRendererIndex(renderer2);

        if (index1 === -1 || index2 === -1) {
            throw new P5AsciifyError(`One or more renderers not found.`);
        }

        const temp = this._renderers[index1];
        this._renderers[index1] = this._renderers[index2];
        this._renderers[index2] = temp;

        this.lastRenderer = this._renderers[0].renderer;
    }

    /**
     * Sets the background color for the ascii renderers. 
     * 
     * Covers the empty space on the edges of the canvas, which potentially is not occupied by the centered ASCII grid.
     * @param color The color to set. Needs to be a valid type to pass to the `background()` function provided by p5.js.
     * @throws {@link P5AsciifyError} - If the color is not a string, array or p5.Color.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Set the background color to black.
     *      p5asciify.renderers().background('#000000');
     * 
     *      // Alternatively, you can also use:
     *      p5asciify.background('#000000');
     *  }
     * ```
     */
    public background(color: string | p5.Color | [number, number?, number?, number?]) {
        if (typeof color !== "string" && !Array.isArray(color) && !(color instanceof p5.Color)) {
            throw new P5AsciifyError(`Invalid color type: ${typeof color}. Expected string, array or p5.Color.`);
        }

        this._backgroundColor = color;
    }

    /**
     * Enables all renderers in the list of renderers at once,
     * effectively rendering the input image with all ASCII renderers applied.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *     // Enable all default renderers provided by `p5.asciify`.
     *      p5asciify.renderers().enable();
     *  }
     * ```
     */
    public enable() {
        this._renderers.forEach(renderer => renderer.renderer.enabled(true));
    }

    /**
     * Disables all renderers in the list of renderers at once, 
     * effectively rendering the input image without any ASCII renderers applied.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Disable all renderers, effectively rendering the input image without any ASCII effects.
     *      p5asciify.renderers().disable();
     *  }
     * ```
     */
    public disable() {
        this._renderers.forEach(renderer => renderer.renderer.enabled(false));
    }

    /**
     * Enables or disables all renderers in the list of renderers at once.
     * @param enabled Whether to enable or disable all renderers.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Enable all default renderers provided by `p5.asciify`.
     *      p5asciify.renderers().enabled(true);
     *  }
     * ```
     */
    public enabled(enabled: boolean) {
        enabled ? this.enable() : this.disable();
    }

    /**
     * Gets the index of a renderer in the list of renderers.
     * @param renderer The renderer to get the index of.
     * @returns The index of the renderer in the list of renderers. Returns -1 if the renderer is not found.
     */
    private _getRendererIndex(renderer: string | P5AsciifyRenderer): number {
        if (typeof renderer === 'string') {
            return this._renderers.findIndex(r => r.name === renderer);
        }
        return this._renderers.findIndex(r => r.renderer === renderer);
    }

    /**
     * Returns the list of available renderers.
     */
    get renderers(): { name: string, renderer: P5AsciifyRenderer }[] { return this._renderers; }

    /**
     * Returns the result framebuffer, which contains the final ASCII output.
     * 
     * `texture(p5asciify.texture);` and `texture(p5asciify.renderers().resultFramebuffer);` are equivalent,
     * and can be useful interchangeably, e.g. for custom stuff in `drawAsciify()`.
     * 
     * Generally, this texture is drawn to the canvas automatically by `p5.asciify` after `draw()` finishes, and before `drawAsciify()` is called.
     */
    get resultFramebuffer(): p5.Framebuffer { return this._resultFramebuffer; }
}