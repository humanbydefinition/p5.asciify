import { P5AsciifyGradient } from './Gradient';
export type GradientType = 'linear' | 'spiral' | 'radial' | 'conical' | 'noise';
export type GradientConstructorMap = Record<GradientType, (brightnessStart: number, brightnessEnd: number, characters: string, params: any) => P5AsciifyGradient>;
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
