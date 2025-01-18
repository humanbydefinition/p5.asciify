import p5 from 'p5';
import { P5AsciifyGradient } from './Gradient';
import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';
export type GradientType = 'linear' | 'spiral' | 'radial' | 'conical' | 'noise';
export type GradientConstructorMap = Record<GradientType, (p: p5, fontTextureAtlas: P5AsciifyFontTextureAtlas, shader: p5.Shader, colors: [number, number, number][], brightnessStart: number, brightnessEnd: number, characters: string, params: any) => P5AsciifyGradient>;
export type ConicalGradientParams = {
    centerX: number;
    centerY: number;
    speed: number;
};
export type LinearGradientParams = {
    direction: number;
    angle: number;
    speed: number;
    zigzag: boolean;
};
export type NoiseGradientParams = {
    noiseScale: number;
    speed: number;
    direction: number;
};
export type RadialGradientParams = {
    direction: number;
    centerX: number;
    centerY: number;
    radius: number;
};
export type SpiralGradientParams = {
    direction: number;
    centerX: number;
    centerY: number;
    speed: number;
    density: number;
};
export type GradientParams = {
    linear: LinearGradientParams;
    spiral: SpiralGradientParams;
    radial: RadialGradientParams;
    conical: ConicalGradientParams;
    noise: NoiseGradientParams;
};
