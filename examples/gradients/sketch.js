import p5 from 'p5';
import p5asciify from '../../src/lib/index';

const sketch = (p) => {
    let sketchFramebuffer;
    let linearGradient, spiralGradient, radialGradient, 
        zigzagGradient, conicalGradient, noiseGradient;
    let kaleidoscopeEffect, distortionEffect;

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
        sketchFramebuffer = p.createFramebuffer({ format: p.FLOAT });

        linearGradient = p.addAsciiGradient("linear", 150, 150, "gradients ", {
            direction: 1,
            angle: 0,
            speed: 0.1,
        });
        spiralGradient = p.addAsciiGradient("spiral", 160, 160, "are  ", {
            direction: 1,
            speed: 0.01,
            density: 0.5,
        });
        radialGradient = p.addAsciiGradient("radial", 170, 170, "now ", {
            direction: -1,
            radius: 1.0,
        });
        zigzagGradient = p.addAsciiGradient("zigzag", 180, 180, "available ", {
            direction: 1,
            speed: 0.2,
        });
        conicalGradient = p.addAsciiGradient("conical", 190, 190, "in ", {
            speed: 0.01,
        });
        noiseGradient = p.addAsciiGradient("noise", 210, 240, "p5.asciify ", {
            noiseScale: 0.5,
            speed: 0.1,
            direction: 1,
        });

        p.setAsciifyPostSetupFunction(() => {
            p5asciify.rendererManager.renderers[2].updateOptions({
                enabled: true,
                characterColorMode: 1,
                characterColor: "#ff0000",
                invertMode: true,
            });

            p5asciify.rendererManager.renderers[0].updateOptions({
                enabled: true,
                characterColorMode: 0,
                characters: ".",
            });

            p5asciify.rendererManager.renderers[3].updateOptions({
                enabled: true,
                characterColorMode: 1,
                sobelThreshold: 0.1,
                sampleThreshold: 16,
            });
        });
    };

    p.draw = () => {
        sketchFramebuffer.begin();
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

        sketchFramebuffer.end();
        p.image(sketchFramebuffer, -p.windowWidth / 2, -p.windowHeight / 2);

        if (p.frameCount % 60 == 0) {
            zigzagGradient.enabled = !zigzagGradient.enabled;
        }

        if (p.frameCount === 120) {
            radialGradient.palette = "finally ";
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