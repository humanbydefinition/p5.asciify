/**
 * @name 05_plugins
 * @description Basic example applying the 'accurate' plugin renderer to a p5.js canvas with p5.asciify.
 * @author humanbydefinition
 * @link https://github.com/humanbydefinition/p5.asciify
 * 
 * This example demonstrates how to apply the 'accurate' plugin renderer to a p5.js canvas.
 * An image (CC0 licensed) is displayed on the canvas and asciified using the 'accurate' renderer.
 * 
 * Attribution:
 * - Brutalist high-rise building image by @AliImran on pexels.com:
 *  - https://www.pexels.com/photo/black-and-white-photo-of-a-brutalist-high-rise-building-17209382/
 */

import p5 from 'p5';
import { p5asciify } from 'p5.asciify';
import { AccurateRendererPlugin } from './p5.asciify-accurate-renderer-plugin.esm';
import ExampleImage from './brutalist-high-rise-building.jpeg';

const sketch = new p5((p) => {
    let asciifier;
    let img;
    
    p.setup = async () => {
        p.setAttributes('antialias', false);
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

        img = await p.loadImage(ExampleImage);
    };

    p.setupAsciify = () => {
        // Register the plugin renderer
        p5asciify.registerPlugin(AccurateRendererPlugin);

        // Fetch the asciifier instance
        asciifier = p5asciify.asciifier();

        // Disable the brightness renderer
        asciifier.renderers().get("brightness").disable();

        // Add the accurate plugin renderer
        asciifier.renderers().add("accurate", "accurate");

        // Update the accurate renderer settings
        asciifier.renderers().get("accurate").update({
            characters: asciifier.fontManager.characters.map(charObj => charObj.character).join(''),
            characterColorMode: "sampled",
            backgroundColorMode: "sampled",
            enabled: true,
        });

        // Display the available renderer types in the console
        console.log(asciifier.renderers().getAvailableRendererTypes());
    };

    // Draw the image to the canvas during `draw()` to asciify it
    p.draw = () => {
        p.clear();
        p.image(img, -p.windowWidth / 2, -p.windowHeight / 2);
    };

    // Draw a FPS display on top of the asciified result on the bottom left.
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
});

export default sketch;