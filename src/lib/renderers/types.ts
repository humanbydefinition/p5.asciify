import p5 from 'p5';

export interface AsciiRendererOptions {
    enabled: boolean;
    characters: string;
    invertMode: boolean;
    rotationAngle: number;
    characterColor: string | [number, number, number] | p5.Color;
    characterColorMode: number | string;
    backgroundColor: string | [number, number, number] | p5.Color;
    backgroundColorMode: number | string;
}

export interface EdgeAsciiRendererOptions extends AsciiRendererOptions {
    sobelThreshold: number;
    sampleThreshold: number;
}