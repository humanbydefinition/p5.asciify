import p5 from 'p5';
import { P5AsciifyGradient } from '../Gradient';
import { NoiseGradientParams } from '../types';
import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';

/**
 * A noise gradient that moves in a noise pattern across the screen.
 */
export class P5AsciifyNoiseGradient extends P5AsciifyGradient {
    public direction: number;
    public noiseScale: number;
    public speed: number;

    constructor(
        protected p: p5,
        protected _fontTextureAtlas: P5AsciifyFontTextureAtlas,
        protected _shader: p5.Shader,
        colors: [number, number, number][],
        brightnessStart: number,
        brightnessEnd: number,
        characters: string,
        params: NoiseGradientParams
    ) {
        super(p, _fontTextureAtlas, _shader, colors, brightnessStart, brightnessEnd, characters);
        this.direction = params.direction;
        this.noiseScale = params.noiseScale;
        this.speed = params.speed;
    }

    setUniforms(
        framebuffer: p5.Framebuffer,
        referenceFramebuffer: p5.Framebuffer
    ): void {
        super.setUniforms(framebuffer, referenceFramebuffer);
        this._shader.setUniform('direction', this.direction);
        this._shader.setUniform('noiseScale', this.noiseScale);
        this._shader.setUniform('u_speed', this.speed);
    }
}