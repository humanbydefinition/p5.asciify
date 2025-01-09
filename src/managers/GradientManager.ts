import p5 from 'p5';
import { P5AsciifyLinearGradient, LinearGradientParams } from "../gradients/linear/Linear";
import { P5AsciifyZigZagGradient, ZigZagGradientParams } from "../gradients/zigzag/ZigZag";
import { P5AsciifySpiralGradient, SpiralGradientParams } from "../gradients/spiral/Spiral";
import { P5AsciifyRadialGradient, RadialGradientParams } from "../gradients/radial/Radial";
import { P5AsciifyConicalGradient, ConicalGradientParams } from "../gradients/conical/Conical";
import { P5AsciifyNoiseGradient, NoiseGradientParams } from "../gradients/noise/Noise";
import { P5AsciifyGradient } from '../gradients/Gradient';

import vertexShader from '../assets/shaders/vert/shader.vert';
import linearGradientShader from "../gradients/linear/linear.frag";
import zigzagGradientShader from "../gradients/zigzag/zigzag.frag";
import spiralGradientShader from "../gradients/spiral/spiral.frag";
import radialGradientShader from "../gradients/radial/radial.frag";
import conicalGradientShader from "../gradients/conical/conical.frag";
import noiseGradientShader from "../gradients/noise/noise.frag";

import P5AsciifyFontTextureAtlas from '../FontTextureAtlas';

type GradientType = 'linear' | 'zigzag' | 'spiral' | 'radial' | 'conical' | 'noise';

type GradientParams = {
    linear: LinearGradientParams;
    zigzag: ZigZagGradientParams;
    spiral: SpiralGradientParams;
    radial: RadialGradientParams;
    conical: ConicalGradientParams;
    noise: NoiseGradientParams;
}

interface SetupQueueItem {
    gradientInstance: P5AsciifyGradient;
    type: GradientType;
}

export class P5AsciifyGradientManager {
    private gradientParams: GradientParams = {
        linear: { direction: 1, angle: 0, speed: 0.01 },
        zigzag: { direction: 1, angle: 0, speed: 0.01 },
        spiral: { direction: 1, centerX: 0.5, centerY: 0.5, speed: 0.01, density: 0.01 },
        radial: { direction: 1, centerX: 0.5, centerY: 0.5, radius: 0.5 },
        conical: { centerX: 0.5, centerY: 0.5, speed: 0.01 },
        noise: { noiseScale: 0.1, speed: 0.01, direction: 1 },
    };

    private gradientShaders: Record<GradientType, string> = {
        linear: linearGradientShader,
        zigzag: zigzagGradientShader,
        spiral: spiralGradientShader,
        radial: radialGradientShader,
        conical: conicalGradientShader,
        noise: noiseGradientShader,
    };

    private gradientConstructors: Record<GradientType,
        (shader: p5.Shader, brightnessStart: number, brightnessEnd: number, characters: string[], params: any) => P5AsciifyGradient
    > = {
            linear: (shader, brightnessStart, brightnessEnd, characters, params) =>
                new P5AsciifyLinearGradient(shader, brightnessStart, brightnessEnd, characters, params),
            zigzag: (shader, brightnessStart, brightnessEnd, characters, params) =>
                new P5AsciifyZigZagGradient(shader, brightnessStart, brightnessEnd, characters, params),
            spiral: (shader, brightnessStart, brightnessEnd, characters, params) =>
                new P5AsciifySpiralGradient(shader, brightnessStart, brightnessEnd, characters, params),
            radial: (shader, brightnessStart, brightnessEnd, characters, params) =>
                new P5AsciifyRadialGradient(shader, brightnessStart, brightnessEnd, characters, params),
            conical: (shader, brightnessStart, brightnessEnd, characters, params) =>
                new P5AsciifyConicalGradient(shader, brightnessStart, brightnessEnd, characters, params),
            noise: (shader, brightnessStart, brightnessEnd, characters, params) =>
                new P5AsciifyNoiseGradient(shader, brightnessStart, brightnessEnd, characters, params),
        };

    private _setupQueue: SetupQueueItem[] = [];
    private _gradients: P5AsciifyGradient[] = [];
    private fontTextureAtlas!: P5AsciifyFontTextureAtlas;
    private p5Instance!: p5;

    setup(fontTextureAtlas: P5AsciifyFontTextureAtlas): void {
        this.fontTextureAtlas = fontTextureAtlas;
        this.setupShaders();
        this.setupGradientQueue();
    }

    addInstance(p5Instance: p5): void {
        this.p5Instance = p5Instance;
    }

    private setupGradientQueue(): void {
        for (const { gradientInstance, type } of this._setupQueue) {
            gradientInstance.setup(
                this.p5Instance,
                this.gradientShaders[type] as unknown as p5.Shader,
                this.fontTextureAtlas.getCharsetColorArray(gradientInstance._characters)
            );
        }

        this._setupQueue = [];
    }

    private getGradientParams<T extends GradientType>(
        gradientName: T,
        params: Partial<GradientParams[T]>
    ): GradientParams[T] {
        return { ...this.gradientParams[gradientName], ...params };
    }

    addGradient(
        gradientName: GradientType,
        brightnessStart: number,
        brightnessEnd: number,
        characters: string[],
        params: Partial<GradientParams[typeof gradientName]>
    ): P5AsciifyGradient {
        const mergedParams = this.getGradientParams(gradientName, {
            brightnessStart,
            brightnessEnd,
            characters,
            ...params
        });

        const gradient = this.gradientConstructors[gradientName](
            this.gradientShaders[gradientName] as unknown as p5.Shader,
            brightnessStart,
            brightnessEnd,
            characters,
            mergedParams
        );

        gradient.registerPaletteChangeCallback(this.handleGradientPaletteChange.bind(this));
        this._gradients.push(gradient);

        if (!(this.p5Instance as any)._setupDone) {
            this._setupQueue.push({ gradientInstance: gradient, type: gradientName });
        } else {
            gradient.setup(
                this.p5Instance,
                this.gradientShaders[gradientName] as unknown as p5.Shader,
                this.fontTextureAtlas.getCharsetColorArray(characters)
            );
        }

        return gradient;
    }

    removeGradient(gradient: P5AsciifyGradient): void {
        const index = this._gradients.indexOf(gradient);
        if (index > -1) {
            this._gradients.splice(index, 1);
        }
    }

    private handleGradientPaletteChange(gradient: P5AsciifyGradient, characters: string[]): void {
        if (!(this.p5Instance as any)._setupDone) {
            gradient._characters = characters;
        } else {
            gradient._palette?.setColors(this.fontTextureAtlas.getCharsetColorArray(characters));
        }
    }

    private setupShaders(): void {
        for (const gradientName in this.gradientShaders) {
            this.gradientShaders[gradientName as GradientType] = this.p5Instance.createShader(
                vertexShader,
                this.gradientShaders[gradientName as GradientType]
            ) as unknown as string;
        }
    }
}