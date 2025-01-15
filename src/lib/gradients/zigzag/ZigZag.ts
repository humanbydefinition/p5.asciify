import p5 from 'p5';
import { P5AsciifyGradient } from '../Gradient';

import { ZigZagGradientParams } from '../types';

/**
 * A zigzag gradient that moves in a zigzag pattern across the screen.
 * Each row/column moves in the opposite direction of the previous row/column.
 */
export class P5AsciifyZigZagGradient extends P5AsciifyGradient {
    public direction: number;
    public angle: number;
    public speed: number;

    constructor(
        brightnessStart: number,
        brightnessEnd: number,
        characters: string,
        params: ZigZagGradientParams
    ) {
        super(brightnessStart, brightnessEnd, characters);
        this.direction = params.direction;
        this.angle = params.angle;
        this.speed = params.speed ?? 0.01;
    }

    setUniforms(
        framebuffer: p5.Framebuffer,
        referenceFramebuffer: p5.Framebuffer
    ): void {
        super.setUniforms(framebuffer, referenceFramebuffer);
        this._shader.setUniform('u_gradientDirection', this.direction);
        this._shader.setUniform('u_angle', (this.angle * Math.PI) / 180);
        this._shader.setUniform('u_speed', this.speed);
    }
}