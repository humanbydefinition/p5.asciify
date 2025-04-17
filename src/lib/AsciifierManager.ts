import p5 from 'p5';
import { P5Asciifier } from './Asciifier';
import { P5AsciifyError } from './AsciifyError';

import URSAFONT_BASE64 from './assets/fonts/ursafont_base64.txt?raw';

/**
 * Manages the `p5.asciify` library by handling one or more `P5Asciifier` instances through the exposed {@link p5asciify} object, which is an instance of this class.
 */
export class P5AsciifierManager {

    /** The p5.js instance used by the library. */
    private _p!: p5;

    /** The list of `P5Asciifier` instances managed by the library. */
    private _asciifiers: P5Asciifier[];

    /** The base font used by the library. */
    private _baseFont!: p5.Font;

    /** Defines whether the hooks are enabled or not. */
    private _hooksEnabled: boolean = true;

    /** Contains the content that has been drawn to the `p5.js` canvas throughout the `draw()` loop. */
    private _sketchFramebuffer!: p5.Framebuffer;

    /**
     * Creates a new `P5AsciifierManager` instance.
     * @ignore
     */
    constructor() {
        this._asciifiers = [new P5Asciifier()];
    }

    /**
     * Initializes the `p5.asciify` library by setting the `p5.js` instance.
     * 
     * For the provided {@link p5asciify} object this method is called automatically when the library is imported.
     * 
     * @param p The p5.js instance to use for the library.
     * @ignore
     */
    public init(p: p5): void {
        this._p = p;
        this._baseFont = p.loadFont(URSAFONT_BASE64, (font) => {

            this._asciifiers.forEach((asciifier) => {
                asciifier.init(p, font);
            });
        });
    }

    /**
     * Sets up the `P5Asciifier` instances managed by the library.
     * 
     * For the provided {@link p5asciify} object this method is called automatically when the users `setup` function finished executing.
     * @ignore
     */
    public setup(): void {
        this._sketchFramebuffer = this._p.createFramebuffer({
            depthFormat: this._p.UNSIGNED_INT,
            textureFiltering: this._p.NEAREST
        });

        this._asciifiers.forEach((asciifier) => {
            asciifier.setup();
        });
    }

    /**
     * Executes the ASCII conversion rendering pipelines for each `P5Asciifier` instance managed by the library.
     * 
     * For the provided {@link p5asciify} object this method is called automatically when the users `draw` function finished executing.
     * 
     * @ignore
     */
    public asciify(): void {
        this._asciifiers.forEach((asciifier) => {
            asciifier.asciify();
        });
    }

    /**
     * Returns the `P5Asciifier` instance at the specified index.
     * 
     * By default, the method returns the first `P5Asciifier` instance in the list, 
     * which usually corresponds to the default `P5Asciifier` provided by the library, which is applied to the main canvas of the `p5.js` instance.
     * 
     * @param index The index of the `P5Asciifier` instance to return.
     * @returns The `P5Asciifier` instance at the specified index.
     * @throws {@link P5AsciifyError} If the index is out of bounds.
     */
    public asciifier(index: number = 0): P5Asciifier {
        if (index < 0 || index >= this._asciifiers.length) {
            throw new P5AsciifyError(`Invalid asciifier index: ${index}.`);
        }

        return this._asciifiers[index];
    }

    /**
     * Adds a new `P5Asciifier` instance to the library.
     * @param framebuffer   The framebuffer to capture for ASCII conversion.
     *                      If not provided, the main canvas of the `p5.js` instance will be used.
     * @returns The newly created `P5Asciifier` instance.
     * @throws {@link P5AsciifyError} If the framebuffer is not an instance of `p5.Framebuffer`.
     */
    public add(framebuffer?: p5.Framebuffer): P5Asciifier {
        if (framebuffer !== undefined && !(framebuffer instanceof p5.Framebuffer)) {
            throw new P5AsciifyError("Framebuffer must be an instance of p5.Framebuffer.");
        }

        const asciifier = new P5Asciifier(framebuffer);
        asciifier.init(this._p, this._baseFont);

        if (this._p._setupDone) {
            asciifier.setup();
        }

        this._asciifiers.push(asciifier);

        return asciifier;
    }

    /**
     * Removes a `P5Asciifier` instance.
     * @param indexOrAsciifier The index of the `P5Asciifier` instance to remove, or the `P5Asciifier` instance itself.
     * @throws {@link P5AsciifyError} If the index is out of bounds or the specified asciifier is not found.
     */
    public remove(indexOrAsciifier: number | P5Asciifier): void {
        if (typeof indexOrAsciifier === 'number') {
            // Handle removal by index
            const index = indexOrAsciifier;
            if (index < 0 || index >= this._asciifiers.length) {
                throw new P5AsciifyError(`Invalid asciifier index: ${index}.`);
            }
            this._asciifiers.splice(index, 1);
        } else {
            // Handle removal by instance
            const asciifier = indexOrAsciifier;
            const index = this._asciifiers.indexOf(asciifier);
            if (index === -1) {
                throw new P5AsciifyError('The specified asciifier was not found.');
            }
            this._asciifiers.splice(index, 1);
        }
    }

    /**
     * Sets hooks status. This method should be called if you need to manually 
     * enable or disable the automatic pre/post draw hooks.
     * 
     * @param enabled Whether the hooks should be enabled
     * @ignore
     */
    public setHooksEnabled(enabled: boolean): void {
        this._hooksEnabled = enabled;
    }

    /**
     * Returns the list of `P5Asciifier` instances managed by the library.
     */
    get asciifiers(): P5Asciifier[] { return this._asciifiers; }

    /**
     * Returns `true` if the hooks are enabled, `false` otherwise.
     * @ignore
     */
    get hooksEnabled(): boolean { return this._hooksEnabled; }

    /**
     * Returns the sketch framebuffer used to store the content drawn to the `p5.js` canvas.
     * @ignore
     */
    get sketchFramebuffer(): p5.Framebuffer { return this._sketchFramebuffer; }
}