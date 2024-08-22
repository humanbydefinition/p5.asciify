const theSketch = (sketch) => {

    p5asciify.instance(sketch); // Pass the p5 instance to the p5asciify library

    sketch.preload = () => {
    };

    sketch.setup = () => {
        sketch.createCanvas(800, 800, sketch.WEBGL);

        sketch.setAsciiOptions({ // Put "sketch." or whatever your p5 instance is called before the functions that p5.asciify provides
            brightness: {
                enabled: true
            }
        })
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

let myp5 = new p5(theSketch);