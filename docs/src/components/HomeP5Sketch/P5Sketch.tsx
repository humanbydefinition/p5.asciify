import React, { useEffect, useRef } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

import NoiseFragShader from '!!raw-loader!./shaders/sketch/noise.frag';
import ShiftFragShader from '!!raw-loader!./shaders/sketch/shift.frag';
import PushFragShader from '!!raw-loader!./shaders/sketch/push.frag';

import AsciiCharacterFragShader from '!!raw-loader!./shaders/asciifyTranslation/asciiCharacter.frag';
import AsciiColorPaletteFragShader from '!!raw-loader!./shaders/asciifyTranslation/asciiColorPalette.frag';

import VertexShader from '!!raw-loader!./shaders/shader.vert';
import { RectangleManager } from './rectanglemanager';

interface P5SketchProps {
    title: string;
    tagline: string;
}

// Create a separate component for browser-only rendering
const P5SketchBrowser: React.FC<P5SketchProps> = ({ title, tagline }) => {
    const sketchContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Dynamically import p5 and p5.asciify
        const loadDependencies = async () => {
            try {
                const p5Module = await import('p5');
                const p5asciifyModule = await import('p5.asciify');
                
                const p5 = p5Module.default;
                const p5asciify = p5asciifyModule.p5asciify;

                let p5Instance: any = null;

                // Remove any existing canvas before creating a new one
                if (sketchContainerRef.current) {
                    while (sketchContainerRef.current.firstChild) {
                        sketchContainerRef.current.removeChild(sketchContainerRef.current.firstChild);
                    }
                }

                // Create new p5 instance with the sketch
                p5Instance = new p5((p) => {
                    // Color palette to be used in the ascii renderer
                    let colorPalette = [
                        "#181818", "#282828", "#383838",
                        "#474747", "#565656", "#646464", "#717171",
                        "#7e7e7e", "#8c8c8c", "#9b9b9b", "#ababab",
                        "#bdbdbd", "#d1d1d1", "#e7e7e7", "#ffffff"
                    ];
                    
                    // Store the P5Asciifier instance
                    let asciifier;
                    
                    // Custom2D ascii renderer's framebuffers
                    let primaryColorSampleFramebuffer;
                    let secondaryColorSampleFramebuffer;
                    let asciiCharacterFramebuffer;
                    
                    let rectangleManager;
                    let charsetColorPalette = [];
                    let charsetColorPaletteFramebuffer;
                    let colorPaletteFramebuffer;
                    
                    // Shader variables
                    let noiseShader, shiftShader, pushShader;
                    let asciiCharacterShader, asciiColorPaletteShader;
                    let noiseFramebuffer, shiftFramebuffer;
                    let previousPushFramebuffer, nextPushFramebuffer;

                    p.preload = () => {
                        // Load shaders
                        noiseShader = p.createShader(VertexShader, NoiseFragShader);
                        shiftShader = p.createShader(VertexShader, ShiftFragShader);
                        pushShader = p.createShader(VertexShader, PushFragShader);

                        asciiCharacterShader = p.createShader(VertexShader, AsciiCharacterFragShader);
                        asciiColorPaletteShader = p.createShader(VertexShader, AsciiColorPaletteFragShader);
                    };

                    p.setup = () => {
                        // Create canvas with container dimensions
                        const container = sketchContainerRef.current;
                        p.setAttributes('antialias', false);
                        p.createCanvas(container.offsetWidth, container.offsetHeight, p.WEBGL);
                    };

                    p.setupAsciify = () => {
                        // Fetch the default P5Asciifier instance provided by the library
                        asciifier = p5asciify.asciifier();

                        // Initialize and fill the color palette framebuffer
                        colorPaletteFramebuffer = p.createFramebuffer({
                            density: 1,
                            width: colorPalette.length,
                            height: 1,
                            depthFormat: p.UNSIGNED_INT,
                            textureFiltering: p.NEAREST
                        });
                        
                        colorPaletteFramebuffer.loadPixels();
                        for (let i = 0; i < colorPalette.length; i++) {
                            let c = p.color(colorPalette[i]);
                            colorPaletteFramebuffer.pixels[i * 4] = p.red(c);
                            colorPaletteFramebuffer.pixels[i * 4 + 1] = p.green(c);
                            colorPaletteFramebuffer.pixels[i * 4 + 2] = p.blue(c);
                            colorPaletteFramebuffer.pixels[i * 4 + 3] = p.alpha(c);
                        }
                        colorPaletteFramebuffer.updatePixels();

                        // Initialize and fill the charset color palette framebuffer
                        charsetColorPaletteFramebuffer = p.createFramebuffer({
                            density: 1,
                            width: asciifier.fontManager.characters.length,
                            height: 1,
                            depthFormat: p.UNSIGNED_INT,
                            textureFiltering: p.NEAREST
                        });

                        // Fetch the colors that correspond to each character in the font and fill the framebuffer
                        charsetColorPalette = asciifier.fontManager.glyphColors(asciifier.fontManager.characters.map(charObj => charObj.character).join(''));
                        charsetColorPaletteFramebuffer.loadPixels();
                        for (let i = 0; i < asciifier.fontManager.characters.length; i++) {
                            let c = charsetColorPalette[i];
                            charsetColorPaletteFramebuffer.pixels[i * 4] = p.red(c);
                            charsetColorPaletteFramebuffer.pixels[i * 4 + 1] = p.green(c);
                            charsetColorPaletteFramebuffer.pixels[i * 4 + 2] = p.blue(c);
                            charsetColorPaletteFramebuffer.pixels[i * 4 + 3] = p.alpha(c);
                        }
                        charsetColorPaletteFramebuffer.updatePixels();

                        asciifier.fontSize(16); // Set the font size to 16 for the P5Asciifier instance

                        // Fetch the framebuffers from the custom ascii renderer to apply custom logic on
                        primaryColorSampleFramebuffer = asciifier.renderers().get("custom2D").primaryColorFramebuffer;
                        secondaryColorSampleFramebuffer = asciifier.renderers().get("custom2D").secondaryColorFramebuffer;
                        asciiCharacterFramebuffer = asciifier.renderers().get("custom2D").characterFramebuffer;

                        asciifier.renderers().disable(); // Disable the default renderers and enable the custom2D one
                        asciifier.renderers().get("custom2D").enable();

                        // Initialize sketch framebuffers with the same dimensions as the ascii grid
                        noiseFramebuffer = p.createFramebuffer({
                            density: 1,
                            width: asciifier.grid.cols,
                            height: asciifier.grid.rows,
                            depthFormat: p.UNSIGNED_INT,
                            textureFiltering: p.NEAREST
                        });

                        shiftFramebuffer = p.createFramebuffer({
                            density: 1,
                            width: asciifier.grid.cols,
                            height: asciifier.grid.rows,
                            depthFormat: p.UNSIGNED_INT,
                            textureFiltering: p.NEAREST
                        });

                        previousPushFramebuffer = p.createFramebuffer({
                            density: 1,
                            width: asciifier.grid.cols,
                            height: asciifier.grid.rows,
                            depthFormat: p.UNSIGNED_INT,
                            textureFiltering: p.NEAREST
                        });

                        nextPushFramebuffer = p.createFramebuffer({
                            density: 1,
                            width: asciifier.grid.cols,
                            height: asciifier.grid.rows,
                            depthFormat: p.UNSIGNED_INT,
                            textureFiltering: p.NEAREST
                        });

                        rectangleManager = new RectangleManager(p, asciifier.grid.cols, asciifier.grid.rows, 3, 1, 16);
                        rectangleManager.initializeRectangles();

                        asciifier.background(p.color(32)); // Set the background color for the ascii grid

                        runNoiseShader(0);
                    };

                    const runNoiseShader = (frameCount) => {
                        noiseFramebuffer.begin();
                        p.clear();
                        p.shader(noiseShader);
                        noiseShader.setUniform('u_bins', asciifier.fontManager.characters.length);
                        noiseShader.setUniform('u_dimensions', [asciifier.grid.cols, asciifier.grid.rows]);
                        noiseShader.setUniform('u_frameCount', frameCount);
                        p.rect(0, 0, p.width, p.height);
                        noiseFramebuffer.end();
                    };

                    p.draw = () => {
                        if (p.frameCount % 50 === 0) {
                            if (rectangleManager) {
                                rectangleManager.initializeRectangles();
                                runNoiseShader(p.frameCount);
                            }
                        }

                        if (!asciifier) return;

                        // Create the texture based on the given rectangles, defining the direction each pixel should move
                        shiftFramebuffer.begin();
                        p.clear();
                        p.shader(shiftShader);
                        shiftShader.setUniform('u_resolution', [asciifier.grid.cols, asciifier.grid.rows]);
                        shiftShader.setUniform('u_frameCount', p.frameCount);

                        // Pass rectangle data to the shader
                        rectangleManager.rectangles.forEach((rect, index) => {
                            shiftShader.setUniform(`u_rect${index}`, [rect.x, rect.y, rect.width, rect.height]);
                        });

                        p.rect(0, 0, p.width, p.height);
                        shiftFramebuffer.end();

                        // Swap the previous and next push framebuffers
                        [previousPushFramebuffer, nextPushFramebuffer] = [nextPushFramebuffer, previousPushFramebuffer];

                        nextPushFramebuffer.begin(); // Push the pixels based on the shiftFramebuffer's output
                        p.clear();
                        p.shader(pushShader);
                        pushShader.setUniform('u_resolution', [asciifier.grid.cols, asciifier.grid.rows]);
                        pushShader.setUniform('u_shiftMapTexture', shiftFramebuffer); // Shift map texture for direction
                        pushShader.setUniform('u_noiseTexture', noiseFramebuffer); // Noise texture for boundaries
                        pushShader.setUniform('u_previousFrameTexture', previousPushFramebuffer); // Previous frame texture for the rest
                        p.rect(0, 0, p.width, p.height);
                        nextPushFramebuffer.end();

                        // Translate the pushShader's pixels into our ascii character colors for p5.asciify to render
                        asciiCharacterFramebuffer.begin();
                        p.clear();
                        p.shader(asciiCharacterShader);
                        asciiCharacterShader.setUniform('u_textureSize', [asciifier.grid.cols, asciifier.grid.rows]);
                        asciiCharacterShader.setUniform('u_pushFramebuffer', nextPushFramebuffer);
                        asciiCharacterShader.setUniform('u_charPaletteTexture', charsetColorPaletteFramebuffer);
                        asciiCharacterShader.setUniform('u_charPaletteSize', [charsetColorPaletteFramebuffer.width, charsetColorPaletteFramebuffer.height]);
                        p.rect(0, 0, p.width, p.height);
                        asciiCharacterFramebuffer.end();

                        // Translate the pushShader's pixels into our color palette for p5.asciify to render
                        primaryColorSampleFramebuffer.begin();
                        p.clear();
                        p.shader(asciiColorPaletteShader);
                        asciiColorPaletteShader.setUniform('u_textureSize', [asciifier.grid.cols, asciifier.grid.rows]);
                        asciiColorPaletteShader.setUniform('u_pushFramebuffer', nextPushFramebuffer);
                        asciiColorPaletteShader.setUniform('u_colorPaletteTexture', colorPaletteFramebuffer);
                        asciiColorPaletteShader.setUniform('u_paletteSize', [colorPalette.length, 1]);
                        p.rect(0, 0, p.width, p.height);
                        primaryColorSampleFramebuffer.end();

                        secondaryColorSampleFramebuffer.begin();
                        p.background(32);
                        secondaryColorSampleFramebuffer.end();
                    };

                    // Handle window resize
                    p.windowResized = () => {
                        const container = sketchContainerRef.current;
                        if (container) {
                            p.resizeCanvas(container.offsetWidth, container.offsetHeight);
                        }

                        if (!asciifier) return;

                        noiseFramebuffer.resize(asciifier.grid.cols, asciifier.grid.rows);
                        shiftFramebuffer.resize(asciifier.grid.cols, asciifier.grid.rows);
                        previousPushFramebuffer.resize(asciifier.grid.cols, asciifier.grid.rows);
                        nextPushFramebuffer.resize(asciifier.grid.cols, asciifier.grid.rows);

                        rectangleManager.updateGridDimensions(asciifier.grid.cols, asciifier.grid.rows);
                        rectangleManager.initializeRectangles();

                        runNoiseShader(0);
                    };
                }, sketchContainerRef.current);

                // Cleanup function to remove p5 instance when component unmounts
                return () => {
                    if (p5Instance && typeof p5Instance.remove === 'function') {
                        p5Instance.remove();
                    }
                    if (sketchContainerRef.current) {
                        while (sketchContainerRef.current.firstChild) {
                            sketchContainerRef.current.removeChild(sketchContainerRef.current.firstChild);
                        }
                    }
                };
            } catch (error) {
                console.error('Failed to load p5 or p5.asciify:', error);
            }
        };

        loadDependencies();
    }, [title, tagline]);

    return (
        <div
            ref={sketchContainerRef}
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 0
            }}
        />
    );
};

// Main component that uses BrowserOnly
const P5Sketch: React.FC<P5SketchProps> = (props) => {
    return (
        <BrowserOnly>
            {() => <P5SketchBrowser {...props} />}
        </BrowserOnly>
    );
};

export default P5Sketch;