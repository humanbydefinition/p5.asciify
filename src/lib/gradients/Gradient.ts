// Gradient.ts
import p5 from 'p5';
import { P5AsciifyColorPalette } from "../ColorPalette";

export class P5AsciifyGradient {
    protected _brightnessStart: number;
    protected _brightnessEnd: number;
    protected _enabled: boolean;
    protected _onPaletteChangeCallback?: (gradient: P5AsciifyGradient, value: string[]) => void;
    protected _palette!: P5AsciifyColorPalette;

    constructor(
        private _shader: p5.Shader,
        brightnessStart: number,
        brightnessEnd: number,
        public characters: string
    ) {

        // Normalize brightness values to [0, 1]
        this._brightnessStart = Math.floor((brightnessStart / 255) * 100) / 100;
        this._brightnessEnd = Math.ceil((brightnessEnd / 255) * 100) / 100;

        this._enabled = true;
    }

    registerPaletteChangeCallback(callback: (gradient: P5AsciifyGradient, value: string[]) => void): void {
        this._onPaletteChangeCallback = callback;
    }

    setup(p5Instance: p5, shader: p5.Shader, colors: [number, number, number][]): void {
        this._shader = shader;
        this._palette = new P5AsciifyColorPalette(colors);
        this._palette.setup(p5Instance);
    }

    setUniforms(p5: p5, framebuffer: p5.Framebuffer, referenceFramebuffer: p5.Framebuffer): void {
        this._shader.setUniform("textureID", framebuffer);
        this._shader.setUniform("originalTextureID", referenceFramebuffer);
        this._shader.setUniform("gradientTexture", this._palette.framebuffer);
        this._shader.setUniform("gradientTextureDimensions", [this._palette.colors.length, 1]);
        this._shader.setUniform("u_brightnessRange", [this._brightnessStart, this._brightnessEnd]);
        this._shader.setUniform("frameCount", p5.frameCount);
    }

    set palette(value: string[]) {
        if (this._onPaletteChangeCallback) {
            this._onPaletteChangeCallback(this, value);
        }
    }

    get enabled(): boolean {
        return this._enabled;
    }
    set enabled(value: boolean) {
        this._enabled = value;
    }

    get brightnessStart(): number {
        return this._brightnessStart;
    }
    set brightnessStart(value: number) {
        this._brightnessStart = value;
    }

    get brightnessEnd(): number {
        return this._brightnessEnd;
    }
    set brightnessEnd(value: number) {
        this._brightnessEnd = value;
    }

    get shader(): p5.Shader {
        return this._shader;
    }

    get palette(): P5AsciifyColorPalette {
        return this._palette;
    }
}
