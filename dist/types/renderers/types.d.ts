import p5 from 'p5';
export interface AsciiRendererOptions {
    enabled: boolean;
    characters?: string;
    characterColor?: string | [number, number, number] | p5.Color;
    characterColorMode?: number;
    backgroundColor?: string | [number, number, number] | p5.Color;
    backgroundColorMode?: number;
    invertMode: boolean;
    rotationAngle: number;
    sobelThreshold?: number;
    sampleThreshold?: number;
}
