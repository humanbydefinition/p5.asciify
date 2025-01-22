import p5 from 'p5';
import { P5AsciifyLinearGradient } from "./linear/Linear";
import { P5AsciifySpiralGradient } from "./spiral/Spiral";
import { P5AsciifyRadialGradient } from "./radial/Radial";
import { P5AsciifyConicalGradient } from "./conical/Conical";
import { P5AsciifyGradient } from './Gradient';

import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';

import { GradientParams, GradientType, GradientConstructorMap } from './types';

import vertexShader from '../assets/shaders/vert/shader.vert';
import linearGradientShader from "../gradients/linear/linear.frag";
import spiralGradientShader from "../gradients/spiral/spiral.frag";
import radialGradientShader from "../gradients/radial/radial.frag";
import conicalGradientShader from "../gradients/conical/conical.frag";
import { P5AsciifyError } from '../AsciifyError';
import { validateNumberInRange } from '../utils';

/**
 * Manages the creation and removal of gradients for the gradient ascii renderer.
 */
export class P5AsciifyGradientManager {
    private _gradientParams: GradientParams = {
        linear: { direction: 1, angle: 0, speed: 0.01, zigzag: false },
        spiral: { direction: 1, centerX: 0.5, centerY: 0.5, speed: 0.01, density: 0.01 },
        radial: { direction: 1, centerX: 0.5, centerY: 0.5, radius: 0.5 },
        conical: { centerX: 0.5, centerY: 0.5, speed: 0.01 },
    };

    private _gradientShaderSources: Record<GradientType, string> = {
        linear: linearGradientShader,
        spiral: spiralGradientShader,
        radial: radialGradientShader,
        conical: conicalGradientShader,
    };

    private _gradientShaders: Partial<Record<GradientType, p5.Shader>> = {};

    private _gradientConstructors: GradientConstructorMap = {
        linear: (p, fontTextureAtlas, shader, characters, brightnessStart, brightnessEnd, params) =>
            new P5AsciifyLinearGradient(p, fontTextureAtlas, shader, characters, brightnessStart, brightnessEnd, params),
        spiral: (p, fontTextureAtlas, shader, characters, brightnessStart, brightnessEnd, params) =>
            new P5AsciifySpiralGradient(p, fontTextureAtlas, shader, characters, brightnessStart, brightnessEnd, params),
        radial: (p, fontTextureAtlas, shader, characters, brightnessStart, brightnessEnd, params) =>
            new P5AsciifyRadialGradient(p, fontTextureAtlas, shader, characters, brightnessStart, brightnessEnd, params),
        conical: (p, fontTextureAtlas, shader, characters, brightnessStart, brightnessEnd, params) =>
            new P5AsciifyConicalGradient(p, fontTextureAtlas, shader, characters, brightnessStart, brightnessEnd, params),
    };

    private _gradients: P5AsciifyGradient[] = [];

    constructor(
        private _p: p5,
        private _fontTextureAtlas: P5AsciifyFontTextureAtlas
    ) {
        // Initialize the shaders for the gradients.
        for (const gradientName of Object.keys(this._gradientShaderSources) as GradientType[]) {
            const fragShader = this._gradientShaderSources[gradientName];
            this._gradientShaders[gradientName] = this._p.createShader(vertexShader, fragShader);
        }
    }

    /**
     * Add a gradient to the gradient manager.
     * @param gradientName The name of the gradient to add.
     * @param brightnessStart The start brightness of the gradient.
     * @param brightnessEnd The end brightness of the gradient.
     * @param characters The characters to use for the gradient.
     * @param options The parameters for the gradient.
     * @returns The gradient instance.
     */
    add(
        gradientName: GradientType,
        characters: string,
        brightnessStart: number,
        brightnessEnd: number,
        options: Partial<GradientParams[typeof gradientName]>
    ): P5AsciifyGradient {

        // Validate gradient name type and existence
        if (typeof gradientName !== 'string') {
            throw new P5AsciifyError('Gradient name must be a string');
        }
        if (!this.gradientConstructors[gradientName]) {
            throw new P5AsciifyError(
                `Gradient '${gradientName}' does not exist! Available gradients: ${Object.keys(this.gradientConstructors).join(", ")}`
            );
        }

        // Validate brightness types and ranges
        if (typeof brightnessStart !== 'number') {
            throw new P5AsciifyError('Brightness start value must be a number');
        }
        if (typeof brightnessEnd !== 'number') {
            throw new P5AsciifyError('Brightness end value must be a number');
        }
        validateNumberInRange(brightnessStart, 0, 255, 'brightness start');
        validateNumberInRange(brightnessEnd, 0, 255, 'brightness end');

        // Validate characters
        if (typeof characters !== 'string') {
            throw new P5AsciifyError('Characters must be a string');
        }
        if (characters.length === 0) {
            throw new P5AsciifyError('Characters string cannot be empty');
        }

        // Validate userParams
        if (!options || typeof options !== 'object' || Array.isArray(options)) {
            throw new P5AsciifyError('User parameters must be an object');
        }

        // Validate userParams keys
        const validParams = Object.keys(this.gradientParams[gradientName]);
        const invalidKeys = Object.keys(options).filter(key => !validParams.includes(key));
        if (invalidKeys.length > 0) {
            throw new P5AsciifyError(
                `Invalid parameter(s) for gradient '${gradientName}': ${invalidKeys.join(", ")}\nValid parameters are: ${validParams.join(", ")}`
            );
        }

        const gradient = this._gradientConstructors[gradientName](
            this._p,
            this._fontTextureAtlas,
            this._gradientShaders[gradientName] as p5.Shader,
            characters,
            brightnessStart,
            brightnessEnd,
            { ...this._gradientParams[gradientName], ...options }
        );

        this._gradients.push(gradient);

        return gradient;
    }

    /**
     * Remove a gradient from the gradient manager.
     * @param gradient The gradient to remove.
     */
    remove(gradient: P5AsciifyGradient): void {
        const index = this._gradients.indexOf(gradient);
        if (index > -1) {
            this._gradients.splice(index, 1);
        }
    }

    // Getters
    get gradientParams(): GradientParams { return this._gradientParams; }
    get gradients(): P5AsciifyGradient[] { return this._gradients; }
    get gradientConstructors(): GradientConstructorMap { return this._gradientConstructors; }
}