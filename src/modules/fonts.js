import P5AsciifyError from "../errors.js";
import P5AsciifyUtils from "../utils.js";
import URSAFONT_BASE64 from '../assets/fonts/ursafont_base64.txt';

export function registerFontMethods(p5asciify) {

    p5.prototype.preloadAsciiFont = function () {
        p5asciify.p5Instance._incrementPreload();
        p5asciify.font = p5asciify.p5Instance.loadFont(
            URSAFONT_BASE64,
            (loadedFont) => {
                p5asciify.font = loadedFont;
                p5asciify.fontBase64 = `${URSAFONT_BASE64}`;
                p5asciify.fontFileType = 'truetype';
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

                    p5asciify.fontBase64 = `data:font/${mimeType};charset=utf-8;base64,${base64String}`;
                    p5asciify.fontFileType = mimeType;
                } catch (error) {
                    console.error('Error converting font to Base64:', error);
                }

                // If the sketch is running, update font related components
                if (p5asciify.p5Instance.frameCount > 0) {
                    try {
                        p5asciify.asciiFontTextureAtlas.setFontObject(loadedFont);
                        p5asciify.asciiCharacterSet.setCharacterSet(p5asciify.asciiCharacterSet.characters);
                        p5asciify.edgeCharacterSet.setCharacterSet(p5asciify.edgeCharacterSet.characters);

                        p5asciify.grid.resizeCellPixelDimensions(
                            p5asciify.asciiFontTextureAtlas.maxGlyphDimensions.width,
                            p5asciify.asciiFontTextureAtlas.maxGlyphDimensions.height
                        );

                        p5asciify.brightnessRenderer.resizeFramebuffers();
                        p5asciify.edgeRenderer.resizeFramebuffers();
                        p5asciify.customAsciiRenderer.resizeFramebuffers();
                        p5asciify.accurateRenderer.resizeFramebuffers();
                        p5asciify.gradientRenderer.resizeFramebuffers();

                        p5asciify.edgeRenderer.resetShaders();
                        p5asciify.accurateRenderer.resetShaders();

                        p5asciify.textAsciiRenderer.updateFont(p5asciify.fontBase64, p5asciify.fontFileType);
                    } catch (e) {
                        return reject(e);
                    }
                }

                p5asciify.p5Instance._decrementPreload();
                p5asciify.emit('fontUpdated', {
                    base64: p5asciify.fontBase64,
                    fileType: p5asciify.fontFileType
                });
                resolve();
            };

            if (typeof font === 'string') {
                p5asciify.p5Instance.loadFont(
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