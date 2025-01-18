import p5 from 'p5';
import { P5AsciifyGradient } from './Gradient';
import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';
import { GradientParams, GradientType, GradientConstructorMap } from './types';
/**
 * Manages the creation and removal of gradients for the gradient ascii renderer.
 */
export declare class P5AsciifyGradientManager {
    private p;
    private fontTextureAtlas;
    private _gradientParams;
    private gradientShaderSources;
    private gradientShaders;
    private _gradientConstructors;
    private _gradients;
    constructor(p: p5, fontTextureAtlas: P5AsciifyFontTextureAtlas);
    /**
     * Add a gradient to the gradient manager.
     * @param gradientName The name of the gradient to add.
     * @param brightnessStart The start brightness of the gradient.
     * @param brightnessEnd The end brightness of the gradient.
     * @param characters The characters to use for the gradient.
     * @param params The parameters for the gradient.
     * @returns The gradient instance.
     */
    addGradient(gradientName: GradientType, brightnessStart: number, brightnessEnd: number, characters: string, params: Partial<GradientParams[typeof gradientName]>): P5AsciifyGradient;
    /**
     * Remove a gradient from the gradient manager.
     * @param gradient The gradient to remove.
     */
    removeGradient(gradient: P5AsciifyGradient): void;
    /**
     * Initialize the shaders for the gradients.
     */
    private setupShaders;
    get gradientParams(): GradientParams;
    get gradients(): P5AsciifyGradient[];
    get gradientConstructors(): GradientConstructorMap;
}
