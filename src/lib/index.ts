import p5 from 'p5';
import { P5AsciifierManager } from './AsciifierManager';
import { P5AsciifyError } from './AsciifyError';
import { compareVersions } from './utils/utils';
import { P5AsciifyAbstractFeatureRenderer2D } from './renderers/2d/feature';
import { P5AsciifyRenderer2D } from './renderers/2d';
import { P5AsciifyRenderer } from './renderers';

// Check if p5.js version is 1.8.0 or higher
if (typeof p5 !== 'undefined' && compareVersions(p5.prototype.VERSION, "1.8.0") < 0) {
  throw new P5AsciifyError("p5.asciify requires p5.js v1.8.0 or higher to run.");
}

/**
 * Main instance of p5.asciify *({@link P5AsciifierManager})* providing full access to the library.
 */
export const p5asciify = P5AsciifierManager.getInstance();

/**
 * A fix for the p5.js shaders to use highp precision instead of mediump.
 * This is necessary for p5.asciify to work on Android devices.
 * Generally, this is fixed in p5.js v1.11.3, but this is a workaround for older versions.
 * As of now, p5.asciify supports p5.js v1.8.0 and higher.
 */
const shadersToReplace = [
  ['_getImmediateModeShader', '_defaultImmediateModeShader'],
  ['_getNormalShader', '_defaultNormalShader'],
  ['_getColorShader', '_defaultColorShader'],
  ['_getPointShader', '_defaultPointShader'],
  ['_getLineShader', '_defaultLineShader'],
  ['_getFontShader', '_defaultFontShader'],
]

for (const [method, cacheKey] of shadersToReplace) {
  const prevMethod = p5.RendererGL.prototype[method]
  p5.RendererGL.prototype[method] = function () {
    if (!this[cacheKey]) {
      this[cacheKey] = prevMethod.call(this)
      this[cacheKey]._vertSrc = this[cacheKey]._vertSrc.replace(
        /mediump/g,
        'highp',
      )
      this[cacheKey]._fragSrc = this[cacheKey]._fragSrc.replace(
        /mediump/g,
        'highp',
      )
    }

    return this[cacheKey]
  }
}

/** Contains functionality relevant to the ASCII rendering. */
export * as renderers from './renderers';

/** Contains utility functions and classes used by the `p5.asciify` library. */
export * as utils from './utils';

/** Contains plugin interfaces to implement against. */
export * as plugins from './plugins';

export { P5AsciifierManager } from './AsciifierManager';
export { P5AsciifyError } from './AsciifyError';
export { P5Asciifier } from './Asciifier';
export { P5AsciifyColorPalette } from './ColorPalette';
export { P5AsciifyGrid } from './Grid';
export { P5AsciifyFontManager } from './FontManager';
export { P5AsciifyHookManager, type HookType } from './HookManager';
export * from './types';

if (typeof window !== 'undefined') {
  window.p5asciify = p5asciify;

  // Only expose dummy preload for p5.js v1.x.x (not v2.x.x which has addon system)
  if (typeof p5 !== 'undefined' && typeof p5.registerAddon !== 'function') {
    // Check if preload already exists before creating dummy
    if (typeof window.preload === 'undefined') {
      window.preload = function () { };
    }
  }

  window.P5AsciifyAbstractFeatureRenderer2D = P5AsciifyAbstractFeatureRenderer2D;
  window.P5AsciifyRenderer2D = P5AsciifyRenderer2D;
  window.P5AsciifyRenderer = P5AsciifyRenderer;
}