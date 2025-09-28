/**
 * @name 01_edge_detection
 * @description Basic example applying the pre-defined 'edge' renderer to a p5.js canvas with p5.asciify.
 * @author humanbydefinition
 * @link https://github.com/humanbydefinition/p5.asciify
 * 
 * This example demonstrates how to apply the pre-defined 'edge' renderer to a p5.js canvas.
 * Rectangles on the canvas are asciified using 'brightness' and 'edge' renderers in sequence.
 */

import p5 from 'p5';
import { p5asciify } from '../../../src/lib/index';

const sketch = (p) => {

    let asciifier; // Define the `asciifier` variable to store the `P5Asciifier` instance
    let rectangles = [];
    let maxRectangles = 30;

    class Rectangle {
        constructor() {
            this.x = p.random(-p.windowWidth / 2, p.windowWidth / 2);
            this.y = p.random(-p.windowHeight / 2, p.windowHeight / 2);
            this.size = 0;
            this.maxSize = p.random(50, 200);
            this.growing = true;
            this.color = p.color(p.random(255), p.random(255), p.random(255));
            this.angle = p.random(p.TWO_PI);
        }

        update() {
            if (this.growing) {
                this.size = p.min(this.size + 3, this.maxSize);
                this.growing = this.size < this.maxSize;
            } else {
                this.size = p.max(this.size - 3, 0);
                if (this.size === 0) return true;
            }

            if (!this.growing && p.random() < 0.01) this.growing = true;
            if (p.random() < 0.01) this.growing = false;

            return false;
        }

        display() {
            p.push();
            p.translate(this.x, this.y);
            p.rotate(this.angle);
            p.fill(this.color);
            p.rect(-this.size / 2, -this.size / 2, this.size, this.size);
            p.pop();
        }
    }

    p.setup = () => {
        p.setAttributes('antialias', false);
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

        for (let i = 0; i < maxRectangles; i++) rectangles.push(new Rectangle());
    };

    // After `p5.asciify` is set up in the background after `setup()`,
    // we can call `setupAsciify()` to configure `p5asciify` and it's `P5Asciifier` instances and rendering pipelines
    p.setupAsciify = () => {
        // Fetch the default `P5Asciifier` instance provided by the library
        asciifier = p5asciify.asciifier();

        asciifier.fontSize(8); // Set the font size to 8 in the asciifier instance

        // Update the pre-defined 'edge' renderer with the provided options
        asciifier.renderers().get("edge").update({
            enabled: true,
            characters: "-/|\\-/|\\",
            characterColor: "#ffffff",
            characterColorMode: "fixed",
            backgroundColor: "#000000",
            backgroundColorMode: "fixed",
            invert: false,
            sobelThreshold: 0.01,
            sampleThreshold: 16,
            rotation: 0,
            flipHorizontally: false,
            flipVertically: false,
        });

        // The pre-defined 'brightness' renderer is enabled by default and can be updated as well
    };

    // Draw anything on the canvas to be asciified
    p.draw = () => {
        p.clear();
        p.noStroke();

        rectangles = rectangles.filter((rect) => {
            rect.update();
            rect.display();
            return rect.size > 0;
        });

        while (rectangles.length < maxRectangles) rectangles.push(new Rectangle());
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