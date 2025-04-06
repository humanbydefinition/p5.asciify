import p5 from 'p5';
import { P5Asciifier } from './Asciifier';
/**
 * Manages the `p5.asciify` library by handling one or more `P5Asciifier` instances through the exposed {@link p5asciify} object, which is an instance of this class.
 */
export declare class P5AsciifierManager {
    /** The p5.js instance used by the library. */
    private _p;
    /** The list of `P5Asciifier` instances managed by the library. */
    private _asciifiers;
    /** The base font used by the library. */
    private _baseFont;
    /** Defines whether the hooks are enabled or not. */
    hooksEnabled: boolean;
    /**
     * Creates a new `P5AsciifierManager` instance.
     * @ignore
     */
    constructor();
    /**
     * Unregisters all hooks so that the user can opt out of the automatic hook behavior.
     */
    unregisterHooks(): void;
    /**
     * Initializes the `p5.asciify` library by setting the `p5.js` instance.
     *
     * For the provided {@link p5asciify} object this method is called automatically when the library is imported.
     *
     * @param p The p5.js instance to use for the library.
     * @ignore
     */
    init(p: p5): void;
    /**
     * Sets up the `P5Asciifier` instances managed by the library.
     *
     * For the provided {@link p5asciify} object this method is called automatically when the users `setup` function finished executing.
     * @ignore
     */
    setup(): void;
    /**
     * Registers the pre-draw and post-draw hooks with p5.js.
     * This method is called after the setup is complete.
     *
     * @param p The p5 instance.
     */
    registerDrawHooks(p: p5): void;
    /**
     * Executes the ASCII conversion rendering pipelines for each `P5Asciifier` instance managed by the library.
     *
     * For the provided {@link p5asciify} object this method is called automatically when the users `draw` function finished executing.
     *
     * @ignore
     */
    asciify(): void;
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
    asciifier(index?: number): P5Asciifier;
    /**
     * Adds a new `P5Asciifier` instance to the library.
     * @param framebuffer   The framebuffer to capture for ASCII conversion.
     *                      If not provided, the main canvas of the `p5.js` instance will be used.
     * @returns The newly created `P5Asciifier` instance.
     * @throws {@link P5AsciifyError} If the framebuffer is not an instance of `p5.Framebuffer`.
     */
    add(framebuffer?: p5.Framebuffer): P5Asciifier;
    /**
     * Removes the `P5Asciifier` instance at the specified index.
     * @param index The index of the `P5Asciifier` instance to remove.
     * @throws {@link P5AsciifyError} If the index is out of bounds.
     */
    remove(index: number): void;
    /**
     * Returns the list of `P5Asciifier` instances managed by the library.
     */
    get asciifiers(): P5Asciifier[];
}
