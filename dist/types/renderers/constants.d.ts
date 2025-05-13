import { P5AsciifyBrightnessRenderer } from './2d/feature/brightness/BrightnessAsciiRenderer';
import { P5AsciifyEdgeRenderer } from './2d/feature/edge/EdgeAsciiRenderer';
import { P5AsciifyRenderer2D } from './2d/AsciiRenderer2D';
/**
 * Dictionary of ASCII renderer types that can be added via the {@link P5AsciifyRendererManager.add} method by name.
 */
export declare const RENDERER_TYPES: {
    readonly brightness: typeof P5AsciifyBrightnessRenderer;
    readonly edge: typeof P5AsciifyEdgeRenderer;
    readonly custom2D: typeof P5AsciifyRenderer2D;
};
