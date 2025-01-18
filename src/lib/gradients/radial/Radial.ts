import p5 from 'p5';
import { P5AsciifyGradient } from '../Gradient';
import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';
import { RadialGradientParams } from '../types';

/**
 * A radial gradient that moves in a radial pattern across the screen.
 */
export class P5AsciifyRadialGradient extends P5AsciifyGradient {
    public direction: number;
    public centerX: number;
    public centerY: number;
    public radius: number;

    constructor(
        protected p: p5,
        protected _fontTextureAtlas: P5AsciifyFontTextureAtlas,
        protected _shader: p5.Shader,
        brightnessStart: number,
        brightnessEnd: number,
        characters: string,
        params: RadialGradientParams
    ) {
        super(p, _fontTextureAtlas, _shader, brightnessStart, brightnessEnd, characters);
        this.direction = params.direction;
        this.centerX = params.centerX;
        this.centerY = params.centerY;
        this.radius = params.radius;
    }

    setUniforms(
        framebuffer: p5.Framebuffer,
        referenceFramebuffer: p5.Framebuffer
    ): void {
        super.setUniforms(framebuffer, referenceFramebuffer);
        this._shader.setUniform('u_gradientDirection', this.direction);
        this._shader.setUniform('u_centerX', this.centerX);
        this._shader.setUniform('u_centerY', this.centerY);
        this._shader.setUniform('u_radius', this.radius);
    }
}