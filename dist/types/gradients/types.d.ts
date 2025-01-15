export type GradientType = 'linear' | 'zigzag' | 'spiral' | 'radial' | 'conical' | 'noise';
export type ConicalGradientParams = {
    centerX: number;
    centerY: number;
    speed: number;
};
export type LinearGradientParams = {
    direction: number;
    angle: number;
    speed: number;
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
export type ZigZagGradientParams = {
    direction: number;
    angle: number;
    speed?: number;
};
export type GradientParams = {
    linear: LinearGradientParams;
    zigzag: ZigZagGradientParams;
    spiral: SpiralGradientParams;
    radial: RadialGradientParams;
    conical: ConicalGradientParams;
    noise: NoiseGradientParams;
};
