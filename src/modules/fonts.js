import P5AsciifyError from "../errors.js";
import URSAFONT_BASE64 from '../assets/fonts/ursafont_base64.txt';

export function registerFontMethods(p5asciify) {

    p5.prototype.preloadAsciiFont = function () {
        this._incrementPreload();
        p5asciify.font = this.loadFont(
            URSAFONT_BASE64,
            (loadedFont) => {
                p5asciify.font = loadedFont;
                p5asciify.rendererManager.fontBase64 = `${URSAFONT_BASE64}`;
                p5asciify.rendererManager.fontFileType = 'truetype';
            },
            () => { throw new P5AsciifyError(`loadAsciiFont() | Failed to load font from path: '${font}'`); }
        );
    }

    p5.prototype.loadAsciiFont = function (font) {
        return new Promise((resolve, reject) => {
            const setFont = async (loadedFont, fontPath) => {
                p5asciify.font = loadedFont;

                try {
                    const response = await fetch(fontPath);
                    const arrayBuffer = await response.arrayBuffer();
                    const base64String = btoa(
                        new Uint8Array(arrayBuffer)
                            .reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );

                    let mimeType = '';
                    if (fontPath.toLowerCase().endsWith('.ttf')) {
                        mimeType = 'truetype';
                    } else if (fontPath.toLowerCase().endsWith('.otf')) {
                        mimeType = 'opentype';
                    } else {
                        mimeType = 'truetype';
                    }

                    p5asciify.rendererManager.fontBase64 = `data:font/${mimeType};charset=utf-8;base64,${base64String}`;
                    p5asciify.rendererManager.fontFileType = mimeType;
                } catch (error) {
                    console.error('Error converting font to Base64:', error);
                }

                // If the sketch is running, update font related components
                if (this._setupDone) {
                    try {
                        p5asciify.asciiFontTextureAtlas.setFontObject(loadedFont);

                        p5asciify.rendererManager.renderers.forEach(renderer => {
                            renderer.characterSet.setCharacterSet(renderer.characterSet.characters);
                        });

                        p5asciify.rendererManager.grid.resizeCellPixelDimensions(
                            p5asciify.asciiFontTextureAtlas.maxGlyphDimensions.width,
                            p5asciify.asciiFontTextureAtlas.maxGlyphDimensions.height
                        );

                        p5asciify.rendererManager.textAsciiRenderer.updateFont(p5asciify.rendererManager.fontBase64, p5asciify.rendererManager.fontFileType);
                    } catch (e) {
                        return reject(e);
                    }
                }

                this._decrementPreload();
                p5asciify.emit('fontUpdated', {
                    base64: p5asciify.rendererManager.fontBase64,
                    fileType: p5asciify.rendererManager.fontFileType
                });
                resolve();
            };

            if (typeof font === 'string') {
                this.loadFont(
                    font,
                    (loadedFont) => { setFont(loadedFont, font); },
                    () => { reject(new P5AsciifyError(`loadAsciiFont() | Failed to load font from path: '${font}'`)); }
                );
            } else {
                reject(new P5AsciifyError(`loadAsciiFont() | Invalid font parameter. Expected a string/path.`));
            }
        });
    };

    p5.prototype.registerMethod("beforePreload", p5.prototype.preloadAsciiFont);
    p5.prototype.registerPreloadMethod('loadAsciiFont', p5.prototype);
}