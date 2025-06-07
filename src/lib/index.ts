import { P5AsciifierManager } from './AsciifierManager';
import { P5AsciifyAbstractFeatureRenderer2D } from './renderers/2d/feature';
import { P5AsciifyRenderer2D } from './renderers/2d';
import { P5AsciifyRenderer } from './renderers';

import { P5AsciifyErrorLevel } from './errors/ErrorHandler';

/**
 * Main instance of p5.asciify *({@link P5AsciifierManager})* providing full access to the library.
 */
export const p5asciify = P5AsciifierManager.getInstance();

/** Contains functionality relevant to the ASCII rendering. */
export * as renderers from './renderers';

/** Contains utility functions and classes used by the `p5.asciify` library. */
export * as utils from './utils';

/** Contains plugin interfaces to implement against. */
export * as plugins from './plugins';

/** Contains error handling functionality and utilities. */
export * as errors from './errors';

export { P5AsciifierManager } from './AsciifierManager';
export { P5Asciifier } from './Asciifier';
export { P5AsciifyColorPalette } from './ColorPalette';
export { P5AsciifyGrid } from './Grid';
export { P5AsciifyFontManager } from './FontManager';
export { P5AsciifyHookManager } from './HookManager';
export * from './types';

if (typeof window !== 'undefined') {
  window.p5asciify = p5asciify;

  window.P5AsciifyAbstractFeatureRenderer2D = P5AsciifyAbstractFeatureRenderer2D;
  window.P5AsciifyRenderer2D = P5AsciifyRenderer2D;
  window.P5AsciifyRenderer = P5AsciifyRenderer;
  
  window.P5AsciifyErrorLevel = P5AsciifyErrorLevel;
}