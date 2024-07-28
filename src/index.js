import P5AsciifyConstants from './constants.js';
import P5Asciify from './asciify.js';
import P5AsciifyError from './errors.js';
import P5AsciifyUtils from './utils.js';

window.P5Asciify = P5Asciify;

window.preload = function () { }; // In case the user doesn't define a preload function, we need to define it here to avoid errors

/**
 * Preloads the default ASCII font for P5Asciify.
 * This function is registered as a method to be called before the preload phase of p5.js.
 */
p5.prototype.preloadAsciiFont = function () {
    this._incrementPreload();
    this.loadFont(
        P5AsciifyConstants.URSAFONT_BASE64,
        (loadedFont) => {
            P5Asciify.font = loadedFont;
        },
        () => { throw new P5AsciifyError(`loadAsciiFont() | Failed to load font from path: '${font}'`); }
    );
}
p5.prototype.registerMethod("beforePreload", p5.prototype.preloadAsciiFont);

/**
 * Loads an ASCII font and sets it as the current font for P5Asciify.
 * @param {string|object} font - The path to the ASCII font file or a font object.
 */
p5.prototype.loadAsciiFont = function (font) {
    const setFont = (loadedFont) => {
        P5Asciify.font = loadedFont;
        this._decrementPreload();
        if (this.frameCount > 0) {
            P5Asciify.brightnessCharacterSet.setFontObject(loadedFont);
            P5Asciify.edgeCharacterSet.setFontObject(loadedFont);
            P5Asciify.grid.resizeCellDimensions(
                P5Asciify.brightnessCharacterSet.maxGlyphDimensions.width,
                P5Asciify.brightnessCharacterSet.maxGlyphDimensions.height
            );
        }
    };

    if (typeof font === 'string') {
        this.loadFont(
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
 * Sets up the P5Asciify renderer and checks for compatibility.
 * This function is registered as a method to be called after the setup phase of p5.js.
 */
p5.prototype.setupAsciifier = function () {
    if (this._renderer.drawingContext instanceof CanvasRenderingContext2D) {
        throw new P5AsciifyError("WebGL renderer is required for p5.asciify to work.");
    }

    if (P5AsciifyUtils.compareVersions(this.VERSION, "1.8.0") < 0) {
        throw new P5AsciifyError("p5.asciify requires p5.js v1.8.0 or higher to work.");
    }

    P5Asciify.setup();
}
p5.prototype.registerMethod("afterSetup", p5.prototype.setupAsciifier);

/**
 * Updates the current ASCII font used by P5Asciify.
 * @param {string|object} font - The path to the new ASCII font file or a font object.
 */
p5.prototype.updateAsciiFont = function (font) {
    console.warn(`updateAsciiFont() is deprecated. Use loadAsciiFont() instead. updateAsciiFont() will be removed in v0.1.0.`);
    this.loadAsciiFont(font);
};

p5.prototype.setAsciiOptions = function (options) {
    P5Asciify.setDefaultOptions(options, false);
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
    if (effectType === 'pre') {
        return P5Asciify.preEffectManager.addEffect(effectName, userParams);
    } else if (effectType === 'post') {
        return P5Asciify.afterEffectManager.addEffect(effectName, userParams);
    } else {
        throw new P5AsciifyError(`Invalid effect type '${effectType}'. Valid types are 'pre' and 'after'.`);
    }
}

p5.prototype.removeAsciiEffect = function (effectInstance) {
    let removed = false;

    // Check preEffectManager
    if (P5Asciify.preEffectManager.hasEffect(effectInstance)) {
        P5Asciify.preEffectManager.removeEffect(effectInstance);
        removed = true;
    }

    // Check afterEffectManager
    if (P5Asciify.afterEffectManager.hasEffect(effectInstance)) {
        P5Asciify.afterEffectManager.removeEffect(effectInstance);
        removed = true;
    }

    if (!removed) {
        throw new P5AsciifyError(`Effect instance not found in either pre or post effect managers.`);
    }
};

p5.prototype.swapAsciiEffects = function (effectInstance1, effectInstance2) {
    let manager1 = null;
    let manager2 = null;
    let index1 = -1;
    let index2 = -1;

    // Determine the manager and index for effectInstance1
    if (P5Asciify.preEffectManager.hasEffect(effectInstance1)) {
        manager1 = P5Asciify.preEffectManager;
        index1 = manager1.getEffectIndex(effectInstance1);
    } else if (P5Asciify.afterEffectManager.hasEffect(effectInstance1)) {
        manager1 = P5Asciify.afterEffectManager;
        index1 = manager1.getEffectIndex(effectInstance1);
    } else {
        throw new P5AsciifyError(`Effect instance 1 not found in either pre or post effect managers.`);
    }

    // Determine the manager and index for effectInstance2
    if (P5Asciify.preEffectManager.hasEffect(effectInstance2)) {
        manager2 = P5Asciify.preEffectManager;
        index2 = manager2.getEffectIndex(effectInstance2);
    } else if (P5Asciify.afterEffectManager.hasEffect(effectInstance2)) {
        manager2 = P5Asciify.afterEffectManager;
        index2 = manager2.getEffectIndex(effectInstance2);
    } else {
        throw new P5AsciifyError(`Effect instance 2 not found in either pre or post effect managers.`);
    }

    // Swap the effects
    if (manager1 !== manager2) {
        manager1.removeEffect(effectInstance1);
        manager2.removeEffect(effectInstance2);

        manager1.addExistingEffectAtIndex(effectInstance2, index1);
        manager2.addExistingEffectAtIndex(effectInstance1, index2);
    } else {
        manager1.swapEffects(effectInstance1, effectInstance2);
    }
};


p5.prototype.preDrawAddPush = function () { this.push(); };
p5.prototype.registerMethod("pre", p5.prototype.preDrawAddPush);

p5.prototype.postDrawAddPop = function () { this.pop(); };
p5.prototype.registerMethod("post", p5.prototype.postDrawAddPop);

/**
 * Renders the ASCII representation of the current sketch.
 * This function is registered as a method to be called after the draw phase of p5.js.
 */
p5.prototype.asciify = function () { P5Asciify.asciify(); };
p5.prototype.registerMethod("post", p5.prototype.asciify);

