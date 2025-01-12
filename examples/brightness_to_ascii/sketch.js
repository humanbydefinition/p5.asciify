import p5 from 'p5';
import p5asciify from '../../src/lib/index';

const sketch = (p) => {
    let sketchFramebuffer;
    let grid;
    let characterSet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    p5asciify.instance(p);

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
        sketchFramebuffer = p.createFramebuffer({ format: p.FLOAT });

        p.setAsciifyFontSize(32);

        p.setAsciifyPostSetupFunction(() => {
            p5asciify.rendererManager.renderers[0].updateOptions({
                enabled: true,
                characters: characterSet,
                characterColorMode: 1,
            });
        });
    };

    p.draw = () => {
        let startX = -p5asciify.grid.width / 2;
        let startY = -p5asciify.grid.height / 2;

        sketchFramebuffer.begin();
        p.background(0);

        // Draw the grid
        for (let i = 0; i < characterSet.length; i++) {
            let gridCol = i % p5asciify.grid.cols;
            let gridRow = Math.floor(i / p5asciify.grid.cols);

            let brightness = i * (255 / characterSet.length) + (255 / (2 * characterSet.length));
            p.fill(brightness);
            p.stroke(255, 255, 0);
            p.rect(startX + gridCol * p5asciify.grid.cellWidth, 
                  startY + gridRow * p5asciify.grid.cellHeight, 
                  p5asciify.grid.cellWidth, 
                  p5asciify.grid.cellHeight);
        }

        p.noFill();
        p.stroke(255, 0, 0);
        p.rect(startX, startY, p5asciify.grid.width, p5asciify.grid.height);
        sketchFramebuffer.end();

        p.image(sketchFramebuffer, -p.windowWidth / 2, -p.windowHeight / 2);
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
};

const myp5 = new p5(sketch);