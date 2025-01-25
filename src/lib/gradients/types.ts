import p5 from 'p5';
import { P5AsciifyGradient } from './Gradient';
import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';

/** The available gradient types. */
export type GradientType = 'linear' | 'spiral' | 'radial' | 'conical';

/** Gradient constructor type. */
export type GradientConstructorMap = Record<GradientType,
    (
        p: p5,
        fontTextureAtlas: P5AsciifyFontTextureAtlas,
        shader: p5.Shader,
        characters: string,
        brightnessStart: number,
        brightnessEnd: number,
        params: any
    ) => P5AsciifyGradient
>;

/** The available gradient options for the `"conical"` gradient type. */
export type ConicalGradientParams = {

    /** The center X position of the gradient. Should be a value between 0 and 1. */
    centerX: number;

    /** The center Y position of the gradient. Should be a value between 0 and 1. */
    centerY: number;

    /** The speed of the gradient. */
    speed: number;
}

/** The available gradient options for the `"linear"` gradient type. */
export type LinearGradientParams = {

    /** The direction of the gradient. Should be a value between -1 and 1. */
    direction: number;

    /** The angle of the gradient in degrees. */
    angle: number;

    /** The speed of the gradient. */
    speed: number;

    /** Whether the gradient direction should alternate each row. */
    zigzag: boolean;
}

/** The available gradient options for the `"radial"` gradient type. */
export type RadialGradientParams = {

    /** The direction of the gradient. Should be a value between -1 and 1. */
    direction: number;

    /** The center X position of the gradient. Should be a value between 0 and 1. */
    centerX: number;

    /** The center Y position of the gradient. Should be a value between 0 and 1. */
    centerY: number;

    /** The radius of the gradient. */
    radius: number;
}

/** The available gradient options for the `"spiral"` gradient type. */
export type SpiralGradientParams = {

    /** The direction of the gradient. Should be a value between -1 and 1. */
    direction: number;

    /** The center X position of the gradient. Should be a value between 0 and 1. */
    centerX: number;

    /** The center Y position of the gradient. Should be a value between 0 and 1. */
    centerY: number;

    /** The speed of the gradient. */
    speed: number;

    /** The density of the gradient. */
    density: number;
}

/** The available gradient parameters. */
export type GradientParams = {
    /** The parameters for the `"linear"` gradient type. */
    linear: LinearGradientParams;

    /** The parameters for the `"spiral"` gradient type. */
    spiral: SpiralGradientParams;

    /** The parameters for the `"radial"` gradient type. */
    radial: RadialGradientParams;

    /** The parameters for the `"conical"` gradient type. */
    conical: ConicalGradientParams;
}

