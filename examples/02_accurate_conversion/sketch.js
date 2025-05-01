/**
 * @name 02_accurate_conversion
 * @description Basic example applying the pre-defined 'accurate' renderer to a p5.js canvas with p5.asciify.
 * @author humanbydefinition
 * @link https://github.com/humanbydefinition/p5.asciify
 * 
 * This example demonstrates how to apply the pre-defined 'accurate' renderer to a p5.js canvas.
 * An image (CC0 licensed) is displayed on the canvas and asciified using the 'accurate' renderer.
 * 
 * Attribution:
 * - Brutalist high-rise building image by @AliImran on pexels.com:
 *  - https://www.pexels.com/photo/black-and-white-photo-of-a-brutalist-high-rise-building-17209382/
 */

import p5 from 'p5';
import { p5asciify } from '../../src/lib/index';

const sketch = (p) => {

    let asciifier; // Define the `asciifier` variable to store the `P5Asciifier` instance
    let img;

    p.preload = () => {
        img = p.loadImage('brutalist-high-rise-building.jpeg');
    };

    p.setup = () => {
        p.setAttributes('antialias', false);
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    };

    // After `p5.asciify` is set up in the background after `setup()`,
    // we can call `setupAsciify()` to configure `p5asciify` and it's `P5Asciifier` instances and rendering pipelines
    p.setupAsciify = () => {
        // Fetch the default `P5Asciifier` instance provided by the library
        asciifier = p5asciify.asciifier();

        // Disable all pre-defined renderers in the rendering pipeline of the `asciifier` instance
        asciifier.renderers().disable();

        // Update the pre-defined `accurate` renderer with the provided options
        asciifier.renderers().get("accurate").update({
            enabled: true,
            // Use all characters in the asciifier's font
            characters: asciifier.fontManager.characters.map(charObj => charObj.character).join(''),
            characterColorMode: "sampled",
            backgroundColorMode: "sampled",
        });
    };

    // Draw the image on the canvas to be asciified
    p.draw = () => {
        p.clear();
        p.image(img, -p.windowWidth / 2, -p.windowHeight / 2);
    };

    // After the asciified content is drawn to the canvas, use `drawAsciify()` to draw on top of it
    p.drawAsciify = () => {
        const fpsText = "FPS:" + Math.min(Math.ceil(p.frameRate()), 60);

        p.noStroke();
        p.fill(0);
        p.rect(-p.width / 2, p.height / 2 - p.textAscent() - 4, p.textWidth(fpsText), p.textAscent());

        p.textFont(asciifier.fontManager.font);
        p.textSize(64);
        p.fill(255, 255, 0);
        p.text(fpsText, -p.width / 2, p.height / 2);
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
};

const myp5 = new p5(sketch);