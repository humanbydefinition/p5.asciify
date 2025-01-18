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

    private gradientShaderSources: Record<GradientType, string> = {
        linear: linearGradientShader,
        spiral: spiralGradientShader,
        radial: radialGradientShader,
        conical: conicalGradientShader,
    };

    private gradientShaders: Partial<Record<GradientType, p5.Shader>> = {};

    private _gradientConstructors: GradientConstructorMap = {
        linear: (p, fontTextureAtlas, shader, colors, brightnessStart, brightnessEnd, characters, params) =>
            new P5AsciifyLinearGradient(p, fontTextureAtlas, shader, colors, brightnessStart, brightnessEnd, characters, params),
        spiral: (p, fontTextureAtlas, shader, colors, brightnessStart, brightnessEnd, characters, params) =>
            new P5AsciifySpiralGradient(p, fontTextureAtlas, shader, colors, brightnessStart, brightnessEnd, characters, params),
        radial: (p, fontTextureAtlas, shader, colors, brightnessStart, brightnessEnd, characters, params) =>
            new P5AsciifyRadialGradient(p, fontTextureAtlas, shader, colors, brightnessStart, brightnessEnd, characters, params),
        conical: (p, fontTextureAtlas, shader, colors, brightnessStart, brightnessEnd, characters, params) =>
            new P5AsciifyConicalGradient(p, fontTextureAtlas, shader, colors, brightnessStart, brightnessEnd, characters, params),
    };

    private _gradients: P5AsciifyGradient[] = [];

    constructor(
        private p: p5,
        private fontTextureAtlas: P5AsciifyFontTextureAtlas
    ) {
        // Initialize the shaders for the gradients.
        for (const gradientName of Object.keys(this.gradientShaderSources) as GradientType[]) {
            const fragShader = this.gradientShaderSources[gradientName];
            this.gradientShaders[gradientName] = this.p.createShader(vertexShader, fragShader);
        }
    }

    /**
     * Add a gradient to the gradient manager.
     * @param gradientName The name of the gradient to add.
     * @param brightnessStart The start brightness of the gradient.
     * @param brightnessEnd The end brightness of the gradient.
     * @param characters The characters to use for the gradient.
     * @param params The parameters for the gradient.
     * @returns The gradient instance.
     */
    addGradient(
        gradientName: GradientType,
        brightnessStart: number,
        brightnessEnd: number,
        characters: string,
        params: Partial<GradientParams[typeof gradientName]>
    ): P5AsciifyGradient {

        const gradient = this._gradientConstructors[gradientName](
            this.p,
            this.fontTextureAtlas,
            this.gradientShaders[gradientName] as p5.Shader,
            this.fontTextureAtlas.getCharsetColorArray(characters),
            brightnessStart,
            brightnessEnd,
            characters,
            { ...this._gradientParams[gradientName], ...params }
        );

        this._gradients.push(gradient);

        return gradient;
    }

    /**
     * Remove a gradient from the gradient manager.
     * @param gradient The gradient to remove.
     */
    removeGradient(gradient: P5AsciifyGradient): void {
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