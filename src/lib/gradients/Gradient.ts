import p5 from 'p5';
import { P5AsciifyColorPalette } from "../ColorPalette";
import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';

export class P5AsciifyGradient {
    protected _p!: p5;
    protected _brightnessStart: number;
    protected _brightnessEnd: number;
    public enabled: boolean;
    protected _onPaletteChangeCallback?: (gradient: P5AsciifyGradient, value: string[]) => void;
    protected _palette!: P5AsciifyColorPalette;
    protected _fontTextureAtlas!: P5AsciifyFontTextureAtlas;
    protected _shader!: p5.Shader;

    constructor(
        brightnessStart: number,
        brightnessEnd: number,
        private _characters: string
    ) {

        // Normalize brightness values to [0, 1]
        this._brightnessStart = Math.floor((brightnessStart / 255) * 100) / 100;
        this._brightnessEnd = Math.ceil((brightnessEnd / 255) * 100) / 100;

        this.enabled = true;
    }

    setup(p5Instance: p5, fontTextureAtlas: P5AsciifyFontTextureAtlas, shader: p5.Shader, colors: [number, number, number][]): void {
        this._p = p5Instance;
        this._fontTextureAtlas = fontTextureAtlas;
        this._shader = shader;
        this._palette = new P5AsciifyColorPalette(colors);
        this._palette.setup(p5Instance);
    }

    setUniforms(framebuffer: p5.Framebuffer, referenceFramebuffer: p5.Framebuffer): void {
        this._shader.setUniform("textureID", framebuffer);
        this._shader.setUniform("originalTextureID", referenceFramebuffer);
        this._shader.setUniform("gradientTexture", this._palette.framebuffer);
        this._shader.setUniform("gradientTextureDimensions", [this._palette.colors.length, 1]);
        this._shader.setUniform("u_brightnessRange", [this._brightnessStart, this._brightnessEnd]);
        this._shader.setUniform("frameCount", this._p.frameCount);
    }

    set brightnessStart(value: number) {
        this._brightnessStart = value;
    }

    set brightnessEnd(value: number) {
        this._brightnessEnd = value;
    }

    set characters(value: string) {
        this._characters = value;

        if (this._p._setupDone) {
            this.palette.setColors(this._fontTextureAtlas.getCharsetColorArray(value));
        }
    }

    // Getters
    get characters(): string { return this._characters; }
    get shader(): p5.Shader { return this._shader; }
    get palette(): P5AsciifyColorPalette { return this._palette; }
    get brightnessEnd(): number { return this._brightnessEnd; }
    get brightnessStart(): number {return this._brightnessStart;}
}
