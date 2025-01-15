import p5 from 'p5';
import { P5AsciifyLinearGradient, LinearGradientParams } from "./linear/Linear";
import { P5AsciifyZigZagGradient, ZigZagGradientParams } from "./zigzag/ZigZag";
import { P5AsciifySpiralGradient, SpiralGradientParams } from "./spiral/Spiral";
import { P5AsciifyRadialGradient, RadialGradientParams } from "./radial/Radial";
import { P5AsciifyConicalGradient, ConicalGradientParams } from "./conical/Conical";
import { P5AsciifyNoiseGradient, NoiseGradientParams } from "./noise/Noise";
import { P5AsciifyGradient } from './Gradient';

import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';

import vertexShader from '../assets/shaders/vert/shader.vert';
import linearGradientShader from "../gradients/linear/linear.frag";
import zigzagGradientShader from "../gradients/zigzag/zigzag.frag";
import spiralGradientShader from "../gradients/spiral/spiral.frag";
import radialGradientShader from "../gradients/radial/radial.frag";
import conicalGradientShader from "../gradients/conical/conical.frag";
import noiseGradientShader from "../gradients/noise/noise.frag";

export type GradientType = 'linear' | 'zigzag' | 'spiral' | 'radial' | 'conical' | 'noise';

type GradientParams = {
    linear: LinearGradientParams;
    zigzag: ZigZagGradientParams;
    spiral: SpiralGradientParams;
    radial: RadialGradientParams;
    conical: ConicalGradientParams;
    noise: NoiseGradientParams;
}

export class P5AsciifyGradientManager {
    private _gradientParams: GradientParams = {
        linear: { direction: 1, angle: 0, speed: 0.01 },
        zigzag: { direction: 1, angle: 0, speed: 0.01 },
        spiral: { direction: 1, centerX: 0.5, centerY: 0.5, speed: 0.01, density: 0.01 },
        radial: { direction: 1, centerX: 0.5, centerY: 0.5, radius: 0.5 },
        conical: { centerX: 0.5, centerY: 0.5, speed: 0.01 },
        noise: { noiseScale: 0.1, speed: 0.01, direction: 1 },
    };

    private gradientShaderSources: Record<GradientType, string> = {
        linear: linearGradientShader,
        zigzag: zigzagGradientShader,
        spiral: spiralGradientShader,
        radial: radialGradientShader,
        conical: conicalGradientShader,
        noise: noiseGradientShader,
    };

    private gradientShaders: Partial<Record<GradientType, p5.Shader>> = {};

    private _gradientConstructors: Record<GradientType,
        (brightnessStart: number, brightnessEnd: number, characters: string, params: any) => P5AsciifyGradient
    > = {
            linear: (brightnessStart, brightnessEnd, characters, params) =>
                new P5AsciifyLinearGradient(brightnessStart, brightnessEnd, characters, params),
            zigzag: (brightnessStart, brightnessEnd, characters, params) =>
                new P5AsciifyZigZagGradient(brightnessStart, brightnessEnd, characters, params),
            spiral: (brightnessStart, brightnessEnd, characters, params) =>
                new P5AsciifySpiralGradient(brightnessStart, brightnessEnd, characters, params),
            radial: (brightnessStart, brightnessEnd, characters, params) =>
                new P5AsciifyRadialGradient(brightnessStart, brightnessEnd, characters, params),
            conical: (brightnessStart, brightnessEnd, characters, params) =>
                new P5AsciifyConicalGradient(brightnessStart, brightnessEnd, characters, params),
            noise: (brightnessStart, brightnessEnd, characters, params) =>
                new P5AsciifyNoiseGradient(brightnessStart, brightnessEnd, characters, params),
        };

    private _setupQueue: Array<{ gradientInstance: P5AsciifyGradient, type: GradientType; }> = [];
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
                this.fontTextureAtlas,
                this.gradientShaders[type] as p5.Shader,
                this.fontTextureAtlas.getCharsetColorArray(gradientInstance.characters)
            );
        }

        this._setupQueue = [];
    }

    private getGradientParams<T extends GradientType>(
        gradientName: T,
        params: Partial<GradientParams[T]>
    ): GradientParams[T] {
        return { ...this._gradientParams[gradientName], ...params };
    }

    addGradient(
        gradientName: GradientType,
        brightnessStart: number,
        brightnessEnd: number,
        characters: string,
        params: Partial<GradientParams[typeof gradientName]>
    ): P5AsciifyGradient {
        const gradient = this._gradientConstructors[gradientName](
            brightnessStart,
            brightnessEnd,
            characters,
            this.getGradientParams(gradientName, params)
        );

        this._gradients.push(gradient);

        if (!this.p5Instance._setupDone) {
            this._setupQueue.push({ gradientInstance: gradient, type: gradientName });
        } else {
            gradient.setup(
                this.p5Instance,
                this.fontTextureAtlas,
                this.gradientShaders[gradientName] as p5.Shader,
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

    private setupShaders(): void {
        for (const gradientName of Object.keys(this.gradientShaderSources) as GradientType[]) {
            const fragShader = this.gradientShaderSources[gradientName];
            this.gradientShaders[gradientName] = this.p5Instance.createShader(vertexShader, fragShader);
        }
    }

    get gradientConstructors(): Record<GradientType,
        (brightnessStart: number, brightnessEnd: number, characters: string, params: any) => P5AsciifyGradient
    > {
        return this._gradientConstructors;
    }

    get gradientParams(): GradientParams {
        return this._gradientParams;
    }

    get gradients(): P5AsciifyGradient[] { return this._gradients; }
}