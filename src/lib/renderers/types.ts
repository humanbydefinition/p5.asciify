export interface AsciiRendererOptions {
    enabled: boolean;
    invertMode: boolean;
    rotationAngle: number;
}

export interface AccurateAsciiRendererOptions extends AsciiRendererOptions {
    characters: string;
    characterColor: string;
    characterColorMode: number;
    backgroundColor: string;
    backgroundColorMode: number;
}

export interface BrightnessAsciiRendererOptions extends AsciiRendererOptions {
    characters: string;
    characterColor: string;
    characterColorMode: number;
    backgroundColor: string;
    backgroundColorMode: number;
}

export interface GradientAsciiRendererOptions extends AsciiRendererOptions {
    characterColor: string;
    characterColorMode: number;
    backgroundColor: string;
    backgroundColorMode: number;
}

export interface EdgeAsciiRendererOptions extends AsciiRendererOptions {
    characters: string;
    characterColor: string;
    characterColorMode: number;
    backgroundColor: string;
    backgroundColorMode: number;
    sobelThreshold: number;
    sampleThreshold: number;
}