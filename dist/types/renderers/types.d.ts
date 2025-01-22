import p5 from 'p5';
export interface AsciiRendererOptions {
    enabled: boolean;
    characters?: string;
    characterColor?: string | [number, number, number] | p5.Color;
    characterColorMode?: number | string;
    backgroundColor?: string | [number, number, number] | p5.Color;
    backgroundColorMode?: number | string;
    invertMode: boolean;
    rotationAngle: number;
    sobelThreshold?: number;
    sampleThreshold?: number;
}
