import p5 from 'p5';
import { P5AsciifyGradient } from './Gradient';
import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';
import { GradientParams, GradientType, GradientConstructorMap } from './types';
/**
 * Manages the creation and removal of gradients for the gradient ascii renderer.
 */
export declare class P5AsciifyGradientManager {
    private _p;
    private _fontTextureAtlas;
    private _gradientParams;
    private _gradientShaderSources;
    private _gradientShaders;
    private _gradientConstructors;
    private _gradients;
    constructor(_p: p5, _fontTextureAtlas: P5AsciifyFontTextureAtlas);
    /**
     * Add a gradient to the gradient manager.
     * @param gradientName The name of the gradient to add.
     * @param brightnessStart The start brightness of the gradient.
     * @param brightnessEnd The end brightness of the gradient.
     * @param characters The characters to use for the gradient.
     * @param options The parameters for the gradient.
     * @returns The gradient instance.
     */
    add(gradientName: GradientType, characters: string, brightnessStart: number, brightnessEnd: number, options: Partial<GradientParams[typeof gradientName]>): P5AsciifyGradient;
    /**
     * Remove a gradient from the gradient manager.
     * @param gradient The gradient to remove.
     */
    removeGradient(gradient: P5AsciifyGradient): void;
    get gradientParams(): GradientParams;
    get gradients(): P5AsciifyGradient[];
    get gradientConstructors(): GradientConstructorMap;
}
