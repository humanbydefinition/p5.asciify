import p5 from 'p5';
import { P5AsciifyGradient } from './Gradient';
import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';

export type GradientType = 'linear' | 'spiral' | 'radial' | 'conical';

export type GradientConstructorMap = Record<GradientType,
    (p: p5, fontTextureAtlas: P5AsciifyFontTextureAtlas, shader: p5.Shader, characters: string, brightnessStart: number, brightnessEnd: number, params: any) => P5AsciifyGradient
>;

export type ConicalGradientParams = {
    centerX: number;
    centerY: number;
    speed: number;
}

export type LinearGradientParams = {
    direction: number;
    angle: number;
    speed: number;
    zigzag: boolean;
}

export type RadialGradientParams = {
    direction: number;
    centerX: number;
    centerY: number;
    radius: number;
}

export type SpiralGradientParams = {
    direction: number;
    centerX: number;
    centerY: number;
    speed: number;
    density: number;
}

export type GradientParams = {
    linear: LinearGradientParams;
    spiral: SpiralGradientParams;
    radial: RadialGradientParams;
    conical: ConicalGradientParams;
}

