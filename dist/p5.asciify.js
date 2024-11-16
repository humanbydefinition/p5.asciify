(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('p5')) :
    typeof define === 'function' && define.amd ? define(['p5'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.P5Asciify = factory(global.p5));
})(this, (function (p5) { 'use strict';

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
        setUniforms(framebuffer, frameCount) {
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
        setup(p5Instance) {
            this.p5Instance = p5Instance;
            this.texture = this.p5Instance.createFramebuffer({ width: 1, height: 1,  depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });

            if (Object.keys(this.palettes).length > 0) {
                this.updateTexture();
            }
        }

        addInstance(p5Instance) {
            this.p5Instance = p5Instance;
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
                let colors = this.palettes[id].map(c => this.p5Instance.color(c)); // Convert to p5.Color objects
                this.paletteRows[id] = rowIndex; // Update the row index for the current palette
                for (let x = 0; x < colors.length; x++) {
                    let index = (rowIndex * maxColors + x) * 4;
                    let col = colors[x];
                    this.texture.pixels[index] = this.p5Instance.red(col);
                    this.texture.pixels[index + 1] = this.p5Instance.green(col);
                    this.texture.pixels[index + 2] = this.p5Instance.blue(col);
                    this.texture.pixels[index + 3] = this.p5Instance.alpha(col);
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
            this._shader.setUniform('u_resolution', [framebuffer.width, framebuffer.height]);
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
        setUniforms(framebuffer, frameCount) {
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

    var kaleidoscopeShader = "precision lowp float;\n#define GLSLIFY 1\nuniform sampler2D u_image;uniform int u_segments;uniform float u_angle;\n#define PI 3.1415926535897932384626433832795\nvarying vec2 v_texCoord;void main(){if(u_segments==1){vec2 mirroredCoord=v_texCoord;if(v_texCoord.x>0.5){mirroredCoord.x=1.0-mirroredCoord.x;}vec4 color=texture2D(u_image,mirroredCoord);gl_FragColor=color;}else{float angle=2.0*PI/float(u_segments);vec2 centeredCoord=v_texCoord-0.5;float currentAngle=atan(centeredCoord.y,centeredCoord.x);float radius=length(centeredCoord);currentAngle=mod(currentAngle,angle);currentAngle=angle/2.0-abs(currentAngle-angle/2.0);currentAngle+=u_angle;vec2 rotatedCoord=vec2(cos(currentAngle),sin(currentAngle))*radius;vec2 finalCoord=rotatedCoord+0.5;vec4 color=texture2D(u_image,finalCoord);gl_FragColor=color;}}"; // eslint-disable-line

    var distortionShader = "precision highp float;\n#define GLSLIFY 1\nuniform sampler2D u_image;uniform float u_time;uniform float u_frequency;uniform float u_amplitude;varying vec2 v_texCoord;void main(){vec2 uv=v_texCoord;float sineWave=sin(uv.y*u_frequency+u_time)*u_amplitude;vec2 distort=vec2(sineWave,sineWave);vec4 texColor=texture2D(u_image,mod(uv+distort,1.0));gl_FragColor=texColor;}"; // eslint-disable-line

    var grayscaleShader = "precision highp float;\n#define GLSLIFY 1\nuniform sampler2D u_image;varying vec2 v_texCoord;void main(){vec4 color=texture2D(u_image,v_texCoord);float luminance=0.299*color.r+0.587*color.g+0.114*color.b;color.rgb=vec3(luminance);gl_FragColor=color;}"; // eslint-disable-line

    var invertShader = "precision highp float;\n#define GLSLIFY 1\nuniform sampler2D u_image;varying vec2 v_texCoord;void main(){vec4 color=texture2D(u_image,v_texCoord);color.rgb=1.0-color.rgb;gl_FragColor=color;}"; // eslint-disable-line

    var chromaticAberrationShader = "precision highp float;\n#define GLSLIFY 1\nuniform sampler2D u_image;uniform float u_aberrationAmount;uniform float u_aberrationAngle;varying vec2 v_texCoord;void main(){vec2 redOffset=vec2(u_aberrationAmount*cos(u_aberrationAngle),u_aberrationAmount*sin(u_aberrationAngle));vec2 greenOffset=vec2(0.0,0.0);vec2 blueOffset=vec2(-u_aberrationAmount*cos(u_aberrationAngle),-u_aberrationAmount*sin(u_aberrationAngle));float red=texture2D(u_image,v_texCoord+redOffset).r;float green=texture2D(u_image,v_texCoord+greenOffset).g;float blue=texture2D(u_image,v_texCoord+blueOffset).b;vec4 color=vec4(red,green,blue,1.0);gl_FragColor=color;}"; // eslint-disable-line

    var rotateShader = "precision highp float;\n#define GLSLIFY 1\nuniform sampler2D u_image;uniform float u_angle;varying vec2 v_texCoord;void main(){vec2 centeredCoord=v_texCoord-0.5;vec2 rotatedCoord;rotatedCoord.x=centeredCoord.x*cos(u_angle)-centeredCoord.y*sin(u_angle);rotatedCoord.y=centeredCoord.x*sin(u_angle)+centeredCoord.y*cos(u_angle);vec2 finalCoord=rotatedCoord+0.5;finalCoord.y=1.0-finalCoord.y;vec4 color=texture2D(u_image,finalCoord);gl_FragColor=color;}"; // eslint-disable-line

    var brightnessShader = "precision highp float;\n#define GLSLIFY 1\nuniform sampler2D u_image;uniform float u_brightness;varying vec2 v_texCoord;void main(){vec4 color=texture2D(u_image,v_texCoord);color.rgb+=u_brightness;color.rgb=clamp(color.rgb,0.0,1.0);gl_FragColor=color;}"; // eslint-disable-line

    var colorPaletteShader = "precision mediump float;\n#define GLSLIFY 1\nuniform sampler2D u_image;uniform sampler2D u_colorPalette;uniform vec2 u_colorPaletteDimensions;uniform int u_colorPaletteRow;uniform float u_colorPaletteLength;uniform vec2 u_resolution;void main(){vec2 uv=gl_FragCoord.xy/u_resolution;vec4 texColor=texture2D(u_image,uv);float gray=(texColor.r+texColor.g+texColor.b)/3.0;float paletteX=gray*(u_colorPaletteLength-1.0);float paletteTexelPosition=(floor(paletteX)+0.5)/u_colorPaletteDimensions.x;float rowPosition=float(u_colorPaletteRow)+0.5;float rowTexCoord=rowPosition/u_colorPaletteDimensions.y;vec4 paletteColor=texture2D(u_colorPalette,vec2(paletteTexelPosition,rowTexCoord));gl_FragColor=paletteColor;}"; // eslint-disable-line

    var vertexShader = "precision lowp float;\n#define GLSLIFY 1\nattribute vec3 aPosition;attribute vec2 aTexCoord;varying vec2 v_texCoord;void main(){vec4 positionVec4=vec4(aPosition,1.0);positionVec4.xy=positionVec4.xy*2.0-1.0;gl_Position=positionVec4;v_texCoord=aTexCoord;}"; // eslint-disable-line

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
        _effects = [];

        constructor(colorPalette) {
            this.colorPalette = colorPalette;
        }

        addInstance(p5Instance) {
            this.p5Instance = p5Instance;
        }

        setup() {
            this.prevFramebuffer = this.p5Instance.createFramebuffer({ depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });
            this.nextFramebuffer = this.p5Instance.createFramebuffer({ depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });

            this.setupShaders();
            this.setupEffectQueue();
        }

        render(inputFramebuffer) {
            this.prevFramebuffer.begin();
            this.p5Instance.clear();
            this.p5Instance.image(inputFramebuffer, -this.p5Instance.width / 2, -this.p5Instance.height / 2, this.p5Instance.width, this.p5Instance.height);
            this.prevFramebuffer.end();

            this.nextFramebuffer.begin();
            this.p5Instance.clear();
            this.p5Instance.image(inputFramebuffer, -this.p5Instance.width / 2, -this.p5Instance.height / 2, this.p5Instance.width, this.p5Instance.height);
            this.nextFramebuffer.end();

            for (const effect of this._effects) {
                if (effect.enabled) {
                    // Swap framebuffers only if the effect is enabled
                    [this.prevFramebuffer, this.nextFramebuffer] = [this.nextFramebuffer, this.prevFramebuffer];

                    this.nextFramebuffer.begin();
                    this.p5Instance.shader(effect.shader);
                    effect.setUniforms(this.prevFramebuffer, this.p5Instance.frameCount);
                    this.p5Instance.rect(0, 0, this.p5Instance.width, this.p5Instance.height);
                    this.nextFramebuffer.end();
                }
            }
        }

        setupShaders() {
            for (let effectName in this.effectShaders) {
                this.effectShaders[effectName] = this.p5Instance.createShader(vertexShader, this.effectShaders[effectName]);
            }
        }

        setupEffectQueue() {
            for (let effectInstance of this._setupQueue) {
                effectInstance.setup();
                effectInstance.shader = this.effectShaders[effectInstance.name];
            }

            this._setupQueue = [];
        }

        addExistingEffectAtIndex(effectInstance, index) {
            effectInstance.shader = this.effectShaders[effectInstance.name];
            this._effects.splice(index, 0, effectInstance);

            if (this.p5Instance.frameCount === 0) {
                this._setupQueue.push(effectInstance);
            }
        }

        getEffectIndex(effectInstance) {
            return this._effects.indexOf(effectInstance);
        }

        addEffect(effectName, userParams = {}) {
            const shader = this.p5Instance.frameCount === 0 ? null : this.effectShaders[effectName];
            const params = { ...this.effectParams[effectName], ...userParams };
            const effectInstance = this.effectConstructors[effectName]({ shader, params });
            this._effects.push(effectInstance);

            if (this.p5Instance.frameCount === 0) {
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
        constructor({ p5Instance, type, font, characters, fontSize }) {
            this.p5Instance = p5Instance;
            this.type = type;
            this.font = font;
            this.fontSize = fontSize;

            this.fontGlyphs = Object.values(this.font.font.glyphs.glyphs).filter(glyph => glyph.unicode !== undefined);
            this.characters = this.validateCharacters(characters);
            this.characterGlyphs = this.loadCharacterGlyphs();

            this.maxGlyphDimensions = this.getMaxGlyphDimensions(this.fontSize);

            this.createTexture(this.fontSize);
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
            this.createTexture(this.fontSize);
        }

        /**
         * Sets the characters to be used in the character set and creates a new texture.
         * @param {string} characters - The string of characters to set.
         */
        setCharacterSet(characters) {
            this.characters = this.validateCharacters(characters);
            this.characterGlyphs = this.loadCharacterGlyphs();
            this.createTexture(this.fontSize);
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
            this.createTexture(this.fontSize);
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
            this.createTexture(this.fontSize);
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
                this.texture = this.p5Instance.createFramebuffer({ width: dimensions.width * this.charsetCols, height: dimensions.height * this.charsetRows,  depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });
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
            this.p5Instance.clear();
            this.p5Instance.textFont(this.font);
            this.p5Instance.fill(255);
            this.p5Instance.textSize(fontSize);
            this.p5Instance.textAlign(this.p5Instance.LEFT, this.p5Instance.TOP);
            this.p5Instance.noStroke();

            for (let i = 0; i < this.characters.length; i++) {
                const col = i % this.charsetCols;
                const row = Math.floor(i / this.charsetCols);
                const x = dimensions.width * col - ((dimensions.width * this.charsetCols) / 2);
                const y = dimensions.height * row - ((dimensions.height * this.charsetRows) / 2);
                this.p5Instance.text(this.characters[i], x, y);
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
            this.createTexture(this.fontSize);
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

        constructor(p5Instance, cellWidth, cellHeight) {
            this.p5Instance = p5Instance;
            this.cellWidth = cellWidth;
            this.cellHeight = cellHeight;

            this.reset();
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

            this.offsetX = Math.floor((this.p5Instance.width - this.width) / 2);
            this.offsetY = Math.floor((this.p5Instance.height - this.height) / 2);
        }

        /**
         * Calculates the number of columns and rows for the grid based on the current cell dimensions.
         * @returns {number[]} An array containing the number of columns and rows.
         * @private
         */
        _calculateGridCellDimensions() {
            const cellsX = Math.floor(this.p5Instance.width / this.cellWidth);
            const cellsY = Math.floor(this.p5Instance.height / this.cellHeight);
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

    class P5AsciifyGradient {
        constructor(type, shader, brightnessStart, brightnessEnd, colorPalette, palette) {
            this._type = type;
            this._shader = shader;

            // map brightness start from 0-255 to 0-1
            this._brightnessStart = Math.floor((brightnessStart / 255) * 100) / 100;
            this._brightnessEnd = Math.ceil((brightnessEnd / 255) * 100) / 100;
            this._colorPalette = colorPalette;
            this._palette = palette;

            this._enabled = true;

            this._onPaletteChangeCallback = null;
        }

        registerPaletteChangeCallback(callback) {
            this._onPaletteChangeCallback = callback;
        }

        setup(shader, palette) {
            this._shader = shader;
            this._palette = palette;
            this.paletteId = this._colorPalette.addPalette(this._palette);
        }

        setUniforms(framebuffer, referenceFramebuffer) {
            this._shader.setUniform("textureID", framebuffer);
            this._shader.setUniform("originalTextureID", referenceFramebuffer);
            this._shader.setUniform("gradientTexture", this._colorPalette.texture);
            this._shader.setUniform("gradientTextureRow", this._colorPalette.getPaletteRow(this.paletteId));
            this._shader.setUniform("gradientTextureDimensions", [this._colorPalette.texture.width, this._colorPalette.texture.height]);
            this._shader.setUniform("gradientTextureLength", this._palette.length);
            this._shader.setUniform("u_brightnessStart", this._brightnessStart);
            this._shader.setUniform("u_brightnessEnd", this._brightnessEnd);
            this._shader.setUniform("u_brightnessRange", [this._brightnessStart, this._brightnessEnd]);
            this._shader.setUniform("frameCount", frameCount);
        }

        set palette(value) {
            if (this._onPaletteChangeCallback) {
                this._onPaletteChangeCallback(this, value);
            }
        }

        get type() {
            return this._type;
        }

        get enabled() {
            return this._enabled;
        }

        set enabled(value) {
            this._enabled = value;
        }

        get brightnessStart() {
            return this._brightnessStart;
        }

        set brightnessStart(value) {
            this._brightnessStart = value;
        }

        get brightnessEnd() {
            return this._brightnessEnd;
        }

        set brightnessEnd(value) {
            this._brightnessEnd = value;
        }
    }

    class P5AsciifyLinearGradient extends P5AsciifyGradient {

        constructor({ type, shader, brightnessStart, brightnessEnd, colorPalette, palette, direction, angle, speed = 0.01}) {
            super(type, shader, brightnessStart, brightnessEnd, colorPalette, palette);

            this._direction = direction;
            this._angle = angle;
            this._speed = speed;
        }

        setUniforms(framebuffer, referenceFramebuffer) {
            super.setUniforms(framebuffer, referenceFramebuffer);
            this._shader.setUniform('u_gradientDirection', this._direction);
            this._shader.setUniform('u_angle',  this._angle * Math.PI / 180);
            this._shader.setUniform('u_speed', this._speed);
        }

        get direction() {
            return this._direction;
        }

        set direction(value) {
            this._direction = value;
        }

        get angle() {
            return this._angle;
        }

        set angle(value) {
            this._angle = value;
        }

        get speed() {
            return this._speed;
        }

        set speed(value) {
            this._speed = value;
        }
    }

    class P5AsciifyZigZagGradient extends P5AsciifyGradient {

        constructor({ type, shader, brightnessStart, brightnessEnd, colorPalette, palette, direction, angle, speed = 0.01 }) {
            super(type, shader, brightnessStart, brightnessEnd, colorPalette, palette);

            this._direction = direction;
            this._angle = angle;
            this._speed = speed;
        }

        setUniforms(framebuffer, referenceFramebuffer) {
            super.setUniforms(framebuffer, referenceFramebuffer);
            this._shader.setUniform('u_gradientDirection', this._direction);
            this._shader.setUniform('u_angle',  this._angle * Math.PI / 180);
            this._shader.setUniform('u_speed', this._speed);
        }

        get direction() {
            return this._direction;
        }

        set direction(value) {
            this._direction = value;
        }

        get angle() {
            return this._angle;
        }

        set angle(value) {
            this._angle = value;
        }

        get speed() {
            return this._speed;
        }

        set speed(value) {
            this._speed = value;
        }
    }

    class P5AsciifySpiralGradient extends P5AsciifyGradient {

        constructor({ type, shader, brightnessStart, brightnessEnd, colorPalette, palette, direction, centerX, centerY, speed, density}) {
            super(type, shader, brightnessStart, brightnessEnd, colorPalette, palette);

            this._direction = direction;
            this._centerX = centerX;
            this._centerY = centerY;
            this._speed = speed;
            this._density = density;
        }

        setUniforms(framebuffer, referenceFramebuffer) {
            super.setUniforms(framebuffer, referenceFramebuffer);
            this._shader.setUniform('u_gradientDirection', this._direction);
            this._shader.setUniform('u_centerX', this._centerX);
            this._shader.setUniform('u_centerY', this._centerY);
            this._shader.setUniform('u_speed', this._speed);
            this._shader.setUniform('u_density', this._density);
        }

        get direction() {
            return this._direction;
        }

        set direction(value) {
            this._direction = value;
        }

        get centerX() {
            return this._centerX;
        }

        set centerX(value) {
            this._centerX = value;
        }

        get centerY() {
            return this._centerY;
        }

        set centerY(value) {
            this._centerY = value;
        }

        get speed() {
            return this._speed;
        }

        set speed(value) {
            this._speed = value;
        }

        get density() {
            return this._density;
        }

        set density(value) {
            this._density = value;
        }
    }

    class P5AsciifyRadialGradient extends P5AsciifyGradient {

        constructor({ type, shader, brightnessStart, brightnessEnd, colorPalette, palette, direction, centerX, centerY, radius}) {
            super(type, shader, brightnessStart, brightnessEnd, colorPalette, palette);

            this._direction = direction;
            this._centerX = centerX;
            this._centerY = centerY;
            this._radius = radius;
        }

        setUniforms(framebuffer, referenceFramebuffer) {
            super.setUniforms(framebuffer, referenceFramebuffer);
            this._shader.setUniform('u_gradientDirection', this._direction);
            this._shader.setUniform('u_centerX', this._centerX);
            this._shader.setUniform('u_centerY', this._centerY);
            this._shader.setUniform('u_radius', this._radius);
        }

        get direction() {
            return this._direction;
        }

        set direction(value) {
            this._direction = value;
        }

        get centerX() {
            return this._centerX;
        }

        set centerX(value) {
            this._centerX = value;
        }

        get centerY() {
            return this._centerY;
        }

        set centerY(value) {
            this._centerY = value;
        }

        get radius() {
            return this._radius;
        }

        set radius(value) {
            this._radius = value;
        }
    }

    class P5AsciifyConicalGradient extends P5AsciifyGradient {

        constructor({ type, shader, brightnessStart, brightnessEnd, colorPalette, palette,  centerX, centerY, speed}) {
            super(type, shader, brightnessStart, brightnessEnd, colorPalette, palette);

            this._centerX = centerX;
            this._centerY = centerY;
            this._speed = speed;
        }

        setUniforms(framebuffer, referenceFramebuffer) {
            super.setUniforms(framebuffer, referenceFramebuffer);
            this._shader.setUniform('u_centerX', this._centerX);
            this._shader.setUniform('u_centerY', this._centerY);
            this._shader.setUniform('u_speed', this._speed);
        }

        get centerX() {
            return this._centerX;
        }

        set centerX(value) {
            this._centerX = value;
        }

        get centerY() {
            return this._centerY;
        }

        set centerY(value) {
            this._centerY = value;
        }

        get speed() {
            return this._speed;
        }

        set speed(value) {
            this._speed = value;
        }
    }

    class P5AsciifyNoiseGradient extends P5AsciifyGradient {

        constructor({ type, shader, brightnessStart, brightnessEnd, colorPalette, palette, noiseScale, speed, direction }) {
            super(type, shader, brightnessStart, brightnessEnd, colorPalette, palette);

            this._direction = direction;
            this._noiseScale = noiseScale;
            this._speed = speed;
        }

        setUniforms(framebuffer, referenceFramebuffer) {
            super.setUniforms(framebuffer, referenceFramebuffer);
            this._shader.setUniform('direction', this._direction);
            this._shader.setUniform('noiseScale', this._noiseScale);
            this._shader.setUniform('u_speed', this._speed);
        }

        get direction() {
            return this._direction;
        }

        set direction(value) {
            this._direction = value;
        }

        get noiseScale() {
            return this._noiseScale;
        }

        set noiseScale(value) {
            this._noiseScale = value;
        }

        get speed() {
            return this._speed;
        }

        set speed(value) {
            this._speed = value;
        }
    }

    var linearGradientShader = "precision highp float;\n#define GLSLIFY 1\nvarying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform int frameCount;uniform float gradientTextureLength;uniform float u_gradientDirection;uniform float u_speed;uniform float u_angle;uniform int gradientTextureRow;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(texColor.r>=u_brightnessRange[0]&&texColor.r<=u_brightnessRange[1]&&texColor==originalTexColor){float position=gl_FragCoord.x*cos(u_angle)+gl_FragCoord.y*sin(u_angle);float index=mod(position+float(frameCount)*u_gradientDirection*u_speed,gradientTextureLength);index=floor(index);float texelPosition=(index+0.5)/gradientTextureDimensions.x;float rowPosition=float(gradientTextureRow)+0.5;float rowTexCoord=rowPosition/gradientTextureDimensions.y;vec4 gradientColor=texture2D(gradientTexture,vec2(texelPosition,rowTexCoord));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}"; // eslint-disable-line

    var zigzagGradientShader = "precision highp float;\n#define GLSLIFY 1\nvarying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform int frameCount;uniform float gradientTextureLength;uniform float u_gradientDirection;uniform float u_speed;uniform float u_angle;uniform int gradientTextureRow;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(texColor.r>=u_brightnessRange[0]&&texColor.r<=u_brightnessRange[1]&&texColor==originalTexColor){float positionX=gl_FragCoord.x*cos(u_angle)-gl_FragCoord.y*sin(u_angle);float positionY=gl_FragCoord.x*sin(u_angle)+gl_FragCoord.y*cos(u_angle);float rowIndex=floor(positionY);float direction=mod(rowIndex,2.0)==0.0 ? 1.0 :-1.0;float rowPosition=positionX;float index=mod(rowPosition+float(frameCount)*u_speed*direction*u_gradientDirection,gradientTextureLength);index=floor(index);float texelPosition=(index+0.5)/gradientTextureDimensions.x;float gradientRowPosition=float(gradientTextureRow)+0.5;float rowTexCoord=gradientRowPosition/gradientTextureDimensions.y;vec4 gradientColor=texture2D(gradientTexture,vec2(texelPosition,rowTexCoord));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}"; // eslint-disable-line

    var spiralGradientShader = "precision highp float;\n#define GLSLIFY 1\nvarying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform int frameCount;uniform float gradientTextureLength;uniform float u_gradientDirection;uniform float u_centerX;uniform float u_centerY;uniform float u_speed;uniform float u_density;uniform int gradientTextureRow;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(texColor.r>=u_brightnessRange[0]&&texColor.r<=u_brightnessRange[1]&&texColor==originalTexColor){vec2 relativePosition=v_texCoord-vec2(u_centerX,u_centerY);float distance=length(relativePosition);float angle=atan(relativePosition.y,relativePosition.x);float adjustedAngle=angle+float(frameCount)*u_gradientDirection*u_speed;float index=mod((distance+adjustedAngle*u_density)*gradientTextureLength,gradientTextureLength);float normalizedIndex=(floor(index)+0.5)/gradientTextureDimensions.x;float rowPosition=float(gradientTextureRow)+0.5;float rowTexCoord=rowPosition/gradientTextureDimensions.y;vec4 gradientColor=texture2D(gradientTexture,vec2(normalizedIndex,rowTexCoord));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}"; // eslint-disable-line

    var radialGradientShader = "precision highp float;\n#define GLSLIFY 1\nvarying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform float u_centerX;uniform float u_centerY;uniform float gradientTextureLength;uniform float u_radius;uniform int frameCount;uniform int u_gradientDirection;uniform int gradientTextureRow;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(texColor.r>=u_brightnessRange[0]&&texColor.r<=u_brightnessRange[1]&&texColor==originalTexColor){vec2 relativePosition=v_texCoord-vec2(u_centerX,u_centerY);float distance=length(relativePosition);float normalizedDistance=clamp(distance/u_radius,0.0,1.0);float index=normalizedDistance*(gradientTextureLength-1.0);float animatedIndex=mod(index+float(frameCount)*0.1*float(-u_gradientDirection),gradientTextureLength);float normalizedIndex=(floor(animatedIndex)+0.5)/gradientTextureDimensions.x;float rowPosition=float(gradientTextureRow)+0.5;float rowTexCoord=rowPosition/gradientTextureDimensions.y;vec4 gradientColor=texture2D(gradientTexture,vec2(normalizedIndex,rowTexCoord));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}"; // eslint-disable-line

    var conicalGradientShader = "precision highp float;\n#define GLSLIFY 1\nvarying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform float u_centerX;uniform float u_centerY;uniform float gradientTextureLength;uniform int frameCount;uniform float u_speed;uniform int gradientTextureRow;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;void main(){vec2 flippedTexCoord=vec2(v_texCoord.x,v_texCoord.y);vec4 texColor=texture2D(textureID,flippedTexCoord);vec4 originalTexColor=texture2D(originalTextureID,flippedTexCoord);if(texColor.r>=u_brightnessRange[0]&&texColor.r<=u_brightnessRange[1]&&texColor==originalTexColor){vec2 relativePosition=flippedTexCoord-vec2(u_centerX,u_centerY);float angle=atan(relativePosition.y,relativePosition.x);float adjustedAngle=angle+float(frameCount)*u_speed;float normalizedAngle=mod(adjustedAngle+3.14159265,2.0*3.14159265)/(2.0*3.14159265);float index=normalizedAngle*gradientTextureLength;float normalizedIndex=mod(floor(index)+0.5,gradientTextureLength)/gradientTextureDimensions.x;float rowPosition=float(gradientTextureRow)+0.5;float rowTexCoord=rowPosition/gradientTextureDimensions.y;vec4 gradientColor=texture2D(gradientTexture,vec2(normalizedIndex,rowTexCoord));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}"; // eslint-disable-line

    var noiseGradientShader = "precision highp float;\n#define GLSLIFY 1\nvarying vec2 v_texCoord;uniform sampler2D textureID;uniform sampler2D originalTextureID;uniform sampler2D gradientTexture;uniform float gradientTextureLength;uniform int frameCount;uniform float noiseScale;uniform float u_speed;uniform float direction;uniform int gradientTextureRow;uniform vec2 gradientTextureDimensions;uniform vec2 u_brightnessRange;vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}float snoise(vec2 v){const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1;i1=(x0.x>x0.y)? vec2(1.0,0.0): vec2(0.0,1.0);vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.0);vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);m=m*m;m=m*m;vec3 x=2.0*fract(p*C.www)-1.0;vec3 h=abs(x)-0.5;vec3 ox=floor(x+0.5);vec3 a0=x-ox;m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.0*dot(m,g);}void main(){vec4 texColor=texture2D(textureID,v_texCoord);vec4 originalTexColor=texture2D(originalTextureID,v_texCoord);if(texColor.r>=u_brightnessRange[0]&&texColor.r<=u_brightnessRange[1]&&texColor==originalTexColor){vec2 directionVec=vec2(cos(radians(direction)),sin(radians(direction)));vec2 uv=v_texCoord*noiseScale+directionVec*float(frameCount)*u_speed*0.01;float noiseValue=snoise(uv);float normalizedNoiseValue=(noiseValue+1.0)/2.0;float index=normalizedNoiseValue*(gradientTextureLength-1.0);float texelPosition=(floor(index)+0.5)/gradientTextureDimensions.x;float rowPosition=float(gradientTextureRow)+0.5;float rowTexCoord=rowPosition/gradientTextureDimensions.y;vec4 gradientColor=texture2D(gradientTexture,vec2(texelPosition,rowTexCoord));gl_FragColor=vec4(gradientColor.rgb,texColor.a);}else{gl_FragColor=texColor;}}"; // eslint-disable-line

    class P5AsciifyGradientManager {

        gradientParams = {
            "linear": { direction: 1, angle: 0, speed: 0.01 },
            "zigzag": { direction: 1, angle: 0, speed: 0.01 },
            "spiral": { direction: 1, centerX: 0.5, centerY: 0.5, speed: 0.01, density: 0.01 },
            "radial": { direction: 1, centerX: 0.5, centerY: 0.5, radius: 0.5 },
            "conical": { centerX: 0.5, centerY: 0.5, speed: 0.01 },
            "noise": { noiseScale: 0.1, speed: 0.01, direction: 1 },
        }

        gradientShaders = {
            "linear": linearGradientShader,
            "zigzag": zigzagGradientShader,
            "spiral": spiralGradientShader,
            "radial": radialGradientShader,
            "conical": conicalGradientShader,
            "noise": noiseGradientShader,
        }

        gradientConstructors = {
            "linear": ({ type, shader, params }) => new P5AsciifyLinearGradient({ type, shader, ...params }),
            "zigzag": ({ type, shader, params }) => new P5AsciifyZigZagGradient({ type, shader, ...params }),
            "spiral": ({ type, shader, params }) => new P5AsciifySpiralGradient({ type, shader, ...params }),
            "radial": ({ type, shader, params }) => new P5AsciifyRadialGradient({ type, shader, ...params }),
            "conical": ({ type, shader, params }) => new P5AsciifyConicalGradient({ type, shader, ...params }),
            "noise": ({ type, shader, params }) => new P5AsciifyNoiseGradient({ type, shader, ...params }),
        }

        _setupQueue = [];
        _gradients = [];

        constructor(colorPalette) {
            this.colorPalette = colorPalette;
        }

        setup(gradientCharacterSet ) {
            this.gradientCharacterSet = gradientCharacterSet;
            this.setupShaders();
            this.setupGradientQueue();
        }

        addInstance(p5Instance) {
            this.p5Instance = p5Instance;
        }

        setupGradientQueue() {
            for (let gradientInstance of this._setupQueue) {
                this.gradientCharacterSet.appendCharacterSet(gradientInstance._palette);
                gradientInstance.setup(this.gradientShaders[gradientInstance.type], this.gradientCharacterSet.getCharsetColorArray(gradientInstance._palette));
            }

            this._setupQueue = [];
        }

        getGradientParams(gradientName, params) {
            return { ...this.gradientParams[gradientName], ...params };
        }

        addGradient(gradientName, brightnessStart, brightnessEnd, palette, params) {
            const mergedParams = this.getGradientParams(gradientName, { brightnessStart, brightnessEnd, colorPalette: this.colorPalette, palette, ...params });
            const gradient = this.gradientConstructors[gradientName]({ type: gradientName, shader: this.gradientShaders[gradientName], params: mergedParams });
            gradient.registerPaletteChangeCallback(this.handleGradientPaletteChange.bind(this));
            this._gradients.push(gradient);

            if (frameCount === 0) {
                this._setupQueue.push(gradient);
            } else {
                this.gradientCharacterSet.appendCharacterSet(palette);
                gradient.setup(this.gradientShaders[gradientName], this.gradientCharacterSet.getCharsetColorArray(palette));
            }

            return gradient;
        }

        removeGradient(gradient) {
            const index = this._gradients.indexOf(gradient);
            if (index > -1) {
                this._gradients.splice(index, 1);
            }
        }

        handleGradientPaletteChange(gradient, characters) {

            if (frameCount === 0) {
                gradient._palette = characters;
            } else {
                this.gradientCharacterSet.appendCharacterSet(characters);
                gradient._palette = this.gradientCharacterSet.getCharsetColorArray(characters);
                gradient._colorPalette.removePalette(gradient.paletteId);
                gradient.paletteId = gradient._colorPalette.addPalette(gradient._palette);
            }
        }

        setupShaders() {
            for (let gradientName in this.gradientShaders) {
                this.gradientShaders[gradientName] = this.p5Instance.createShader(vertexShader, this.gradientShaders[gradientName]);
            }
        }
    }

    // renderers/AsciiRenderer.js
    class AsciiRenderer {
        /**
         * Constructor for AsciiRenderer.
         * @param {Object} options - Renderer-specific options.
         * @param {P5} p5Instance - The p5.js instance.
         */
        constructor(p5Instance, grid, characterSet, options) {
            if (new.target === AsciiRenderer) {
                throw new TypeError("Cannot construct AsciiRenderer instances directly");
            }
            
            this.p5 = p5Instance;
            this.grid = grid;
            this.characterSet = characterSet;
            this.options = options;
        }

        updateOptions(newOptions) {
            this.options = {
                ...this.options,
                ...newOptions
            };
        }

        /**
         * Render ASCII based on the input framebuffer.
         * @param {Framebuffer} inputFramebuffer - The input framebuffer to base ASCII rendering on.
         */
        render(inputFramebuffer) {
            throw new Error("Must implement render method");
        }

        /**
         * Get the framebuffer containing the ASCII-rendered output.
         * @returns {Framebuffer} The output framebuffer.
         */
        getOutputFramebuffer() {
            return this.outputFramebuffer;
        }
    }

    var asciiBrightnessShader = "precision highp float;\n#define GLSLIFY 1\nuniform sampler2D u_characterTexture;uniform float u_charsetCols;uniform float u_charsetRows;uniform int u_totalChars;uniform sampler2D u_sketchTexture;uniform vec2 u_gridCellDimensions;uniform vec2 u_gridPixelDimensions;uniform vec2 u_gridOffsetDimensions;uniform vec3 u_characterColor;uniform int u_characterColorMode;uniform vec3 u_backgroundColor;uniform int u_backgroundColorMode;uniform float u_rotationAngle;uniform int u_invertMode;mat2 rotate2D(float angle){float s=sin(angle);float c=cos(angle);return mat2(c,-s,s,c);}void main(){vec2 adjustedCoord=(gl_FragCoord.xy-u_gridOffsetDimensions)/u_gridPixelDimensions;if(adjustedCoord.x<0.0||adjustedCoord.x>1.0||adjustedCoord.y<0.0||adjustedCoord.y>1.0){gl_FragColor=vec4(u_backgroundColor,1.0);return;}vec2 gridCoord=adjustedCoord*u_gridCellDimensions;vec2 cellCoord=floor(gridCoord);vec2 centerCoord=cellCoord+vec2(0.5);vec2 baseCoord=centerCoord/u_gridCellDimensions;vec4 sketchColor;sketchColor=texture2D(u_sketchTexture,baseCoord);float brightness=dot(sketchColor.rgb,vec3(0.299,0.587,0.114));int charIndex=int(brightness*float(u_totalChars));if(charIndex>u_totalChars-1){charIndex=u_totalChars-1;}int charCol=charIndex-(charIndex/int(u_charsetCols))*int(u_charsetCols);int charRow=charIndex/int(u_charsetCols);vec2 charCoord=vec2(float(charCol)/u_charsetCols,float(charRow)/u_charsetRows);vec2 fractionalPart=fract(gridCoord)-0.5;fractionalPart=rotate2D(u_rotationAngle)*fractionalPart;fractionalPart+=0.5;vec2 cellMin=charCoord;vec2 cellMax=charCoord+vec2(1.0/u_charsetCols,1.0/u_charsetRows);vec2 texCoord=charCoord+fractionalPart*vec2(1.0/u_charsetCols,1.0/u_charsetRows);bool outsideBounds=any(lessThan(texCoord,cellMin))||any(greaterThan(texCoord,cellMax));vec4 charColor=outsideBounds ? vec4(u_backgroundColor,1.0): texture2D(u_characterTexture,texCoord);if(u_invertMode==1){charColor.a=1.0-charColor.a;charColor.rgb=vec3(1.0);}vec4 finalColor=(u_characterColorMode==0)? vec4(sketchColor.rgb*charColor.rgb,charColor.a): vec4(u_characterColor*charColor.rgb,charColor.a);if(u_backgroundColorMode==0){gl_FragColor=mix(vec4(sketchColor.rgb,1.0),finalColor,charColor.a);}else{gl_FragColor=mix(vec4(u_backgroundColor,1.0),finalColor,charColor.a);}if(outsideBounds){gl_FragColor=(u_backgroundColorMode==0)?(u_invertMode==1 ?(u_characterColorMode==0 ? vec4(sketchColor.rgb,1.0): vec4(u_characterColor,1.0)): vec4(sketchColor.rgb,1.0)):(u_invertMode==1 ?(u_characterColorMode==0 ? vec4(sketchColor.rgb,1.0): vec4(u_characterColor,1.0)): vec4(u_backgroundColor,1.0));}}"; // eslint-disable-line

    // renderers/BrightnessAsciiRenderer.js

    class BrightnessAsciiRenderer extends AsciiRenderer {
        
        constructor(p5Instance, grid, characterSet, options) {
            super(p5Instance, grid, characterSet, options);

            this.shader = this.p5.createShader(vertexShader, asciiBrightnessShader);
            this.outputFramebuffer = this.p5.createFramebuffer({  depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        }

        render(inputFramebuffer) {

            if (!this.options.enabled) {
                this.outputFramebuffer = inputFramebuffer;
                return;
            }

            this.outputFramebuffer.begin();
            this.p5.shader(this.shader);
            this.shader.setUniform('u_characterTexture', this.characterSet.texture);
            this.shader.setUniform('u_charsetCols', this.characterSet.charsetCols);
            this.shader.setUniform('u_charsetRows', this.characterSet.charsetRows);
            this.shader.setUniform('u_totalChars', this.characterSet.characters.length);
            this.shader.setUniform('u_sketchTexture', inputFramebuffer);
            this.shader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
            this.shader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
            this.shader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.shader.setUniform('u_characterColor', this.options.characterColor);
            this.shader.setUniform('u_characterColorMode', this.options.characterColorMode);
            this.shader.setUniform('u_backgroundColor', this.options.backgroundColor);
            this.shader.setUniform('u_backgroundColorMode', this.options.backgroundColorMode);
            this.shader.setUniform('u_invertMode', this.options.invertMode);
            this.shader.setUniform('u_rotationAngle', this.p5.radians(this.options.rotationAngle));
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.outputFramebuffer.end();
        }
    }

    var asciiEdgeShader = "precision highp float;\n#define GLSLIFY 1\nuniform sampler2D u_characterTexture;uniform float u_charsetCols;uniform float u_charsetRows;uniform int u_totalChars;uniform sampler2D u_sketchTexture;uniform sampler2D u_edgesTexture;uniform sampler2D u_asciiBrightnessTexture;uniform vec2 u_gridCellDimensions;uniform vec2 u_gridPixelDimensions;uniform vec2 u_gridOffsetDimensions;uniform vec3 u_characterColor;uniform int u_characterColorMode;uniform vec3 u_backgroundColor;uniform int u_backgroundColorMode;uniform float u_rotationAngle;uniform int u_invertMode;uniform bool u_brightnessEnabled;uniform vec2 u_resolution;mat2 rotate2D(float angle){float s=sin(angle);float c=cos(angle);return mat2(c,-s,s,c);}void main(){vec2 adjustedCoord=(gl_FragCoord.xy-u_gridOffsetDimensions)/u_gridPixelDimensions;if(adjustedCoord.x<0.0||adjustedCoord.x>1.0||adjustedCoord.y<0.0||adjustedCoord.y>1.0){gl_FragColor=vec4(u_backgroundColor,1.0);return;}vec2 gridCoord=adjustedCoord*u_gridCellDimensions;vec2 cellCoord=floor(gridCoord);vec2 centerCoord=cellCoord+vec2(0.5);vec2 baseCoord=centerCoord/u_gridCellDimensions;vec4 edgeColor;vec4 sketchColor;edgeColor=texture2D(u_edgesTexture,baseCoord);sketchColor=texture2D(u_sketchTexture,baseCoord);if(edgeColor.rgb==vec3(0.0)){if(u_brightnessEnabled){gl_FragColor=texture2D(u_asciiBrightnessTexture,gl_FragCoord.xy/u_resolution);}else{gl_FragColor=vec4(u_backgroundColor,1.0);}return;}int charIndex=int(edgeColor.r*float(u_totalChars));if(charIndex>u_totalChars-1){charIndex=u_totalChars-1;}int charCol=charIndex-(charIndex/int(u_charsetCols))*int(u_charsetCols);int charRow=charIndex/int(u_charsetCols);vec2 charCoord=vec2(float(charCol)/u_charsetCols,float(charRow)/u_charsetRows);vec2 fractionalPart=fract(gridCoord)-0.5;fractionalPart=rotate2D(u_rotationAngle)*fractionalPart;fractionalPart+=0.5;vec2 cellMin=charCoord;vec2 cellMax=charCoord+vec2(1.0/u_charsetCols,1.0/u_charsetRows);vec2 texCoord=charCoord+fractionalPart*vec2(1.0/u_charsetCols,1.0/u_charsetRows);bool outsideBounds=any(lessThan(texCoord,cellMin))||any(greaterThan(texCoord,cellMax));vec4 charColor=outsideBounds ? vec4(u_backgroundColor,1.0): texture2D(u_characterTexture,texCoord);if(u_invertMode==1){charColor.a=1.0-charColor.a;charColor.rgb=vec3(1.0);}vec4 finalColor=(u_characterColorMode==0)? vec4(sketchColor.rgb*charColor.rgb,charColor.a): vec4(u_characterColor*charColor.rgb,charColor.a);if(u_backgroundColorMode==0){gl_FragColor=mix(vec4(sketchColor.rgb,1.0),finalColor,charColor.a);}else{gl_FragColor=mix(vec4(u_backgroundColor,1.0),finalColor,charColor.a);}if(outsideBounds){gl_FragColor=(u_backgroundColorMode==0)?(u_invertMode==1 ?(u_characterColorMode==0 ? vec4(sketchColor.rgb,1.0): vec4(u_characterColor,1.0)): vec4(sketchColor.rgb,1.0)):(u_invertMode==1 ?(u_characterColorMode==0 ? vec4(sketchColor.rgb,1.0): vec4(u_characterColor,1.0)): vec4(u_backgroundColor,1.0));}}"; // eslint-disable-line

    var sobelShader = "precision highp float;\n#define GLSLIFY 1\nvarying vec2 v_texCoord;uniform sampler2D u_texture;uniform vec2 u_textureSize;uniform float u_threshold;void main(){vec2 texelSize=1.0/u_textureSize;float kernelX[9];float kernelY[9];kernelX[0]=-1.0;kernelX[1]=0.0;kernelX[2]=1.0;kernelX[3]=-2.0;kernelX[4]=0.0;kernelX[5]=2.0;kernelX[6]=-1.0;kernelX[7]=0.0;kernelX[8]=1.0;kernelY[0]=-1.0;kernelY[1]=-2.0;kernelY[2]=-1.0;kernelY[3]=0.0;kernelY[4]=0.0;kernelY[5]=0.0;kernelY[6]=1.0;kernelY[7]=2.0;kernelY[8]=1.0;vec3 texColor[9];for(int i=0;i<3;i++){for(int j=0;j<3;j++){texColor[i*3+j]=texture2D(u_texture,v_texCoord+vec2(float(i-1),float(j-1))*texelSize).rgb;}}vec3 sobelX=vec3(0.0);vec3 sobelY=vec3(0.0);for(int i=0;i<9;i++){sobelX+=kernelX[i]*texColor[i];sobelY+=kernelY[i]*texColor[i];}vec3 sobel=sqrt(sobelX*sobelX+sobelY*sobelY);float intensity=length(sobel)/sqrt(3.0);float angleDeg=degrees(atan(sobelY.r,sobelX.r));vec3 edgeColor=vec3(0.0);if(intensity>u_threshold){if(angleDeg>=-22.5&&angleDeg<22.5){edgeColor=vec3(0.1);}else if(angleDeg>=22.5&&angleDeg<67.5){edgeColor=vec3(0.2);}else if(angleDeg>=67.5&&angleDeg<112.5){edgeColor=vec3(0.3);}else if(angleDeg>=112.5&&angleDeg<157.5){edgeColor=vec3(0.4);}else if(angleDeg>=157.5||angleDeg<-157.5){edgeColor=vec3(0.6);}else if(angleDeg>=-157.5&&angleDeg<-112.5){edgeColor=vec3(0.7);}else if(angleDeg>=-112.5&&angleDeg<-67.5){edgeColor=vec3(0.8);}else if(angleDeg>=-67.5&&angleDeg<-22.5){edgeColor=vec3(0.9);}}gl_FragColor=vec4(edgeColor,1.0);}"; // eslint-disable-line

    const generateSampleShader = (MAX_HISTOGRAM_SIZE, SAMPLES_PER_ROW, SAMPLES_PER_COL) => `
precision highp float;

uniform sampler2D u_image;
uniform vec2 u_imageSize;
uniform vec2 u_gridCellDimensions;
uniform int u_threshold;

const vec3 BLACK = vec3(0.0, 0.0, 0.0);
const int MAX_HISTOGRAM_SIZE = ${MAX_HISTOGRAM_SIZE};
const int SAMPLES_PER_ROW = ${SAMPLES_PER_ROW};
const int SAMPLES_PER_COL = ${SAMPLES_PER_COL};

vec3 colorHistogram[MAX_HISTOGRAM_SIZE];
int countHistogram[MAX_HISTOGRAM_SIZE];

float round(float value) {
    return floor(value + 0.5);
}

void main() {
    vec2 bufferDimensions = u_gridCellDimensions;
    vec2 imageDimensions = u_imageSize;
    vec2 gridCellDimensions = vec2(imageDimensions.x / bufferDimensions.x, imageDimensions.y / bufferDimensions.y);

    ivec2 coords = ivec2(gl_FragCoord.xy);
    int gridX = coords.x;
    int gridY = coords.y;

    // Calculate the origin of the cell in the image
    ivec2 cellOrigin = ivec2(round(float(gridX) * gridCellDimensions.x), round(float(gridY) * gridCellDimensions.y));
    int nonBlackCount = 0;

    // Initialize histograms
    for (int i = 0; i < MAX_HISTOGRAM_SIZE; i++) {
        colorHistogram[i] = BLACK;
        countHistogram[i] = 0;
    }

    // Iterate over the cell and populate the histograms
    for (int i = 0; i < SAMPLES_PER_COL; i++) {
        for (int j = 0; j < SAMPLES_PER_ROW; j++) {
            ivec2 pixelCoords = cellOrigin + ivec2(i, j);
            // Check bounds
            if (pixelCoords.x < 0 || pixelCoords.y < 0 || pixelCoords.x >= int(imageDimensions.x) || pixelCoords.y >= int(imageDimensions.y)) {
                continue;
            }
            
            // Normalize pixel coordinates when sampling from the texture
            vec2 normalizedCoords = (vec2(pixelCoords) + 0.5) / imageDimensions; // +0.5 for pixel center
            vec3 color = texture2D(u_image, normalizedCoords).rgb;

            // Ignore black pixels
            if (color == BLACK) {
                continue;
            }

            nonBlackCount++;

            // Check if the color already exists in the histogram
            bool found = false;
            for (int k = 0; k < MAX_HISTOGRAM_SIZE; k++) {
                // colorHistogram[k] can be checked directly
                // However, floating-point comparison can be imprecise; consider comparing within a small epsilon if needed
                if (colorHistogram[k] == color) {
                    countHistogram[k]++;
                    found = true;
                    break;
                }
            }

            // If the color was not found, add it to the histogram at the first available slot
            if (!found) {
                for (int m = 0; m < MAX_HISTOGRAM_SIZE; m++) {
                    if (countHistogram[m] == 0) {
                        colorHistogram[m] = color;
                        countHistogram[m] = 1;
                        break;
                    }
                }
            }
        }
    }

    vec3 mostFrequentColor = BLACK;
    int highestCount = 0;

    // Find the most frequent color
    for (int k = 0; k < MAX_HISTOGRAM_SIZE; k++) {
        if (countHistogram[k] > highestCount) {
            mostFrequentColor = colorHistogram[k];
            highestCount = countHistogram[k];
        }
    }

    // If the number of non-black pixels is below the threshold, output black, otherwise output the most frequent color
    if (nonBlackCount < u_threshold) {
        gl_FragColor = vec4(BLACK, 1.0);
    } else {
        gl_FragColor = vec4(mostFrequentColor, 1.0);
    }
}
`;

    // renderers/EdgeAsciiRenderer.js

    class EdgeAsciiRenderer extends AsciiRenderer {

        constructor(p5Instance, grid, characterSet, asciiRenderer, options) {
            super(p5Instance, grid, characterSet, options);

            this.asciiRenderer = asciiRenderer;

            this.sobelShader = this.p5.createShader(vertexShader, sobelShader);
            this.sampleShader = this.p5.createShader(vertexShader, generateSampleShader(16, this.grid.cellHeight, this.grid.cellWidth));
            this.shader = this.p5.createShader(vertexShader, asciiEdgeShader);

            this.sobelFramebuffer = this.p5.createFramebuffer({ depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
            this.sampleFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
            this.outputFramebuffer = this.p5.createFramebuffer({ depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        }

        resizeFramebuffers() {
            this.sampleFramebuffer.resize(this.grid.cols, this.grid.rows);
        }

        setAsciiRenderer(asciiRenderer) {
            this.asciiRenderer = asciiRenderer;
        }

        render(inputFramebuffer) {

            if (!this.options.enabled) {
                if (this.asciiRenderer.options.enabled) {
                    this.outputFramebuffer = this.asciiRenderer.getOutputFramebuffer();
                } else {
                    this.outputFramebuffer = inputFramebuffer;
                }
                return;
            }

            // Apply Sobel shader for edge detection
            this.sobelFramebuffer.begin();
            this.p5.shader(this.sobelShader);
            this.sobelShader.setUniform('u_texture', inputFramebuffer);
            this.sobelShader.setUniform('u_textureSize', [this.p5.width, this.p5.height]);
            this.sobelShader.setUniform('u_threshold', this.options.sobelThreshold);
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.sobelFramebuffer.end();

            // Apply sample shader
            this.sampleFramebuffer.begin();
            this.p5.shader(this.sampleShader);
            this.sampleShader.setUniform('u_imageSize', [this.p5.width, this.p5.height]);
            this.sampleShader.setUniform('u_image', this.sobelFramebuffer);
            this.sampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.sampleShader.setUniform('u_threshold', this.options.sampleThreshold);
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.sampleFramebuffer.end();

            // Render ASCII using the edge shader
            this.outputFramebuffer.begin();
            this.p5.shader(this.shader);
            this.shader.setUniform('u_resolution', [this.p5.width, this.p5.height]);
            this.shader.setUniform('u_characterTexture', this.characterSet.texture);
            this.shader.setUniform('u_charsetCols', this.characterSet.charsetCols);
            this.shader.setUniform('u_charsetRows', this.characterSet.charsetRows);
            this.shader.setUniform('u_totalChars', this.characterSet.characters.length);
            this.shader.setUniform('u_sketchTexture', inputFramebuffer);
            this.shader.setUniform('u_asciiBrightnessTexture', this.asciiRenderer.getOutputFramebuffer());
            this.shader.setUniform('u_edgesTexture', this.sampleFramebuffer);
            this.shader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
            this.shader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
            this.shader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.shader.setUniform('u_characterColor', this.options.characterColor);
            this.shader.setUniform('u_characterColorMode', this.options.characterColorMode);
            this.shader.setUniform('u_backgroundColor', this.options.backgroundColor);
            this.shader.setUniform('u_backgroundColorMode', this.options.backgroundColorMode);
            this.shader.setUniform('u_invertMode', this.options.invertMode);
            this.shader.setUniform('u_brightnessEnabled', this.asciiRenderer.options.enabled);
            this.shader.setUniform('u_rotationAngle', this.p5.radians(this.options.rotationAngle));
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.outputFramebuffer.end();
        }
    }

    const generateCharacterSelectionShader = (sampleSize, totalChars) => `
precision highp float;

// Uniforms for character texture and its grid dimensions
uniform sampler2D u_characterTexture;
uniform float u_charsetCols;
uniform float u_charsetRows;

// Uniforms for the sketch texture and grid configurations
uniform sampler2D u_sketchTexture;
uniform vec2 u_gridPixelDimensions;      // Size of the grid in pixels
uniform vec2 u_gridCellDimensions;       // Number of cells in the grid (columns, rows)

const int sampleSize = ${sampleSize};
const int totalChars = ${totalChars};

void main() {
    // Get the grid cell coordinate (integer)
    vec2 cellCoord = floor(gl_FragCoord.xy);

    // Compute the size of each cell in pixels
    vec2 cellSizeInPixels = u_gridPixelDimensions / u_gridCellDimensions;

    // Compute the range of the cell in texture coordinates (0 to 1)
    vec2 cellStartTexCoord = (cellCoord * cellSizeInPixels) / u_gridPixelDimensions;
    vec2 cellEndTexCoord = ((cellCoord + vec2(1.0)) * cellSizeInPixels) / u_gridPixelDimensions;

    float minError = 1.0 / 0.0; // Infinity
    int bestCharIndex = 0;

    for (int charIndex = 0; charIndex < ${totalChars}; charIndex++) {
        float error = 0.0;

        int charRow = charIndex / int(u_charsetCols);
        int charCol = charIndex - int(u_charsetCols) * charRow;
        vec2 charBaseCoord = vec2(float(charCol) / u_charsetCols, float(charRow) / u_charsetRows);
        vec2 charSize = vec2(1.0 / u_charsetCols, 1.0 / u_charsetRows);

        for (int dy = 0; dy < ${sampleSize}; dy++) {
            for (int dx = 0; dx < ${sampleSize}; dx++) {
                vec2 sampleOffset = (vec2(float(dx) + 0.5, float(dy) + 0.5) / float(${sampleSize}));

                // Sample in the sketch texture
                vec2 sketchSampleCoord = cellStartTexCoord + sampleOffset * (cellEndTexCoord - cellStartTexCoord);
                float sketchPixel = texture2D(u_sketchTexture, sketchSampleCoord).r;

                // Sample in the character texture
                vec2 charSampleCoord = charBaseCoord + sampleOffset * charSize;
                float charPixel = texture2D(u_characterTexture, charSampleCoord).r;

                error += pow(sketchPixel - charPixel, 2.0);
            }
        }

        // Normalize the error
        error /= float(${sampleSize} * ${sampleSize});

        if (error < minError) {
            minError = error;
            bestCharIndex = charIndex;
        }
    }

    // Encode the bestCharIndex into two channels: red and green
    float lowerByte = float(bestCharIndex) - 256.0 * floor(float(bestCharIndex) / 256.0);
    float upperByte = floor(float(bestCharIndex) / 256.0);

    float encodedR = lowerByte / 255.0;
    float encodedG = upperByte / 255.0;

    gl_FragColor = vec4(encodedR, encodedG, 0.0, 1.0);
}
  `;

    const generateBrightnessSampleShader = (samplesPerRow, samplesPerColumn) => `
// Enhanced Fragment Shader for Average Brightness Calculation
precision highp float; // Use high precision for better accuracy

// Uniforms
uniform sampler2D u_inputImage;
uniform vec2 u_inputImageSize;
uniform int u_gridCols;
uniform int u_gridRows;

// Constants
const int SAMPLES_PER_ROW = ${samplesPerRow};
const int SAMPLES_PER_COL = ${samplesPerColumn};

void main() {
    // Calculate the size of each grid cell in pixels
    vec2 cellSize = u_inputImageSize / vec2(float(u_gridCols), float(u_gridRows));

    // Determine the current fragment's grid position
    // gl_FragCoord starts at (0.5, 0.5) for the first pixel
    vec2 fragCoord = floor(gl_FragCoord.xy);
    vec2 inputGridPos = fragCoord * cellSize;

    // Initialize brightness accumulator
    float brightnessSum = 0.0;

    // Total number of samples
    float totalSamples = float(SAMPLES_PER_ROW * SAMPLES_PER_COL);

    // Iterate over sample points within the grid cell
    for(int i = 0; i < SAMPLES_PER_ROW; i++) {
        for(int j = 0; j < SAMPLES_PER_COL; j++) {
            // Calculate normalized texture coordinates for the sample
            vec2 offset = (vec2(float(i), float(j)) + 0.5) * (cellSize / vec2(float(SAMPLES_PER_ROW), float(SAMPLES_PER_COL)));
            vec2 texCoord = (inputGridPos + offset) / u_inputImageSize;

            // Clamp texture coordinates to [0, 1] to prevent sampling outside the image
            texCoord = clamp(texCoord, 0.0, 1.0);

            // Sample the color from the input image
            vec4 sampledColor = texture2D(u_inputImage, texCoord);

            // Calculate brightness using luminance formula
            float brightness = 0.299 * sampledColor.r + 0.587 * sampledColor.g + 0.114 * sampledColor.b;

            // Accumulate brightness
            brightnessSum += brightness;
        }
    }

    // Compute average brightness
    float averageBrightness = brightnessSum / totalSamples;

    // Output the average brightness as a grayscale color with full opacity
    gl_FragColor = vec4(vec3(averageBrightness), 1.0);
}
`;

    const generateColorSampleShader = (numSlots, samplesPerRow, samplesPerColumn) => `
// Refactored Fragment Shader with Conditional Fallback for u_colorRank == 2
precision mediump float;

// Uniforms
uniform sampler2D u_inputImage;
uniform sampler2D u_inputImageBW; // Black and white image
uniform vec2 u_inputImageSize;
uniform int u_gridCols;
uniform int u_gridRows;
uniform int u_colorRank;

// Constants
const int NUM_SLOTS = ${numSlots};
const int SAMPLES_PER_ROW = ${samplesPerRow};
const int SAMPLES_PER_COL = ${samplesPerColumn};

void main() {
    // Calculate the size of each grid cell
    vec2 cellSize = u_inputImageSize / vec2(float(u_gridCols), float(u_gridRows));

    // Determine the current fragment's grid position
    vec2 fragCoord = floor(gl_FragCoord.xy);
    vec2 inputGridPos = fragCoord * cellSize;

    // Calculate the center texture coordinate for saving the initial pixel color
    vec2 centerOffset = cellSize * 0.5;
    vec2 centerTexCoord = (inputGridPos + centerOffset) / u_inputImageSize;
    vec4 savedColor = texture2D(u_inputImage, centerTexCoord);

    // Initialize color slots and counts
    vec4 colors[NUM_SLOTS];
    float counts[NUM_SLOTS];
    for(int i = 0; i < NUM_SLOTS; i++) {
        colors[i] = vec4(0.0);
        counts[i] = 0.0;
    }

    // Iterate over sample points within the grid cell
    for(int i = 0; i < SAMPLES_PER_ROW; i++) {
        for(int j = 0; j < SAMPLES_PER_COL; j++) {
            // Calculate normalized texture coordinates for the sample
            vec2 offset = (vec2(float(i), float(j)) + 0.5) * (cellSize / vec2(float(SAMPLES_PER_ROW), float(SAMPLES_PER_COL)));
            vec2 texCoord = (inputGridPos + offset) / u_inputImageSize;

            // Sample the color from the input image
            vec4 sampledColor = texture2D(u_inputImage, texCoord);

            // Sample the corresponding pixel from the black and white image
            vec4 bwColor = texture2D(u_inputImageBW, texCoord);
            float isWhite = step(0.5, bwColor.r); // Assuming grayscale, check if red channel is >= 0.5

            // Determine if the current pixel should be considered based on u_colorRank
            bool shouldConsider = false;
            if(u_colorRank == 1 && isWhite > 0.5) {
                shouldConsider = true;
            }
            else if(u_colorRank == 2 && isWhite <= 0.5) {
                shouldConsider = true;
            }

            // Skip this pixel if it doesn't meet the criteria
            if(!shouldConsider) {
                continue;
            }

            // Find a matching color slot
            bool matched = false;
            for(int k = 0; k < NUM_SLOTS; k++) {
                if(distance(sampledColor, colors[k]) < 0.001) {
                    counts[k] += 1.0;
                    matched = true;
                    break;
                }
            }

            // Assign to a new slot if no match is found
            if(!matched) {
                for(int k = 0; k < NUM_SLOTS; k++) {
                    if(counts[k] == 0.0) {
                        colors[k] = sampledColor;
                        counts[k] = 1.0;
                        break;
                    }
                }
            }
        }
    }

    // Track the top color based on counts
    float topCount = 0.0;
    vec4 topColor = vec4(0.0);

    for(int k = 0; k < NUM_SLOTS; k++) {
        float currentCount = counts[k];
        vec4 currentColor = colors[k];

        if(currentCount > topCount) {
            topCount = currentCount;
            topColor = currentColor;
        }
    }

    // If u_colorRank is 2 and no pixels were considered, use the savedColor instead of black
    if(u_colorRank == 2 && topCount == 0.0) {
        topColor = savedColor;
    }

    // Output the color with full opacity
    gl_FragColor = vec4(topColor.rgb, 1.0);
}
`;

    var asciiAccurateShader = "precision highp float;\n#define GLSLIFY 1\nuniform sampler2D u_characterTexture;uniform float u_charsetCols;uniform float u_charsetRows;uniform sampler2D u_primaryColorTexture;uniform sampler2D u_secondaryColorTexture;uniform sampler2D u_charIndexTexture;uniform vec2 u_gridOffsetDimensions;uniform vec2 u_gridPixelDimensions;uniform vec2 u_gridCellDimensions;uniform vec3 u_characterColor;uniform int u_characterColorMode;uniform vec3 u_backgroundColor;uniform int u_backgroundColorMode;uniform int u_invertMode;void main(){vec2 adjustedCoord=(gl_FragCoord.xy-u_gridOffsetDimensions)/u_gridPixelDimensions;if(adjustedCoord.x<0.0||adjustedCoord.x>1.0||adjustedCoord.y<0.0||adjustedCoord.y>1.0){gl_FragColor=vec4(u_backgroundColor,1.0);return;}vec2 gridCoord=adjustedCoord*u_gridCellDimensions;vec2 cellCoord=floor(gridCoord);vec2 charIndexTexCoord=(cellCoord+vec2(0.5))/u_gridCellDimensions;vec2 encodedIndexVec=texture2D(u_charIndexTexture,charIndexTexCoord).rg;int bestCharIndex=int(encodedIndexVec.r*255.0+0.5)+int(encodedIndexVec.g*255.0+0.5)*256;int bestCharRow=bestCharIndex/int(u_charsetCols);int bestCharCol=bestCharIndex-int(u_charsetCols)*bestCharRow;vec2 bestCharBaseCoord=vec2(float(bestCharCol)/u_charsetCols,float(bestCharRow)/u_charsetRows);vec2 bestCharSize=vec2(1.0/u_charsetCols,1.0/u_charsetRows);vec2 texCoord=bestCharBaseCoord+fract(gridCoord)*bestCharSize;vec4 charColor=texture2D(u_characterTexture,texCoord);if(u_invertMode==1){charColor.rgb=vec3(1.0)-charColor.rgb;charColor.a=1.0-charColor.a;}vec2 primaryTexCoord=(cellCoord+vec2(0.5))/u_gridCellDimensions;vec4 primaryColor=texture2D(u_primaryColorTexture,primaryTexCoord);vec4 secondaryColor=texture2D(u_secondaryColorTexture,primaryTexCoord);vec4 finalColor=(u_characterColorMode==0)? vec4(primaryColor.rgb*charColor.rgb,charColor.a): vec4(u_characterColor*charColor.rgb,charColor.a);vec4 backgroundColorFinal=(u_backgroundColorMode==0)? secondaryColor : vec4(u_backgroundColor,1.0);gl_FragColor=mix(backgroundColorFinal,finalColor,charColor.a);}"; // eslint-disable-line

    var brightnessSplitShader = "precision mediump float;\n#define GLSLIFY 1\nuniform sampler2D u_inputImage;uniform sampler2D u_brightnessTexture;uniform vec2 u_inputImageSize;uniform int u_gridCols;uniform int u_gridRows;const float EPSILON=0.01;void main(){vec2 fragCoord=gl_FragCoord.xy;float cellWidth=u_inputImageSize.x/float(u_gridCols);float cellHeight=u_inputImageSize.y/float(u_gridRows);float gridX=floor(fragCoord.x/cellWidth);float gridY=floor(fragCoord.y/cellHeight);gridX=clamp(gridX,0.0,float(u_gridCols-1));gridY=clamp(gridY,0.0,float(u_gridRows-1));vec2 brightnessTexCoord=(vec2(gridX,gridY)+0.5)/vec2(float(u_gridCols),float(u_gridRows));float averageBrightness=texture2D(u_brightnessTexture,brightnessTexCoord).r;vec2 imageTexCoord=fragCoord/u_inputImageSize;vec4 originalColor=texture2D(u_inputImage,imageTexCoord);float fragmentBrightness=0.299*originalColor.r+0.587*originalColor.g+0.114*originalColor.b;float brightnessDifference=fragmentBrightness-averageBrightness;float finalColorValue;if(brightnessDifference<-EPSILON){finalColorValue=0.0;}else{finalColorValue=1.0;}gl_FragColor=vec4(vec3(finalColorValue),1.0);}"; // eslint-disable-line

    class AccurateAsciiRenderer extends AsciiRenderer {

        constructor(p5Instance, grid, characterSet, options) {
            super(p5Instance, grid, characterSet, options);

            this.characterSelectionShader = this.p5.createShader(vertexShader, generateCharacterSelectionShader(this.characterSet.fontSize, this.characterSet.characters.length));
            this.brightnessSampleShader = this.p5.createShader(vertexShader, generateBrightnessSampleShader(this.grid.cellHeight, this.grid.cellWidth));
            this.colorSampleShader = this.p5.createShader(vertexShader, generateColorSampleShader(16, this.grid.cellHeight, this.grid.cellWidth));
            this.brightnessSplitShader = this.p5.createShader(vertexShader, brightnessSplitShader);
            this.shader = this.p5.createShader(vertexShader, asciiAccurateShader);

            this.brightnessSampleFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
            this.brightnessSplitFramebuffer = this.p5.createFramebuffer({ depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
            this.primaryColorSampleFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
            this.secondaryColorSampleFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
            this.asciiCharacterFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });

            this.outputFramebuffer = this.p5.createFramebuffer({ depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        }

        resizeFramebuffers() {
            this.brightnessSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
            this.primaryColorSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
            this.secondaryColorSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
            this.asciiCharacterFramebuffer.resize(this.grid.cols, this.grid.rows);
        }

        render(inputFramebuffer) {

            if (!this.options.enabled) {
                this.outputFramebuffer = inputFramebuffer;
                return;
            }

            this.brightnessSampleFramebuffer.begin();
            this.p5.shader(this.brightnessSampleShader);
            this.brightnessSampleShader.setUniform('u_inputImage', inputFramebuffer);
            this.brightnessSampleShader.setUniform('u_inputImageSize', [this.p5.width, this.p5.height]);
            this.brightnessSampleShader.setUniform('u_gridCols', this.grid.cols);
            this.brightnessSampleShader.setUniform('u_gridRows', this.grid.rows);
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.brightnessSampleFramebuffer.end();

            this.brightnessSplitFramebuffer.begin();
            this.p5.shader(this.brightnessSplitShader);
            this.brightnessSplitShader.setUniform('u_inputImage', inputFramebuffer);
            this.brightnessSplitShader.setUniform('u_brightnessTexture', this.brightnessSampleFramebuffer);
            this.brightnessSplitShader.setUniform('u_inputImageSize', [this.p5.width, this.p5.height]);
            this.brightnessSplitShader.setUniform('u_gridCols', this.grid.cols);
            this.brightnessSplitShader.setUniform('u_gridRows', this.grid.rows);
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.brightnessSplitFramebuffer.end();

            this.primaryColorSampleFramebuffer.begin();
            this.p5.shader(this.colorSampleShader);
            this.colorSampleShader.setUniform('u_inputImage', inputFramebuffer);
            this.colorSampleShader.setUniform('u_inputImageBW', this.brightnessSplitFramebuffer);
            this.colorSampleShader.setUniform('u_inputImageSize', [this.p5.width, this.p5.height]);
            this.colorSampleShader.setUniform('u_gridCols', this.grid.cols);
            this.colorSampleShader.setUniform('u_gridRows', this.grid.rows);
            this.colorSampleShader.setUniform('u_colorRank', 1);
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.primaryColorSampleFramebuffer.end();

            this.secondaryColorSampleFramebuffer.begin();
            this.p5.shader(this.colorSampleShader);
            this.colorSampleShader.setUniform('u_inputImage', inputFramebuffer);
            this.colorSampleShader.setUniform('u_inputImageBW', this.brightnessSplitFramebuffer);
            this.colorSampleShader.setUniform('u_inputImageSize', [this.p5.width, this.p5.height]);
            this.colorSampleShader.setUniform('u_gridCols', this.grid.cols);
            this.colorSampleShader.setUniform('u_gridRows', this.grid.rows);
            this.colorSampleShader.setUniform('u_colorRank', 2);
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.secondaryColorSampleFramebuffer.end();

            this.asciiCharacterFramebuffer.begin();
            this.p5.shader(this.characterSelectionShader);
            this.characterSelectionShader.setUniform('u_characterTexture', this.characterSet.texture);
            this.characterSelectionShader.setUniform('u_charsetCols', this.characterSet.charsetCols);
            this.characterSelectionShader.setUniform('u_charsetRows', this.characterSet.charsetRows);
            this.characterSelectionShader.setUniform('u_sketchTexture', this.brightnessSplitFramebuffer);
            this.characterSelectionShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.characterSelectionShader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.asciiCharacterFramebuffer.end();

            this.outputFramebuffer.begin();
            this.p5.shader(this.shader);
            this.shader.setUniform('u_charIndexTexture', this.asciiCharacterFramebuffer);
            this.shader.setUniform('u_resolution', [this.p5.width, this.p5.height]);
            this.shader.setUniform('u_characterTexture', this.characterSet.texture);
            this.shader.setUniform('u_primaryColorTexture', this.primaryColorSampleFramebuffer);
            this.shader.setUniform('u_secondaryColorTexture', this.secondaryColorSampleFramebuffer);
            this.shader.setUniform('u_charsetCols', this.characterSet.charsetCols);
            this.shader.setUniform('u_charsetRows', this.characterSet.charsetRows);
            this.shader.setUniform('u_totalChars', this.characterSet.characters.length);
            this.shader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.shader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
            this.shader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
            this.shader.setUniform('u_characterColor', this.options.characterColor);
            this.shader.setUniform('u_characterColorMode', this.options.characterColorMode);
            this.shader.setUniform('u_backgroundColor', this.options.backgroundColor);
            this.shader.setUniform('u_backgroundColorMode', this.options.backgroundColorMode);
            this.shader.setUniform('u_invertMode', this.options.invertMode);
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.outputFramebuffer.end();
        }
    }

    var asciiShader = "precision highp float;\n#define GLSLIFY 1\nuniform vec2 u_resolution;uniform sampler2D u_characterTexture;uniform float u_charsetCols;uniform float u_charsetRows;uniform sampler2D u_sketchTexture;uniform sampler2D u_asciiBrightnessTexture;uniform sampler2D u_gradientTexture;uniform sampler2D u_gradientReferenceTexture;uniform vec2 u_gridCellDimensions;uniform vec2 u_gridPixelDimensions;uniform vec2 u_gridOffsetDimensions;uniform vec3 u_characterColor;uniform int u_characterColorMode;uniform vec3 u_backgroundColor;uniform int u_backgroundColorMode;uniform bool u_brightnessEnabled;uniform float u_rotationAngle;uniform int u_invertMode;mat2 rotate2D(float angle){float s=sin(angle);float c=cos(angle);return mat2(c,-s,s,c);}void main(){vec2 adjustedCoord=(gl_FragCoord.xy-u_gridOffsetDimensions)/u_gridPixelDimensions;if(adjustedCoord.x<0.0||adjustedCoord.x>1.0||adjustedCoord.y<0.0||adjustedCoord.y>1.0){gl_FragColor=vec4(u_backgroundColor,1.0);return;}vec2 gridCoord=adjustedCoord*u_gridCellDimensions;vec2 cellCoord=floor(gridCoord);vec2 centerCoord=cellCoord+vec2(0.5);vec2 baseCoord=centerCoord/u_gridCellDimensions;vec4 sketchColor=texture2D(u_sketchTexture,baseCoord);vec4 gradientColor=texture2D(u_gradientTexture,baseCoord);vec4 gradientReferenceColor=texture2D(u_gradientReferenceTexture,baseCoord);if(gradientColor.rgb==gradientReferenceColor.rgb){if(u_brightnessEnabled){gl_FragColor=texture2D(u_asciiBrightnessTexture,gl_FragCoord.xy/u_resolution);}else{gl_FragColor=vec4(u_backgroundColor,1.0);}return;}int charIndex=int(gradientColor.r*255.0)+int(gradientColor.g*255.0)*256;int charCol=charIndex-(charIndex/int(u_charsetCols))*int(u_charsetCols);int charRow=charIndex/int(u_charsetCols);vec2 charCoord=vec2(float(charCol)/u_charsetCols,float(charRow)/u_charsetRows);vec2 fractionalPart=fract(gridCoord)-0.5;fractionalPart=rotate2D(u_rotationAngle)*fractionalPart;fractionalPart+=0.5;vec2 cellMin=charCoord;vec2 cellMax=charCoord+vec2(1.0/u_charsetCols,1.0/u_charsetRows);vec2 texCoord=charCoord+fractionalPart*vec2(1.0/u_charsetCols,1.0/u_charsetRows);bool outsideBounds=any(lessThan(texCoord,cellMin))||any(greaterThan(texCoord,cellMax));vec4 charColor=outsideBounds ? vec4(u_backgroundColor,1.0): texture2D(u_characterTexture,texCoord);if(u_invertMode==1){charColor.a=1.0-charColor.a;charColor.rgb=vec3(1.0);}vec4 finalColor=(u_characterColorMode==0)? vec4(sketchColor.rgb*charColor.rgb,charColor.a): vec4(u_characterColor*charColor.rgb,charColor.a);if(u_backgroundColorMode==0){gl_FragColor=mix(vec4(sketchColor.rgb,1.0),finalColor,charColor.a);}else{gl_FragColor=mix(vec4(u_backgroundColor,1.0),finalColor,charColor.a);}if(outsideBounds){gl_FragColor=(u_backgroundColorMode==0)?(u_invertMode==1 ?(u_characterColorMode==0 ? vec4(sketchColor.rgb,1.0): vec4(u_characterColor,1.0)): vec4(sketchColor.rgb,1.0)):(u_invertMode==1 ?(u_characterColorMode==0 ? vec4(sketchColor.rgb,1.0): vec4(u_characterColor,1.0)): vec4(u_backgroundColor,1.0));}}"; // eslint-disable-line

    class GradientAsciiRenderer extends AsciiRenderer {

        constructor(p5Instance, grid, characterSet, asciiRenderer, gradientManager, options) {
            super(p5Instance, grid, characterSet, options);

            this.asciiRenderer = asciiRenderer;
            this.gradientManager = gradientManager;

            this.grayscaleShader = this.p5.createShader(vertexShader, grayscaleShader);
            this.asciiShader = this.p5.createShader(vertexShader, asciiShader);

            this.grayscaleFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
            this.prevGradientFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
            this.nextGradientFramebuffer = this.p5.createFramebuffer({ width: this.grid.cols, height: this.grid.rows, depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });

            this.outputFramebuffer = this.p5.createFramebuffer({ depthFormat: this.p5.UNSIGNED_INT, textureFiltering: this.p5.NEAREST });
        }

        resizeFramebuffers() {
            this.grayscaleFramebuffer.resize(this.grid.cols, this.grid.rows);
            this.nextGradientFramebuffer.resize(this.grid.cols, this.grid.rows);
            this.prevGradientFramebuffer.resize(this.grid.cols, this.grid.rows);
        }

        render(inputFramebuffer) {

            if (!this.options.enabled || this.gradientManager._gradients.length === 0) {
                if (this.asciiRenderer.options.enabled) {
                    this.outputFramebuffer = this.asciiRenderer.getOutputFramebuffer();
                } else {
                    this.outputFramebuffer = inputFramebuffer;
                }
                return;
            }

            this.grayscaleFramebuffer.begin();
            this.p5.clear();
            this.p5.shader(this.grayscaleShader);
            this.grayscaleShader.setUniform('u_image', inputFramebuffer);
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.grayscaleFramebuffer.end();

            this.nextGradientFramebuffer.begin();
            this.p5.clear();
            this.p5.image(this.grayscaleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
            this.nextGradientFramebuffer.end();

            this.prevGradientFramebuffer.begin();
            this.p5.clear();
            this.p5.image(this.grayscaleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
            this.prevGradientFramebuffer.end();

            for (let i = 0; i < this.gradientManager._gradients.length; i++) {
                const gradient = this.gradientManager._gradients[i];

                if (gradient.enabled) {

                    this.prevGradientFramebuffer.begin();
                    this.p5.clear();
                    this.p5.shader(gradient._shader);
                    gradient.setUniforms(this.nextGradientFramebuffer, this.grayscaleFramebuffer);
                    this.p5.rect(0, 0, this.grid.cols, this.grid.rows);
                    this.prevGradientFramebuffer.end();

                    // Swap framebuffers for the next pass
                    [this.nextGradientFramebuffer, this.prevGradientFramebuffer] = [this.prevGradientFramebuffer, this.nextGradientFramebuffer];
                }
            }

            this.outputFramebuffer.begin();
            this.p5.clear();
            this.p5.shader(this.asciiShader);
            this.asciiShader.setUniform('u_resolution', [this.p5.width, this.p5.height]);
            this.asciiShader.setUniform('u_characterTexture', this.characterSet.texture);
            this.asciiShader.setUniform('u_charsetCols', this.characterSet.charsetCols);
            this.asciiShader.setUniform('u_charsetRows', this.characterSet.charsetRows);
            this.asciiShader.setUniform('u_totalChars', this.characterSet.characters.length);
            this.asciiShader.setUniform('u_sketchTexture', inputFramebuffer);
            this.asciiShader.setUniform('u_gradientTexture', this.nextGradientFramebuffer);
            this.asciiShader.setUniform('u_gradientReferenceTexture', this.grayscaleFramebuffer);
            this.asciiShader.setUniform('u_asciiBrightnessTexture', this.asciiRenderer.getOutputFramebuffer());
            this.asciiShader.setUniform('u_brightnessEnabled', this.asciiRenderer.options.enabled);
            this.asciiShader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
            this.asciiShader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
            this.asciiShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
            this.asciiShader.setUniform('u_characterColor', this.options.characterColor);
            this.asciiShader.setUniform('u_characterColorMode', this.options.characterColorMode);
            this.asciiShader.setUniform('u_backgroundColor', this.options.backgroundColor);
            this.asciiShader.setUniform('u_backgroundColorMode', this.options.backgroundColorMode);
            this.asciiShader.setUniform('u_invertMode', this.options.invertMode);
            this.asciiShader.setUniform('u_rotationAngle', this.p5.radians(this.options.rotationAngle));
            this.p5.rect(0, 0, this.p5.width, this.p5.height);
            this.outputFramebuffer.end();
        }

        getOutputFramebuffer() {
            return this.outputFramebuffer;
        }
    }

    /**
     * @class P5Asciify
     * @description
     * The main class for the P5Asciify library, responsible for setting up and running the rendering pipeline.
     */
    class P5Asciify {

        commonOptions = {
            fontSize: 16,
            gridDimensions: [0, 0],
        };

        asciiOptions = { // brightness and accurate options are the same, since only one of them can be enabled at a time
            renderMode: 'brightness',
            enabled: true,
            characters: "0123456789",
            characterColor: [1.0, 1.0, 1.0],
            characterColorMode: 0,
            backgroundColor: [0.0, 0.0, 0.0],
            backgroundColorMode: 1,
            invertMode: false,
            rotationAngle: 0,
        };

        gradientOptions = {
            enabled: true,
            characterColor: [1.0, 1.0, 1.0],
            characterColorMode: 0,
            backgroundColor: [0.0, 0.0, 0.0],
            backgroundColorMode: 1,
            invertMode: false,
            rotationAngle: 0,
        }

        edgeOptions = {
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

        colorPalette = new P5AsciifyColorPalette();

        gradientManager = new P5AsciifyGradientManager(this.colorPalette);

        preEffectManager = new P5AsciifyEffectManager(this.colorPalette);
        afterEffectManager = new P5AsciifyEffectManager(this.colorPalette);

        instance(p) {
            this.p5Instance = p;

            this.p5Instance.preload = () => { }; // Define a default preload function in case the user doesn't provide one
        }

        /**
         * Sets up the P5Asciify library with the specified options after the user's setup() function finished.
         */
        setup() {
            this.p5Instance.pixelDensity(1);

            this.asciiCharacterSet = new P5AsciifyCharacterSet({ p5Instance: this.p5Instance, type: "ascii", font: this.font, characters: this.asciiOptions.characters, fontSize: this.commonOptions.fontSize });
            this.gradientCharacterSet = new P5AsciifyCharacterSet({ p5Instance: this.p5Instance, type: "gradient", font: this.font, characters: "", fontSize: this.commonOptions.fontSize });
            this.edgeCharacterSet = new P5AsciifyCharacterSet({ p5Instance: this.p5Instance, type: "edge", font: this.font, characters: this.edgeOptions.characters, fontSize: this.commonOptions.fontSize });

            this.grid = new P5AsciifyGrid(this.p5Instance, this.asciiCharacterSet.maxGlyphDimensions.width, this.asciiCharacterSet.maxGlyphDimensions.height);

            if (this.commonOptions.gridDimensions[0] != 0 && this.commonOptions.gridDimensions[1] != 0) {
                this.grid.resizeCellDimensions(this.commonOptions.gridDimensions[0], this.commonOptions.gridDimensions[1]);
            }

            this.colorPalette.setup(this.p5Instance);

            this.gradientManager.setup(this.gradientCharacterSet);

            this.preEffectManager.setup();
            this.afterEffectManager.setup();

            this.brightnessRenderer = new BrightnessAsciiRenderer(this.p5Instance, this.grid, this.asciiCharacterSet, this.asciiOptions);
            this.accurateRenderer = new AccurateAsciiRenderer(this.p5Instance, this.grid, this.asciiCharacterSet, this.asciiOptions);

            let asciiRenderer = this.asciiOptions.renderMode === 'brightness' ? this.brightnessRenderer : this.accurateRenderer;
            this.gradientRenderer = new GradientAsciiRenderer(this.p5Instance, this.grid, this.gradientCharacterSet, asciiRenderer, this.gradientManager, this.gradientOptions);

            this.edgeRenderer = new EdgeAsciiRenderer(this.p5Instance, this.grid, this.edgeCharacterSet, this.gradientRenderer, this.edgeOptions);

            this.asciiFramebufferDimensions = { width: this.p5Instance.width, height: this.p5Instance.height };

            this.sketchFramebuffer = this.p5Instance.createFramebuffer({ depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });
        }

        /**
         * Checks if the dimensions of the ASCII framebuffer have changed and resets the grid if necessary.
         * This function is called every frame after the user's draw() function, 
         * since I am not aware of a better way to do this since there is no hook for when the canvas is resized.
         */
        checkFramebufferDimensions() {
            if (this.asciiFramebufferDimensions.width !== this.p5Instance.width || this.asciiFramebufferDimensions.height !== this.p5Instance.height) {
                this.asciiFramebufferDimensions.width = this.p5Instance.width;
                this.asciiFramebufferDimensions.height = this.p5Instance.height;

                if (this.commonOptions.gridDimensions[0] === 0 || this.commonOptions.gridDimensions[1] === 0) {
                    this.grid.reset();
                } else {
                    this.grid._resizeGrid();
                }

                this.edgeRenderer.resizeFramebuffers();
                this.accurateRenderer.resizeFramebuffers();
                this.gradientRenderer.resizeFramebuffers();
            }
        }

        /**
         * Runs the rendering pipeline for the P5Asciify library.
         */
        asciify() {
            this.preEffectManager.render(this.sketchFramebuffer);

            let asciiOutput = this.preEffectManager.nextFramebuffer;

            const renderer = this.asciiOptions.renderMode === 'accurate'
                ? this.accurateRenderer
                : this.brightnessRenderer;
            renderer.render(this.preEffectManager.nextFramebuffer);
            asciiOutput = renderer.getOutputFramebuffer();

            this.gradientRenderer.render(this.preEffectManager.nextFramebuffer);
            asciiOutput = this.gradientRenderer.getOutputFramebuffer();

            this.edgeRenderer.render(this.preEffectManager.nextFramebuffer, this.asciiOptions.enabled);
            asciiOutput = this.edgeRenderer.getOutputFramebuffer();

            this.afterEffectManager.render(asciiOutput);

            this.p5Instance.clear();
            this.p5Instance.image(this.afterEffectManager.nextFramebuffer, -this.p5Instance.width / 2, -this.p5Instance.height / 2);
            this.checkFramebufferDimensions();
        }

        /**
         * Sets the default options for the P5Asciify library.
         * @param {object} options 
         */
        setDefaultOptions(asciiOptions, edgeOptions, commonOptions, gradientOptions) {

            // The parameters are pre-processed, so we can just spread them into the class variables
            this.asciiOptions = {
                ...this.asciiOptions,
                ...asciiOptions
            };
            this.edgeOptions = {
                ...this.edgeOptions,
                ...edgeOptions
            };
            this.commonOptions = {
                ...this.commonOptions,
                ...commonOptions
            };

            this.gradientOptions = {
                ...this.gradientOptions,
                ...gradientOptions
            };

            // If we are still in the users setup(), the characterset and grid have not been initialized yet.
            if (this.p5Instance.frameCount == 0) {
                return;
            }

            this.brightnessRenderer.updateOptions(asciiOptions);
            this.edgeRenderer.updateOptions(edgeOptions);
            this.accurateRenderer.updateOptions(asciiOptions);

            if (asciiOptions?.characters) {
                this.asciiCharacterSet.setCharacterSet(asciiOptions.characters);
            }

            if (edgeOptions?.characters) {
                this.edgeCharacterSet.setCharacterSet(edgeOptions.characters);
            }

            if (commonOptions?.fontSize) {
                this.asciiCharacterSet.setFontSize(commonOptions.fontSize);
                this.edgeCharacterSet.setFontSize(commonOptions.fontSize);
                this.grid.resizeCellPixelDimensions(this.asciiCharacterSet.maxGlyphDimensions.width, this.asciiCharacterSet.maxGlyphDimensions.height);

                this.edgeRenderer.resizeFramebuffers();
                this.accurateRenderer.resizeFramebuffers();
                this.gradientRenderer.resizeFramebuffers();
            }

            if (asciiOptions?.renderMode) {
                this.edgeRenderer.setAsciiRenderer(asciiOptions.renderMode === 'brightness' ? this.brightnessRenderer : this.accurateRenderer);
            }

            if (commonOptions?.gridDimensions) {
                if (commonOptions.gridDimensions[0] === 0 || commonOptions.gridDimensions[1] === 0) {
                    this.grid.reset();
                } else {
                    this.grid.resizeCellDimensions(commonOptions.gridDimensions[0], commonOptions.gridDimensions[1]);
                }
                this.edgeRenderer.resizeFramebuffers();
                this.accurateRenderer.resizeFramebuffers();
                this.gradientRenderer.resizeFramebuffers();
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

    var URSAFONT_BASE64 = "data:text/javascript;base64,AAEAAAAKAIAAAwAgT1MvMs+QEyQAAAEoAAAAYGNtYXAg7yVJAAAFjAAACSBnbHlmuHLTdAAAErQAAGi0aGVhZFvXdUwAAACsAAAANmhoZWELAQUCAAAA5AAAACRobXR4BACDgAAAAYgAAAQEbG9jYQAy54AAAA6sAAAECG1heHABIgCCAAABCAAAACBuYW1lVs/OSgAAe2gAAAOicG9zdABpADQAAH8MAAAAIAABAAAAAQAAzOWHqV8PPPUAAAQAAAAAAHxiGCcAAAAAfGIYJwAAAAAEAAQAAAAACAACAAEAAAAAAAEAAAQAAAAAAAQAAAAAAAcAAAEAAAAAAAAAAAAAAAAAAAEBAAEAAAEBAIAAIAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAgQAAZAABQAEAgACAAAAAAACAAIAAAACAAAzAMwAAAAABAAAAAAAAACAAACLAABw4wAAAAAAAAAAWUFMLgBAACAmawQAAAAAAAQAAAAAAAFRAAAAAAMABAAAAAAgAAAEAAAABAAAAAQAAAAEAAGABAABAAQAAIAEAACABAAAgAQAAIAEAAGABAABAAQAAQAEAACABAABAAQAAIAEAACABAABAAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABAAQAAIAEAAEABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAAGABAAAgAQAAIAEAAGABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAAAgAQAAIAEAACABAABgAQAAQAEAACABAAAAAQAAgAEAACABAAAgAQAAIAEAACABAACAAQAAAAEAAIABAABgAQAAgAEAACABAAAgAQAAAAEAACABAAAAAQAAAAEAAAABAAAAAQAAAAEAAIABAADAAQAAAAEAAAABAAAgAQAAYAEAAAABAAAAAQAAIAEAAAABAAAgAQAAIAEAACABAAAAAQAAIAEAAAABAAAAAQAAIAEAAGABAAAAAQAAAAEAAAABAAAAAQAAIAEAACABAAAAAQAAIAEAACABAAAAAQAAIAEAACABAAAgAQAAAAEAACABAAAAAQAAAAEAAEABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAACAAQAAIAEAAAABAAAAAQAAAAEAACABAABAAQAAQAEAAEABAABAAQAAIAEAACABAAAAAQAAAAEAAAABAABAAQAAAAEAACABAAAAAQAAAAEAAIABAAAgAQAAAAEAAAABAAAAAQAAAAEAAAABAABgAQAAAAEAAAABAABgAQAAAAEAAGABAABgAQAAYAEAAAABAAAAAQAAAAEAAAABAABgAQAAYAEAAAABAAAAAQAAAAEAAAABAABgAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAABgAQAAAAEAAGABAABgAQAAAAEAAAABAABgAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAYAEAAAABAAAAAQAAQAEAACABAAAAAQAAAAEAAAABAAAgAQAAIAEAACABAAAgAQAAIAEAAAABAABAAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAQAAIAEAACABAAAgAQAAIAEAAEABAAAgAAAAAIAAAADAAAAFAADAAEAAASaAAQEhgAAAJ4AgAAGAB4AfgCjAKUApwCsALIAtwC9AL8AxwDJANEA1gDcAOIA7wD0APcA/AD/AZIDkwOYA6MDpgOpA7EDtQPAA8QDxiAiIDwgfyCnIZUhqCIaIh8iKSJIImEiZSMCIxAjISUAJQIlDCUQJRQlGCUcJSQlLCU0JTwlbCWAJYQliCWMJZMloSWsJbIluiW8JcQlyyXZJjwmQCZCJmAmYyZmJmv//wAAACAAoQClAKcAqgCwALUAugC/AMQAyQDRANYA3ADfAOQA8QD2APkA/wGSA5MDmAOjA6YDqQOxA7QDwAPDA8YgIiA8IH8gpyGQIagiGSIeIikiSCJhImQjAiMQIyAlACUCJQwlECUUJRglHCUkJSwlNCU8JVAlgCWEJYgljCWQJaAlrCWyJbolvCXEJcsl2CY6JkAmQiZgJmMmZSZq////4v/A/7//vv+8/7n/t/+1/7T/sP+v/6j/pP+f/53/nP+b/5r/mf+X/wX9Bf0B/Pf89fzz/Oz86vzg/N783eCC4GngJ+AA3xjfBt6W3pPeit5s3lTeUt223andmtu827vbstuv26zbqdum25/bmNuR24rbd9tk22HbXttb21jbTNtC2z3bNts12y7bKNsc2rzaudq42pvamdqY2pUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEhgAAAJ4AgAAGAB4AfgCjAKUApwCsALIAtwC9AL8AxwDJANEA1gDcAOIA7wD0APcA/AD/AZIDkwOYA6MDpgOpA7EDtQPAA8QDxiAiIDwgfyCnIZUhqCIaIh8iKSJIImEiZSMCIxAjISUAJQIlDCUQJRQlGCUcJSQlLCU0JTwlbCWAJYQliCWMJZMloSWsJbIluiW8JcQlyyXZJjwmQCZCJmAmYyZmJmv//wAAACAAoQClAKcAqgCwALUAugC/AMQAyQDRANYA3ADfAOQA8QD2APkA/wGSA5MDmAOjA6YDqQOxA7QDwAPDA8YgIiA8IH8gpyGQIagiGSIeIikiSCJhImQjAiMQIyAlACUCJQwlECUUJRglHCUkJSwlNCU8JVAlgCWEJYgljCWQJaAlrCWyJbolvCXEJcsl2CY6JkAmQiZgJmMmZSZq////4v/A/7//vv+8/7n/t/+1/7T/sP+v/6j/pP+f/53/nP+b/5r/mf+X/wX9Bf0B/Pf89fzz/Oz86vzg/N783eCC4GngJ+AA3xjfBt6W3pPeit5s3lTeUt223andmtu827vbstuv26zbqdum25/bmNuR24rbd9tk22HbXttb21jbTNtC2z3bNts12y7bKNsc2rzaudq42pvamdqY2pUAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAABwAAABIAAAAegAAALwAAADuAAAA9wAAARQAAAExAAABWgAAAW0AAAF7AAABhAAAAY0AAAGvAAAB0gAAAecAAAIOAAACNQAAAk8AAAJsAAACjgAAAqYAAALOAAAC5gAAAvQAAAMHAAADLgAAAzwAAANjAAADhQAAA6UAAAPCAAAD4AAAA/0AAAQaAAAEPAAABEwAAARrAAAEfgAABJEAAASpAAAE0AAABNsAAAT4AAAFFQAABS0AAAVDAAAFZQAABYcAAAWuAAAFvAAABc8AAAXnAAAGBAAABisAAAZDAAAGZQAABnMAAAaVAAAGowAABsUAAAbOAAAG3gAABvYAAAcMAAAHKQAABz8AAAdaAAAHbQAAB4oAAAedAAAHqwAAB8MAAAfgAAAH7gAACAsAAAgjAAAIOwAACFEAAAhsAAAIfAAACJkAAAi2AAAIzgAACOYAAAkDAAAJKgAACUIAAAlfAAAJfAAACYUAAAmiAAAJugAACdcAAAngAAAKBwAACi4AAApgAAAKeQAACokAAAq4AAAKwQAACs8AAArYAAAK8QAACw4AAAshAAALSAAAC1gAAAt1AAALjQAAC5sAAAu0AAALzQAAC9YAAAvhAAAL6gAAC/4AAAwRAAAMJAAADDQAAAxHAAAMUgAADGoAAAyCAAAMlwAADKUAAAy/AAAM0gAADN0AAAz8AAANDwAADSkAAA0yAAANTAAADVUAAA1jAAANfAAADYcAAA2VAAANqQAADcIAAA3mAAAN7wAADg4AAA4XAAAOQQAADloAAA5qAAAOcwAADoYAAA6PAAAOogAADrIAAA7FAAAPCwAADxsAAA8uAAAPRwAAD1AAAA+HAAAPoAAAD6kAAA/CAAAP3wAAD/wAABAZAAAQNgAAEE4AABBfAAAQlQAAEJ4AABCxAAAQugAAEOEAABEnAAARUwAAEWYAABF+AAARlgAAEbgAABJrAAASfgAAEpEAABKpAAASwQAAEswAABLcAAATCAAAExMAABMrAAATQwAAE1sAABNzAAATmgAAE8YAABPeAAAT5wAAE/AAABQSAAAUKgAAFEIAABRaAAAUYwAAFGwAABSOAAAUngAAFLsAABTYAAAU/wAAFSEAABVNAAAVZQAAFX0AABWVAAAVngAAFacAABXTAAAWBAAAFg0AABYvAAAWOgAAFkUAABZxAAAWhAAAFpIAABagAAAWrgAAFrwAABbVAAAW7QAAFxkAABd0AAAXzwAAF/wAABgUAAAYJQAAGC4AABhBAAAYXgAAGHEAABiYAAAYvAAAGOAAABkYAAAZPwAAGWYAABmNAAAZtAAAGdYAABn9AAAaEAAAGi0AAIBgACAAoAEAAADAAcAAAEBAQEBAQEBAYABAAAA/wAAAAEAAAD/AAQAAAD+AAAA/4AAAP8AAAAAAgEAAoADgAQAAAMABwAAAQEBAQEBAQEBAAEAAAD/AAGAAQAAAP8ABAAAAP6AAAABgAAA/oAAAAACAIAAgAQAA4AAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQAAAACAAAABAAAAAIAAAP+AAAAAgAAA/4AAAP8AAAD/gAAA/wAAAP+AAAAAgAAA/4AAAACAAQAAAACAAAADgAAA/4AAAACAAAD/gAAA/4AAAP8AAAD/gAAA/4AAAACAAAD/gAAAAIAAAACAAAABAAAAAIAAAP+A/wAAAAEAAAMAgACABAAEAAAbAB8AIwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAQAAAP8AAAABAAAAAIAAAP+AAAD/AAAA/4AAAP8AAAABAAAA/wAAAP+AAAAAgAAAAQD/gAAAAIAAAACAAAAAgAAABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/gP+AAAAAgP8A/4AAAACAAAAABQCAAIAEAAOAAAUAHQAjACkALwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAA/4AAAP+AAgABAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACA/YAAgAAAAIAAAP8AAoABAAAA/4AAAP+A/4AAgAAAAIAAAP8AA4AAAP8AAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAP+AAAD/gAAAAAAAAP8AAAAAgAAAAAAAAP+AAAD/gAAAAAAAAwCAAIAEAAQAABcAHQAjAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAACAAAAAgAAA/4AAAACAAAD9AAAA/4AAAACAAAD/gAAAAIAAgAAAAIAAAACAAAD/AAAAAQAAAP+AAAAEAAAA/4AAAP8AAAD/gAAAAIAAAP8AAAD/gAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAP+AAAD/gAAAAQD+gP8AAAAAgAAAAIAAAAABAYACgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAP6AAAAAAAABAQAAgAMABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/oAAAP+AAAD/gAAAAIAAAACAAAABgAAAAIAAAAAAAAEBAACAAwAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAAAgAAAAIAAAAGAAAAAgAAAAAAABQCAAYADgAQAAAMABwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAIAAAP+AAYAAgAAA/4D/AAEAAAABAAAA/wAAAP8AAAD/AAAAAQD/gACAAAD/gAGAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP+AAAAAAAABAQAAgAOAAwAACwAAAQEBAQEBAQEBAQEBAgAAgAAAAQAAAP8AAAD/gAAA/wAAAAEAAwAAAP8AAAD/gAAA/wAAAAEAAAAAgAAAAAAAAQCAAAACAAGAAAcAAAEBAQEBAQEBAQABAAAA/4AAAP8AAAAAgAGAAAD/AAAA/4AAAACAAAAAAAABAIABgAOAAgAAAwAAAQEBAQCAAwAAAP0AAgAAAP+AAAAAAAABAQAAgAIAAYAAAwAAAQEBAQEAAQAAAP8AAYAAAP8AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAwCAAIADgAQAAAsAEQAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAD/gAAAAIAAgAAAAIAAAACAAAD/gAAA/4AAAAEAAAAEAAAA/4AAAP2AAAD/gAAAAIAAAAKAAAAAAP8AAAAAgAAAAID/AP+AAAD/AAAAAYAAAAABAIAAgAOABAAADQAAAQEBAQEBAQEBAQEBAQEBgAEAAAABAAAA/QAAAAEAAAD/AAAAAIAAAACABAAAAP0AAAD/gAAAAIAAAAGAAAAAgAAAAIAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAAAIAAAACAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAA/wAAAAEAAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/wAAAAEAAAD/AAAA/wAAAACABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAA/4AAAACAAAAAAAABAIAAgAOABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAP+AAAABAAAAAQAAAP8AAAD+AAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAAEAAAD9gAAAAQAAAAGAAAAAgAAAAAEAgACAA4AEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP4AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/gAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAP+AAAABAAAAAAAAAgCAAIADgAQAABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAYAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAP+AAAAAgAAAAoAAAP6A/wAAAAEAAAEAgACAA4AEAAAPAAABAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AEAAAA/oAAAP+AAAD+gAAAAYAAAACAAAABAAAA/4AAAAAAAAMAgACAA4AEAAATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAAAIAAAP+AAAD+AAAA/4AAAACAAAD/gAAAAIAAgAAAAQAAAP8AAAABAAAABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAA/wAAAAEA/oD/AAAAAQAAAAACAIAAgAOABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD+gAAA/4AAAACAAIAAAAEAAAAEAAAA/4AAAP0AAAABAAAAAIAAAAGAAAAAAP6AAAABgAACAQABAAIAA4AAAwAHAAABAQEBAQEBAQEAAQAAAP8AAAABAAAA/wADgAAA/wAAAP+AAAD/AAAAAAIAgACAAgADgAADAAsAAAEBAQEBAQEBAQEBAQEAAQAAAP8AAAABAAAA/4AAAP8AAAAAgAOAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAABAQAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQKAAQAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAACAIABgAOAAwAAAwAHAAABAQEBAQEBAQCAAwAAAP0AAAADAAAA/QADAAAA/4AAAP+AAAD/gAAAAAEAgACAAwAEAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAIAgACAA4AEAAATABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP8AAAD/AAAAAIAAgAEAAAD/AAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAA/4AAAACAAAD+AAAA/wAAAAACAIAAgAOABAAAEQAVAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP6AAAAAgAAA/wAAAAGAAAD+AAAA/4AAAACAAgAAgAAA/4AEAAAA/4AAAP6AAAABAAAAAIAAAP2AAAD/gAAAAIAAAAKAAAD+AAAA/4AAAAAAAAIAgACAA4AEAAAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAAAIAAAACAAAD/AAAA/wAAAP8AAAAAgAAAAIAAAAAAAQAAAAQAAAD/gAAA/4AAAP2AAAABAAAA/wAAAAKAAAAAgAAA/4D/AAAAAQAAAwCAAIADgAQAAAsADwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAAAIAAAP+AAAD9gAEAAAABAAAA/wAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/wAAAP+AAAADAP8AAAABAP6A/wAAAAEAAAAAAQCAAIADgAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP8AAAD/AAAAAQAAAAEAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAACAIAAgAOABAAACwATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAEAAAAAgAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+gAAA/4AAAP+AAAADAP2AAAAAgAAAAYAAAACAAAEAgACAA4AEAAAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/wAAAAEAAAABAAAA/4AAAP4AAAD/gAAAAIAEAAAA/4AAAP+AAAAAgAAA/wAAAP+AAAD/AAAAAIAAAP+AAAD/gAAAAIAAAAKAAAAAAAABAIAAgAOABAAACQAAAQEBAQEBAQEBAQCAAwAAAP4AAAABAAAA/wAAAP8ABAAAAP+AAAD/AAAA/4AAAP6AAAAAAQCAAIADgAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAA/4AAAAGAAAD/gAAA/gAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD9gAAAAQAAAACAAAD+gAAA/4AAAACAAAACgAAAAAEAgACAA4AEAAALAAABAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP8AAAD/AAAA/wAEAAAA/gAAAAIAAAD8gAAAAQAAAP8AAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIADAAAA/wAAAAEAAAD9AAAAAQAAAP8ABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAAAAQCAAIAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAMAAAD/gAAA/4AAAP4AAAD/gAAAAQAAAAEAAAD+gAQAAAD/gAAA/YAAAP+AAAAAgAAAAQAAAP8AAAACgAAAAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAAEAAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAQAAAD/AAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAAAAAQCAAIADgAQAAAUAAAEBAQEBAQCAAQAAAAIAAAD9AAQAAAD9AAAA/4AAAAABAIAAgAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8ABAAAAP+AAAD/gAAAAIAAAACAAAD8gAAAAgAAAP+AAAAAgAAA/gAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAEAAAA/4AAAP+AAAD/gAAAAYAAAPyAAAABAAAAAIAAAACAAAD+AAAAAAAAAgCAAIADgAQAAAsADwAAAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAD/gAAA/gAAAP+AAAAAgACAAAABAAAABAAAAP+AAAD9gAAA/4AAAACAAAACgAAAAAD9gAAAAoAAAgCAAIADgAQAAAkADQAAAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP6AAAD/AAEAAAABAAAABAAAAP+AAAD+gAAA/4AAAP8AAAADAP6AAAABgAAAAAIAgACABAAEAAAPABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAD/gAAAAIAAAAQAAAD/gAAA/gAAAP8AAAAAgAAA/4AAAACAAAACgAAAAAD9gAAAAIAAAACAAAABgAACAIAAgAOABAAAEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAKAAAAAgAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AAQAAAAEAAAAEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAD/AAAAAwD/AAAAAQAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABgAAAAIAAAP+AAAD+AAAA/4AAAAEAAAABAAAA/oAAAP+AAAAAgAQAAAD/gAAA/4AAAACAAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAD/gAAAAQAAAACAAAABAAAAAAAAAQCAAIADgAQAAAcAAAEBAQEBAQEBAIADAAAA/wAAAP8AAAD/AAQAAAD/gAAA/QAAAAMAAAAAAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAP+ABAAAAP0AAAADAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIADgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAD/gAAA/wAAAP+AAAD/gAQAAAD+AAAAAgAAAP4AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAIAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAQAAAP8AAAD/gAAA/4AAAP+AAAD/AAQAAAD+AAAAAIAAAP+AAAACAAAA/IAAAACAAAAAgAAA/4AAAP+AAAAAAAABAIAAgAOABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/AAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP8AAAABAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAA/wAAAAEAAAAAgAAAAIAAAACAAAAAAAABAIAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAACAAAAAAAABAIAAgAOABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADAAAA/4AAAP+AAAD/gAAA/4AAAAIAAAD9AAAAAIAAAACAAAAAgAAAAIAAAP4ABAAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/wAAAAEAAAD+AAQAAAD/gAAA/YAAAP+AAAAAAAABAIAAgAQAA4AAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AA4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADAAQAAAcAAAEBAQEBAQEBAQACAAAA/gAAAAEAAAD/AAQAAAD8gAAAAIAAAAKAAAAAAAABAIACAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAEAAAMAAAEBAQEAgAMAAAD9AAEAAAD/gAAAAAAAAQEAAoACgAQAAAkAAAEBAQEBAQEBAQEBAAEAAAAAgAAA/4AAAP+AAAD/gAQAAAD/gAAA/wAAAACAAAAAgAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQACgAAA/4AAAP+AAAD/AAAAAQAAAP6AAAD/gAAAAIADAAAA/YAAAACAAAABgAAA/oAAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/gAAA/YABAAAAAQAAAAQAAAD/AAAA/4AAAP6AAAD/gAAAAgD+gAAAAYAAAAABAIAAgAOAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP8AAAABAAAAAQAAAP+AAAD+AAAA/4AAAACAAwAAAP+AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAAAAAAIAgACAA4AEAAAJAA0AAAEBAQEBAQEBAQEBAQEBAoABAAAA/YAAAP+AAAAAgAAAAYD/AAAAAQAAAAQAAAD8gAAAAIAAAAGAAAAAgAAA/4D+gAAAAYAAAAACAIAAgAOAAwAADQARAAABAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/gAAAAGAAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP8AAAD/gAAA/4AAAACAAAABgAAAAAD/gAAAAIAAAAABAQAAgAOAA4AACwAAAQEBAQEBAQEBAQEBAYACAAAA/oAAAAEAAAD/AAAA/wAAAACAA4AAAP+AAAD/AAAA/4AAAP8AAAACgAAAAAAAAgCAAIADgAOAAA8AEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP4AAAABgAAA/oAAAP+AAAAAgACAAAABAAAAA4AAAP+AAAD+AAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAAP8AAAABAAABAIAAgAOABAAACwAAAQEBAQEBAQEBAQEBAIABAAAAAYAAAACAAAD/AAAA/wAAAP8ABAAAAP8AAAD/gAAA/gAAAAIAAAD+AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP+AAAD/gAAA/YAAAAACAIAAgAOABAAAAwAPAAABAQEBAQEBAQEBAQEBAQEBAoABAAAA/wAAAAEAAAD/gAAA/gAAAP+AAAABAAAAAQAEAAAA/4AAAP+AAAD+AAAA/4AAAACAAAABAAAA/wAAAAABAIAAgAOAA4AAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAQAAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP8AA4AAAP8AAAAAgAAA/4AAAP8AAAD/gAAA/4AAAACAAAAAgAAA/wAAAAAAAAEBgACAAwAEAAAHAAABAQEBAQEBAQGAAQAAAACAAAD/AAAA/4AEAAAA/QAAAP+AAAAAgAAAAAAAAQCAAIAEAAMAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP8AAAAAgAMAAAD/gAAAAIAAAP+AAAD+AAAAAYAAAP+AAAAAgAAA/oAAAAIAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAABAAAAAIAAAP8AAAD/gAAA/4AAAP8AAwAAAP+AAAAAgAAA/4AAAP4AAAABgAAA/4AAAP8AAAAAAAACAIAAgAOAAwAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADAAAA/4AAAP6AAAD/gAAAAIAAAAGAAAAAAP6AAAABgAACAIAAgAOAAwAACQANAAABAQEBAQEBAQEBAQEBAQCAAoAAAACAAAD/gAAA/oAAAP8AAQAAAAEAAAADAAAA/4AAAP+AAAD/gAAA/wAAAAIA/4AAAACAAAAAAgCAAIAEAAMAAA0AEQAAAQEBAQEBAQEBAQEBAQEBAQEBAQACgAAAAIAAAP+AAAD/AAAA/oAAAP+AAAAAgACAAAABAAAAAwAAAP6AAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAA/4AAAACAAAAAAQEAAIADgAMAAAkAAAEBAQEBAQEBAQEBAAIAAAAAgAAA/wAAAP+AAAD/AAMAAAD/gAAA/wAAAAEAAAD+AAAAAAEAgACABAADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP6AAAABgAAAAIAAAP+AAAD9AAAAAgAAAP6AAAD/gAAAAIADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAP8AAAAAgAAAAQAAAP+AAAD+gAAA/4AAAP+AAAAAgAOAAAD/gAAA/4AAAP6AAAAAgAAA/4AAAP+AAAAAgAAAAYAAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAACAAAAAgAAAAQAAAP+AAAD/gAAA/oAAAP+AAwAAAP4AAAAAgAAAAYAAAP2AAAAAgAAA/4AAAACAAAAAAAABAIAAgAOAAwAADwAAAQEBAQEBAQEBAQEBAQEBAQCAAQAAAAEAAAABAAAA/4AAAP+AAAD/AAAA/4AAAP+AAwAAAP6AAAABgAAA/oAAAP+AAAD/gAAAAIAAAACAAAAAAAABAIAAgAQAAwAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAAAgAAAAIAAAACAAAABAAAA/4AAAP8AAAD/gAAA/wAAAP+AAwAAAP6AAAAAgAAA/4AAAAGAAAD+AAAA/4AAAACAAAD/gAAAAIAAAAAAAAEAgACAA4ADAAAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP8AAAD/AAAAAIAAAACAAAD/gAAA/4ADAAAA/4AAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAD/gAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAIABAAAAAQAAAAEAAAD/gAAA/gAAAAGAAAD+gAAA/4ADAAAA/wAAAAEAAAD+AAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAgACAA4ADAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQCAAwAAAP+AAAD/gAAA/4AAAAGAAAD9AAAAAIAAAACAAAAAgAAA/oADAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIADAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAA/wAAAP+AAAAAgAAAAQAAAP6AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAAAAAIAAAAEAAAAAAAABAYAAgAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPyAAAAAAAABAQAAgAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAGAAAAAgAAAAIAAAP+AAAD/gAAA/oAAAAEAAAAAgAAA/4AAAP8ABAAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAQAAAAAAAAEAgAGAA4ADAAAPAAABAQEBAQEBAQEBAQEBAQEBAQABAAAAAQAAAACAAAD/gAAA/wAAAP8AAAD/gAAAAIADAAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAYAAAAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/AAAA/wAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAABAAAAAQAAAACAAAAAgAAAAAAAAQIAAAAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD8AAAAAAAAAgCAAIADgAQAABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP8AAAABAAAA/4AAAP+AAAABgAAA/QAAAACAAAAAgAAA/wAAAACAAAAAgAGAAIAAAP+ABAAAAP+AAAD/AAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAABAAAAAAAAAP+AAAAAAQCAAIADgAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAEAAAABAAAAAQAAAP+AAAAAgAAA/wAAAAEAAAD/AAAA/wAAAP8AAAABAAAA/wAAAACAAAD/gAQAAAD+gAAAAYAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABACAAIAEAAQAABcAGwAfACMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAoAAAP4AAAABgAAAAIAAAACAAAD/gAAA/YAAAAIAAAD+gAAA/4AAAP+AAAAAgAEAAAAAgAAAAQAAgAAA/4D9AACAAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/wAAAP+AAAAAgAAAAIAAAACAAAAAgAAAAQAAAP8A/4AAAACAAQAAAP+AAAD+gAAA/4AAAAAEAIAAgAQAA4AAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAQIAAAAEAAQAAAkAAAEBAQEBAQEBAQEDgACAAAD+AAAAAIAAAACAAAAAgAQAAAD8AAAAAQAAAAEAAAABAAAAAAgAAAAABAAEAAADAAcACwAPABMAFwAbAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAA/wACAAEAAAD/AP8AAQAAAP8AAgABAAAA/wD9AAEAAAD/AAIAAQAAAP8A/wABAAAA/wACAAEAAAD/AAQAAAD/AAAAAQAAAP8AAAAAAAAA/wAAAAEAAAD/AAAAAAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQIAAAADAAQAAAMAAAEBAQECAAEAAAD/AAQAAAD8AAAAAAAAAgGAAIACgAQAAAMABwAAAQEBAQEBAQEBgAEAAAD/AAAAAQAAAP8ABAAAAP6AAAD/gAAA/oAAAAABAgAAAAQAAgAAAwAAAQEBAQIAAgAAAP4AAgAAAP4AAAAAAAAEAIAAAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+ABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAAABAAAAPwAAAAAAQCAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAoABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAD/gAOAAAD+AAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAA/wAAAAEAAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAAAEAAAA/gAAAP+AAAD/gAAA/4AAAP+ABAAAAPwAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQCAAIAEAAOAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAOAAAD/gAAAAIAAAP8AAAABAAAA/oAAAAGAAAD9AAAAAIAAAP+AAAABAAAA/wAAAAGAAAD+gAAAAAAAAQAAAAACAAQAAAkAAAEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD+AAQAAAD/AAAA/wAAAP8AAAD/AAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQKAAYAAAP8AAAD/AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAEAAAA/wAAAP+AAAD/gAAA/wAAAP8AAAABgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD8AAAAAIAAAACAAAAAgAIAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgAAAAAEAAQAAAMABwAAAQEBAQEBAQEAAAIAAAD+AAIAAgAAAP4ABAAAAP4AAAAAAAAA/gAAAAAEAAACAAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8ABAAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAABAIAAAAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQECAAEAAAD/AAEAAQAAAP8A/wABAAAA/wABAAEAAAD/AAQAAAD/AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAEDAAAABAAEAAADAAABAQEBAwABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD9AAAA/wAEAAAA/wAAAP0AAAAAAQAAAAABAAQAAAMAAAEBAQEAAAEAAAD/AAQAAAD8AAAAAAAAAwCAAIADAAOAAAMABwALAAABAQEBAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AAQAAgAAA/4ADgAAA/QAAAAMAAAD9AAAAAwAAAP0AAAAAAAABAYABgAQABAAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAAEAAAD+gAAA/4AAAP+ABAAAAP8AAAD/gAAA/wAAAACAAAAAgAAAAAAAAQAAAYACgAQAAAsAAAEBAQEBAQEBAQEBAQGAAQAAAP+AAAD/gAAA/oAAAAEAAAAAgAQAAAD+gAAA/4AAAP+AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAwABAAAA/AAAAAEAAAABAAAAAQAEAAAA/AAAAAKAAAAAgAAAAIAAAAABAIAAgAMABAAACwAAAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP0AAAD/gAAAAIAAAAEAAAAAgAAAAAAAAQAAAAAEAAQAAAUAAAEBAQEBAQAAAQAAAAMAAAD8AAQAAAD9AAAA/wAAAAACAIAAgAMAAoAACwAPAAABAQEBAQEBAQEBAQEBAQEBAQABgAAAAIAAAP+AAAD+gAAAAQAAAP8A/4AAgAAA/4ACgAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAMABAAACwAPAAABAQEBAQEBAQEBAQEBAQEBAgABAAAA/4AAAP6AAAABAAAA/wAAAAEA/oAAgAAA/4AEAAAA/QAAAP+AAAAAgAAAAQAAAACAAAD/gAAA/wAAAAABAIAAgAQABAAADQAAAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAA/4AAAP6AAAD/gAAAAIAAAAEABAAAAP+AAAD9gAAA/4AAAACAAAABAAAAAIAAAAACAAAAAAQABAAAAwAHAAABAQEBAQEBAQAABAAAAPwAAQAAAAIAAAAEAAAA/AAAAAMA/gAAAAIAAAEAgACABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAD/gAAA/oAAAP+AAAAAgAAAAQAEAAAA/4AAAP+AAAD/gAAA/oAAAP+AAAAAgAAAAQAAAACAAAAAAQAAAAACgAKAAAsAAAEBAQEBAQEBAQEBAQAAAYAAAACAAAAAgAAA/wAAAP+AAAD/AAKAAAD/gAAA/4AAAP6AAAABAAAAAIAAAAAAAAEAAAAABAAEAAAFAAABAQEBAQEAAAQAAAD/AAAA/QAEAAAA/AAAAAMAAAAAAQCAAIAEAAQAABUAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAAIAAAD/AAAAAQAAAP8AAAABAAAA/wAAAP+AAAD+gAAA/4AAAACAAAABAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAAEAAAAAgAAAAAEBgAAABAACgAALAAABAQEBAQEBAQEBAQECgAGAAAD/AAAA/4AAAP8AAAAAgAAAAIACgAAA/wAAAP+AAAD/AAAAAYAAAACAAAAAAAABAAAAAAQABAAAEQAAAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAPwABAAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAABAAADAAABAQEBAAAEAAAA/AABAAAA/wAAAAAAAAEAAAAABAAEAAARAAABAQEBAQEBAQEBAQEBAQEBAQEDgACAAAD8AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAEAAAA/AAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAQAAAgAEAAQAAAMAAAEBAQEAAAQAAAD8AAQAAAD+AAAAAAAAAgCAAIACAAOAAAMABwAAAQEBAQEBAQEAgACAAAD/gAEAAIAAAP+AA4AAAP0AAAADAAAA/QAAAAAEAIAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAABAAAAPyAAAADAP+AAAAAgP8A/4AAAACA/wD/gAAAAIAAAQAAAAAEAAQAAAUAAAEBAQEBAQMAAQAAAPwAAAADAAQAAAD8AAAAAQAAAAACAIAAgAQABAAAAwAHAAABAQEBAQEBAQCAA4AAAPyAAYAAAACAAAAEAAAA/IAAAAIA/4AAAACAAAMAgACABAAEAAADAAcACwAAAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgP4A/4AAAACAAAAABAAAAIAEAAQAAAMABwALAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD8AAAABAAAAPwAAAAEAAAA/AAAAAQAAAD8AAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAAYAgACABAAEAAADAAcACwAPABMAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/oAAAACAAAD+gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAID/AP+AAAAAgAAA/4AAAACAAAEAgACAAQADgAADAAABAQEBAIAAgAAA/4ADgAAA/QAAAAAAAAUAgACABAAEAAADAAcACwAPABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAIADgAAA/IAAgAAAAIAAAAGAAAAAgAAA/YAAAACAAAABgAAAAIAAAAQAAAD8gAAAAwD/gAAAAIAAAP+AAAAAgP4A/4AAAACAAAD/gAAAAIAAAAABAAADAAQABAAAAwAAAQEBAQAABAAAAPwABAAAAP8AAAAAAAAHAIAAgAQABAAAAwAHAAsADwATABcAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQCAA4AAAPyAAIAAAACAAAABgAAAAIAAAP2AAAAAgAAAAYAAAACAAAD9gAAAAIAAAAGAAAAAgAAABAAAAPyAAAADAP+AAAAAgAAA/4AAAACA/wD/gAAAAIAAAP+AAAAAgP8A/4AAAACAAAD/gAAAAIAAAAAEAAAAAAQAAgAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAgABAAAA/wD/AAEAAAD/AAIAAQAAAP8AAgAAAP8AAAABAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAAAAQAAAAAEAAQAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAQAAAD/gAAA/4AAAP+AAAD9gAAAAAEBAAAAAgAEAAADAAABAQEBAQABAAAA/wAEAAAA/AAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQECgAGAAAD8AAAAAIAAAACAAAAAgAAAAQAEAAAA/AAAAAGAAAABAAAAAIAAAACAAAAAAAABAAABAAQAAgAAAwAAAQEBAQAABAAAAPwAAgAAAP8AAAAAAAABAAAAAAQABAAACwAAAQEBAQEBAQEBAQEBAgACAAAA/AAAAACAAAAAgAAAAIAAAACABAAAAPwAAAACAAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEDAAEAAAD8AAAAAQAAAAEAAAABAAIAAAD+AAAAAIAAAACAAAAAgAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAIAAAAAgAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/4AAAP4AAAAAAAADAAAAAAQABAAAGwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAIAAYAAAACAAAD/gAAA/4AAAP+AAAD/gP4AAIAAAACAAAAAgAAAAIAAAP6AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAQAAAP+AAAD+gAAAAIAAAACAAAAAgAAA/oAAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAAAAAQAAAAAEAAIAAAkAAAEBAQEBAQEBAQEAAAEAAAABAAAAAQAAAAEAAAD8AAIAAAD/gAAA/4AAAP+AAAD/gAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAGAAAABAAAAAIAAAACAAAAAgAAA/AAEAAAA/4AAAP+AAAD/gAAA/wAAAP6AAAAAAAAEAAAAgAQABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQCAAYAAAP6AAgABgAAA/oD9gAGAAAD+gAIAAYAAAP6ABAAAAP6AAAABgAAA/oAAAP+AAAD+gAAAAYAAAP6AAAAAAQIAAgAEAAQAAAMAAAEBAQECAAIAAAD+AAQAAAD+AAAAAAAABACAAIAEAAQAAAMABwAjACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAD/AAGAAQAAAP8A/gAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4ABgACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAAAAA/wAAAP+AAAD/gAAAAIAAAACAAAABAAAA/oAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAGAAAD/gAAAAAQAAAAABAAEAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ADgACAAAD/gPyAAIAAAP+AA4AAgAAA/4AEAAAA/4AAAACAAAD/gAAA/QAAAP+AAAAAgAAA/4AAAAABAAAAAAIAAgAAAwAAAQEBAQAAAgAAAP4AAgAAAP4AAAAAAAAEAAAAAAIABAAAAwAHAAsADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAP8AAQABAAAA/wD/AAEAAAD/AAEAAQAAAP8ABAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAAAAAAAP8AAAAAAQCAAQADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAYABAAAA/4AAAAGAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAOAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAACAAAAAAAABAQABAAOABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACABAAAAP+AAAD/gAAA/wAAAACAAAD+gAAAAYAAAP+AAAABAAAAAIAAAAAAAAEBAAEABAADgAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQIAAQAAAACAAAAAgAAA/4AAAP+AAAD/AAAAAIAAAP6AAAABgAAA/4ADgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAOAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAOAAAD+gAAAAIAAAP8AAAD/gAAA/4AAAACAAAAAgAAAAQAAAP+AAAAAAAABAQAAgAOABAAADwAAAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAA/4AAAP6AAAD/gAAAAIAAAACABAAAAP8AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAAAACAIAAgAOAA4AAAwAJAAABAQEBAQEBAQEBAIADAAAA/QAAgAAAAgAAAP8AAAADgAAA/QAAAAKA/gAAAAEAAAABAAAAAAIAgACABAAEAAAbACcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAD/gAAAAIAAAACAAAAAgAAA/4AAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAA/4D/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAEAAAIABAADAAADAAABAQEBAAAEAAAA/AADAAAA/wAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/gAAA/gAEAAAA/gAAAP+AAAD/gAAA/4AAAP+AAAAAAAABAAACAAIABAAAAwAAAQEBAQAAAgAAAP4ABAAAAP4AAAAAAAACAQAAgAOAA4AAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP8AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAACAAAAAgAAA/wAAAACAAIAAAACAAAADgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgP+AAAAAgAADAAAAAAQABAAACwAnADMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAGAAAD/gAAA/4AAAP+AAAD/gAAAAIACgAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgACAAIAAAP+AAAD+gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAAAYAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAA/oAAAP6AAAD/gAAAAIAAAACAAAAAgAAAAAAAAgCAAIADgAQAAA8AHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAAABAAAAAIAAAP+AAAD/AAAA/wAAAP+AAAAAgAAAAQAAAAEAAAAAgAAA/4AAAP8AAAD/AAAA/4AAAACABAAAAP+AAAAAgAAA/wAAAP+AAAAAgAAA/4AAAAEAAAD+gAAA/4AAAACAAAD/AAAA/4AAAACAAAD/gAAAAQAAAAABAAAAAAQAA4AACwAAAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD8AAAAAIAAAACAA4AAAP+AAAD/gAAA/YAAAAKAAAAAgAAAAAAAAQAAAAACAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAAAAAQIAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDgACAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQCAAIAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP+AAAD/AAAA/4AAAP8AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/oAAAAEAAAD/AAAAAYAAAACAAAAAgAAAAIAAAAAAACAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AEMARwBLAE8AUwBXAFsAXwBjAGcAawBvAHMAdwB7AH8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gPyAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/YAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D8gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gP2AAIAAAP+AAQAAgAAA/4ABAACAAAD/gAEAAIAAAP+A/IAAgAAA/4ABAACAAAD/gAEAAIAAAP+AAQAAgAAA/4D9gACAAAD/gAEAAIAAAP+AAQAAgAAA/4ABAACAAAD/gAQAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAACAAAD/gAAAAIAAAP+AAAAAAQAAAAAEAAQAAAsAAAEBAQEBAQEBAQEBAQAABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAQAAAD8AAAAAIAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/oAEAAAA/oAAAP8AAAD/gAAA/4AAAP+AAAAAAAABAAABgAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAAAAAKABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP2AAAACAAAAAIAAAACAAAAAAAABAYAAAAQAAoAABQAAAQEBAQEBAYACgAAA/oAAAP8AAoAAAP8AAAD+gAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAAACgAAAAIAAAACAAAAAgAAA/AAEAAAA/wAAAP8AAAD/AAAA/wAAAAACAAAAAAQABAAAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAAAAAEAAAAEAAAA/4AAAP+AAAD/gAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAEAAAAAgAAAAIAAAP8A/wAAAAEAAAEBgAGABAAEAAAFAAABAQEBAQEBgAEAAAABgAAA/YAEAAAA/oAAAP8AAAAAAQAAAAACgAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD+AAAAAoAAAACAAAAAgAAAAAAAAQGAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQGAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAAEAAAAAgAAAAQAAAACAAAAAAAABAAABgAQABAAADwAAAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAgAAAP2AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAAAAAABAAABgAQAAoAAAwAAAQEBAQAABAAAAPwAAoAAAP8AAAAAAAABAYAAAAKABAAAAwAAAQEBAQGAAQAAAP8ABAAAAPwAAAAAAAABAYAAAAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACABAAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAQAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAKAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD+AAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAYAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD9gAAAAgAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQAAAgAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEAAAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAAAAAQAAAYACgAKAAAMAAAEBAQEAAAKAAAD9gAKAAAD/AAAAAAAAAQGAAAACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD9gAAAAAAAAQAAAYAEAAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAABAAAAAIAAAAEAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAQAAAD/gAAA/4AAAACAAAAAgAAA/wAAAP+AAAD/gAAA/4AAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAAJAAABAQEBAQEBAQEBAYACgAAA/AAAAACAAAAAgAAAAIAEAAAA/AAAAAEAAAABAAAAAQAAAAABAAAAAAQABAAAEwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/AAAA/oAAAAEAAAABAAAAAIAAAACABAAAAP6AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAQAAAAAAAAEAAAAABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAQAAAAEAAAD+gAAA/wAAAP+AAAD/gAAA/4AEAAAA/wAAAP8AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAACAAAABAAAAAAAAAQAAAAAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEDAAEAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQAAAAACgAQAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAP+AAAD/gAAA/4AAAP8AAAAAgAAAAIAAAP+AAAD/gAQAAAD/gAAA/4AAAP+AAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAABAAAAAIAAAAAAAAEAAAAABAAEAAAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAQAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQAAAAACgAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAQAAAD9gAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAAAEAAQAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAEAAAAAgAAAAIAAAACAAAD/AAAA/4AAAP+AAAD/gAQAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAAAAAAAAQAAAAAEAAKAAA8AAAEBAQEBAQEBAQEBAQEBAQEBgAKAAAD+AAAA/4AAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/AAAA/4AAAP+AAAD/gAAAAQAAAACAAAAAgAAAAAAAAQGAAYACgAQAAAMAAAEBAQEBgAEAAAD/AAQAAAD9gAAAAAAAAQGAAYAEAAKAAAMAAAEBAQEBgAKAAAD9gAKAAAD/AAAAAAAAAQAAAAAEAAQAAB8AAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAQAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAACAAAAAgAAAAIAAAACAAAAAAAABAAAAAAQABAAAIwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAABAAAAAIAAAAEAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAA/4AAAP+AAAABAAAAAIAAAAEAAAAAgAAAAAAAAQGAAYACgAKAAAMAAAEBAQEBgAEAAAD/AAKAAAD/AAAAAAAAAQAAAAAEAAKAABcAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAQAAAACAAAAAgAAAAIAAAP8AAAD/gAAA/wAAAP+AAAD/AAAAAIAAAACAAAAAgAKAAAD/gAAA/4AAAP+AAAD/AAAAAIAAAACAAAD/gAAA/4AAAAEAAAAAgAAAAIAAAAAAAAEAAAGAAoAEAAAFAAABAQEBAQEBgAEAAAD9gAAAAYAEAAAA/YAAAAEAAAAAAQAAAAACgAKAAAUAAAEBAQEBAQAAAoAAAP8AAAD+gAKAAAD9gAAAAYAAAAABAAAAAAQABAAAHwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAEAAAAAgAAAAQAAAACAAAABAAAA/4AAAP+AAAAAgAAAAIAAAP8AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+ABAAAAP+AAAD/gAAAAIAAAACAAAD/AAAA/4AAAP8AAAD/gAAA/wAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAAAAAAEAAAAABAAEAAALAAABAQEBAQEBAQEBAQEBgAEAAAABgAAA/oAAAP8AAAD+gAAAAYAEAAAA/oAAAP8AAAD+gAAAAYAAAAEAAAAAAAABAAAAAAQAAoAABwAAAQEBAQEBAQEAAAQAAAD+gAAA/wAAAP6AAoAAAP8AAAD+gAAAAYAAAAAAAAEBgAAABAAEAAAHAAABAQEBAQEBAQGAAQAAAAGAAAD+gAAA/wAEAAAA/oAAAP8AAAD+gAAAAAAAAQAAAAACgAQAAAcAAAEBAQEBAQEBAYABAAAA/wAAAP6AAAABgAQAAAD8AAAAAYAAAAEAAAAAAAABAAABgAQABAAABwAAAQEBAQEBAQEBgAEAAAABgAAA/AAAAAGABAAAAP6AAAD/AAAAAQAAAAAAAAQBAAEAAwADAAADAAcACwAPAAABAQEBAQEBAQEBAQEBAQEBAYABAAAA/wD/gACAAAD/gAGAAIAAAP+A/wABAAAA/wADAAAA/4AAAAAAAAD/AAAAAQAAAP8AAAAAAAAA/4AAAAACAIAAgAOAA4AACwAPAAABAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAP+AAAD+AAAA/4AAAACAAIAAAAEAAAADgAAA/4AAAP4AAAD/gAAAAIAAAAIAAAD/gP8AAAABAAACAAAAAAQABAAAEwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAgAAAACAAAAAgAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAgAAA/4AAAACAAAABAAAAAIAAAP+AAAAEAAAA/4AAAP+AAAD+AAAA/4AAAP+AAAAAgAAAAIAAAAIAAAAAgAAA/4D/gAAA/wAAAP+AAAAAgAAAAQAAAACAABAAAAAABAAEAAADAAcACwAPABMAFwAbAB8AIwAnACsALwAzADcAOwA/AAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP+AAIAAAP+AAgAAgAAA/4D9gACAAAD/gAIAAIAAAP+A/YAAgAAA/4ACAACAAAD/gP2AAIAAAP+AAgAAgAAA/4AEAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAQAAAAAAQABAAAAwAHAAsADwATABcAGwAfACMAJwArAC8AMwA3ADsAPwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D8gACAAAD/gAIAAIAAAP+A/oAAgAAA/4ACAACAAAD/gP6AAIAAAP+AAgAAgAAA/4D+gACAAAD/gAIAAIAAAP+ABAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAAAA/4AAAACAAAD/gAAAAAAAAP+AAAAAgAAA/4AAAAAAAAD/gAAAAIAAAP+AAAAAAwCAAIADgAQAABcAGwAfAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAAEAAAD/AAAAAIAAAP+AAAABAAAA/wAAAP+AAAD/AAAA/4AAAACAAAABAP+AAAAAgAAA/4AAAACAAAAEAAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACAAAAAgAAAAYAAAACAAAD/gP+AAAAAgP8A/4AAAACAAAAAAQCAAIADgAOAAA8AAAEBAQEBAQEBAQEBAQEBAQEBAAIAAAAAgAAA/4AAAP+AAAD/AAAA/4AAAP+AAAAAgAOAAAD/gAAA/wAAAP+AAAD/AAAAAQAAAACAAAABAAAAAAAAAgCAAIADgAOAAAMACQAAAQEBAQEBAQEBAQCAAwAAAP0AAYAAAP8AAAACAAAAA4AAAP0AAAACgP8AAAD/AAAAAgAAAAABAIAAgAOAA4AAAwAAAQEBAQCAAwAAAP0AA4AAAP0AAAAAAAACAIAAgAOAA4AAAwALAAABAQEBAQEBAQEBAQEAgAMAAAD9AACAAAACAAAA/4AAAP8AAAADgAAA/QAAAAKA/gAAAAIAAAD/AAAAAQAAAQAAAAAEAAQAABMAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQACAAAAAIAAAACAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAQAAAD/gAAA/4AAAP4AAAD/gAAA/4AAAACAAAAAgAAAAgAAAACAAAAAAAABAQABAAMAAwAACwAAAQEBAQEBAQEBAQEBAYABAAAAAIAAAP+AAAD/AAAA/4AAAACAAwAAAP+AAAD/AAAA/4AAAACAAAABAAAAAAAAAQCAAQAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAQAAAP+AAAD/gAAAAIAAAP8AAAD/gAAA/wAAAACAAAD/gAAA/4AAAAEAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAAAgAAA/4AAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+AAAAAIAAAAGAAAAAgAAA/gAAAAGAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgAAA/4AAAACA/4D/gAAAAIAABgCAAIAEAAQAAAMABwALAA8AEwAXAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAgAOAAAD8gAEAAAAAgAAAAIAAAACAAAD+gAAAAYAAAP4AAAAAgAAAAYAAAACAAAAEAAAA/IAAAAMA/wAAAAEAAAD/AAAAAQD+gP+AAAAAgP+A/4AAAACAAAD/gAAAAIAABgCAAIAEAAQAABMAFwAbAB8AIwAnAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgAAgAAAAIAAAAEAAAD/AAAA/4AAAP+AAAD/gAAA/wAAAAEAAAAAgAAAAAAAgAAA/oAAgAAA/4ACAACAAAD/gP4AAIAAAP+AAgAAgAAA/4AEAAAA/wAAAP+AAAD/gAAA/4AAAP8AAAABAAAAAIAAAACAAAAAgAAA/4D/gAAAAIABAAAA/4AAAACAAAD/gAAA/oAAAP+AAAAAgAAA/4AAAAACAQAAgAOABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYABgAAAAIAAAP+AAAD/gAAAAIAAAP+AAAD/gAAA/4AAAACAAAD/gAAAAQAAAP8A/4AAgAAA/4AEAAAA/4AAAP8AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAAEAAAAAAAAA/wAAAAACAIAAgAQABAAAFwAbAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAYACgAAA/4AAAP+AAAD/gAAAAIAAAP+AAAD+gAAAAQAAAP8AAAABAAAAAIAAAP8A/wAAgAAA/4AEAAAA/gAAAAEAAAD/gAAA/4AAAP8AAAD/gAAAAIAAAAEAAAAAgAAAAIAAAACAAAD+gAAA/wAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQIAAIAAAACAAAAAgAAAAIAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAAAgAAAAIAAAACABAAAAP+AAAD/gAAA/4AAAP8AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABAAAAAIAAAACAAAAAAAABAIAAgAQABAAAGwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQGAAYAAAP+AAAAAgAAAAQAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/4AAAP8AAAABAAAAAIAAAP+ABAAAAP8AAAD/gAAAAIAAAP6AAAAAgAAA/wAAAP+AAAAAgAAAAQAAAP+AAAABgAAA/4AAAACAAAAAAAABAIAAgAQABAAAFwAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAAAAIAAAAEAAAAAgAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAA/4AAAACABAAAAP+AAAAAgAAA/4AAAP6AAAD/gAAA/4AAAP+AAAAAgAAAAIAAAACAAAABgAAAAAAAAQCAAIAEAAQAABsAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAACAAAAAgAAAAIAAAACAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAQAAAD/gAAA/4AAAP+AAAD/gAAA/4AAAP+AAAD/gAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAQEAAIADgAQAAAsAAAEBAQEBAQEBAQEBAQIAAYAAAP8AAAD/gAAA/wAAAACAAAAAgAQAAAD/AAAA/gAAAP+AAAABAAAAAIAAAAAAAAEAgACABAAEAAATAAABAQEBAQEBAQEBAQEBAQEBAQEBAQGAAoAAAP+AAAD/AAAAAIAAAACAAAD+gAAA/4AAAP8AAAAAgAAAAIAEAAAA/QAAAP+AAAABAAAAAIAAAAEAAAD+AAAA/4AAAAEAAAAAgAAAAAAAAAAYASYAAQAAAAAAAAAIAAAAAQAAAAAAAQAIAAgAAQAAAAAAAgAHABAAAQAAAAAAAwAIABcAAQAAAAAABAAQAB8AAQAAAAAABQALAC8AAQAAAAAABgAIADoAAQAAAAAACQAJAEIAAQAAAAAACgA6AEsAAQAAAAAADQARAIUAAQAAAAAADgAyAJYAAQAAAAAAEwAMAMgAAwABBAkAAAAQANQAAwABBAkAAQAQAOQAAwABBAkAAgAOAPQAAwABBAkAAwAQAQIAAwABBAkABAAgARIAAwABBAkABQAWATIAAwABBAkABgAQAUgAAwABBAkACQASAVgAAwABBAkACgB0AWoAAwABBAkADQAiAd4AAwABBAkADgBkAgAAAwABBAkAEwAYAmQoYykgMjAyMlVyc2FGb250UmVndWxhclVyc2FGb250VXJzYUZvbnQgUmVndWxhclZlcnNpb24gMS4wVXJzYUZvbnRVcnNhRnJhbmtBbiBvcGVuIGxpY2VuY2UgZ2VuZXJhbCBwdXJwb3NlIHRleHRtb2RlIGZvbnQgYnkgVXJzYUZyYW5rQ0MwIDEuMCBVbml2ZXJzYWxodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvcHVibGljZG9tYWluL3plcm8vMS4wL0hlbGxvIFdvcmxkIQAoAGMAKQAgADIAMAAyADIAVQByAHMAYQBGAG8AbgB0AFIAZQBnAHUAbABhAHIAVQByAHMAYQBGAG8AbgB0AFUAcgBzAGEARgBvAG4AdAAgAFIAZQBnAHUAbABhAHIAVgBlAHIAcwBpAG8AbgAgADEALgAwAFUAcgBzAGEARgBvAG4AdABVAHIAcwBhAEYAcgBhAG4AawBBAG4AIABvAHAAZQBuACAAbABpAGMAZQBuAGMAZQAgAGcAZQBuAGUAcgBhAGwAIABwAHUAcgBwAG8AcwBlACAAdABlAHgAdABtAG8AZABlACAAZgBvAG4AdAAgAGIAeQAgAFUAcgBzAGEARgByAGEAbgBrAEMAQwAwACAAMQAuADAAIABVAG4AaQB2AGUAcgBzAGEAbABoAHQAdABwAHMAOgAvAC8AYwByAGUAYQB0AGkAdgBlAGMAbwBtAG0AbwBuAHMALgBvAHIAZwAvAHAAdQBiAGwAaQBjAGQAbwBtAGEAaQBuAC8AegBlAHIAbwAvADEALgAwAC8ASABlAGwAbABvACAAVwBvAHIAbABkACEAAAADAAAAAAAAAGYAMwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==\r\n";

    const p5asciify = new P5Asciify();

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
    };
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
            p5asciify.font = loadedFont;
            p5asciify.p5Instance._decrementPreload();
            if (p5asciify.p5Instance.frameCount > 0) {
                p5asciify.brightnessCharacterSet.setFontObject(loadedFont);
                p5asciify.edgeCharacterSet.setFontObject(loadedFont);
                p5asciify.grid.resizeCellPixelDimensions(
                    p5asciify.brightnessCharacterSet.maxGlyphDimensions.width,
                    p5asciify.brightnessCharacterSet.maxGlyphDimensions.height
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
    };
    p5.prototype.registerMethod("afterSetup", p5.prototype.setupAsciifier);

    p5.prototype.resetAsciiGrid = function () {
        p5asciify.grid.reset();
        p5asciify.sampleFramebuffer.resize(p5asciify.grid.cols, p5asciify.grid.rows);
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

        const { ascii: asciiOptions, edge: edgeOptions, common: commonOptions, gradient: gradientOptions } = options;

        const colorOptions = [edgeOptions, asciiOptions, gradientOptions];
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
    };

    p5.prototype.removeAsciiGradient = function (gradientInstance) {
        p5asciify.gradientManager.removeGradient(gradientInstance);
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

    return p5asciify;

}));
