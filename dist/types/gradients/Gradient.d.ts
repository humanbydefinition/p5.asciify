import p5 from 'p5';
import { P5AsciifyColorPalette } from "../ColorPalette";
import { P5AsciifyFontTextureAtlas } from '../FontTextureAtlas';
export declare class P5AsciifyGradient {
    private _shader;
    private _characters;
    protected _p: p5;
    protected _brightnessStart: number;
    protected _brightnessEnd: number;
    enabled: boolean;
    protected _onPaletteChangeCallback?: (gradient: P5AsciifyGradient, value: string[]) => void;
    protected _palette: P5AsciifyColorPalette;
    protected _fontTextureAtlas: P5AsciifyFontTextureAtlas;
    constructor(_shader: p5.Shader, brightnessStart: number, brightnessEnd: number, _characters: string);
    setup(p5Instance: p5, fontTextureAtlas: P5AsciifyFontTextureAtlas, shader: p5.Shader, colors: [number, number, number][]): void;
    setUniforms(framebuffer: p5.Framebuffer, referenceFramebuffer: p5.Framebuffer): void;
    set brightnessStart(value: number);
    set brightnessEnd(value: number);
    set characters(value: string);
    get characters(): string;
    get shader(): p5.Shader;
    get palette(): P5AsciifyColorPalette;
    get brightnessEnd(): number;
    get brightnessStart(): number;
}
