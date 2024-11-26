import P5Asciify from './asciify.js';
import P5AsciifyError from './errors.js';
import P5AsciifyUtils from './utils.js';
import p5 from 'p5';
import URSAFONT_BASE64 from './assets/fonts/ursafont_base64.txt';

const p5asciify = new P5Asciify();
export default p5asciify;

// Expose P5Asciify to the global scope if not in a module environment
if (typeof window !== 'undefined' && !window.P5Asciify) {
    window.p5asciify = p5asciify;  // Expose p5asciify instance
    window.preload = function () { };
}

p5.prototype.setupP5Instance = function () {
    if (!p5asciify.p5Instance) {
        p5asciify.p5Instance = this;
    }

    p5asciify.preEffectManager.addInstance(p5asciify.p5Instance);
    p5asciify.afterEffectManager.addInstance(p5asciify.p5Instance);
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
 * @function preloadAsciiFont
 * @memberof p5
 * @throws {P5AsciifyError} Throws an error if the font fails to load.
 */
p5.prototype.preloadAsciiFont = function () {
    p5asciify.p5Instance._incrementPreload();
    p5asciify.font = p5asciify.p5Instance.loadFont(
        URSAFONT_BASE64,
        (loadedFont) => {
            p5asciify.font = loadedFont;
        },
        () => { throw new P5AsciifyError(`loadAsciiFont() | Failed to load font from path: '${font}'`); }
    );
}
p5.prototype.registerMethod("beforePreload", p5.prototype.preloadAsciiFont);

/**
 * Loads an ASCII font for the P5Asciify library.
 * This method sets the font for P5Asciify from a specified path or font object.
 * If a string path is provided, it loads the font from that path.
 * If a font object is provided, it directly sets the font.
 * After loading, it decrements the preload count and updates the character sets and grid dimensions.
 *
 * @function loadAsciiFont
 * @memberof p5
 * @param {string|Object} font - The path to the font file or the font object.
 * @throws {P5AsciifyError} Throws an error if the font fails to load or if the font parameter is invalid.
 * 
 * @example
 * Loading a font from a path
 * loadAsciiFont('path/to/font.ttf');
 *
 * @example
 * Loading a font from an object
 * const fontObject = ...; // Assume this is a valid font object
 * loadAsciiFont(fontObject);
 */
p5.prototype.loadAsciiFont = function (font) {
    const setFont = (loadedFont) => {
        p5asciify.font = loadedFont;
        p5asciify.p5Instance._decrementPreload();
        if (p5asciify.p5Instance.frameCount > 0) {
            p5asciify.asciiFontTextureAtlas.setFontObject(loadedFont);
            p5asciify.grid.resizeCellPixelDimensions(
                p5asciify.asciiFontTextureAtlas.maxGlyphDimensions.width,
                p5asciify.asciiFontTextureAtlas.maxGlyphDimensions.height
            );
        }
    };

    if (typeof font === 'string') {
        p5asciify.p5Instance.loadFont(
            font,
            (loadedFont) => { setFont(loadedFont); },
            () => { throw new P5AsciifyError(`loadAsciiFont() | Failed to load font from path: '${font}'`); }
        );
    } else if (typeof font === 'object') {
        setFont(font);
    } else {
        throw new P5AsciifyError(`loadAsciiFont() | Invalid font parameter. Expected a string or an object.`);
    }
};
p5.prototype.registerPreloadMethod('loadAsciiFont', p5.prototype);



/**
 * Sets up the P5Asciify library for use with p5.js.
 * This method ensures that the WebGL renderer is being used and that the p5.js version is compatible.
 * If the requirements are met, it initializes the P5Asciify setup.
 * Not intended to be called directly by the user, as it is performed automatically after setup.
 *
 * @function setupAsciifier
 * @memberof p5
 * @throws {P5AsciifyError} Throws an error if the WebGL renderer is not used or if the p5.js version is below 1.8.0.
 * 
 * @example
 * Setting up the asciifier
 * p5.prototype.setupAsciifier();
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

p5.prototype.resetAsciiGrid = function () {
    p5asciify.grid.reset();
    p5asciify.sampleFramebuffer.resize(p5asciify.grid.cols, p5asciify.grid.rows);
};

p5.prototype.setAsciifyPostSetupFunction = function (postSetupFunction) {
    p5asciify.postSetupFunction = postSetupFunction;
};

/**
 * Sets the default options for the P5Asciify library.
 *
 * @function setAsciiOptions
 * @memberof p5
 * @param {Object} options - An object containing the options to set for ASCII rendering.
 * 
 * @example
 * TODO: Add example
 */
p5.prototype.setAsciiOptions = function (options) {
    const validOptions = ["common", "brightness", "edge", "ascii", "gradient"];
    const unknownOptions = Object.keys(options).filter(option => !validOptions.includes(option));

    if (unknownOptions.length) {
        console.warn(`P5Asciify: Unknown options detected (${unknownOptions.join(', ')}). Refer to the documentation for valid options.`);
        unknownOptions.forEach(option => delete options[option]);
    }

    if (options.brightness) {
        console.warn("P5Asciify: The 'brightness' option is deprecated and will be removed in future releases. Use 'ascii' instead, which works the same way.");
    }

    if (options.brightness && !options.ascii) {
        options.ascii = options.brightness;
    }

    const VALID_RENDER_MODES = ['brightness', 'accurate', 'custom'];
    if (options?.ascii?.renderMode && !VALID_RENDER_MODES.includes(options.ascii.renderMode)) {
        console.warn(`P5Asciify: Invalid render mode '${options.ascii.renderMode}'. Defaulting to 'brightness'.`);
        options.ascii.renderMode = 'brightness';
    }

    const { ascii: asciiOptions, edge: edgeOptions, common: commonOptions, gradient: gradientOptions } = options;

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

    p5asciify.setDefaultOptions(asciiOptions, edgeOptions, commonOptions, gradientOptions);
};


/**
 * Adds an ASCII effect to the P5Asciify library.
 * Depending on the effect type, it adds the effect to either the pre-effect or post-effect manager.
 *
 * @function addAsciiEffect
 * @memberof p5
 * @param {string} effectType - The type of effect to add. Valid types are 'pre' and 'post'.
 * @param {string} effectName - The name of the effect to add.
 * @param {Object} [userParams={}] - Optional parameters to pass to the effect.
 * @returns {Object} The added effect instance.
 * @throws {P5AsciifyError} Throws an error if the effect type is invalid.
 * 
 * @example
 * Adding a pre-effect
 * p5.prototype.addAsciiEffect('pre', 'kaleidoscope', { segments: 6, angle: 30 });
 *
 * @example
 * Adding a post-effect
 * p5.prototype.addAsciiEffect('post', 'invert', { });
 */
p5.prototype.addAsciiEffect = function (effectType, effectName, userParams = {}) {
    const managers = {
        pre: p5asciify.preEffectManager,
        post: p5asciify.afterEffectManager
    };

    const manager = managers[effectType];
    if (!manager) {
        throw new P5AsciifyError(`Invalid effect type '${effectType}'. Valid types are 'pre' and 'post'.`);
    }

    if (!manager.effectConstructors[effectName]) {
        throw new P5AsciifyError(`Effect '${effectName}' does not exist! Available effects: ${Object.keys(manager.effectConstructors).join(", ")}`);
    }

    const validParams = Object.keys(manager.effectParams[effectName]);
    const invalidKeys = Object.keys(userParams).filter(key => !validParams.includes(key));
    if (invalidKeys.length > 0) {
        throw new P5AsciifyError(`Invalid parameter(s) for effect '${effectName}': ${invalidKeys.join(", ")}\nValid parameters are: ${validParams.join(", ")}`);
    }

    return manager.addEffect(effectName, userParams);
}

/**
 * Removes an ASCII effect from the P5Asciify library.
 * This method checks both the pre-effect and post-effect managers and removes the effect if found.
 * If the effect is not found in either manager, it throws an error.
 *
 * @function removeAsciiEffect
 * @memberof p5
 * @param {Object} effectInstance - The instance of the effect to remove.
 * @throws {P5AsciifyError} Throws an error if the effect instance is not found in either pre or post effect managers.
 * 
 * @example
 * Removing an ASCII effect
 * const effectInstance = ...; // Assume this is a valid effect instance
 * removeAsciiEffect(effectInstance);
 */
p5.prototype.removeAsciiEffect = function (effectInstance) {
    let removed = false;

    if (p5asciify.preEffectManager.hasEffect(effectInstance)) {
        p5asciify.preEffectManager.removeEffect(effectInstance);
        removed = true;
    }

    if (p5asciify.afterEffectManager.hasEffect(effectInstance)) {
        p5asciify.afterEffectManager.removeEffect(effectInstance);
        removed = true;
    }

    if (!removed) {
        throw new P5AsciifyError(`Effect instance not found in either pre or post effect managers.`);
    }
};

/**
 * Swaps the positions of two ASCII effects in the P5Asciify library.
 * This method determines the managers and indices of the provided effect instances and swaps their positions.
 * If the effect instances belong to different managers, it removes them from their respective managers and re-adds them at the specified indices.
 * If they belong to the same manager, it simply swaps their positions.
 *
 * @function swapAsciiEffects
 * @memberof p5
 * @param {Object} effectInstance1 - The first effect instance to swap.
 * @param {Object} effectInstance2 - The second effect instance to swap.
 * @throws {P5AsciifyError} Throws an error if either effect instance is not found in the pre or post effect managers.
 * 
 * @example
 * Swapping two ASCII effects
 * const effectInstance1 = ...; // Assume this is a valid effect instance
 * const effectInstance2 = ...; // Assume this is another valid effect instance
 * swapAsciiEffects(effectInstance1, effectInstance2);
 */
p5.prototype.swapAsciiEffects = function (effectInstance1, effectInstance2) {
    let manager1 = null;
    let manager2 = null;
    let index1 = -1;
    let index2 = -1;

    // Determine the manager and index for effectInstance1
    if (p5asciify.preEffectManager.hasEffect(effectInstance1)) {
        manager1 = p5asciify.preEffectManager;
        index1 = manager1.getEffectIndex(effectInstance1);
    } else if (p5asciify.afterEffectManager.hasEffect(effectInstance1)) {
        manager1 = p5asciify.afterEffectManager;
        index1 = manager1.getEffectIndex(effectInstance1);
    } else {
        throw new P5AsciifyError(`Effect instance 1 not found in either pre or post effect managers.`);
    }

    // Determine the manager and index for effectInstance2
    if (p5asciify.preEffectManager.hasEffect(effectInstance2)) {
        manager2 = p5asciify.preEffectManager;
        index2 = manager2.getEffectIndex(effectInstance2);
    } else if (p5asciify.afterEffectManager.hasEffect(effectInstance2)) {
        manager2 = p5asciify.afterEffectManager;
        index2 = manager2.getEffectIndex(effectInstance2);
    } else {
        throw new P5AsciifyError(`Effect instance 2 not found in either pre or post effect managers.`);
    }

    // Swap the effects
    if (manager1 !== manager2) {

        if (manager1.hasEffect(effectInstance2) || manager2.hasEffect(effectInstance1)) {
            throw new P5AsciifyError(`Effects cannot be swapped because one effect instance is already present in the other's manager.`);
        }

        manager1.removeEffect(effectInstance1);
        manager2.removeEffect(effectInstance2);

        manager1.addExistingEffectAtIndex(effectInstance2, index1);
        manager2.addExistingEffectAtIndex(effectInstance1, index2);
    } else {
        manager1.swapEffects(effectInstance1, effectInstance2);
    }
};

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

p5.prototype.removeAsciiGradient = function (gradientInstance) {
    p5asciify.gradientManager.removeGradient(gradientInstance);
}

/**
 * Adds a push() call before the user's draw() function in p5.js.
 * This method ensures that the drawing state is saved before any drawing operations.
 * Not intended to be called directly by the user, as it is performed automatically before draw.
 *
 * @function preDrawAddPush
 * @memberof p5
 * 
 * @example
 * Adding a push before draw
 * p5.prototype.preDrawAddPush();
 */
p5.prototype.preDrawAddPush = function () {
    p5asciify.sketchFramebuffer.begin();
    p5asciify.p5Instance.push();
};
p5.prototype.registerMethod("pre", p5.prototype.preDrawAddPush);

/**
 * Adds a pop() call after the user's draw() function in p5.js.
 * This method ensures that the drawing state is restored after all drawing operations.
 * Not intended to be called directly by the user, as it is performed automatically after draw.
 *
 * @function postDrawAddPop
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
 * @function asciify
 * @memberof p5
 */
p5.prototype.asciify = function () { p5asciify.asciify(); };
p5.prototype.registerMethod("post", p5.prototype.asciify);