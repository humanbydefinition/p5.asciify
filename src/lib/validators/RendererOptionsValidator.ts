import { AsciiRendererOptions } from '../renderers/types';
import { P5AsciifyError } from '../AsciifyError';
import p5 from 'p5';

export function validateRendererOptions(options: Partial<AsciiRendererOptions>): void {
    // Validate enabled flag
    if (options?.enabled && typeof options.enabled !== 'boolean') {
        throw new P5AsciifyError('`enabled` must be a boolean.');
    }

    // Validate characters
    if (options?.characters && typeof options.characters !== 'string') {
        throw new P5AsciifyError('`characters` must be a string.');
    }

    // Validate colors
    if (options?.characterColor &&
        !(typeof options.characterColor === 'string' ||
            options.characterColor instanceof p5.Color ||
            (Array.isArray(options.characterColor) &&
                options.characterColor.length === 3 &&
                options.characterColor.every(v => typeof v === 'number')))) {
        throw new P5AsciifyError('`characterColor` must be a string, p5.Color, or array of 3 numbers.');
    }

    if (options?.backgroundColor &&
        !(typeof options.backgroundColor === 'string' ||
            options.backgroundColor instanceof p5.Color ||
            (Array.isArray(options.backgroundColor) &&
                options.backgroundColor.length === 3 &&
                options.backgroundColor.every(v => typeof v === 'number')))) {
        throw new P5AsciifyError('`backgroundColor` must be a string, p5.Color, or array of 3 numbers.');
    }

    // Validate color modes
    if (options?.characterColorMode) {
        if (typeof options.characterColorMode !== 'number') {
            throw new P5AsciifyError('`characterColorMode` must be a number');
        }
        if (options.characterColorMode !== 0 && options.characterColorMode !== 1) {
            throw new P5AsciifyError('`characterColorMode` must be `0` (sampled) or `1` (fixed).');
        }
    }

    if (options?.backgroundColorMode) {
        if (typeof options.backgroundColorMode !== 'number') {
            throw new P5AsciifyError('`backgroundColorMode` must be a number');
        }
        if (options.backgroundColorMode !== 0 && options.backgroundColorMode !== 1) {
            throw new P5AsciifyError('`backgroundColorMode` must be `0` (sampled) or `1` (fixed).');
        }
    }

    // Validate invertMode
    if (options.invertMode !== undefined && typeof options.invertMode !== 'boolean') {
        throw new P5AsciifyError('`invertMode` must be a boolean.');
    }

    // Validate rotationAngle
    if (options.rotationAngle !== undefined && typeof options.rotationAngle !== 'number') {
        throw new P5AsciifyError('`rotationAngle` must be a number.');
    }

    // Validate sobelThreshold
    if (options.sobelThreshold !== undefined && typeof options.sobelThreshold !== 'number') {
        throw new P5AsciifyError('`sobelThreshold` must be a number.');
    }

    // Validate sampleThreshold
    if (options.sampleThreshold !== undefined && typeof options.sampleThreshold !== 'number') {
        throw new P5AsciifyError('`sampleThreshold` must be a number.');
    }
}