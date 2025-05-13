import { P5AsciifyBrightnessRenderer } from './2d/feature/brightness/BrightnessAsciiRenderer';
import { P5AsciifyEdgeRenderer } from './2d/feature/edge/EdgeAsciiRenderer';
import { P5AsciifyRenderer2D } from './2d/AsciiRenderer2D';

/**
 * Dictionary of ASCII renderer types that can be added via the {@link P5AsciifyRendererManager.add} method by name.
 */
export const RENDERER_TYPES = {
    'brightness': P5AsciifyBrightnessRenderer,
    'edge': P5AsciifyEdgeRenderer,
    'custom2D': P5AsciifyRenderer2D,
} as const;