import P5Asciify from './asciify.js';
import P5AsciifyError from './errors.js';
import P5AsciifyUtils from './utils.js';
import p5 from 'p5';
import URSAFONT_BASE64 from './assets/fonts/ursafont_base64.txt';

// Initialize the P5Asciify library and export it as a default module
const p5asciify = new P5Asciify();
export default p5asciify;

// Expose P5Asciify to the global scope if not in a module environment
if (typeof window !== 'undefined' && !window.P5Asciify) {
    window.p5asciify = p5asciify;  // Expose p5asciify instance
    window.preload = function () { }; // Define empty preload function in case user doesn't provide one
}

/**
 * Executed on initialization. Passes the p5 instance to the P5Asciify library if not already set by the user.
 * 
 * @memberof p5
 */
p5.prototype.setupP5Instance = function () {
    if (!p5asciify.p5Instance) {
        p5asciify.p5Instance = this;
    }

    // Pass the reference to other relevant objects of the p5.asciify library
    p5asciify.gradientManager.addInstance(p5asciify.p5Instance);
}
p5.prototype.registerMethod("init", p5.prototype.setupP5Instance);

/**
 * Preloads the ASCII font for the P5Asciify library.
 * This method increments the preload count and loads the font from a base64 encoded string.
 * If the font is successfully loaded, it assigns the font to P5Asciify.font.
 * If the font fails to load, it throws a P5AsciifyError.
 * Not intended to be called directly by the user, as it is performed automatically before preload.
 *
 * @memberof p5
 * @throws {P5AsciifyError} Throws an error if the font fails to load.
 */
p5.prototype.preloadAsciiFont = function () {
    p5asciify.p5Instance._incrementPreload();
    p5asciify.font = p5asciify.p5Instance.loadFont(
        URSAFONT_BASE64,
        (loadedFont) => {
            p5asciify.font = loadedFont;
            p5asciify.fontBase64 = `${URSAFONT_BASE64}`;
            p5asciify.fontFileType = 'truetype';
        },
        () => { throw new P5AsciifyError(`loadAsciiFont() | Failed to load font from path: '${font}'`); }
    );
}
p5.prototype.registerMethod("beforePreload", p5.prototype.preloadAsciiFont);

/**
 * Loads an ASCII font for the P5Asciify library.
 * This method sets the font for P5Asciify from a specified path.
 * If a string path is provided, it loads the font from that path.
 * After loading, it decrements the preload count and updates the font texture atlas and grid dimensions.
 *
 * @memberof p5
 * @param {string} font - The path to the font file. (.ttf or .otf)
 * @throws {P5AsciifyError} Throws an error if the font fails to load or if the font parameter is invalid.
 * 
 * @example
 * Loading a font from a path
 * loadAsciiFont('path/to/font.ttf');
 */
p5.prototype.loadAsciiFont = function (font) {
    const setFont = async (loadedFont, fontPath) => {
        p5asciify.font = loadedFont;

        // If the sketch already runs, update the font texture atlas and grid dimensions, as well as the character sets
        if (p5asciify.p5Instance.frameCount > 0) {
            p5asciify.asciiFontTextureAtlas.setFontObject(loadedFont);
            p5asciify.asciiCharacterSet.setCharacterSet(p5asciify.asciiCharacterSet.characters);
            p5asciify.edgeCharacterSet.setCharacterSet(p5asciify.edgeCharacterSet.characters);

            p5asciify.grid.resizeCellPixelDimensions(
                p5asciify.asciiFontTextureAtlas.maxGlyphDimensions.width,
                p5asciify.asciiFontTextureAtlas.maxGlyphDimensions.height
            );
        }

        try { // Convert the font to Base64 for use in the text-based ASCII renderer
            const response = await fetch(fontPath);
            const arrayBuffer = await response.arrayBuffer();
            const base64String = btoa(
                new Uint8Array(arrayBuffer)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );

            // Determine the font type based on the file extension
            let mimeType = '';
            if (fontPath.toLowerCase().endsWith('.ttf')) {
                mimeType = 'truetype';
            } else if (fontPath.toLowerCase().endsWith('.otf')) {
                mimeType = 'opentype';
            } else {
                mimeType = 'truetype';
            }

            p5asciify.fontBase64 = `data:font/${mimeType};charset=utf-8;base64,${base64String}`;
            p5asciify.fontFileType = mimeType;
        } catch (error) {
            console.error('Error converting font to Base64:', error);
        }

        p5asciify.p5Instance._decrementPreload();
    };

    if (typeof font === 'string') {
        p5asciify.p5Instance.loadFont(
            font,
            (loadedFont) => { setFont(loadedFont, font); },
            () => { throw new P5AsciifyError(`loadAsciiFont() | Failed to load font from path: '${font}'`); }
        );
    } else {
        throw new P5AsciifyError(`loadAsciiFont() | Invalid font parameter. Expected a string/path.`);
    }
};
p5.prototype.registerPreloadMethod('loadAsciiFont', p5.prototype);

/**
 * Sets up the P5Asciify library for use with p5.js.
 * This method ensures that the WebGL renderer is being used and that the p5.js version is compatible.
 * If the requirements are met, it initializes the P5Asciify setup.
 * Not intended to be called directly by the user, as it is performed automatically after setup.
 *
 * @memberof p5
 * @throws {P5AsciifyError} Throws an error if the WebGL renderer is not used or if the p5.js version is below 1.8.0.
 */
p5.prototype.setupAsciifier = function () {

    if (p5asciify.p5Instance._setupDone) { // instance mode necessitates this check

        if (p5asciify.p5Instance._renderer.drawingContext instanceof CanvasRenderingContext2D) {
            throw new P5AsciifyError("WebGL renderer is required for p5.asciify to work.");
        }

        if (P5AsciifyUtils.compareVersions(p5asciify.p5Instance.VERSION, "1.8.0") < 0) {
            throw new P5AsciifyError("p5.asciify requires p5.js v1.8.0 or higher to work.");
        }

        p5asciify.setup();
    }
}
p5.prototype.registerMethod("afterSetup", p5.prototype.setupAsciifier);

/**
 * Sets a post-setup function, which will be called after the P5Asciify setup is complete.
 * 
 * @memberof p5
 * @param {function} postSetupFunction 
 */
p5.prototype.setAsciifyPostSetupFunction = function (postSetupFunction) {
    p5asciify.postSetupFunction = postSetupFunction;
};

/**
 * Sets a post-draw function, which will be called every frame after the P5Asciify draw is complete.
 * 
 * @memberof p5
 * @param {function} postDrawFunction
 */
p5.prototype.setAsciifyPostDrawFunction = function (postDrawFunction) {
    p5asciify.postDrawFunction = postDrawFunction;
}

/**
 * Sets the options for the P5Asciify library to customize the ASCII rendering.
 *
 * @memberof p5
 * @param {Object} options - An object containing the options to set for the P5Asciify library.
 */
p5.prototype.setAsciiOptions = function (options) {

    // Check and remove any unknown options
    const validOptions = ["common", "edge", "ascii", "gradient", "text"];
    const unknownOptions = Object.keys(options).filter(option => !validOptions.includes(option));

    if (unknownOptions.length) {
        console.warn(`P5Asciify: Unknown options detected (${unknownOptions.join(', ')}). Refer to the documentation for valid options.`);
        unknownOptions.forEach(option => delete options[option]);
    }

    // Check for invalid render modes
    const VALID_RENDER_MODES = ['brightness', 'accurate', 'custom'];
    if (options?.ascii?.renderMode && !VALID_RENDER_MODES.includes(options.ascii.renderMode)) {
        console.warn(`P5Asciify: Invalid render mode '${options.ascii.renderMode}'. Defaulting to 'brightness'.`);
        options.ascii.renderMode = 'brightness';
    }

    const { ascii: asciiOptions, edge: edgeOptions, common: commonOptions, gradient: gradientOptions, text: textOptions } = options;

    // Convert hex color strings to p5.Color objects and assign them to the options
    const colorOptions = [edgeOptions, asciiOptions, gradientOptions];
    colorOptions.forEach(opt => {
        if (opt?.characterColor) opt.characterColor = this.color(opt.characterColor);
        if (opt?.backgroundColor) opt.backgroundColor = this.color(opt.backgroundColor);
    });

    if (commonOptions?.fontSize && (commonOptions.fontSize < 1 || commonOptions.fontSize > 128)) {
        console.warn(`P5Asciify: Font size ${commonOptions.fontSize} is out of bounds. It should be between 1 and 128. Font size not updated.`);
        delete commonOptions.fontSize;
    }

    if (edgeOptions?.characters !== undefined && edgeOptions.characters.length !== 8) {
        console.warn(`P5Asciify: The edge character set must contain exactly 8 characters. Character set not updated.`);
        delete edgeOptions.characters;
    }

    p5asciify.setDefaultOptions(asciiOptions, edgeOptions, commonOptions, gradientOptions, textOptions);
};

/**
 * Adds a custom ASCII gradient to the P5Asciify library, which is used by the gradient ascii renderer on layer 2.
 * 
 * @memberof p5
 * @param {string} gradientName - The name of the gradient to add.
 * @param {number} brightnessStart - The starting brightness value for the gradient to be applied to.
 * @param {number} brightnessEnd - The ending brightness value for the gradient to be applied to.
 * @param {string} characters - The characters to use for the gradient.
 * @param {object} userParams - Additional parameters for the gradient based on the gradient type.
 * @returns {P5AsciifyGradient} The gradient instance that was added to the rendering loop to modify during runtime.
 */
p5.prototype.addAsciiGradient = function (gradientName, brightnessStart, brightnessEnd, characters, userParams = {}) {

    if (!p5asciify.gradientManager.gradientConstructors[gradientName]) {
        throw new P5AsciifyError(`Gradient '${gradientName}' does not exist! Available gradients: ${Object.keys(P5Asciify.gradientManager.gradientConstructors).join(", ")}`);
    }

    if (typeof brightnessStart !== 'number' || brightnessStart < 0 || brightnessStart > 255) {
        throw new P5AsciifyError(`Invalid brightness start value '${brightnessStart}'. Expected a number between 0 and 255.`);
    }

    if (typeof brightnessEnd !== 'number' || brightnessEnd < 0 || brightnessEnd > 255) {
        throw new P5AsciifyError(`Invalid brightness end value '${brightnessEnd}'. Expected a number between 0 and 255.`);
    }

    if (typeof characters !== 'string') {
        throw new P5AsciifyError(`Invalid characters value '${characters}'. Expected a string.`);
    }

    // Check if the userParams exist and are valid
    const validParams = Object.keys(p5asciify.gradientManager.gradientParams[gradientName]);
    const invalidKeys = Object.keys(userParams).filter(key => !validParams.includes(key));
    if (invalidKeys.length > 0) {
        throw new P5AsciifyError(`Invalid parameter(s) for gradient '${gradientName}': ${invalidKeys.join(", ")}\nValid parameters are: ${validParams.join(", ")}`);
    }

    return p5asciify.gradientManager.addGradient(gradientName, brightnessStart, brightnessEnd, characters, userParams);
}

/**
 * Removes a custom ASCII gradient from the P5Asciify library.
 * 
 * @memberof p5
 * @param {P5AsciifyGradient} gradientInstance - The gradient instance to remove from the rendering loop.
 */
p5.prototype.removeAsciiGradient = function (gradientInstance) {
    p5asciify.gradientManager.removeGradient(gradientInstance);
}

/**
 * Adds a push() call before the user's draw() function in p5.js.
 * This method starts wrapping the user's draw function inside a framebuffer to capture the content drawn on the canvas.
 * Not intended to be called directly by the user, as it is performed automatically before draw.
 *
 * @memberof p5
 */
p5.prototype.preDrawAddPush = function () {
    p5asciify.sketchFramebuffer.begin();
    p5asciify.p5Instance.push();
};
p5.prototype.registerMethod("pre", p5.prototype.preDrawAddPush);

/**
 * Adds a pop() call after the user's draw() function in p5.js.
 * This method ends the wrapping of the user's draw function inside a framebuffer and pops the transformation matrix.
 * Not intended to be called directly by the user, as it is performed automatically after draw.
 *
 * @memberof p5
 */
p5.prototype.postDrawAddPop = function () {
    p5asciify.p5Instance.pop();
    p5asciify.sketchFramebuffer.end();
};
p5.prototype.registerMethod("post", p5.prototype.postDrawAddPop);

/**
 * Applies the ASCII effect to the content drawn on the p5.js canvas.
 * This method calls the P5Asciify library to convert the canvas content into ASCII art after the user's draw() function is executed.
 * Not intended to be called directly by the user, as it is performed automatically after draw.
 *
 * @memberof p5
 */
p5.prototype.asciify = function () { p5asciify.asciify(); };
p5.prototype.registerMethod("post", p5.prototype.asciify);