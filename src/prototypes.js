window.preload = function () { }; // In case the user doesn't define a preload function, we need to define it here to avoid errors

/**
 * Preloads the default ASCII font for P5Asciify.
 * This function is registered as a method to be called before the preload phase of p5.js.
 */
p5.prototype.preloadAsciiFont = function () {
    this._incrementPreload();
    this.loadAsciiFont(P5AsciifyConstants.URSAFONT_BASE64);
}
p5.prototype.registerMethod("beforePreload", p5.prototype.preloadAsciiFont);

/**
 * Loads an ASCII font and sets it as the current font for P5Asciify.
 * @param {string|object} font - The path to the ASCII font file or a font object.
 */
p5.prototype.loadAsciiFont = function (font) {
    if (typeof font === 'string') {
        P5Asciify.font = this.loadFont(font,
            () => { this._decrementPreload(); },
            () => { throw new P5AsciifyError(`loadAsciiFont() | Failed to load font from path: '${font}'`); }
        );
    } else if (typeof font === 'object') {
        P5Asciify.font = font;
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
    if (typeof font === 'string') {
        P5Asciify.font = this.loadFont(
            font,
            () => {
                P5Asciify.characterset.setFontObject(P5Asciify.font);
                P5Asciify.grid.resizeCellDimensions(P5Asciify.characterset.maxGlyphDimensions.width, P5Asciify.characterset.maxGlyphDimensions.height);
            },
            () => {
                throw new P5AsciifyError(`updateAsciiFont() | Failed to load font from path: '${font}'`);
            }
        );
    } else if (typeof font === 'object') {
        P5Asciify.font = font;
        P5Asciify.characterset.setFontObject(P5Asciify.font);
        P5Asciify.grid.resizeCellDimensions(P5Asciify.characterset.maxGlyphDimensions.width, P5Asciify.characterset.maxGlyphDimensions.height);
    } else {
        throw new P5AsciifyError(`updateAsciiFont() | Invalid font parameter. Expected a string or an object.`);
    }
};

p5.prototype.addAsciiEffect = function (effectType, effectName, userParams = {}) {
    if (effectType === 'pre') {
        return P5Asciify.preEffectManager.addEffect(effectName, userParams);
    } else if (effectType === 'post') {
        return P5Asciify.afterEffectManager.addEffect(effectName, userParams);
    } else {
        throw new P5AsciifyError(`Invalid effect type '${effectType}'. Valid types are 'pre' and 'after'.`);
    }

    ;
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

p5.prototype.swapAsciiEffects = function (effectType, effectInstance1, effectInstance2) {
    if (effectType === 'pre') {
        P5Asciify.preEffectManager.swapEffects(effectInstance1, effectInstance2);
    } else if (effectType === 'post') {
        P5Asciify.afterEffectManager.swapEffects(effectInstance1, effectInstance2);
    } else {
        throw new P5AsciifyError(`Invalid effect type '${effectType}'. Valid types are 'pre' and 'after'.`);
    }
}

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

