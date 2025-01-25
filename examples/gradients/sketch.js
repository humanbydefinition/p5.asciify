import p5 from 'p5';
import { p5asciify } from '../../src/lib/index';

const sketch = (p) => {
    let linearGradient, spiralGradient, radialGradient,
        zigzagGradient, conicalGradient;

    let gridRows = 3;
    let gridCols = 3;
    let fillColors = [
        [150, 160, 170],
        [180, 190, 200],
        [210, 220, 230],
    ];

    const getFillColor = (row, col) => {
        return fillColors[row][col];
    };

    p5asciify.instance(p);

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    };

    p.setupAsciify = () => {
        linearGradient = p5asciify.renderers().get("gradient").add("linear", 150, 150, "gradients ", {
            direction: 1,
            angle: 0,
            speed: 0.1,
        });
        spiralGradient = p5asciify.renderers().get("gradient").add("spiral", 160, 160, "are  ", {
            direction: 1,
            speed: 0.01,
            density: 0.5,
        });
        radialGradient = p5asciify.renderers().get("gradient").add("radial", 170, 170, "now ", {
            direction: -1,
            radius: 1.0,
        });
        zigzagGradient = p5asciify.renderers().get("gradient").add("linear", 180, 180, "available ", {
            direction: 1,
            speed: 0.2,
            zigzag: true,
        });
        conicalGradient = p5asciify.renderers().get("gradient").add("conical", 190, 190, "in ", {
            speed: 0.01,
        });

        p5asciify.renderers().get("gradient").update({
            enabled: true,
            characterColorMode: "fixed",
            characterColor: "#ff0000",
            invertMode: true,
        });

        p5asciify.renderers().get("brightness").update({
            enabled: true,
            characterColorMode: "sampled",
            characters: ".",
            invertMode: true,
        });

        p5asciify.renderers().get("edge").update({
            enabled: true,
            characterColorMode: "fixed",
            sobelThreshold: 0.1,
            sampleThreshold: 16,
            invertMode: false,
            backgroundColor: "#000000",
            backgroundColorMode: "fixed",
        });

        //p5asciify.renderers().swap("gradient", "edge");
        //p5asciify.renderers().swap("brightness", "edge");
        //p5asciify.renderers().moveDown("brightness");
        //p5asciify.renderers().moveDown("brightness");
        //p5asciify.renderers().remove("brightness");
    };

    p.draw = () => {
        p.background(0);
        p.noStroke();

        const rectWidth = p.windowWidth / gridCols;
        const rectHeight = p.windowHeight / gridRows;

        for (let row = 0; row < gridRows; row++) {
            for (let col = 0; col < gridCols; col++) {
                let fillColor = getFillColor(row, col);
                p.fill(fillColor);
                p.rect(
                    -p.windowWidth / 2 + col * rectWidth,
                    -p.windowHeight / 2 + row * rectHeight,
                    rectWidth,
                    rectHeight
                );
            }
        }

        if (p.frameCount % 60 == 0) {
            zigzagGradient.enabled = !zigzagGradient.enabled;
        }

        if (p.frameCount === 120) {
            radialGradient.characters = "finally ";
        }

        linearGradient.angle += 0.5;
        spiralGradient.centerX = p.map(p.mouseX, 0, p.windowWidth, 0, 1);
        spiralGradient.centerY = p.map(p.mouseY, 0, p.windowHeight, 0, 1);
        radialGradient.centerX = p.map(p.mouseX, 0, p.windowWidth, 0, 1);
        radialGradient.centerY = p.map(p.mouseY, 0, p.windowHeight, 0, 1);
        conicalGradient.centerX = p.map(p.mouseX, 0, p.windowWidth, 0, 1);
        conicalGradient.centerY = p.map(p.mouseY, 0, p.windowHeight, 0, 1);
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
};

const myp5 = new p5(sketch);