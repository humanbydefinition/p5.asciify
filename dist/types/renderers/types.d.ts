import p5 from 'p5';
export interface AsciiRendererOptions {
    enabled: boolean;
    characters?: string;
    characterColor: string | p5.Color;
    characterColorMode: number;
    backgroundColor: string | p5.Color;
    backgroundColorMode: number;
    invertMode: boolean;
    rotationAngle: number;
}
export interface EdgeAsciiRendererOptions extends AsciiRendererOptions {
    sobelThreshold: number;
    sampleThreshold: number;
}
