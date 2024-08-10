/**
 * @class P5AsciifyEffect
 * @description
 * The base class for all effects in the P5Asciify library.
 * Manages common properties and methods for effects such as shaders and enabling/disabling effects.
 */
class P5AsciifyEffect {
    /**
     * Creates an instance of P5AsciifyEffect.
     * @param {string} name - The name of the effect.
     * @param {Object} shader - The shader to use for the effect.
     */
    constructor(name, shader) {
        this._name = name;
        this._shader = shader;
        this._enabled = true;
    }

    setup() {
        // Override this method in subclasses to set up the effect.
    }

    /**
     * Sets the shader uniforms for the effect.
     * @param {Object} framebuffer - The framebuffer to apply the effect to.
     */
    setUniforms(framebuffer) {
        this._shader.setUniform('u_image', framebuffer);
    }

    /**
     * Gets the shader used by the effect.
     * @returns {Object} The shader object.
     */
    get shader() {
        return this._shader;
    }

    /**
     * Sets the shader for the effect.
     * @param {Object} shader - The new shader object.
     */
    set shader(shader) {
        this._shader = shader;
    }

    /**
     * Gets the name of the effect.
     * @returns {string} The name of the effect.
     */
    get name() {
        return this._name;
    }

    /**
     * Gets whether the effect is enabled.
     * @returns {boolean} True if the effect is enabled, false otherwise.
     */
    get enabled() {
        return this._enabled;
    }

    /**
     * Sets whether the effect is enabled.
     * @param {boolean} enabled - True to enable the effect, false to disable it.
     */
    set enabled(enabled) {
        this._enabled = enabled;
    }
}

/**
 * @class P5AsciifyBrightnessEffect
 * @extends {P5AsciifyEffect}
 * @description
 * Represents a brightness effect for the P5Asciify library.
 * Adjusts the brightness of the given framebuffer.
 */
class P5AsciifyBrightnessEffect extends P5AsciifyEffect {
    /**
     * Creates an instance of P5AsciifyBrightnessEffect.
     * @param {Object} options - The options for the brightness effect.
     * @param {Object} options.shader - The shader to use for the effect.
     * @param {number} options.brightness - The brightness level to apply.
     */
    constructor({ shader, brightness }) {
        super("brightness", shader);
        this._brightness = brightness;
    }

    /**
     * Sets the shader uniforms for the brightness effect.
     * @param {Object} framebuffer - The framebuffer to apply the effect to.
     */
    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);
        this._shader.setUniform('u_brightness', this._brightness);
    }

    /**
     * Sets the brightness level.
     * @param {number} brightness - The new brightness level.
     */
    set brightness(brightness) {
        this._brightness = brightness;
    }

    /**
     * Gets the current brightness level.
     * @returns {number} The current brightness level.
     */
    get brightness() {
        return this._brightness;
    }
}

/**
 * @class P5AsciifyChromaticAberrationEffect
 * @extends {P5AsciifyEffect}
 * @description
 * Represents a chromatic aberration effect for the P5Asciify library.
 * Applies a chromatic aberration effect to the given framebuffer, simulating color separation.
 */
class P5AsciifyChromaticAberrationEffect extends P5AsciifyEffect {
    /**
     * Creates an instance of P5AsciifyChromaticAberrationEffect.
     * @param {Object} options - The options for the chromatic aberration effect.
     * @param {Object} options.shader - The shader to use for the effect.
     * @param {number} options.amount - The amount of chromatic aberration.
     * @param {number} options.angle - The angle of the chromatic aberration in degrees.
     */
    constructor({ shader, amount, angle }) {
        super("chromaticaberration", shader);
        this._amount = amount;
        this._angle = angle;
    }

    /**
     * Sets the shader uniforms for the chromatic aberration effect.
     * @param {Object} framebuffer - The framebuffer to apply the effect to.
     */
    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);
        this._shader.setUniform('u_aberrationAmount', this._amount);
        this._shader.setUniform('u_aberrationAngle', this._angle * Math.PI / 180);
    }

    /**
     * Sets the amount of chromatic aberration.
     * @param {number} amount - The new amount of chromatic aberration.
     */
    set amount(amount) {
        this._amount = amount;
    }

    /**
     * Sets the angle of chromatic aberration.
     * @param {number} angle - The new angle of chromatic aberration in degrees.
     */
    set angle(angle) {
        this._angle = angle;
    }

    /**
     * Gets the current amount of chromatic aberration.
     * @returns {number} The current amount of chromatic aberration.
     */
    get amount() {
        return this._amount;
    }

    /**
     * Gets the current angle of chromatic aberration.
     * @returns {number} The current angle of chromatic aberration in degrees.
     */
    get angle() {
        return this._angle;
    }
}

/**
 * @class P5AsciifyColorPalette
 * @description
 * A class that represents a color palette for the P5Asciify library.
 * It is responsible for maintaining a texture that contains all color palettes.
 */
class P5AsciifyColorPalette {
    /**
     * Creates a new instance of the ColorPaletteTexture class.
     */
    constructor() {
        this.palettes = {};
        this.paletteRows = {};
        this.nextId = 0;
    }

    /**
     * Sets up the color palette with an initial texture.
     * This method should be called after the p5.js setup() function
     */
    setup() {
        this.texture = createFramebuffer({ width: 1, height: 1 });

        if (Object.keys(this.palettes).length > 0) {
            this.updateTexture();
        }
    }

    /**
     * Updates the texture with the current palettes.
     */
    updateTexture() {
        let palettesArray = Object.values(this.palettes);
        let maxColors = palettesArray.reduce((max, colors) => Math.max(max, colors.length), 1);
        this.texture.resize(maxColors, palettesArray.length);

        this.texture.loadPixels();

        let rowIndex = 0;
        for (let id in this.palettes) {
            let colors = this.palettes[id].map(c => color(c)); // Convert to p5.Color objects
            this.paletteRows[id] = rowIndex; // Update the row index for the current palette
            for (let x = 0; x < colors.length; x++) {
                let index = (rowIndex * maxColors + x) * 4;
                let col = colors[x];
                this.texture.pixels[index] = red(col);
                this.texture.pixels[index + 1] = green(col);
                this.texture.pixels[index + 2] = blue(col);
                this.texture.pixels[index + 3] = alpha(col);
            }
            // Fill the rest of the row with transparent pixels if the palette is shorter
            for (let x = colors.length; x < maxColors; x++) {
                let index = (rowIndex * maxColors + x) * 4;
                this.texture.pixels[index] = 0;
                this.texture.pixels[index + 1] = 0;
                this.texture.pixels[index + 2] = 0;
                this.texture.pixels[index + 3] = 0;
            }
            rowIndex++;
        }
        this.texture.updatePixels();
    }

    /**
     * Adds a new color palette to the texture
     * @param {Array} colors - The array of colors to add
     * @returns The ID of the new palette
     */
    addPalette(colors) {
        const id = `palette-${this.nextId++}`;
        this.palettes[id] = colors;

        this.updateTexture();

        return id;
    }

    /**
     * Removes a color palette from the texture
     * @param {string} id - The ID of the palette to remove
     */
    removePalette(id) {
        if (this.palettes[id]) {
            delete this.palettes[id];
            delete this.paletteRows[id];
            if (frameCount > 0) {
                this.updateTexture();
            }
        } else {
            console.warn(`Palette with ID ${id} does not exist`);
        }
    }

    /**
     * Sets the colors for a specific color palette
     * @param {string} id - The ID of the palette to update
     * @param {Array} colors - The new array of colors for the palette
     */
    setPaletteColors(id, colors) {
        if (this.palettes[id]) {
            this.palettes[id] = colors;
            if (frameCount > 0) {
                this.updateTexture();
            }
        } else {
            console.warn(`Palette with ID ${id} does not exist`);
        }
    }

    /**
     * Gets the row index of a specific color palette
     * @param {string} id - The ID of the palette
     * @returns The row index of the palette, or -1 if the palette does not exist
     */
    getPaletteRow(id) {
        return this.paletteRows[id] !== undefined ? this.paletteRows[id] : -1;
    }
}

/**
 * @class P5AsciifyColorPaletteEffect
 * @extends {P5AsciifyEffect}
 * @description
 * Represents a color palette effect for the P5Asciify library.
 * Applies a color palette to the given framebuffer.
 */
class P5AsciifyColorPaletteEffect extends P5AsciifyEffect {
    /**
     * Creates an instance of P5AsciifyColorPaletteEffect.
     * @param {Object} options - The options for the color palette effect.
     * @param {Object} options.shader - The shader to use for the effect.
     * @param {Array} options.palette - The array of colors for the palette.
     * @param {P5AsciifyColorPalette} options.paletteBuffer - The buffer to store the color palette.
     */
    constructor({ shader, palette, colorPalette }) {
        super("colorpalette", shader);
        this._palette = palette;
        this.colorPalette = colorPalette;
    }

    setup() {
        this._paletteId = this.colorPalette.addPalette(this._palette);
    }

    /**
     * Sets the shader uniforms for the color palette effect.
     * @param {Object} framebuffer - The framebuffer to apply the effect to.
     */
    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);
        this._shader.setUniform('u_colorPalette', this.colorPalette.texture);
        this._shader.setUniform('u_colorPaletteRow', this.colorPalette.getPaletteRow(this._paletteId));
        this._shader.setUniform('u_colorPaletteDimensions', [this.colorPalette.texture.width, this.colorPalette.texture.height]);
        this._shader.setUniform('u_colorPaletteLength', this._palette.length);
    }

    /**
     * Sets the color palette.
     * @param {Array} palette - The new array of colors for the palette.
     */
    set palette(palette) {
        this._palette = palette;
        this.colorPalette.setPaletteColors(this._paletteId, this._palette);
    }

    /**
     * Gets the current color palette.
     * @returns {Array} The current array of colors for the palette.
     */
    get palette() {
        return this._palette;
    }
}

/**
 * @class P5AsciifyDistortionEffect
 * @extends {P5AsciifyEffect}
 * @description
 * Represents a distortion effect for the P5Asciify library.
 * Applies a distortion effect to the given framebuffer.
 */
class P5AsciifyDistortionEffect extends P5AsciifyEffect {
    /**
     * Creates an instance of P5AsciifyDistortionEffect.
     * @param {Object} options - The options for the distortion effect.
     * @param {Object} options.shader - The shader to use for the effect.
     * @param {number} options.frequency - The frequency of the distortion effect.
     * @param {number} options.amplitude - The amplitude of the distortion effect.
     */
    constructor({ shader, frequency, amplitude }) {
        super("distortion", shader);
        this._frequency = frequency;
        this._amplitude = amplitude;
    }

    /**
     * Sets the shader uniforms for the distortion effect.
     * @param {Object} framebuffer - The framebuffer to apply the effect to.
     */
    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);
        this._shader.setUniform('u_frequency', this._frequency);
        this._shader.setUniform('u_amplitude', this._amplitude);
        this._shader.setUniform('u_time', frameCount * 0.01);
    }

    /**
     * Sets the frequency of the distortion effect.
     * @param {number} frequency - The new frequency of the distortion effect.
     */
    set frequency(frequency) {
        this._frequency = frequency;
    }

    /**
     * Sets the amplitude of the distortion effect.
     * @param {number} amplitude - The new amplitude of the distortion effect.
     */
    set amplitude(amplitude) {
        this._amplitude = amplitude;
    }

    /**
     * Gets the current frequency of the distortion effect.
     * @returns {number} The current frequency of the distortion effect.
     */
    get frequency() {
        return this._frequency;
    }

    /**
     * Gets the current amplitude of the distortion effect.
     * @returns {number} The current amplitude of the distortion effect.
     */
    get amplitude() {
        return this._amplitude;
    }
}

/**
 * @class P5AsciifyGrayscaleEffect
 * @extends {P5AsciifyEffect}
 * @description
 * Represents a grayscale effect for the P5Asciify library.
 * Applies a grayscale transformation to the given framebuffer.
 */
class P5AsciifyGrayscaleEffect extends P5AsciifyEffect {
    /**
     * Creates an instance of P5AsciifyGrayscaleEffect.
     * @param {Object} options - The options for the grayscale effect.
     * @param {Object} options.shader - The shader to use for the effect.
     */
    constructor({ shader }) {
        super("grayscale", shader);
    }
}

/**
 * @class P5AsciifyInvertEffect
 * @extends {P5AsciifyEffect}
 * @description
 * Represents an invert color effect for the P5Asciify library.
 * Applies a color inversion to the given framebuffer.
 */
class P5AsciifyInvertEffect extends P5AsciifyEffect {
    /**
     * Creates an instance of P5AsciifyInvertEffect.
     * @param {Object} options - The options for the invert effect.
     * @param {Object} options.shader - The shader to use for the effect.
     */
    constructor({ shader }) {
        super("invert", shader);
    }
}

/**
 * @class P5AsciifyKaleidoscopeEffect
 * @extends {P5AsciifyEffect}
 * @description
 * Represents a kaleidoscope effect for the P5Asciify library.
 * Applies a kaleidoscope transformation to the given framebuffer.
 */
class P5AsciifyKaleidoscopeEffect extends P5AsciifyEffect {
    /**
     * Creates an instance of P5AsciifyKaleidoscopeEffect.
     * @param {Object} options - The options for the kaleidoscope effect.
     * @param {Object} options.shader - The shader to use for the effect.
     * @param {number} options.segments - The number of segments for the kaleidoscope effect.
     * @param {number} options.angle - The angle of rotation for the kaleidoscope effect in degrees.
     */
    constructor({ shader, segments, angle }) {
        super("kaleidoscope", shader);
        this._segments = segments;
        this._angle = angle;
    }

    /**
     * Sets the shader uniforms for the kaleidoscope effect.
     * @param {Object} framebuffer - The framebuffer to apply the effect to.
     */
    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);
        this._shader.setUniform('u_segments', this._segments);
        this._shader.setUniform('u_angle', this._angle * Math.PI / 180);
    }

    /**
     * Sets the number of segments for the kaleidoscope effect.
     * @param {number} segments - The new number of segments.
     */
    set segments(segments) {
        this._segments = segments;
    }

    /**
     * Sets the angle of rotation for the kaleidoscope effect.
     * @param {number} angle - The new angle of rotation in degrees.
     */
    set angle(angle) {
        this._angle = angle;
    }

    /**
     * Gets the current number of segments for the kaleidoscope effect.
     * @returns {number} The current number of segments.
     */
    get segments() {
        return this._segments;
    }

    /**
     * Gets the current angle of rotation for the kaleidoscope effect.
     * @returns {number} The current angle of rotation in degrees.
     */
    get angle() {
        return this._angle;
    }
}

/**
 * @class P5AsciifyRotateEffect
 * @extends {P5AsciifyEffect}
 * @description
 * Represents a rotation effect for the P5Asciify library.
 * Applies a rotation transformation to the given framebuffer.
 */
class P5AsciifyRotateEffect extends P5AsciifyEffect {
    /**
     * Creates an instance of P5AsciifyRotateEffect.
     * @param {Object} options - The options for the rotation effect.
     * @param {Object} options.shader - The shader to use for the effect.
     * @param {number} options.angle - The angle of rotation in degrees.
     */
    constructor({ shader, angle }) {
        super("rotate", shader);
        this._angle = angle;
    }

    /**
     * Sets the shader uniforms for the rotation effect.
     * @param {Object} framebuffer - The framebuffer to apply the effect to.
     */
    setUniforms(framebuffer) {
        super.setUniforms(framebuffer);
        this._shader.setUniform('u_angle', this._angle * Math.PI / 180);
    }

    /**
     * Sets the angle of rotation.
     * @param {number} angle - The new angle of rotation in degrees.
     */
    set angle(angle) {
        this._angle = angle;
    }

    /**
     * Gets the current angle of rotation.
     * @returns {number} The current angle of rotation in degrees.
     */
    get angle() {
        return this._angle;
    }
}

var kaleidoscopeShader = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\nuniform sampler2D u_image;uniform int u_segments;uniform float u_angle;in vec2 v_texCoord;out vec4 fragColor;\n#define PI 3.1415926535897932384626433832795\nvoid main(){float angle=2.0f*PI/float(u_segments);vec2 centeredCoord=v_texCoord-0.5f;float currentAngle;float radius;currentAngle=atan(centeredCoord.x,-centeredCoord.y);radius=length(centeredCoord);currentAngle=mod(currentAngle,angle);currentAngle=angle/2.0f-abs(currentAngle-angle/2.0f);currentAngle+=u_angle;vec2 rotatedCoord=vec2(cos(currentAngle),sin(currentAngle))*radius;vec2 finalCoord=rotatedCoord+0.5f;vec4 color=texture(u_image,finalCoord);fragColor=color;}"; // eslint-disable-line

var distortionShader = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\nin vec2 v_texCoord;uniform sampler2D u_image;uniform float u_time;uniform float u_frequency;uniform float u_amplitude;out vec4 fragColor;void main(){vec2 uv=v_texCoord;float sineWave=sin(uv.y*u_frequency+u_time)*u_amplitude;vec2 distort=vec2(sineWave,sineWave);vec4 texColor=texture(u_image,mod(uv+distort,1.0f));fragColor=texColor;}"; // eslint-disable-line

var grayscaleShader = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\nuniform sampler2D u_image;in vec2 v_texCoord;out vec4 fragColor;void main(){vec4 color=texture(u_image,v_texCoord);float luminance=0.299f*color.r+0.587f*color.g+0.114f*color.b;color.rgb=vec3(luminance);fragColor=color;}"; // eslint-disable-line

var invertShader = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\nuniform sampler2D u_image;in vec2 v_texCoord;out vec4 fragColor;void main(){vec4 color=texture(u_image,v_texCoord);color.rgb=1.0f-color.rgb;fragColor=color;}"; // eslint-disable-line

var chromaticAberrationShader = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\nuniform sampler2D u_image;in vec2 v_texCoord;uniform float u_aberrationAmount;uniform float u_aberrationAngle;out vec4 fragColor;void main(){vec2 redOffset=vec2(u_aberrationAmount*cos(u_aberrationAngle),u_aberrationAmount*sin(u_aberrationAngle));vec2 greenOffset=vec2(0.0f,0.0f);vec2 blueOffset=vec2(-u_aberrationAmount*cos(u_aberrationAngle),-u_aberrationAmount*sin(u_aberrationAngle));float red=texture(u_image,v_texCoord+redOffset).r;float green=texture(u_image,v_texCoord+greenOffset).g;float blue=texture(u_image,v_texCoord+blueOffset).b;vec4 color=vec4(red,green,blue,1.0f);fragColor=color;}"; // eslint-disable-line

var rotateShader = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\nuniform sampler2D u_image;uniform float u_angle;in vec2 v_texCoord;out vec4 fragColor;void main(){vec2 centeredCoord=v_texCoord-0.5f;vec2 rotatedCoord;rotatedCoord.x=centeredCoord.x*cos(u_angle)-centeredCoord.y*sin(u_angle);rotatedCoord.y=centeredCoord.x*sin(u_angle)+centeredCoord.y*cos(u_angle);vec2 finalCoord=rotatedCoord+0.5f;finalCoord.y=1.0f-finalCoord.y;vec4 color=texture(u_image,finalCoord);fragColor=color;}"; // eslint-disable-line

var brightnessShader = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\nuniform sampler2D u_image;uniform float u_brightness;in vec2 v_texCoord;out vec4 fragColor;void main(){vec4 color=texture(u_image,v_texCoord);color.rgb+=u_brightness;color.rgb=clamp(color.rgb,0.0f,1.0f);fragColor=color;}"; // eslint-disable-line

var colorPaletteShader = "#version 300 es\nprecision mediump float;\n#define GLSLIFY 1\nuniform sampler2D u_image;uniform sampler2D u_colorPalette;uniform vec2 u_colorPaletteDimensions;uniform int u_colorPaletteRow;uniform float u_colorPaletteLength;out vec4 fragColor;void main(){vec2 uv=gl_FragCoord.xy/vec2(textureSize(u_image,0));vec4 texColor=texture(u_image,uv);float gray=(texColor.r+texColor.g+texColor.b)/3.0f;float paletteX=gray*(u_colorPaletteLength-1.0f);float paletteTexelPosition=(floor(paletteX)+0.5f)/u_colorPaletteDimensions.x;float rowPosition=float(u_colorPaletteRow)+0.5f;float rowTexCoord=rowPosition/u_colorPaletteDimensions.y;vec4 paletteColor=texture(u_colorPalette,vec2(paletteTexelPosition,rowTexCoord));fragColor=paletteColor;}"; // eslint-disable-line

var vertexShader = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\nlayout(location=0)in vec3 aPosition;layout(location=1)in vec2 aTexCoord;out vec2 v_texCoord;void main(){vec4 positionVec4=vec4(aPosition,1.0f);positionVec4.xy=positionVec4.xy*2.0f-1.0f;gl_Position=positionVec4;v_texCoord=aTexCoord;}"; // eslint-disable-line

class P5AsciifyEffectManager {

    effectParams = {
        "kaleidoscope": { "segments": 2, "angle": 0.0 },
        "distortion": { "frequency": 0.1, "amplitude": 0.1 },
        "grayscale": {},
        "invert": {},
        "chromaticaberration": { "amount": 0.1, "angle": 0.0 },
        "rotate": { "angle": 0.0 },
        "brightness": { "brightness": 0.0 },
        "colorpalette": { "palette": ["#0f380f", "#306230", "#8bac0f", "#9bbc0f"] },
    }

    effectShaders = {
        "kaleidoscope": kaleidoscopeShader,
        "distortion": distortionShader,
        "grayscale": grayscaleShader,
        "invert": invertShader,
        "chromaticaberration": chromaticAberrationShader,
        "rotate": rotateShader,
        "brightness": brightnessShader,
        "colorpalette": colorPaletteShader,
    }

    effectConstructors = {
        "kaleidoscope": ({ shader, params }) => new P5AsciifyKaleidoscopeEffect({ shader, ...params }),
        "distortion": ({ shader, params }) => new P5AsciifyDistortionEffect({ shader, ...params }),
        "grayscale": ({ shader, params }) => new P5AsciifyGrayscaleEffect({ shader, ...params }),
        "invert": ({ shader, params }) => new P5AsciifyInvertEffect({ shader, ...params }),
        "chromaticaberration": ({ shader, params }) => new P5AsciifyChromaticAberrationEffect({ shader, ...params }),
        "rotate": ({ shader, params }) => new P5AsciifyRotateEffect({ shader, ...params }),
        "brightness": ({ shader, params }) => new P5AsciifyBrightnessEffect({ shader, ...params }),
        "colorpalette": ({ shader, params }) => new P5AsciifyColorPaletteEffect({ shader, ...params, colorPalette: this.colorPalette }),
    }

    _setupQueue = [];

    constructor(colorPalette) {
        this.colorPalette = colorPalette;
        this._effects = [];
    }

    setup() {
        this.setupShaders();
        this.setupEffectQueue();
    }

    setupShaders() {
        for (let effectName in this.effectShaders) {
            this.effectShaders[effectName] = createShader(vertexShader, this.effectShaders[effectName]);
        }
    }

    setupEffectQueue() {
        for (let effectInstance of this._setupQueue) {
            effectInstance.setup();
            effectInstance.shader = this.effectShaders[effectInstance.name];
        }
    }

    addExistingEffectAtIndex(effectInstance, index) {
        effectInstance.shader = this.effectShaders[effectInstance.name];
        this._effects.splice(index, 0, effectInstance);

        if (frameCount === 0) {
            this._setupQueue.push(effectInstance);
        }
    }

    getEffectIndex(effectInstance) {
        return this._effects.indexOf(effectInstance);
    }

    addEffect(effectName, userParams = {}) {

        const shader = frameCount === 0 ? null : this.effectShaders[effectName];
        const params = { ...this.effectParams[effectName], ...userParams };
        const effectInstance = this.effectConstructors[effectName]({ shader, params });
        this._effects.push(effectInstance);

        if (frameCount === 0) {
            this._setupQueue.push(effectInstance);
        } else {
            effectInstance.setup();
        }

        return effectInstance;
    }

    removeEffect(effectInstance) {
        this._effects.splice(this._effects.indexOf(effectInstance), 1);
    }

    hasEffect(effectInstance) {
        return this._effects.includes(effectInstance);
    }

    swapEffects(effectInstance1, effectInstance2) {
        const index1 = this._effects.indexOf(effectInstance1);
        const index2 = this._effects.indexOf(effectInstance2);

        // Swap the effects
        [this._effects[index1], this._effects[index2]] = [this._effects[index2], this._effects[index1]];
    }

    getEffects() {
        return this._effects;
    }
}

/**
 * @class P5AsciifyError
 * @extends {Error}
 * @description
 * Custom error class for the P5Asciify library.
 * Represents errors specific to the P5Asciify library.
 */
class P5AsciifyError extends Error {
    /**
     * Creates an instance of P5AsciifyError.
     * @param {string} message - The error message.
     */
    constructor(message) {
        super(message);
        this.name = "P5AsciifyError";
    }
}

/**
 * @class P5AsciifyCharacterSet
 * @description
 * A class that represents a character set for the P5Asciify library.
 * It is responsible for maintaining a texture that contains all the characters in the character set.
 */
class P5AsciifyCharacterSet {
    /**
     * Sets up the character set with a specified font, characters, and font size.
     * @param {Object} options - The setup options.
     * @param {string} options.type - The type of character set to set up. (e.g. "brightness", "edge")
     * @param {Object} options.font - The font object to use.
     * @param {string} options.characters - The string of characters to include in the character set.
     * @param {number} options.fontSize - The font size to use.
     */
    setup({ type, font, characters, fontSize }) {
        this.type = type;
        this.font = font;
        this.fontSize = fontSize;

        this.fontGlyphs = Object.values(this.font.font.glyphs.glyphs).filter(glyph => glyph.unicode !== undefined);
        this.characters = this.validateCharacters(characters);
        this.characterGlyphs = this.loadCharacterGlyphs();

        this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize);

        this.createTexture(128);
    }

    loadCharacterGlyphs() {
        // Load glyphs with unicode
        let glyphs = Object.values(this.font.font.glyphs.glyphs).filter(glyph => glyph.unicode !== undefined);

        // Create a map for character positions
        let charPositionMap = new Map(this.characters.map((char, index) => [char, index]));

        // Filter and sort glyphs based on character positions
        let filteredGlyphs = glyphs
            .filter(glyph => glyph.unicodes.some(u => this.characters.includes(String.fromCharCode(u))))
            .sort((a, b) => charPositionMap.get(String.fromCharCode(a.unicodes[0])) - charPositionMap.get(String.fromCharCode(b.unicodes[0])));

        // Assign colors to the sorted glyphs
        filteredGlyphs.forEach((glyph, index) => {
            glyph.r = index % 256; 
            glyph.g = Math.floor(index / 256) % 256;
            glyph.b = Math.floor(index / 65536);
        });

        return filteredGlyphs;
    }

    /**
     * Calculates the maximum dimensions of glyphs in the whole font for a given font size.
     * @param {number} fontSize - The font size to use for calculations.
     * @returns {Object} An object containing the maximum width and height of the glyphs.
     */
    getMaxGlyphDimensions(fontSize) {
        return this.fontGlyphs.reduce((maxDims, glyph) => {
            const bounds = glyph.getPath(0, 0, fontSize).getBoundingBox();
            return {
                width: Math.ceil(Math.max(maxDims.width, bounds.x2 - bounds.x1)),
                height: Math.ceil(Math.max(maxDims.height, bounds.y2 - bounds.y1))
            };
        }, { width: 0, height: 0 });
    }

    /**
     * Sets the font object and resets the character set.
     * @param {Object} font - The new font object.
     */
    setFontObject(font) {
        this.font = font;
        this.fontGlyphs = Object.values(this.font.font.glyphs.glyphs).filter(glyph => glyph.unicode !== undefined);
        this.characterGlyphs = this.loadCharacterGlyphs();
        this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize);
        this.createTexture(128);
    }

    /**
     * Sets the characters to be used in the character set and creates a new texture.
     * @param {string} characters - The string of characters to set.
     */
    setCharacterSet(characters) {
        this.characters = this.validateCharacters(characters);
        this.characterGlyphs = this.loadCharacterGlyphs();
        this.createTexture(128);
    }

    /**
     * Sets a specific character at a given index in the character set and updates the texture.
     * @param {Object} options - The character options.
     * @param {string} options.character - The character to set.
     * @param {number} options.index - The index at which to set the character.
     */
    setCharacter({ character, index }) {
        this.characters[index] = character;
        this.characterGlyphs = this.loadCharacterGlyphs();
        this.createTexture(128);
    }

    /**
     * Returns an array of characters that are not supported by the current font.
     * @param {string} characters - The string of characters to check.
     * @returns {string[]} An array of unsupported characters.
     */
    getUnsupportedCharacters(characters) {
        return Array.from(new Set(Array.from(characters).filter(char =>
            !this.fontGlyphs.some(glyph => glyph.unicodes.includes(char.codePointAt(0)))
        )));
    }

    /**
     * Sets the font size and updates the maximum glyph dimensions.
     * @param {number} fontSize - The new font size.
     */
    setFontSize(fontSize) {
        this.fontSize = fontSize;
        this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize);
    }

    /**
     * Creates a texture containing all characters in the character set, arranged in a 2d grid.
     * @param {number} fontSize - The font size to use for rendering the texture.
     */
    createTexture(fontSize) {
        this.charsetCols = Math.ceil(Math.sqrt(this.characters.length));
        this.charsetRows = Math.ceil(this.characters.length / this.charsetCols);
        let dimensions = this.getMaxGlyphDimensions(fontSize);

        if (!this.texture) {
            this.texture = createFramebuffer({ format: FLOAT, width: dimensions.width * this.charsetCols, height: dimensions.height * this.charsetRows });
        } else {
            this.texture.resize(dimensions.width * this.charsetCols, dimensions.height * this.charsetRows);
        }

        this.texture.begin();
        this.drawCharacters(fontSize, dimensions);
        this.texture.end();
    }

    /**
     * Validates a string of characters to ensure they are supported by the current font.
     * @param {string} characters 
     * @param {string} defaultCharacters 
     * @returns {string[]} The validated characters. If any characters are unsupported, the default characters are returned.
     */
    validateCharacters(characters) {
        let unsupportedChars = this.getUnsupportedCharacters(characters);
        if (unsupportedChars.length > 0) {
            throw new P5AsciifyError(`The following ${this.type} characters are not supported by the current font: [${unsupportedChars.join(', ')}].`);
        }
        return Array.from(characters);
    }

    /**
     * 
     * @param {number} fontSize - The font size to use for drawing the characters on the texture.
     * @param {*} dimensions - The maximum dimensions of the glyphs.
     */
    drawCharacters(fontSize, dimensions) {
        clear();
        textFont(this.font);
        fill(255);
        textSize(fontSize);
        textAlign(LEFT, TOP);
        noStroke();

        for (let i = 0; i < this.characters.length; i++) {
            const col = i % this.charsetCols;
            const row = Math.floor(i / this.charsetCols);
            const x = dimensions.width * col - ((dimensions.width * this.charsetCols) / 2);
            const y = dimensions.height * row - ((dimensions.height * this.charsetRows) / 2);
            text(this.characters[i], x, y);
        }
    }

    getCharsetColorArray(string) {
        let colorArray = [];
        for (let i = 0; i < string.length; i++) {
            let char = string.charAt(i);
            let glyph = this.characterGlyphs.find(glyph => glyph.unicodes.includes(char.codePointAt(0)));

            if (glyph) {
                colorArray.push([glyph.r, glyph.g, glyph.b]);
            } else {
                throw new Error("Could not find character in character set: " + char + ".");
            }
        }

        return colorArray;
    }

    appendCharacterSet(string) {
        // Create a Set from the existing characters to ensure uniqueness
        let uniqueCharacters = new Set(this.characters);

        // Add new characters to the Set
        for (let char of string) {
            uniqueCharacters.add(char);
        }

        // Convert the Set back to an array and update the characters list
        this.characters = Array.from(uniqueCharacters);

        this.characterGlyphs = this.loadCharacterGlyphs();

        // Recreate the texture with the updated characters list
        this.createTexture(128);
    }
}

/**
 * @class P5AsciifyGrid
 * @description
 * Represents a 2D grid for the P5Asciify library.
 * Handles the dimensions and resizing of the grid.
 */
class P5AsciifyGrid {
    /**
     * Creates an instance of P5AsciifyGrid.
     * @param {Object} options - The grid options.
     * @param {number} options.cellWidth - The width of each cell in the grid.
     * @param {number} options.cellHeight - The height of each cell in the grid.
     */
    constructor({ cellWidth, cellHeight }) {
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
    }

    /**
     * Resets the grid dimensions based on the current cell width and height.
     * Calculates the number of columns and rows and resizes the grid accordingly.
     */
    reset() {
        let [cols, rows] = this._calculateGridCellDimensions();
        this.cols = cols;
        this.rows = rows;

        this._resizeGrid();
    }

    /**
     * Resizes the grid dimensions based on the current number of columns and rows, as well as the cell width and height.
     * Adjusts the grid's offset to center it within the given width and height in the ASCII shader.
     * @private
     */
    _resizeGrid() {
        this.width = this.cols * this.cellWidth;
        this.height = this.rows * this.cellHeight;

        this.offsetX = Math.floor((width - this.width) / 2);
        this.offsetY = Math.floor((height - this.height) / 2);
    }

    /**
     * Calculates the number of columns and rows for the grid based on the current cell dimensions.
     * @returns {number[]} An array containing the number of columns and rows.
     * @private
     */
    _calculateGridCellDimensions() {
        const cellsX = Math.floor(width / this.cellWidth);
        const cellsY = Math.floor(height / this.cellHeight);
        return [cellsX, cellsY];
    }

    /**
     * Resizes the dimensions of a grid cell in pixels.
     * Recalculates the number of columns and rows and resizes the grid accordingly.
     * @param {number} newCellWidth - The new width of each cell in the grid.
     * @param {number} newCellHeight - The new height of each cell in the grid.
     */
    resizeCellPixelDimensions(newCellWidth, newCellHeight) {
        this.cellWidth = newCellWidth;
        this.cellHeight = newCellHeight;

        this.reset();
    }

    resizeCellDimensions(numCols, numRows) {
        const [maxCols, maxRows] = this._calculateGridCellDimensions();
        if (numCols > maxCols || numRows > maxRows) {
            console.warn(`The defined grid dimensions exceed the maximum dimensions of the grid. The maximum dimensions for the given font(size) and sketch dimensions are ${maxCols} x ${maxRows}. Resetting to default dimensions.`);
            this.reset();
            return;
        }
    
        this.cols = numCols;
        this.rows = numRows;
    
        // Resize the grid based on new dimensions
        this._resizeGrid();
    }
}

var asciiShader = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\nuniform sampler2D u_characterTexture;uniform float u_charsetCols;uniform float u_charsetRows;uniform int u_totalChars;uniform sampler2D u_sketchTexture;uniform sampler2D u_rotationTexture;uniform sampler2D u_edgesTexture;uniform sampler2D u_asciiBrightnessTexture;uniform vec2 u_gridCellDimensions;uniform vec2 u_gridPixelDimensions;uniform vec2 u_gridOffsetDimensions;uniform vec3 u_characterColor;uniform int u_characterColorMode;uniform vec3 u_backgroundColor;uniform int u_backgroundColorMode;uniform float u_rotationAngle;uniform int u_invertMode;uniform int u_renderMode;uniform bool u_brightnessEnabled;out vec4 fragColor;mat2 rotate2D(float angle){float s=sin(angle);float c=cos(angle);return mat2(c,-s,s,c);}void main(){vec2 adjustedCoord=(gl_FragCoord.xy-u_gridOffsetDimensions)/u_gridPixelDimensions;if(adjustedCoord.x<0.0f||adjustedCoord.x>1.0f||adjustedCoord.y<0.0f||adjustedCoord.y>1.0f){fragColor=vec4(u_backgroundColor,1.0f);return;}vec2 gridCoord=adjustedCoord*u_gridCellDimensions;vec2 cellCoord=floor(gridCoord);vec2 centerCoord=cellCoord+vec2(0.5f);vec2 baseCoord=centerCoord/u_gridCellDimensions;vec4 edgeColor;vec4 sketchColor;if(u_renderMode==1){edgeColor=texture(u_edgesTexture,baseCoord);sketchColor=texture(u_sketchTexture,baseCoord);if(edgeColor.rgb==vec3(0.0f)){if(u_brightnessEnabled){fragColor=texture(u_asciiBrightnessTexture,gl_FragCoord.xy/vec2(textureSize(u_asciiBrightnessTexture,0)));}else{fragColor=vec4(u_backgroundColor,1.0f);}return;}}else{sketchColor=texture(u_sketchTexture,baseCoord);}float brightness=u_renderMode==1 ? edgeColor.r : dot(sketchColor.rgb,vec3(0.299f,0.587f,0.114f));int charIndex=int(brightness*float(u_totalChars));charIndex=min(charIndex,u_totalChars-1);int charCol=charIndex % int(u_charsetCols);int charRow=charIndex/int(u_charsetCols);vec2 charCoord=vec2(float(charCol)/u_charsetCols,float(charRow)/u_charsetRows);vec4 rotationColor=texture(u_rotationTexture,baseCoord);float rotationBrightness=dot(rotationColor.rgb,vec3(0.299f,0.587f,0.114f));float rotationAngle=rotationBrightness*2.0f*3.14159265f;vec2 fractionalPart=fract(gridCoord)-0.5f;fractionalPart=rotate2D(u_rotationAngle)*fractionalPart;fractionalPart+=0.5f;vec2 cellMin=charCoord;vec2 cellMax=charCoord+vec2(1.0f/u_charsetCols,1.0f/u_charsetRows);vec2 texCoord=charCoord+fractionalPart*vec2(1.0f/u_charsetCols,1.0f/u_charsetRows);bool outsideBounds=any(lessThan(texCoord,cellMin))||any(greaterThan(texCoord,cellMax));vec4 charColor=outsideBounds ? vec4(u_backgroundColor,1.0f): texture(u_characterTexture,texCoord);if(u_invertMode==1){charColor.a=1.0f-charColor.a;charColor.rgb=vec3(1.0f);}vec4 finalColor=(u_characterColorMode==0)? vec4(sketchColor.rgb*charColor.rgb,charColor.a): vec4(u_characterColor*charColor.rgb,charColor.a);if(u_backgroundColorMode==0){fragColor=mix(vec4(sketchColor.rgb,1.0f),finalColor,charColor.a);}else{fragColor=mix(vec4(u_backgroundColor,1.0f),finalColor,charColor.a);}if(outsideBounds){fragColor=(u_backgroundColorMode==0)?(u_invertMode==1 ?(u_characterColorMode==0 ? vec4(sketchColor.rgb,1.0f): vec4(u_characterColor,1.0f)): vec4(sketchColor.rgb,1.0f)):(u_invertMode==1 ?(u_characterColorMode==0 ? vec4(sketchColor.rgb,1.0f): vec4(u_characterColor,1.0f)): vec4(u_backgroundColor,1.0f));}}"; // eslint-disable-line

var sobelShader = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\nin vec2 v_texCoord;out vec4 fragColor;uniform sampler2D u_texture;uniform vec2 u_textureSize;uniform float u_threshold;void main(){vec2 texelSize=1.0f/u_textureSize;float kernelX[9];float kernelY[9];kernelX[0]=-1.0f;kernelX[1]=0.0f;kernelX[2]=1.0f;kernelX[3]=-2.0f;kernelX[4]=0.0f;kernelX[5]=2.0f;kernelX[6]=-1.0f;kernelX[7]=0.0f;kernelX[8]=1.0f;kernelY[0]=-1.0f;kernelY[1]=-2.0f;kernelY[2]=-1.0f;kernelY[3]=0.0f;kernelY[4]=0.0f;kernelY[5]=0.0f;kernelY[6]=1.0f;kernelY[7]=2.0f;kernelY[8]=1.0f;vec3 texColor[9];for(int i=0;i<3;i++){for(int j=0;j<3;j++){texColor[i*3+j]=texture(u_texture,v_texCoord+vec2(i-1,j-1)*texelSize).rgb;}}vec3 sobelX=vec3(0.0f);vec3 sobelY=vec3(0.0f);for(int i=0;i<9;i++){sobelX+=kernelX[i]*texColor[i];sobelY+=kernelY[i]*texColor[i];}vec3 sobel=sqrt(sobelX*sobelX+sobelY*sobelY);float intensity=length(sobel)/sqrt(3.0f);float angleDeg=degrees(atan(sobelY.r,sobelX.r));vec3 edgeColor=vec3(0.0f);if(intensity>u_threshold){if(angleDeg>=-22.5f&&angleDeg<22.5f){edgeColor=vec3(0.1f);}else if(angleDeg>=22.5f&&angleDeg<67.5f){edgeColor=vec3(0.2f);}else if(angleDeg>=67.5f&&angleDeg<112.5f){edgeColor=vec3(0.3f);}else if(angleDeg>=112.5f&&angleDeg<157.5f){edgeColor=vec3(0.4f);}else if(angleDeg>=157.5f||angleDeg<-157.5f){edgeColor=vec3(0.6f);}else if(angleDeg>=-157.5f&&angleDeg<-112.5f){edgeColor=vec3(0.7f);}else if(angleDeg>=-112.5f&&angleDeg<-67.5f){edgeColor=vec3(0.8f);}else if(angleDeg>=-67.5f&&angleDeg<-22.5f){edgeColor=vec3(0.9f);}}fragColor=vec4(edgeColor,1.0f);}"; // eslint-disable-line

var sampleShader = "#version 300 es\nprecision highp float;\n#define GLSLIFY 1\nuniform sampler2D u_image;uniform vec2 u_gridCellDimensions;uniform int u_threshold;out vec4 outColor;const vec3 BLACK=vec3(0.0f,0.0f,0.0f);const int MAX_HISTOGRAM_SIZE=16;vec3 colorHistogram[MAX_HISTOGRAM_SIZE];int countHistogram[MAX_HISTOGRAM_SIZE];void main(){vec2 bufferDimensions=u_gridCellDimensions;vec2 imageDimensions=vec2(textureSize(u_image,0));vec2 gridCellDimensions=vec2(imageDimensions.x/bufferDimensions.x,imageDimensions.y/bufferDimensions.y);ivec2 coords=ivec2(gl_FragCoord.xy);int gridX=coords.x;int gridY=coords.y;ivec2 cellOrigin=ivec2(round(float(gridX)*gridCellDimensions.x),round(float(gridY)*gridCellDimensions.y));int histogramIndex=0;int nonBlackCount=0;for(int i=0;i<MAX_HISTOGRAM_SIZE;i++){colorHistogram[i]=BLACK;countHistogram[i]=0;}for(int i=0;i<int(round(gridCellDimensions.x));i+=1){for(int j=0;j<int(round(gridCellDimensions.y));j+=1){ivec2 pixelCoords=cellOrigin+ivec2(i,j);if(pixelCoords.x>=int(imageDimensions.x)||pixelCoords.y>=int(imageDimensions.y))continue;vec3 color=texelFetch(u_image,pixelCoords,0).rgb;if(color==BLACK)continue;nonBlackCount++;bool found=false;for(int k=0;k<histogramIndex;k++){if(colorHistogram[k]==color){countHistogram[k]++;found=true;break;}}if(!found&&histogramIndex<MAX_HISTOGRAM_SIZE){colorHistogram[histogramIndex]=color;countHistogram[histogramIndex]=1;histogramIndex++;}}}vec3 mostFrequentColor=BLACK;int highestCount=0;for(int k=0;k<histogramIndex;k++){if(countHistogram[k]>highestCount){mostFrequentColor=colorHistogram[k];highestCount=countHistogram[k];}}if(nonBlackCount<u_threshold){outColor=vec4(BLACK,1.0f);}else{outColor=vec4(mostFrequentColor,1.0f);}}"; // eslint-disable-line

/**
 * @class P5Asciify
 * @description
 * The main class for the P5Asciify library, responsible for setting up and running the rendering pipeline.
 */
class P5Asciify {

    static commonOptions = {
        fontSize: 16,
        gridDimensions: [0, 0],
    };

    static brightnessOptions = {
        enabled: true,
        characters: "0123456789",
        characterColor: [1.0, 1.0, 1.0],
        characterColorMode: 0,
        backgroundColor: [0.0, 0.0, 0.0],
        backgroundColorMode: 1,
        invertMode: false,
        rotationAngle: 0,
    };

    static edgeOptions = {
        enabled: false,
        characters: "-/|\\-/|\\",
        characterColor: [1.0, 1.0, 1.0],
        characterColorMode: 0,
        backgroundColor: [0.0, 0.0, 0.0],
        backgroundColorMode: 1,
        invertMode: false,
        sobelThreshold: 0.5,
        sampleThreshold: 16,
        rotationAngle: 0,
    };

    static colorPalette = new P5AsciifyColorPalette();

    static preEffectManager = new P5AsciifyEffectManager(this.colorPalette);

    static afterEffectManager = new P5AsciifyEffectManager(this.colorPalette);

    static sketchFramebuffer = null;

    static preEffectPrevFramebuffer = null;
    static preEffectNextFramebuffer = null;

    static postEffectPrevFramebuffer = null;
    static postEffectNextFramebuffer = null;

    static asciiShader = null;
    static asciiBrightnessFramebuffer = null;
    static asciiEdgeFramebuffer = null;
    static asciiFramebufferDimensions = { width: 0, height: 0 };

    static sobelShader = null;
    static sobelFramebuffer = null;

    static sampleShader = null;
    static sampleFramebuffer = null;

    static font = null;
    static brightnessCharacterSet = new P5AsciifyCharacterSet();
    static edgeCharacterSet = new P5AsciifyCharacterSet();
    static grid = new P5AsciifyGrid({ cellWidth: 0, cellHeight: 0 });

    static p5Canvas = null;

    /**
     * Sets up the P5Asciify library with the specified options after the user's setup() function finished.
     */
    static setup() {
        pixelDensity(1);

        this.sketchFramebuffer = createFramebuffer({ format: FLOAT });

        this.brightnessCharacterSet.setup({ type: "brightness", font: this.font, characters: this.brightnessOptions.characters, fontSize: this.commonOptions.fontSize });
        this.edgeCharacterSet.setup({ type: "edge", font: this.font, characters: this.edgeOptions.characters, fontSize: this.commonOptions.fontSize });

        this.grid.resizeCellPixelDimensions(this.brightnessCharacterSet.maxGlyphDimensions.width, this.brightnessCharacterSet.maxGlyphDimensions.height);

        if (this.commonOptions.gridDimensions[0] != 0 && this.commonOptions.gridDimensions[1] != 0) {
            this.grid.resizeCellDimensions(this.commonOptions.gridDimensions[0], this.commonOptions.gridDimensions[1]);
        }

        this.colorPalette.setup();

        this.preEffectManager.setup();
        this.afterEffectManager.setup();

        this.preEffectPrevFramebuffer = createFramebuffer({ format: FLOAT });
        this.preEffectNextFramebuffer = createFramebuffer({ format: FLOAT });

        this.postEffectPrevFramebuffer = createFramebuffer({ format: FLOAT });
        this.postEffectNextFramebuffer = createFramebuffer({ format: FLOAT });

        this.asciiShader = createShader(vertexShader, asciiShader);
        this.asciiBrightnessFramebuffer = createFramebuffer({ format: this.FLOAT });
        this.asciiEdgeFramebuffer = createFramebuffer({ format: this.FLOAT });

        this.sobelShader = createShader(vertexShader, sobelShader);
        this.sobelFramebuffer = createFramebuffer({ format: this.FLOAT });

        this.sampleShader = createShader(vertexShader, sampleShader);
        this.sampleFramebuffer = createFramebuffer({ format: this.FLOAT, width: this.grid.cols, height: this.grid.rows });

        this.asciiFramebufferDimensions = { width: this.asciiBrightnessFramebuffer.width, height: this.asciiBrightnessFramebuffer.height };
    }

    /**
     * Checks if the dimensions of the ASCII framebuffer have changed and resets the grid if necessary.
     * This function is called every frame after the user's draw() function, 
     * since I am not aware of a better way to do this since there is no hook for when the canvas is resized.
     */
    static checkFramebufferDimensions() {
        if (this.asciiFramebufferDimensions.width !== this.asciiBrightnessFramebuffer.width || this.asciiFramebufferDimensions.height !== this.asciiBrightnessFramebuffer.height) {
            this.asciiFramebufferDimensions.width = this.asciiBrightnessFramebuffer.width;
            this.asciiFramebufferDimensions.height = this.asciiBrightnessFramebuffer.height;

            if (this.commonOptions.gridDimensions[0] === 0 || this.commonOptions.gridDimensions[1] === 0) {
                this.grid.reset();
                this.sampleFramebuffer.resize(this.grid.cols, this.grid.rows);
            } else {
                this.grid._resizeGrid();
            }
        }
    }

    /**
     * Runs the rendering pipeline for the P5Asciify library.
     */
    static asciify() {
        // Initial rendering to preEffectNextFramebuffer
        this.preEffectNextFramebuffer.begin();
        clear(); // do not remove this, even though it's tempting
        image(this.sketchFramebuffer, -width / 2, -height / 2);
        this.preEffectNextFramebuffer.end();

        // Copy preEffectNextFramebuffer to preEffectPrevFramebuffer
        this.preEffectPrevFramebuffer.begin();
        clear(); // do not remove this, even though it's tempting
        image(this.sketchFramebuffer, -width / 2, -height / 2);
        this.preEffectPrevFramebuffer.end();

        for (const effect of this.preEffectManager._effects) {
            if (effect.enabled) {
                // Swap framebuffers only if the effect is enabled
                [this.preEffectPrevFramebuffer, this.preEffectNextFramebuffer] = [this.preEffectNextFramebuffer, this.preEffectPrevFramebuffer];

                this.preEffectNextFramebuffer.begin();
                shader(effect.shader);
                effect.setUniforms(this.preEffectPrevFramebuffer);
                rect(0, 0, width, height);
                this.preEffectNextFramebuffer.end();
            }
        }

        if (this.brightnessOptions.enabled) {
            this.asciiBrightnessFramebuffer.begin();
            shader(this.asciiShader);
            this.asciiShader.setUniform('u_characterTexture', this.brightnessCharacterSet.texture);
            this.asciiShader.setUniform('u_charsetCols', this.brightnessCharacterSet.charsetCols);
            this.asciiShader.setUniform('u_charsetRows', this.brightnessCharacterSet.charsetRows);
            this.asciiShader.setUniform('u_totalChars', this.brightnessCharacterSet.characters.length);
            this.asciiShader.setUniform('u_sketchTexture', this.preEffectNextFramebuffer);
            this.asciiShader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
            this.asciiShader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
            this.asciiShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.asciiShader.setUniform('u_characterColor', this.brightnessOptions.characterColor);
            this.asciiShader.setUniform('u_characterColorMode', this.brightnessOptions.characterColorMode);
            this.asciiShader.setUniform('u_backgroundColor', this.brightnessOptions.backgroundColor);
            this.asciiShader.setUniform('u_backgroundColorMode', this.brightnessOptions.backgroundColorMode);
            this.asciiShader.setUniform('u_invertMode', this.brightnessOptions.invertMode);
            this.asciiShader.setUniform('u_renderMode', 0);
            this.asciiShader.setUniform('u_brightnessEnabled', this.brightnessOptions.enabled);
            this.asciiShader.setUniform('u_rotationAngle', radians(this.brightnessOptions.rotationAngle));
            rect(0, 0, width, height);
            this.asciiBrightnessFramebuffer.end();
        }

        if (this.edgeOptions.enabled) {
            this.sobelFramebuffer.begin();
            shader(this.sobelShader);
            this.sobelShader.setUniform('u_texture', this.preEffectNextFramebuffer);
            this.sobelShader.setUniform('u_textureSize', [width, height]);
            this.sobelShader.setUniform('u_threshold', this.edgeOptions.sobelThreshold);
            rect(0, 0, width, height);
            this.sobelFramebuffer.end();

            this.sampleFramebuffer.begin();
            shader(this.sampleShader);
            this.sampleShader.setUniform('u_image', this.sobelFramebuffer);
            this.sampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.sampleShader.setUniform('u_threshold', this.edgeOptions.sampleThreshold);
            rect(0, 0, width, height);
            this.sampleFramebuffer.end();

            this.asciiEdgeFramebuffer.begin();
            shader(this.asciiShader);
            this.asciiShader.setUniform('u_characterTexture', this.edgeCharacterSet.texture);
            this.asciiShader.setUniform('u_charsetCols', this.edgeCharacterSet.charsetCols);
            this.asciiShader.setUniform('u_charsetRows', this.edgeCharacterSet.charsetRows);
            this.asciiShader.setUniform('u_totalChars', this.edgeCharacterSet.characters.length);
            this.asciiShader.setUniform('u_sketchTexture', this.preEffectNextFramebuffer);
            this.asciiShader.setUniform('u_asciiBrightnessTexture', this.asciiBrightnessFramebuffer);
            this.asciiShader.setUniform('u_edgesTexture', this.sampleFramebuffer);
            this.asciiShader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
            this.asciiShader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
            this.asciiShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.asciiShader.setUniform('u_characterColor', this.edgeOptions.characterColor);
            this.asciiShader.setUniform('u_characterColorMode', this.edgeOptions.characterColorMode);
            this.asciiShader.setUniform('u_backgroundColor', this.edgeOptions.backgroundColor);
            this.asciiShader.setUniform('u_backgroundColorMode', this.edgeOptions.backgroundColorMode);
            this.asciiShader.setUniform('u_invertMode', this.edgeOptions.invertMode);
            this.asciiShader.setUniform('u_renderMode', 1);
            this.asciiShader.setUniform('u_brightnessEnabled', this.brightnessOptions.enabled);
            this.asciiShader.setUniform('u_rotationAngle', radians(this.edgeOptions.rotationAngle));
            rect(0, 0, width, height);
            this.asciiEdgeFramebuffer.end();
        }

        this.postEffectNextFramebuffer.begin();
        clear(); // do not remove this, even though it's tempting
        if (this.edgeOptions.enabled) {
            image(this.asciiEdgeFramebuffer, -width / 2, -height / 2);
        } else if (this.brightnessOptions.enabled) {
            image(this.asciiBrightnessFramebuffer, -width / 2, -height / 2);
        } else {
            image(this.preEffectNextFramebuffer, -width / 2, -height / 2);
        }
        this.postEffectNextFramebuffer.end();

        this.postEffectPrevFramebuffer.begin();
        clear(); // do not remove this, even though it's tempting
        if (this.edgeOptions.enabled) {
            image(this.asciiEdgeFramebuffer, -width / 2, -height / 2);
        } else if (this.brightnessOptions.enabled) {
            image(this.asciiBrightnessFramebuffer, -width / 2, -height / 2);
        } else {
            image(this.preEffectNextFramebuffer, -width / 2, -height / 2);
        }
        this.postEffectPrevFramebuffer.end();

        for (const effect of this.afterEffectManager._effects) {
            if (effect.enabled) {
                [this.postEffectPrevFramebuffer, this.postEffectNextFramebuffer] = [this.postEffectNextFramebuffer, this.postEffectPrevFramebuffer];
                this.postEffectNextFramebuffer.begin();
                shader(effect.shader);
                effect.setUniforms(this.postEffectPrevFramebuffer);
                rect(0, 0, width, height);
                this.postEffectNextFramebuffer.end();
            }
        }

        clear(); // do not remove this, even though it's tempting
        image(this.postEffectNextFramebuffer, -width / 2, -height / 2);
        this.checkFramebufferDimensions();
    }

    /**
     * Sets the default options for the P5Asciify library.
     * @param {object} options 
     */
    static setDefaultOptions(brightnessOptions, edgeOptions, commonOptions) {

        // The parameters are pre-processed, so we can just spread them into the class variables
        this.brightnessOptions = {
            ...this.brightnessOptions,
            ...brightnessOptions
        };
        this.edgeOptions = {
            ...this.edgeOptions,
            ...edgeOptions
        };
        this.commonOptions = {
            ...this.commonOptions,
            ...commonOptions
        };

        if (frameCount == 0) { // If we are still in the users setup(), the characterset and grid have not been initialized yet.
            return;
        }

        if (brightnessOptions?.characters) {
            this.brightnessCharacterSet.setCharacterSet(brightnessOptions.characters);
        }

        if (edgeOptions?.characters) {
            this.edgeCharacterSet.setCharacterSet(edgeOptions.characters);
        }

        if (commonOptions?.fontSize) {
            this.brightnessCharacterSet.setFontSize(commonOptions.fontSize);
            this.edgeCharacterSet.setFontSize(commonOptions.fontSize);
            this.grid.resizeCellPixelDimensions(this.brightnessCharacterSet.maxGlyphDimensions.width, this.brightnessCharacterSet.maxGlyphDimensions.height);
            this.sampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        }

        if (commonOptions?.gridDimensions) {
            if (commonOptions.gridDimensions[0] === 0 || commonOptions.gridDimensions[1] === 0) {
                this.grid.reset();
            } else {
                this.grid.resizeCellDimensions(commonOptions.gridDimensions[0], commonOptions.gridDimensions[1]);
            }
            this.sampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        }
    }
}

/**
 * @class P5AsciifyUtils
 * @description
 * A utility class for the P5Asciify library.
 * Provides static methods for various common tasks such as color conversion and version comparison.
 */
class P5AsciifyUtils {

    /**
     * Converts a hex color string to an RGB array.
     * @param {string} hex - The hex color string (e.g., "#ff5733").
     * @returns {number[]} An array containing the RGB values [r, g, b].
     */
    static hexToRgb(hex) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
    }

    /**
     * Converts an RGB array to a shader color array.
     * @param {number[]} color - The RGB array [r, g, b].
     * @returns {number[]} An array containing the shader color values [r/255, g/255, b/255].
     */
    static rgbToShaderColor(color) {
        return [color[0] / 255, color[1] / 255, color[2] / 255];
    }

    /**
     * Converts a hex color string to a shader color array.
     * @param {string} hex - The hex color string (e.g., "#ff5733").
     * @returns {number[]} An array containing the shader color values [r/255, g/255, b/255].
     */
    static hexToShaderColor(hex) {
        return this.rgbToShaderColor(this.hexToRgb(hex));
    }

    /**
     * Compares two version strings.
     * @param {string} v1 - The first version string (e.g., "1.2.3").
     * @param {string} v2 - The second version string (e.g., "1.2.4").
     * @returns {number} 1 if v1 > v2, -1 if v1 < v2, 0 if v1 === v2.
     */
    static compareVersions(v1, v2) {
        const [v1Parts, v2Parts] = [v1, v2].map(v => v.split('.').map(Number));

        for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
            const [v1Part, v2Part] = [v1Parts[i] ?? 0, v2Parts[i] ?? 0];
            if (v1Part !== v2Part) return v1Part > v2Part ? 1 : -1;
        }

        return 0;
    }

    /**
     * Deeply merges two objects into a new object.
     * @param {Object} target - The target object to merge into.
     * @param {Object} source - The source object to merge from.
     * @returns {Object} The merged object.
     */
    static deepMerge(target, source) {
        const result = { ...target };

        for (const key of Object.keys(source)) {
            if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key]) && key in target && typeof target[key] === 'object' && !Array.isArray(target[key])) {
                result[key] = this.deepMerge(target[key], source[key]);
            } else {
                result[key] = source[key];
            }
        }

        return result;
    }
}

var URSAFONT_BASE64 = "data:text/javascript;base64,AAEAAAAKAIAAAwAgT1MvMs+QEyQAAAEoAAAAYGNtYXAg7yVJAAAFjAAACSBnbHlmuHLTdAAAErQAAGi0aGVhZFvXdUwAAACsAAAANmhoZWELAQUCAAAA5AAAACRobXR4BACDgAAAAYgAAAQEbG9jYQAy54AAAA6sAAAECG1heHABIgCCAAABCAAAACBuYW1lVs/OSgAAe2gAAAOicG9zdABpADQAAH8MAAAAIAABAAAAAQAAzOWHqV8PPPUAAAQAAAAAAHxiGCcAAAAAfGIYJwAAAAAEAAQAAAAACAACAAEAAAAAAAEAAAQAAAAAAAQAAAAAAAcAAAEAAAAAAAAAAAAAAAAAAAEBAAEAAAEBAIAAIAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAgQAAZAABQAEAgACAAAAAAACAAIAAAACAAAzAMwAAAAABAAAAAAAAACAAACLAABw4wAAAAAAAAAAWUFMLgBAACAmawQAAAAAAAQAAAAAAAFRAAAAAAMABAAAAAAgAAAEAAAABAAAAAQAAAAEAAGABAABAAQAAIAEAACABAAAgAQAAIAEAAGABAABAAQAAQAEAACABAABAAQAAIAEAACABAABAAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAAGABAAAgAQAAIAEAAGABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABgAQAAQAEAACABAAAAAQAAgAEAACABAAAgAQAAIAEAACABAACAAQAAAAEAAIABAABgAQAAgAEAACABAAAgAQAAAAEAACABAAAAAQAAAAEAAAABAAAAAQAAAAEAAIABAADAAQAAAAEAAAABAAAgAQAAYAEAAAABAAAAAQAAIAEAAAA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AIAAAACA/YAAgAAAAIAAAP8AAoABAAAA/4AAAP+A/4AAgAAAAIAAAP8AA4AAAP8AAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAP+AAAD/gAAAAAAAAP8AAAAAgAAAAAAAAP+AAAD/gAAAAAAAAwCAAIAEAAQAABcAHQAjAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAACAAAAAgAAA/4AAAACAAAD9AAAA/4AAAACAAAD/gAAAAIAAgAAAAIAAAACAAAD/AAAAAQAAAP+AAAAEAAAA/4AAAP8AAAD/gAAAAIAAAP8AAAD/gAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAP+AAAD/gAAAAQD+gP8AAAAAgAAAAIAAAAABAYACgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAP6AAAAAAAABAQAAgAMABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/oAAAP+AAAD/gAAAAIAAAACAAAABgAAAAIAAAAAAAAEBAACAAwAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAAAgAAAAIAAAAGAAAAAgAAAAAAABQCAAYADgAQAAAMABwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAIAAAP+AAYAAgAAA/4D/AAEAAAABAAAA/wAAAP8AAAD/AAAAAQD/gACAAAD/gAGAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP+AAAAAAAABAQAAgAOAAwAACwAAAQEBAQEBAQEBAQEBAgAAgAAAAQAAAP8AAAD/gAAA/wAAAAEAAwAAAP8AAAD/gAAA/wAAAAEAAAAAgAAAAAAAAQCAAAACAAGAAAcAAAEBAQEBAQEBAQABAAAA/4AAAP8AAAAAgAGAAAD/AAAA/4AAAACAAAAAAAABAIABgAOAAgAAAwAAAQEBAQCAAwAAAP0AAgAAAP+AAAAAAAABAQAAgAIAAYAAAwAAAQEBAQEAAQAAAP8AAYAAAP8AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAwCAAIADgAQAAAsAEQAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAD/gAAAAIAAgAAAAIAAAACAAAD/gAAA/4AAAAEAAAAEAAAA/4AAAP2AAAD/gAAAAIAAAAKAAAAAAP8AAAAAgAAAAID/AP+AAAD/AAAAAYAAAAABAIAAgAOABAAADQAAAQEBAQEBAQEBAQEBAQEBgAEAAAABAAAA/QAAAAEAAAD/AAAAAIAAAACABAAAAP0AAAD/gAAAAIAAAAGAAAAAgAAAAIAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAAAIAAAACAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAA/wAAAAEAAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/wAAAAEAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAA/4AAAACAAAAAAAABAIAAgAOABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAP+AAAABAAAAAQAAAP8AAAD+AAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAAEAAAD9gAAAAQAAAAGAAAAAgAAAAAEAgACAA4AEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP4AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/gAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAP+AAAABAAAAAAAAAgCAAIADgAQAABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAYAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAoAAAP6A/wAAAAEAAAEAgACAA4AEAAAPAAABAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AEAAAA/oAAAP+AAAD+gAAAAYAAAACAAAABAAAA/4AAAAAAAAMAgACAA4AEAAATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAACAAAD/gAAAAIAAgAAAAQAAAP8AAAABAAAABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAA/wAAAAEA/oD/AAAAAQAAAAACAIAAgAOABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD+gAAA/4AAAACAAIAAAAEAAAAEAAAA/4AAAP0AAAABAAAAAIAAAAGAAAAAAP6AAAABgAACAQABAAIAA4AAAwAHAAABAQEBAQEBAQEAAQAAAP8AAAABAAAA/wADgAAA/wAAAP+AAAD/AAAAAAIAgACAAgADgAADAAsAAAEBAQEBAQEBAQEBAQEAAQAAAP8AAAABAAAA/4AAAP8AAAAAgAOAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAABAQAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQKAAQAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAACAIABgAOAAwAAAwAHAAABAQEBAQEBAQCAAwAAAP0AAAADAAAA/QADAAAA/4AAAP+AAAD/gAAAAAEAgACAAwAEAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAIAgACAA4AEAAATABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP8AAAD/AAAAAIAAgAEAAAD/AAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAA/4AAAACAAAD+AAAA/wAAAAACAIAAgAOABAAAEQAVAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP6AAAAAgAAA/wAAAAGAAAD+AAAA/4AAAACAAgAAgAAA/4AEAAAA/4AAAP6AAAABAAAAAIAAAP2AAAD/gAAAAIAAAAKAAAD+AAAA/4AAAAAAAAIAgACAA4AEAAAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAAAIAAAACAAAD/AAAA/wAAAP8AAAAAgAAAAIAAAAAAAQAAAAQAAAD/gAAA/4AAAP2AAAABAAAA/wAAAAKAAAAAgAAA/4D/AAAAAQAAAwCAAIADgAQAAAsADwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAAAIAAAP+AAAD9gAEAAAABAAAA/wAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAADAP8AAAABAP6A/wAAAAEAAAAAAQCAAIADgAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAQAAAAEAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAACAIAAgAOABAAACwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAEAAAAAgAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAADAP2AAAAAgAAAAYAAAACAAAEAgACAA4AEAAAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/wAAAAEAAAABAAAA/4AAAP4AAAD/gAAAAIAEAAAA/4AAAP+AAAAAgAAA/wAAAP+AAAD/AAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAABAIAAgAOABAAACQAAAQEBAQEBAQEBAQCAAwAAAP4AAAABAAAA/wAAAP8ABAAAAP+AAAD/AAAA/4AAAP6AAAAAAQCAAIADgAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/4AAAAGAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAQAAAACAAAD+gAAA/4AAAACAAAACgAAAAAEAgACAA4AEAAALAAABAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP8AAAD/AAAA/wAEAAAA/gAAAAIAAAD8gAAAAQAAAP8AAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIADAAAA/wAAAAEAAAD9AAAAAQAAAP8ABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAAAAQCAAIAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAMAAAD/gAAA/4AAAP4AAAD/gAAAAQAAAAEAAAD+gAQAAAD/gAAA/YAAAP+AAAAAgAAAAQAAAP8AAAACgAAAAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAAEAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAQAAAD/AAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAAAAAQCAAIADgAQAAAUAAAEBAQEBAQCAAQAAAAIAAAD9AAQAAAD9AAAA/4AAAAABAIAAgAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8ABAAAAP+AAAD/gAAAAIAAAACAAAD8gAAAAgAAAP+AAAAAgAAA/gAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAEAAAA/4AAAP+AAAD/gAAAAYAAAPyAAAABAAAAAIAAAACAAAD+AAAAAAAAAgCAAIADgAQAAAsADwAAAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAD9gAAAAoAAAgCAAIADgAQAAAkADQAAAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP6AAAD/AAEAAAABAAAABAAAAP+AAAD+gAAA/4AAAP8AAAADAP6AAAABgAAAAAIAgACABAAEAAAPABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAD/gAAAAIAAAAQAAAD/gAAA/gAAAP8AAAAAgAAA/4AAAACAAAACgAAAAAD9gAAAAIAAAACAAAABgAACAIAAgAOABAAAEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AAQAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAwD/AAAAAQAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/oAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAAAAAAAQCAAIADgAQAAAcAAAEBAQEBAQEBAIADAAAA/wAAAP8AAAD/AAQAAAD/gAAA/QAAAAMAAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAP+ABAAAAP0AAAADAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIADgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAD/gAAA/wAAAP+AAAD/gAQAAAD+AAAAAgAAAP4AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAIAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAQAAAP8AAAD/gAAA/4AAAP+AAAD/AAQAAAD+AAAAAIAAAP+AAAACAAAA/IAAAACAAAAAgAAA/4AAAP+AAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/AAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP8AAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAA/wAAAAEAAAAAgAAAAIAAAACAAAAAAAABAIAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAACAAAAAAAABAIAAgAOABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/gAAA/4AAAAIAAAD9AAAAAIAAAACAAAAAgAAAAIAAAP4ABAAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/wAAAAEAAAD+AAQAAAD/gAAA/YAAAP+AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/gAAAAEAAAD/AAQAAAD8gAAAAIAAAAKAAAAAAAABAIACAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAEAAAMAAAEBAQEAgAMAAAD9AAEAAAD/gAAAAAAAAQEAAoACgAQAAAkAAAEBAQEBAQEBAQEBAAEAAAAAgAAA/4AAAP+AAAD/gAQAAAD/gAAA/wAAAACAAAAAgAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQACgAAA/4AAAP+AAAD/AAAAAQAAAP6AAAD/gAAAAIADAAAA/YAAAACAAAABgAAA/oAAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/gAAA/YABAAAAAQAAAAQAAAD/AAAA/4AAAP6AAAD/gAAAAgD+gAAAAYAAAAABAIAAgAOAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAAAQAAAP+AAAD+AAAA/4AAAACAAwAAAP+AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAoABAAAA/YAAAP+AAAAAgAAAAYD/AAAAAQAAAAQAAAD8gAAAAIAAAAGAAAAAgAAA/4D+gAAAAYAAAAACAIAAgAOAAwAADQARAAABAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/gAAAAGAAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP8AAAD/gAAA/4AAAACAAAABgAAAAAD/gAAAAIAAAAABAQAAgAOAA4AACwAAAQEBAQEBAQEBAQEBAYACAAAA/oAAAAEAAAD/AAAA/wAAAACAA4AAAP+AAAD/AAAA/4AAAP8AAAACgAAAAAAAAgCAAIADgAOAAA8AEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAABgAAA/oAAAP+AAAAAgACAAAABAAAAA4AAAP+AAAD+AAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAAP8AAAABAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/AAAA/wAAAP8ABAAAAP8AAAD/gAAA/gAAAAIAAAD+AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP+AAAD/gAAA/YAAAAACAIAAgAOABAAAAwAPAAABAQEBAQEBAQEBAQEBAQEBAoABAAAA/wAAAAEAAAD/gAAA/gAAAP+AAAABAAAAAQAEAAAA/4AAAP+AAAD+AAAA/4AAAACAAAABAAAA/wAAAAABAIAAgAOAA4AAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAQAAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AA4AAAP8AAAAAgAAA/4AAAP8AAAD/gAAA/4AAAACAAAAAgAAA/wAAAAAAAAEBgACAAwAEAAAHAAABAQEBAQEBAQGAAQAAAACAAAD/AAAA/4AEAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIAEAAMAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAMAAAD/gAAAAIAAAP+AAAD+AAAAAYAAAP+AAAAAgAAA/oAAAAIAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAABAAAAAIAAAP8AAAD/gAAA/4AAAP8AAwAAAP+AAAAAgAAA/4AAAP4AAAABgAAA/4AAAP8AAAAAAAACAIAAgAOAAwAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP6AAAD/gAAAAIAAAAGAAAAAAP6AAAABgAACAIAAgAOAAwAACQANAAABAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAA/oAAAP8AAQAAAAEAAAADAAAA/4AAAP+AAAD/gAAA/wAAAAIA/4AAAACAAAAAAgCAAIAEAAMAAA0AEQAAAQEBAQEBAQEBAQEBAQEBAQEBAQACgAAAAIAAAP+AAAD/AAAA/oAAAP+AAAAAgACAAAABAAAAAwAAAP6AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAA/4AAAACAAAAAAQEAAIADgAMAAAkAAAEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP+AAAD/AAMAAAD/gAAA/wAAAAEAAAD+AAAAAAEAgACABAADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP6AAAABgAAAAIAAAP+AAAD9AAAAAgAAAP6AAAD/gAAAAIADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAP8AAAAAgAAAAQAAAP+AAAD+gAAA/4AAAP+AAAAAgAOAAAD/gAAA/4AAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAQAAAP+AAAD/gAAA/oAAAP+AAwAAAP4AAAAAgAAAAYAAAP2AAAAAgAAA/4AAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+AAwAAAP6AAAABgAAA/oAAAP+AAAD/gAAAAIAAAACAAAAAAAABAIAAgAQAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/4AAAP8AAAD/gAAA/wAAAP+AAwAAAP6AAAAAgAAA/4AAAAGAAAD+AAAA/4AAAACAAAD/gAAAAIAAAAAAAAEAgACAA4ADAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP8AAAD/AAAAAIAAAACAAAD/gAAA/4ADAAAA/4AAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAD/gAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAAGAAAD+gAAA/4ADAAAA/wAAAAEAAAD+AAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP+AAAD/gAAA/4AAAAGAAAD9AAAAAIAAAACAAAAAgAAA/oADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAA/wAAAP+AAAAAgAAAAQAAAP6AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAAABAYAAgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPyAAAAAAAABAQAAgAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAGAAAAAgAAAAIAAAP+AAAD/gAAA/oAAAAEAAAAAgAAA/4AAAP8ABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAAAAEAgAGAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAACAAAD/gAAA/wAAAP8AAAD/gAAAAIADAAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAYAAAAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAAA/wAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAABAAAAAQAAAACAAAAAgAAAAAAAAQIAAAAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD8AAAAAAAAAgCAAIADgAQAABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP8AAAABAAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAA/wAAAACAAAAAgAGAAIAAAP+ABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAAAAAAAP+AAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAAAgAAA/wAAAAEAAAD/AAAA/wAAAP8AAAABAAAA/wAAAACAAAD/gAQAAAD+gAAAAYAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABACAAIAEAAQAABcAGwAfACMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP4AAAABgAAAAIAAAACAAAD/gAAA/YAAAAIAAAD+gAAA/4AAAP+AAAAAgAEAAAAAgAAAAQAAgAAA/4D9AACAAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAACAAAAAgAAAAQAAAP8A/4AAAACAAQAAAP+AAAD+gAAA/4AAAAAEAIAAgAQAA4AAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAQIAAAAEAAQAAAkAAAEBAQEBAQEBAQEDgACAAAD+AAAAAIAAAACAAAAAgAQAAAD8AAAAAQAAAAEAAAABAAAAAAgAAAAABAAEAAADAAcACwAPABMAFwAbAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAA/wACAAEAAAD/AP8AAQAAAP8AAgABAAAA/wD9AAEAAAD/AAIAAQAAAP8A/wABAAAA/wACAAEAAAD/AAQAAAD/AAAAAQAAAP8AAAAAAAAA/wAAAAEAAAD/AAAAAAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQIAAAADAAQAAAMAAAEBAQECAAEAAAD/AAQAAAD8AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP6AAAD/gAAA/oAAAAABAgAAAAQAAgAAAwAAAQEBAQIAAgAAAP4AAgAAAP4AAAAAAAAEAIAAAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+ABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAAABAAAAPwAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAoABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAD/gAOAAAD+AAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAA/wAAAAEAAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAAAEAAAA/gAAAP+AAAD/gAAA/4AAAP+ABAAAAPwAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIAEAAOAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAOAAAD/gAAAAIAAAP8AAAABAAAA/oAAAAGAAAD9AAAAAIAAAP+AAAABAAAA/wAAAAGAAAD+gAAAAAAAAQAAAAACAAQAAAkAAAEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD+AAQAAAD/AAAA/wAAAP8AAAD/AAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQKAAYAAAP8AAAD/AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAEAAAA/wAAAP+AAAD/gAAA/wAAAP8AAAABgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD8AAAAAIAAAACAAAAAgAIAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgAAAAAEAAQAAAMABwAAAQEBAQEBAQEAAAIAAAD+AAIAAgAAAP4ABAAAAP4AAAAAAAAA/gAAAAAEAAACAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8ABAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAABAIAAAAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQECAAEAAAD/AAEAAQAAAP8A/wABAAAA/wABAAEAAAD/AAQAAAD/AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAEDAAAABAAEAAADAAABAQEBAwABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD9AAAA/wAEAAAA/wAAAP0AAAAAAQAAAAABAAQAAAMAAAEBAQEAAAEAAAD/AAQAAAD8AAAAAAAAAwCAAIADAAOAAAMABwALAAABAQEBAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AAQAAgAAA/4ADgAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAAABAYABgAQABAAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAAEAAAD+gAAA/4AAAP+ABAAAAP8AAAD/gAAA/wAAAACAAAAAgAAAAAAAAQAAAYACgAQAAAsAAAEBAQEBAQEBAQEBAQGAAQAAAP+AAAD/gAAA/oAAAAEAAAAAgAQAAAD+gAAA/4AAAP+AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAwABAAAA/AAAAAEAAAABAAAAAQAEAAAA/AAAAAKAAAAAgAAAAIAAAAABAIAAgAMABAAACwAAAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP0AAAD/gAAAAIAAAAEAAAAAgAAAAAAAAQAAAAAEAAQAAAUAAAEBAQEBAQAAAQAAAAMAAAD8AAQAAAD9AAAA/wAAAAACAIAAgAMAAoAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQABgAAAAIAAAP+AAAD+gAAAAQAAAP8A/4AAgAAA/4ACgAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAMABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAABAAAA/wAAAAEA/oAAgAAA/4AEAAAA/QAAAP+AAAAAgAAAAQAAAACAAAD/gAAA/wAAAAABAIAAgAQABAAADQAAAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP+AAAD9gAAA/4AAAACAAAABAAAAAIAAAAACAAAAAAQABAAAAwAHAAABAQEBAQEBAQAABAAAAPwAAQAAAAIAAAAEAAAA/AAAAAMA/gAAAAIAAAEAgACABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAD/gAAA/oAAAP+AAAAAgAAAAQAEAAAA/4AAAP+AAAD/gAAA/oAAAP+AAAAAgAAAAQAAAACAAAAAAQAAAAACgAKAAAsAAAEBAQEBAQEBAQEBAQAAAYAAAACAAAAAgAAA/wAAAP+AAAD/AAKAAAD/gAAA/4AAAP6AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD/AAAA/QAEAAAA/AAAAAMAAAAAAQCAAIAEAAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAABAAAA/wAAAP+AAAD+gAAA/4AAAACAAAABAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAAEAAAAAgAAAAAEBgAAABAACgAALAAABAQEBAQEBAQEBAQECgAGAAAD/AAAA/4AAAP8AAAAAgAAAAIACgAAA/wAAAP+AAAD/AAAAAYAAAACAAAAAAAABAAAAAAQABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAPwABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAABAAADAAABAQEBAAAEAAAA/AABAAAA/wAAAAAAAAEAAAAABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQEDgACAAAD8AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAEAAAA/AAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAQAAAgAEAAQAAAMAAAEBAQEAAAQAAAD8AAQAAAD+AAAAAAAAAgCAAIACAAOAAAMABwAAAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAAEAIAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAABAAAAPyAAAADAP+AAAAAgP8A/4AAAACA/wD/gAAAAIAAAQAAAAAEAAQAAAUAAAEBAQEBAQMAAQAAAPwAAAADAAQAAAD8AAAAAQAAAAACAIAAgAQABAAAAwAHAAABAQEBAQEBAQCAA4AAAPyAAYAAAACAAAAEAAAA/IAAAAIA/4AAAACAAAMAgACABAAEAAADAAcACwAAAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgP4A/4AAAACAAAAABAAAAIAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD8AAAABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAYAgACABAAEAAADAAcACwAPABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/oAAAACAAAD+gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAID/AP+AAAAAgAAA/4AAAACAAAEAgACAAQADgAADAAABAQEBAIAAgAAA/4ADgAAA/QAAAAAAAAUAgACABAAEAAADAAcACwAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/YAAAACAAAABgAAAAIAAAAQAAAD8gAAAAwD/gAAAAIAAAP+AAAAAgP4A/4AAAACAAAD/gAAAAIAAAAABAAADAAQABAAAAwAAAQEBAQAABAAAAPwABAAAAP8AAAAAAAAHAIAAgAQABAAAAwAHAAsADwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAABgAAAAIAAAP2AAAAAgAAAAYAAAACAAAD9gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAIAAAP+AAAAAgP8A/4AAAACAAAD/gAAAAIAAAAAEAAAAAAQAAgAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8AAgAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQAAAAAEAAQAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAQAAAD/gAAA/4AAAP+AAAD9gAAAAAEBAAAAAgAEAAADAAABAQEBAQABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQECgAGAAAD8AAAAAIAAAACAAAAAgAAAAQAEAAAA/AAAAAGAAAABAAAAAIAAAACAAAAAAAABAAABAAQAAgAAAwAAAQEBAQAABAAAAPwAAgAAAP8AAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAgACAAAA/AAAAACAAAAAgAAAAIAAAACABAAAAPwAAAACAAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEDAAEAAAD8AAAAAQAAAAEAAAABAAIAAAD+AAAAAIAAAACAAAAAgAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAIAAAAAgAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/4AAAP4AAAAAAAADAAAAAAQABAAAGwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAIAAYAAAACAAAD/gAAA/4AAAP+AAAD/gP4AAIAAAACAAAAAgAAAAIAAAP6AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAQAAAP+AAAD+gAAAAIAAAACAAAAAgAAA/oAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAIAAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAGAAAABAAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAAAAAAEAAAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAYAAAP6AAgABgAAA/oD9gAGAAAD+gAIAAYAAAP6ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAP6AAAAAAQIAAgAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD+AAAAAAAABACAAIAEAAQAAAMABwAjACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAD/AAGAAQAAAP8A/gAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4ABgACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAAAAA/wAAAP+AAAD/gAAAAIAAAACAAAABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAGAAAD/gAAAAAQAAAAABAAEAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ADgACAAAD/gPyAAIAAAP+AA4AAgAAA/4AEAAAA/4AAAACAAAD/gAAA/QAAAP+AAAAAgAAA/4AAAAABAAAAAAIAAgAAAwAAAQEBAQAAAgAAAP4AAgAAAP4AAAAAAAAEAAAAAAIABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAQABAAAA/wD/AAEAAAD/AAEAAQAAAP8ABAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAAAAP8AAAAAAQCAAQADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAAGAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAOAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAAAABAQABAAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAACAAAD+gAAAAYAAAP+AAAABAAAAAIAAAAAAAAEBAAEABAADgAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQIAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAP6AAAABgAAA/4ADgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAOAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAAAAQAAAP+AAAAAAAABAQAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAA/4AAAP6AAAD/gAAAAIAAAACABAAAAP8AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAAAACAIAAgAOAA4AAAwAJAAABAQEBAQEBAQEBAIADAAAA/QAAgAAAAgAAAP8AAAADgAAA/QAAAAKA/gAAAAEAAAABAAAAAAIAgACABAAEAAAbACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAD/gAAAAIAAAACAAAAAgAAA/4AAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4D/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAEAAAIABAADAAADAAABAQEBAAAEAAAA/AADAAAA/wAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/gAEAAAA/gAAAP+AAAD/gAAA/4AAAP+AAAAAAAABAAACAAIABAAAAwAAAQEBAQAAAgAAAP4ABAAAAP4AAAAAAAACAQAAgAOAA4AAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP8AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAACAAAAAgAAA/wAAAACAAIAAAACAAAADgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgP+AAAAAgAADAAAAAAQABAAACwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAGAAAD/gAAA/4AAAP+AAAD/gAAAAIACgAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgACAAIAAAP+AAAD+gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAAAYAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAA/oAAAP6AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgCAAIADgAQAAA8AHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAABAAAAAIAAAP+AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAgAAA/4AAAP8AAAD/AAAA/4AAAACABAAAAP+AAAAAgAAA/wAAAP+AAAAAgAAA/4AAAAEAAAD+gAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAABAAAAAAQAA4AACwAAAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD8AAAAAIAAAACAA4AAAP+AAAD/gAAA/YAAAAKAAAAAgAAAAAAAAQAAAAACAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAAAAAQIAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDgACAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQCAAIAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/oAAAAEAAAD/AAAAAYAAAACAAAAAgAAAAIAAAAAAACAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AEMARwBLAE8AUwBXAFsAXwBjAGcAawBvAHMAdwB7AH8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gPyAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/YAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D8gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gP2AAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/IAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAQAAAAAEAAQAAAsAAAEBAQEBAQEBAQEBAQAABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/oAEAAAA/oAAAP8AAAD/gAAA/4AAAP+AAAAAAAABAAABgAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAAAAAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP2AAAACAAAAAIAAAACAAAAAAAABAYAAAAQAAoAABQAAAQEBAQEBAYACgAAA/oAAAP8AAoAAAP8AAAD+gAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAAACgAAAAIAAAACAAAAAgAAA/AAEAAAA/wAAAP8AAAD/AAAA/wAAAAACAAAAAAQABAAAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAAAEAAAAEAAAA/4AAAP+AAAD/gAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAgAAAAIAAAP8A/wAAAAEAAAEBgAGABAAEAAAFAAABAQEBAQEBgAEAAAABgAAA/YAEAAAA/oAAAP8AAAAAAQAAAAACgAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD+AAAAAoAAAACAAAAAgAAAAAAAAQGAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQGAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAQAAAACAAAAAAAABAAABgAQABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAgAAAP2AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAABgAQAAoAAAwAAAQEBAQAABAAAAPwAAoAAAP8AAAAAAAABAYAAAAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPwAAAAAAAABAYAAAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAKAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD+AAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD9gAAAAgAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAgAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQAAAYACgAKAAAMAAAEBAQEAAAKAAAD9gAKAAAD/AAAAAAAAAQGAAAACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD9gAAAAAAAAQAAAYAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAABAAAAAIAAAAEAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAYACgAAA/AAAAACAAAAAgAAAAIAEAAAA/AAAAAEAAAABAAAAAQAAAAABAAAAAAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAA/oAAAAEAAAABAAAAAIAAAACABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAQAAAAEAAAD+gAAA/wAAAP+AAAD/gAAA/4AEAAAA/wAAAP8AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAABAAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAACgAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAABAAAAAIAAAAAAAAEAAAAABAAEAAAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQAAAAACgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD9gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAQAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAKAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAYACgAQAAAMAAAEBAQEBgAEAAAD/AAQAAAD9gAAAAAAAAQGAAYAEAAKAAAMAAAEBAQEBgAKAAAD9gAKAAAD/AAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAABAAAAAAQABAAAIwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQGAAYACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD/AAAAAAAAAQAAAAAEAAKAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAAAAEAAAGAAoAEAAAFAAABAQEBAQEBgAEAAAD9gAAAAYAEAAAA/YAAAAEAAAAAAQAAAAACgAKAAAUAAAEBAQEBAQAAAoAAAP8AAAD+gAKAAAD9gAAAAYAAAAABAAAAAAQABAAAHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAQAAAACAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEBgAEAAAABgAAA/oAAAP8AAAD+gAAAAYAEAAAA/oAAAP8AAAD+gAAAAYAAAAEAAAAAAAABAAAAAAQAAoAABwAAAQEBAQEBAQEAAAQAAAD+gAAA/wAAAP6AAoAAAP8AAAD+gAAAAYAAAAAAAAEBgAAABAAEAAAHAAABAQEBAQEBAQGAAQAAAAGAAAD+gAAA/wAEAAAA/oAAAP8AAAD+gAAAAAAAAQAAAAACgAQAAAcAAAEBAQEBAQEBAYABAAAA/wAAAP6AAAABgAQAAAD8AAAAAYAAAAEAAAAAAAABAAABgAQABAAABwAAAQEBAQEBAQEBgAEAAAABgAAA/AAAAAGABAAAAP6AAAD/AAAAAQAAAAAAAAQBAAEAAwADAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAYABAAAA/wD/gACAAAD/gAGAAIAAAP+A/wABAAAA/wADAAAA/4AAAAAAAAD/AAAAAQAAAP8AAAAAAAAA/4AAAAACAIAAgAOAA4AACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADgAAA/4AAAP4AAAD/gAAAAIAAAAIAAAD/gP8AAAABAAACAAAAAAQABAAAEwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAgAAA/4AAAACAAAABAAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAAAIAAAAAgAAA/4D/gAAA/wAAAP+AAAAAgAAAAQAAAACAABAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP+AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4AEAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAQAAAAAAQABAAAAwAHAAsADwATABcAGwAfACMAJwArAC8AMwA3ADsAPwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D8gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAwCAAIADgAQAABcAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAAEAAAD/AAAAAIAAAP+AAAABAAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAP+AAAAAgAAA/4AAAACAAAAEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAYAAAACAAAD/gP+AAAAAgP8A/4AAAACAAAAAAQCAAIADgAOAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP+AAAD/AAAA/4AAAP+AAAAAgAOAAAD/gAAA/wAAAP+AAAD/AAAAAQAAAACAAAABAAAAAAAAAgCAAIADgAOAAAMACQAAAQEBAQEBAQEBAQCAAwAAAP0AAYAAAP8AAAACAAAAA4AAAP0AAAACgP8AAAD/AAAAAgAAAAABAIAAgAOAA4AAAwAAAQEBAQCAAwAAAP0AA4AAAP0AAAAAAAACAIAAgAOAA4AAAwALAAABAQEBAQEBAQEBAQEAgAMAAAD9AACAAAACAAAA/4AAAP8AAAADgAAA/QAAAAKA/gAAAAIAAAD/AAAAAQAAAQAAAAAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAAAAgAAAACAAAAAAAABAQABAAMAAwAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAP+AAAD/AAAA/4AAAACAAwAAAP+AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAQAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAACAAAD/gAAA/4AAAAEAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+AAAAAIAAAAGAAAAAgAAA/gAAAAGAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgAAA/4AAAACA/4D/gAAAAIAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+gAAAAYAAAP4AAAAAgAAAAYAAAACAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgP+A/4AAAACAAAD/gAAAAIAABgCAAIAEAAQAABMAFwAbAB8AIwAnAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAAAAEAAAAAgAAAAAAAgAAA/oAAgAAA/4ACAACAAAD/gP4AAIAAAP+AAgAAgAAA/4AEAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAAAIAAAACAAAAAgAAA/4D/gAAAAIABAAAA/4AAAACAAAD/gAAA/oAAAP+AAAAAgAAA/4AAAAACAQAAgAOABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP+AAAD/gAAAAIAAAP+AAAD/gAAA/4AAAACAAAD/gAAAAQAAAP8A/4AAgAAA/4AEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAQABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYACgAAA/4AAAP+AAAD/gAAAAIAAAP+AAAD+gAAAAQAAAP8AAAABAAAAAIAAAP8A/wAAgAAA/4AEAAAA/gAAAAEAAAD/gAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAIAAAACAAAD+gAAA/wAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABAAAAAIAAAACAAAAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP+AAAAAgAAAAQAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAABAAAAAIAAAP+ABAAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABgAAA/4AAAACAAAAAAAABAIAAgAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACABAAAAP+AAAAAgAAA/4AAAP6AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAABgAAAAAAAAQCAAIAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAQAAAsAAAEBAQEBAQEBAQEBAQIAAYAAAP8AAAD/gAAA/wAAAACAAAAAgAQAAAD/AAAA/gAAAP+AAAABAAAAAIAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQGAAoAAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AAAP8AAAAAgAAAAIAEAAAA/QAAAP+AAAABAAAAAIAAAAEAAAD+AAAA/4AAAAEAAAAAgAAAAAAAAAAYASYAAQAAAAAAAAAIAAAAAQAAAAAAAQAIAAgAAQAAAAAAAgAHABAAAQAAAAAAAwAIABcAAQAAAAAABAAQAB8AAQAAAAAABQALAC8AAQAAAAAABgAIADoAAQAAAAAACQAJAEIAAQAAAAAACgA6AEsAAQAAAAAADQARAIUAAQAAAAAADgAyAJYAAQAAAAAAEwAMAMgAAwABBAkAAAAQANQAAwABBAkAAQAQAOQAAwABBAkAAgAOAPQAAwABBAkAAwAQAQIAAwABBAkABAAgARIAAwABBAkABQAWATIAAwABBAkABgAQAUgAAwABBAkACQASAVgAAwABBAkACgB0AWoAAwABBAkADQAiAd4AAwABBAkADgBkAgAAAwABBAkAEwAYAmQoYykgMjAyMlVyc2FGb250UmVndWxhclVyc2FGb250VXJzYUZvbnQgUmVndWxhclZlcnNpb24gMS4wVXJzYUZvbnRVcnNhRnJhbmtBbiBvcGVuIGxpY2VuY2UgZ2VuZXJhbCBwdXJwb3NlIHRleHRtb2RlIGZvbnQgYnkgVXJzYUZyYW5rQ0MwIDEuMCBVbml2ZXJzYWxodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvcHVibGljZG9tYWluL3plcm8vMS4wL0hlbGxvIFdvcmxkIQAoAGMAKQAgADIAMAAyADIAVQByAHMAYQBGAG8AbgB0AFIAZQBnAHUAbABhAHIAVQByAHMAYQBGAG8AbgB0AFUAcgBzAGEARgBvAG4AdAAgAFIAZQBnAHUAbABhAHIAVgBlAHIAcwBpAG8AbgAgADEALgAwAFUAcgBzAGEARgBvAG4AdABVAHIAcwBhAEYAcgBhAG4AawBBAG4AIABvAHAAZQBuACAAbABpAGMAZQBuAGMAZQAgAGcAZQBuAGUAcgBhAGwAIABwAHUAcgBwAG8AcwBlACAAdABlAHgAdABtAG8AZABlACAAZgBvAG4AdAAgAGIAeQAgAFUAcgBzAGEARgByAGEAbgBrAEMAQwAwACAAMQAuADAAIABVAG4AaQB2AGUAcgBzAGEAbABoAHQAdABwAHMAOgAvAC8AYwByAGUAYQB0AGkAdgBlAGMAbwBtAG0AbwBuAHMALgBvAHIAZwAvAHAAdQBiAGwAaQBjAGQAbwBtAGEAaQBuAC8AegBlAHIAbwAvADEALgAwAC8ASABlAGwAbABvACAAVwBvAHIAbABkACEAAAADAAAAAAAAAGYAMwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==\r\n";

window.P5Asciify = P5Asciify; // Expose P5Asciify to the global scope

window.preload = function () { }; // In case the user doesn't define a preload function, we need to define it here to avoid errors
window.draw = function () { noLoop(); }; // In case the user doesn't define a draw function, we need to define it here to avoid errors

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
    this._incrementPreload();
    this.loadFont(
        URSAFONT_BASE64,
        (loadedFont) => {
            P5Asciify.font = loadedFont;
        },
        () => { throw new P5AsciifyError(`loadAsciiFont() | Failed to load font from path: '${font}'`); }
    );
};
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
        P5Asciify.font = loadedFont;
        this._decrementPreload();
        if (this.frameCount > 0) {
            P5Asciify.brightnessCharacterSet.setFontObject(loadedFont);
            P5Asciify.edgeCharacterSet.setFontObject(loadedFont);
            P5Asciify.grid.resizeCellPixelDimensions(
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
    if (this._renderer.drawingContext instanceof CanvasRenderingContext2D) {
        throw new P5AsciifyError("WebGL renderer is required for p5.asciify to work.");
    }

    if (P5AsciifyUtils.compareVersions(this.VERSION, "1.8.0") < 0) {
        throw new P5AsciifyError("p5.asciify requires p5.js v1.8.0 or higher to work.");
    }

    P5Asciify.setup();
};
p5.prototype.registerMethod("afterSetup", p5.prototype.setupAsciifier);

p5.prototype.resetAsciiGrid = function () {
    P5Asciify.grid.reset();
    P5Asciify.sampleFramebuffer.resize(P5Asciify.grid.cols, P5Asciify.grid.rows);
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
    const validOptions = ["common", "brightness", "edge"];
    const unknownOptions = Object.keys(options).filter(option => !validOptions.includes(option));

    if (unknownOptions.length) {
        console.warn(`P5Asciify: Unknown options detected (${unknownOptions.join(', ')}). Refer to the documentation for valid options.`);
        unknownOptions.forEach(option => delete options[option]);
    }

    const { brightness: brightnessOptions, edge: edgeOptions, common: commonOptions } = options;

    const colorOptions = [brightnessOptions, edgeOptions];
    colorOptions.forEach(opt => {
        if (opt?.characterColor) opt.characterColor = P5AsciifyUtils.hexToShaderColor(opt.characterColor);
        if (opt?.backgroundColor) opt.backgroundColor = P5AsciifyUtils.hexToShaderColor(opt.backgroundColor);
    });

    if (commonOptions?.fontSize && (commonOptions.fontSize < 1 || commonOptions.fontSize > 128)) {
        console.warn(`P5Asciify: Font size ${commonOptions.fontSize} is out of bounds. It should be between 1 and 128. Font size not updated.`);
        delete commonOptions.fontSize;
    }

    if (edgeOptions?.characters !== undefined && edgeOptions.characters.length !== 8) {
        console.warn(`P5Asciify: The edge character set must contain exactly 8 characters. Character set not updated.`);
        delete edgeOptions.characters;
    }

    P5Asciify.setDefaultOptions(brightnessOptions, edgeOptions, commonOptions);
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
        pre: P5Asciify.preEffectManager,
        post: P5Asciify.afterEffectManager
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
};

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

    if (P5Asciify.preEffectManager.hasEffect(effectInstance)) {
        P5Asciify.preEffectManager.removeEffect(effectInstance);
        removed = true;
    }

    if (P5Asciify.afterEffectManager.hasEffect(effectInstance)) {
        P5Asciify.afterEffectManager.removeEffect(effectInstance);
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
    P5Asciify.sketchFramebuffer.begin();
    this.push();
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
    this.pop();
    P5Asciify.sketchFramebuffer.end();
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
p5.prototype.asciify = function () { P5Asciify.asciify(); };
p5.prototype.registerMethod("post", p5.prototype.asciify);
