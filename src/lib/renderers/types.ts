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

export interface AsciiRendererUserOptions {
    enabled?: boolean;
    characters?: string;
    characterColor?: string | [number, number, number] | p5.Color;
    characterColorMode?: string;
    backgroundColor?: string | [number, number, number] | p5.Color;
    backgroundColorMode?: string;
    invertMode?: boolean;
    rotationAngle?: number;
    sobelThreshold?: number;
    sampleThreshold?: number;
}