import p5 from 'p5';
import { P5AsciifyGradient } from '../Gradient';
export interface NoiseGradientParams {
    noiseScale: number;
    speed: number;
    direction: number;
}
export declare class P5AsciifyNoiseGradient extends P5AsciifyGradient {
    private _direction;
    private _noiseScale;
    private _speed;
    constructor(brightnessStart: number, brightnessEnd: number, characters: string, params: NoiseGradientParams);
    setUniforms(framebuffer: p5.Framebuffer, referenceFramebuffer: p5.Framebuffer): void;
    get direction(): number;
    set direction(value: number);
    get noiseScale(): number;
    set noiseScale(value: number);
    get speed(): number;
    set speed(value: number);
}
