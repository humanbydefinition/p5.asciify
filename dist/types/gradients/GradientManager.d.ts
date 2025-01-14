import p5 from 'p5';
import { LinearGradientParams } from "./linear/Linear";
import { ZigZagGradientParams } from "./zigzag/ZigZag";
import { SpiralGradientParams } from "./spiral/Spiral";
import { RadialGradientParams } from "./radial/Radial";
import { ConicalGradientParams } from "./conical/Conical";
import { NoiseGradientParams } from "./noise/Noise";
import { P5AsciifyGradient } from './Gradient';
import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';
export type GradientType = 'linear' | 'zigzag' | 'spiral' | 'radial' | 'conical' | 'noise';
type GradientParams = {
    linear: LinearGradientParams;
    zigzag: ZigZagGradientParams;
    spiral: SpiralGradientParams;
    radial: RadialGradientParams;
    conical: ConicalGradientParams;
    noise: NoiseGradientParams;
};
export declare class P5AsciifyGradientManager {
    private _gradientParams;
    private gradientShaders;
    private _gradientConstructors;
    private _setupQueue;
    private _gradients;
    private fontTextureAtlas;
    private p5Instance;
    setup(fontTextureAtlas: P5AsciifyFontTextureAtlas): void;
    addInstance(p5Instance: p5): void;
    private setupGradientQueue;
    private getGradientParams;
    addGradient(gradientName: GradientType, brightnessStart: number, brightnessEnd: number, characters: string, params: Partial<GradientParams[typeof gradientName]>): P5AsciifyGradient;
    removeGradient(gradient: P5AsciifyGradient): void;
    private setupShaders;
    get gradientConstructors(): Record<GradientType, (shader: p5.Shader, brightnessStart: number, brightnessEnd: number, characters: string[], params: any) => P5AsciifyGradient>;
    get gradientParams(): GradientParams;
    get gradients(): P5AsciifyGradient[];
}
export {};
