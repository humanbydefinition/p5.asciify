import p5 from 'p5';
import { P5AsciifyColorPalette } from "../ColorPalette";
export declare class P5AsciifyGradient {
    private _shader;
    characters: string;
    protected _brightnessStart: number;
    protected _brightnessEnd: number;
    protected _enabled: boolean;
    protected _onPaletteChangeCallback?: (gradient: P5AsciifyGradient, value: string[]) => void;
    protected _palette: P5AsciifyColorPalette;
    constructor(_shader: p5.Shader, brightnessStart: number, brightnessEnd: number, characters: string);
    registerPaletteChangeCallback(callback: (gradient: P5AsciifyGradient, value: string[]) => void): void;
    setup(p5Instance: p5, shader: p5.Shader, colors: [number, number, number][]): void;
    setUniforms(p5: p5, framebuffer: p5.Framebuffer, referenceFramebuffer: p5.Framebuffer): void;
    set palette(value: string[]);
    get enabled(): boolean;
    set enabled(value: boolean);
    get brightnessStart(): number;
    set brightnessStart(value: number);
    get brightnessEnd(): number;
    set brightnessEnd(value: number);
    get shader(): p5.Shader;
    get palette(): P5AsciifyColorPalette;
}
