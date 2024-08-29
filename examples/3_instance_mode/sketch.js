const theSketch = (sketch) => {

    p5asciify.instance(sketch); // Pass the p5 instance to the p5asciify library before setup

    let kaleidoscopeEffect; 
    let distortionEffect;

    sketch.preload = () => {
    };

    sketch.setup = () => {
        sketch.createCanvas(800, 800, sketch.WEBGL);

        sketch.setAsciiOptions({ // All functions provided by p5.asciify are now available through the p5 instance
            common: {
                fontSize: 16,
            },
            brightness: {
                enabled: true,
                characters: ' .:-=+*#%@',
                characterColor: "#ff0000",
                characterColorMode: 0,
                backgroundColor: "#000000",
                backgroundColorMode: 1,
                invertMode: true,
            },
            edge: {
                enabled: true,
                invertMode: true
            }
        });

        kaleidoscopeEffect = sketch.addAsciiEffect("pre", "kaleidoscope", { segments: 6 });
        distortionEffect = sketch.addAsciiEffect("pre", "distortion", { frequency: 0.1, amplitude: 0.1 });
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

        if (sketch.frameCount % 100 == 0) {
            sketch.swapAsciiEffects(kaleidoscopeEffect, distortionEffect);
        }
    };
};

let myp5 = new p5(theSketch);