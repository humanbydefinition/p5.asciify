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
    public hooksEnabled: boolean = true;

    /**
     * Creates a new `P5AsciifierManager` instance.
     * @ignore
     */
    constructor() {
        this._asciifiers = [new P5Asciifier()];
    }

    /**
     * Unregisters all hooks so that the user can opt out of the automatic hook behavior.
     */
    public unregisterHooks(): void {
        this.hooksEnabled = false;
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
        this._asciifiers.forEach((asciifier) => {
            asciifier.setup();
        });
    }

    // Add this method to the P5AsciifierManager class in AsciifierManager.ts

    /**
     * Registers the pre-draw and post-draw hooks with p5.js.
     * This method is called after the setup is complete.
     * 
     * @param p The p5 instance.
     */
    public registerDrawHooks(p: p5): void {
        // Check if hooks are enabled.
        if (!this.hooksEnabled) return;

        // Register the pre-draw hook
        p.registerMethod("pre", () => {
            if (!this.hooksEnabled) return;
            for (const asciifier of this.asciifiers) {
                if (asciifier.canvasFlag) {
                    asciifier.captureFramebuffer.begin();
                    p.clear();
                    p.push();
                }
            }
        });

        // Register the post-draw hook
        p.registerMethod("post", () => {
            if (!this.hooksEnabled) return;
            for (const asciifier of this.asciifiers) {
                if (asciifier.canvasFlag) {
                    p.pop();
                    asciifier.captureFramebuffer.end();
                }
            }

            this.asciify();

            if (p.drawAsciify) {
                p.drawAsciify();
            }
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
     * Removes the `P5Asciifier` instance at the specified index.
     * @param index The index of the `P5Asciifier` instance to remove.
     * @throws {@link P5AsciifyError} If the index is out of bounds.
     */
    public remove(index: number): void {
        if (index < 0 || index >= this._asciifiers.length) {
            throw new P5AsciifyError(`Invalid asciifier index: ${index}.`);
        }

        this._asciifiers.splice(index, 1);
    }

    /**
     * Returns the list of `P5Asciifier` instances managed by the library.
     */
    get asciifiers(): P5Asciifier[] { return this._asciifiers; }
}