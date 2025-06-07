import p5 from 'p5';

import { P5AsciifyRenderer } from './AsciiRenderer';
import { P5AsciifyRenderer2D } from './2d/AsciiRenderer2D';
import { P5AsciifyAbstractFeatureRenderer2D } from './2d/feature/AbstractFeatureRenderer2D';
import { P5AsciifyBrightnessRenderer } from './2d/feature/brightness/BrightnessAsciiRenderer';
import { P5AsciifyEdgeRenderer } from './2d/feature/edge/EdgeAsciiRenderer';
import { P5AsciifyDisplayRenderer } from './AsciiDisplayRenderer';

import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyFontManager } from '../FontManager';

import { P5AsciifyError } from '../errors/AsciifyError';

import { AsciiRendererOptions } from './types';

import { RENDERER_TYPES } from './constants';
import { P5AsciifyRendererPlugin } from '../plugins/RendererPlugin';

import { P5AsciifyPluginRegistry } from '../plugins/PluginRegistry';
import { errorHandler } from '../errors';


/**
 * Manages the whole ASCII rendering pipeline.
 */
export class P5AsciifyRendererManager {

    /** The current dimensions of the canvas. If the dimensions change, the grid is reset and the renderers are resized. */
    private _currentCanvasDimensions: { width: number, height: number };

    /** The list of available renderers. */
    private _renderers: { name: string, renderer: P5AsciifyRenderer }[];

    /** The primary color framebuffer, whose pixels define the character colors of the grid cells. */
    private _primaryColorFramebuffer: p5.Framebuffer;

    /** The secondary color framebuffer, whose pixels define the background colors of the grid cells. */
    private _secondaryColorFramebuffer: p5.Framebuffer;

    /** The character framebuffer, whose pixels define the ASCII characters to use in the grid cells. */
    private _characterFramebuffer: p5.Framebuffer;

    /** The transform framebuffer, where each pixels color channel defines a different transformation:
     * - Red channel: Swap the character and background colors of the grid cells.
     * - Green channel: Flip the ASCII characters horizontally.
     * - Blue channel: Flip the ASCII characters vertically.
     */
    private _transformFramebuffer: p5.Framebuffer;

    /** The rotation framebuffer, whose pixels define the rotation angle of the characters in the grid. */
    private _rotationFramebuffer: p5.Framebuffer;

    private _asciiDisplayRenderer2D: P5AsciifyDisplayRenderer;

    /** Whether any renderers are enabled. */
    private _hasEnabledRenderers: boolean = false;

    /**
     * Creates a new ASCII renderer manager instance.
     * @param _p The p5 instance.
     * @param _grid The grid instance.
     * @param _fontManager The font texture atlas instance.
     * @ignore
     */
    constructor(
        /** The p5 instance. */
        private _p: p5,

        /** The framebuffer containing the content to be asciified. */
        private _captureFramebuffer: p5.Framebuffer,

        /** The grid instance. */
        private _grid: P5AsciifyGrid,

        /** The font texture atlas instance. */
        private _fontManager: P5AsciifyFontManager,

        /** The plugin registry instance. */
        private _pluginRegistry: P5AsciifyPluginRegistry
    ) {
        this._currentCanvasDimensions = {
            width: this._captureFramebuffer.width,
            height: this._captureFramebuffer.height
        };

        this._renderers = [
            { name: "custom2D", renderer: new P5AsciifyRenderer2D(this._p, this._captureFramebuffer, this._grid, this._fontManager) },
            { name: "edge", renderer: new P5AsciifyEdgeRenderer(this._p, this._captureFramebuffer, this._grid, this._fontManager) },
            { name: "brightness", renderer: new P5AsciifyBrightnessRenderer(this._p, this._captureFramebuffer, this._grid, this._fontManager) },
        ];

        this._primaryColorFramebuffer = this._p.createFramebuffer({
            density: 1,
            antialias: false,
            width: this._grid.cols,
            height: this._grid.rows,
            depthFormat: this._p.UNSIGNED_INT,
            textureFiltering: this._p.NEAREST
        });

        this._secondaryColorFramebuffer = this._p.createFramebuffer({
            density: 1,
            antialias: false,
            width: this._grid.cols,
            height: this._grid.rows,
            depthFormat: this._p.UNSIGNED_INT,
            textureFiltering: this._p.NEAREST
        });

        this._transformFramebuffer = this._p.createFramebuffer({
            density: 1,
            antialias: false,
            width: this._grid.cols,
            height: this._grid.rows,
            depthFormat: this._p.UNSIGNED_INT,
            textureFiltering: this._p.NEAREST
        });

        this._characterFramebuffer = this._p.createFramebuffer({
            density: 1,
            antialias: false,
            width: this._grid.cols,
            height: this._grid.rows,
            depthFormat: this._p.UNSIGNED_INT,
            textureFiltering: this._p.NEAREST
        });

        this._rotationFramebuffer = this._p.createFramebuffer({
            density: 1,
            antialias: false,
            width: this._grid.cols,
            height: this._grid.rows,
            depthFormat: this._p.UNSIGNED_INT,
            textureFiltering: this._p.NEAREST
        });

        this._asciiDisplayRenderer2D = new P5AsciifyDisplayRenderer(this._p, this._grid, this._fontManager);
    }

    /**
     * Runs all renderers in the pipeline, merging their framebuffers together,
     * and passing them to the ASCII display renderer for final rendering.
     * 
     * All {@link P5Asciifier} instances and their renderer managers call this method automatically 
     * after the user's `draw()` function when part of the {@link P5AsciifierManager} instance {@link p5asciify}.
     * 
     * @param inputFramebuffer The input framebuffer to transform into ASCII.
     * 
     * @ignore
     */
    public render(backgroundColor: string | p5.Color | [number, number?, number?, number?] = "#000000"): void {

        this._characterFramebuffer.draw(() => this._p.clear());
        this._primaryColorFramebuffer.draw(() => this._p.clear());
        this._secondaryColorFramebuffer.draw(() => this._p.clear());
        this._transformFramebuffer.draw(() => this._p.clear());
        this._rotationFramebuffer.draw(() => this._p.clear());

        this._hasEnabledRenderers = false;
        for (let i = this._renderers.length - 1; i >= 0; i--) {
            const renderer = this._renderers[i];
            if (renderer.renderer.options.enabled) {

                if (renderer.renderer instanceof P5AsciifyAbstractFeatureRenderer2D) {
                    renderer.renderer.render();
                }

                const xPos = -this._grid.cols / 2;
                const yPos = ((-this._grid.rows) / 2);

                this._characterFramebuffer.draw(() => this._p.image(renderer.renderer.characterFramebuffer, xPos, yPos));
                this._primaryColorFramebuffer.draw(() => this._p.image(renderer.renderer.primaryColorFramebuffer, xPos, yPos));
                this._secondaryColorFramebuffer.draw(() => this._p.image(renderer.renderer.secondaryColorFramebuffer, xPos, yPos));
                this._transformFramebuffer.draw(() => this._p.image(renderer.renderer.transformFramebuffer, xPos, yPos));
                this._rotationFramebuffer.draw(() => this._p.image(renderer.renderer.rotationFramebuffer, xPos, yPos));

                this._hasEnabledRenderers = true;
            }
        }

        this._asciiDisplayRenderer2D.render(
            this._characterFramebuffer,
            this._primaryColorFramebuffer,
            this._secondaryColorFramebuffer,
            this._transformFramebuffer,
            this._rotationFramebuffer,
            this._captureFramebuffer,
            backgroundColor
        );

        this.checkCanvasDimensions();
    }

    /**
     * Checks if the canvas dimensions have changed.
     * If they have, the grid is reset and the renderers are resized.
     * 
     * Is called automatically when {@link render} is called 
     * and the canvas dimensions are different to the previous {@link render} call.
     */
    private checkCanvasDimensions(): void {
        if (this._currentCanvasDimensions.width !== this._captureFramebuffer.width || this._currentCanvasDimensions.height !== this._captureFramebuffer.height) {
            this._currentCanvasDimensions.width = this._captureFramebuffer.width;
            this._currentCanvasDimensions.height = this._captureFramebuffer.height;

            this._grid.reset();

            this.resetRendererDimensions();
        }
    }

    public updateCaptureFramebuffer(newCaptureFramebuffer: p5.Framebuffer): void {

        this._captureFramebuffer = newCaptureFramebuffer;
        this.resetRendererDimensions();

        this._renderers.forEach(renderer => {
            renderer.renderer.updateCaptureFramebuffer(newCaptureFramebuffer);
        });
    }

    /**
     * Resets the dimensions of all renderers.
     * 
     * Is called automatically when {@link render} is called 
     * and the canvas dimensions are different to the previous {@link render} call.
     * 
     * @ignore
     */
    public resetRendererDimensions(): void {
        this._primaryColorFramebuffer.resize(this._grid.cols, this._grid.rows);
        this._secondaryColorFramebuffer.resize(this._grid.cols, this._grid.rows);
        this._characterFramebuffer.resize(this._grid.cols, this._grid.rows);
        this._transformFramebuffer.resize(this._grid.cols, this._grid.rows);
        this._rotationFramebuffer.resize(this._grid.cols, this._grid.rows);

        this._renderers.forEach(renderer => {
            renderer.renderer.resizeFramebuffers();

            if (renderer.renderer instanceof P5AsciifyAbstractFeatureRenderer2D) {
                renderer.renderer.resetShaders();
            }
        });

        this._asciiDisplayRenderer2D.resizeFramebuffers();
    }

    /**
     * Adds a new renderer to the list of renderers.
     * @param name The name of the renderer to add.
     * @param type The type of the renderer to add.
     * @param options The options to use for the renderer.
     * @returns The ASCII renderer instance that was added.
     * @throws If the renderer name is an empty string or the renderer type is invalid.
     * 
     * @example
     * ```javascript
     *  let asciifier;
     *  let brightnessAsciiRenderer;
     * 
     *  function setupAsciify() {
     *      asciifier = p5asciify.asciifier();
     * 
     *      // Remove all existing default renderers provided by `p5.asciify`.
     *      asciifier.renderers().clear();
     * 
     *      // Add a new brightness renderer with custom options.
     *      brightnessAsciiRenderer = asciifier.renderers().add('brightness', 'brightness', {
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
        type: string,
        options: AsciiRendererOptions
    ): P5AsciifyRenderer {
        if (typeof name !== 'string' || name.trim() === '') {
            throw new P5AsciifyError('Renderer name must be a non-empty string');
        }

        let renderer: P5AsciifyRenderer | undefined;

        // Check built-in renderers first
        const RendererClass = RENDERER_TYPES[type as keyof typeof RENDERER_TYPES];

        if (RendererClass) {
            // Create built-in renderer
            renderer = new RendererClass(this._p, this._captureFramebuffer, this._grid, this._fontManager, options);
        }
        // If not found, check for plugin renderers
        else {
            const plugin = this._pluginRegistry.get(type);
            if (plugin) {
                renderer = plugin.create(
                    this._p,
                    this._captureFramebuffer,
                    this._grid,
                    this._fontManager,
                    options
                );
            }
        }

        // If neither built-in nor plugin, throw error
        if (!renderer) {
            const availableTypes = [
                ...Object.keys(RENDERER_TYPES),
                ...this._pluginRegistry.getIds()
            ].join(', ');

            throw new P5AsciifyError(
                `Invalid renderer type: ${type}. Valid types are: ${availableTypes}`
            );
        }

        this._renderers.unshift({ name, renderer });
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
     *      brightnessRenderer = p5asciify.asciifier().renderers().get('brightness');
     * 
     *      // Use the brightness renderer instance to modify its properties during run-time,
     *      // instead of constantly calling `p5asciify.asciifier().renderers().get('brightness')`.
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
     * Gets a list of all available renderer types (built-in and plugins)
     * @returns An array of available renderer type IDs
     */
    public getAvailableRendererTypes(): string[] {
        return [
            ...Object.keys(RENDERER_TYPES),
            ...this._pluginRegistry.getIds()
        ];
    }

    /**
     * Moves a renderer down in the list of renderers, meaning it will be rendered earlier in the pipeline.
     * @param renderer The renderer to move down in the list.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Move the `"brightness"` renderer down in the list of renderers.
     *      p5asciify.asciifier().renderers().moveDown('brightness');
     * 
     *      // Alternatively, you can also pass the renderer instance itself.
     *  }
     * ```
     */
    public moveDown(renderer: string | P5AsciifyRenderer): void {
        const index = this._getRendererIndex(renderer);

        const isValidIndex = errorHandler.validate(
            index >= 0 && index < this._renderers.length,
            'Renderer not found in the renderer list.',
            { providedValue: renderer, method: 'moveDown' }
        );

        const isValidNextIndex = errorHandler.validate(
            index < this._renderers.length - 1,
            'Renderer is already at the bottom of the list.',
            { providedValue: renderer, method: 'moveDown' }
        );

        if (!isValidIndex || !isValidNextIndex) {
            return; // If validation fails, do not move the renderer
        }

        this.swap(renderer, this._renderers[index + 1].renderer);
    }

    /**
     * Moves a renderer up in the list of renderers, meaning it will be rendered later in the pipeline.
     * @param renderer The renderer to move up in the list.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Move the `"brightness"` renderer up in the list of renderers.
     *      p5asciify.asciifier().renderers().moveUp('brightness');
     * 
     *      // Alternatively, you can also pass the renderer instance itself.
     *  }
     * ```
     */
    public moveUp(renderer: string | P5AsciifyRenderer): void {
        const index = this._getRendererIndex(renderer);

        const isValidIndex = errorHandler.validate(
            index >= 0 && index < this._renderers.length,
            'Renderer not found in the renderer list.',
            { providedValue: renderer, method: 'moveUp' }
        );

        const isValidPreviousIndex = errorHandler.validate(
            index > 0,
            'Renderer is already at the top of the list.',
            { providedValue: renderer, method: 'moveUp' }
        );

        if (!isValidIndex || !isValidPreviousIndex) {
            return; // If validation fails, do not move the renderer
        }

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
     *      p5asciify.asciifier().renderers().remove('brightness');
     * 
     *      // Alternatively, you can also pass the renderer instance itself.
     * }
     * ```
     */
    public remove(renderer: string | P5AsciifyRenderer): void {
        const index = this._getRendererIndex(renderer);

        const isValidIndex = errorHandler.validate(
            index >= 0 && index < this._renderers.length,
            'Renderer not found in the renderer list.',
            { providedValue: renderer, method: 'remove' }
        );

        if (!isValidIndex) {
            return; // If validation fails, do not remove the renderer
        }

        this._renderers.splice(index, 1);
    }

    /**
     * Clears the list of renderers. 
     * Can be useful when you want to start fresh without the default renderers provided by the library.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Clear all existing renderers.
     *      p5asciify.asciifier().renderers().clear();
     * 
     *     // With no renderers, you can add your own custom renderer.
     *     // Otherwise, `p5.asciify` will now render the input image without any ASCII conversion.
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
     * @throws If one or more renderers are not found.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Swap the positions of the `"brightness"` and `"edge"` renderers.
     *      p5asciify.asciifier().renderers().swap('brightness', 'edge');
     * 
     *      // Alternatively, you can also pass the renderer instances themselves.
     *  }
     * ```
     */
    public swap(renderer1: string | P5AsciifyRenderer, renderer2: string | P5AsciifyRenderer): void {
        const index1 = this._getRendererIndex(renderer1);
        const index2 = this._getRendererIndex(renderer2);

        const areValidIndices = errorHandler.validate(
            index1 >= 0 && index1 < this._renderers.length &&
            index2 >= 0 && index2 < this._renderers.length,
            'One or more renderers not found in the renderer list.',
            { providedValues: [renderer1, renderer2], method: 'swap' }
        );

        if (!areValidIndices) {
            return; // If validation fails, do not swap the renderers
        }

        const temp = this._renderers[index1];
        this._renderers[index1] = this._renderers[index2];
        this._renderers[index2] = temp;
    }

    /**
     * Enables all renderers in the list of renderers at once.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *     // Enable all default renderers provided by `p5.asciify`.
     *      p5asciify.asciifier().renderers().enable();
     *  }
     * ```
     */
    public enable() {
        this._renderers.forEach(renderer => renderer.renderer.enabled(true));
    }

    /**
     * Disables all renderers in the list of renderers at once.
     * 
     * @example
     * ```javascript
     *  function setupAsciify() {
     *      // Disable all renderers in the list.
     *      p5asciify.asciifier().renderers().disable();
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
     *      p5asciify.asciifier().renderers().enabled(true);
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
     * Returns the list of renderers in the pipeline.
     * 
     * The first renderer in the list is executed last, and the last renderer in the list is executed first.
     */
    get renderers(): { name: string, renderer: P5AsciifyRenderer }[] { return this._renderers; }

    /**
     * Returns the {@link P5AsciifyDisplayRenderer} instance which performs the final ASCII conversion.
     */
    get asciiDisplayRenderer(): P5AsciifyDisplayRenderer { return this._asciiDisplayRenderer2D; }

    /**
     * Returns the primary color framebuffer, 
     * which contains the primary color framebuffers of all renderers in the pipeline stacked on top of each other.
     * @ignore
     */
    get characterFramebuffer(): p5.Framebuffer { return this._characterFramebuffer; }

    /**
     * Returns the primary color framebuffer,
     * which contains the primary color framebuffers of all renderers in the pipeline stacked on top of each other.
     * @ignore
     */
    get primaryColorFramebuffer(): p5.Framebuffer { return this._primaryColorFramebuffer; }

    /**
     * Returns the secondary color framebuffer,
     * which contains the secondary color framebuffers of all renderers in the pipeline stacked on top of each other.
     * @ignore
     */
    get secondaryColorFramebuffer(): p5.Framebuffer { return this._secondaryColorFramebuffer; }

    /**
     * Returns the inversion framebuffer,
     * which contains the inversion framebuffers of all renderers in the pipeline stacked on top of each other.
     * @ignore
     */
    get transformFramebuffer(): p5.Framebuffer { return this._transformFramebuffer; }

    /**
     * Returns the rotation framebuffer,
     * which contains the rotation framebuffers of all renderers in the pipeline stacked on top of each other.
     * @ignore
     */
    get rotationFramebuffer(): p5.Framebuffer { return this._rotationFramebuffer; }

    /**
     * Returns a boolean indicating whether any renderers are enabled in the pipeline.
     */
    get hasEnabledRenderers(): boolean { return this._hasEnabledRenderers; }
}