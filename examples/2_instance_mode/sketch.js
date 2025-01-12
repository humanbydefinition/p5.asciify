import p5 from 'p5';
import p5asciify from '../../src/lib/index';

const theSketch = (sketch) => {
    p5asciify.instance(sketch); // Pass the p5 instance to the p5asciify library before setup

    sketch.setup = () => {
        sketch.createCanvas(800, 800, sketch.WEBGL);

        sketch.setAsciifyPostSetupFunction(() => {
            p5asciify.rendererManager.renderers[0].updateOptions({
                enabled: true,
                characters: ' .:-=+*#%@',
                characterColor: "#ff0000",
                characterColorMode: 0,
                backgroundColor: "#000000",
                backgroundColorMode: 1,
                invertMode: true,
            });

            p5asciify.rendererManager.renderers[3].updateOptions({
                enabled: true,
                invertMode: true
            });
        });
    };

    sketch.draw = () => {
        sketch.push();
        sketch.background(0);
        sketch.fill(255);
        sketch.rotateX(sketch.radians(sketch.frameCount * 3));
        sketch.rotateZ(sketch.radians(sketch.frameCount));
        sketch.directionalLight(255, 255, 255, 0, 0, -1);
        sketch.box(800, 100, 100);
        sketch.pop();
    };
};

const myp5 = new p5(theSketch);