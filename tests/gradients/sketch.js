/**
 * This test checks if all the effects can be applied and modified without causing any errors.
 */

let sketchFramebuffer;

let linearGradient;
let spiralGradient;
let radialGradient;
let zigzagGradient;
let conicalGradient;
let noiseGradient;

let kaleidoscopeEffect;
let distortionEffect;

let gridRows = 3;
let gridCols = 3;

let fillColors = [
    [150, 160, 170],
    [180, 190, 200],
    [210, 220, 230]
]

function preload() {
    //kaleidoscopeEffect = addAsciiEffect("pre", "kaleidoscope", { segments: 2, angle: 145 })
    //distortionEffect = addAsciiEffect("pre", "distortion", { frequency: 0.1, amplitude: 0.1 });
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    framebuffer = createFramebuffer({ format: FLOAT });

    setAsciiOptions({
        common: {
            fontSize: 16,
        },
        ascii: {
            renderMode: "brightness",
            enabled: true,
            characterColorMode: 0,
            characters: "-"
        },
        edge: {
            enabled: true,
            characterColorMode: 1,
            sobelThreshold: 0.1,
            sampleThreshold: 16,
        },
        gradient: {
            enabled: true,
            characterColorMode: 1,
            characterColor: "#ff0000",
            invertMode: true,
        }
    });

    linearGradient = addAsciiGradient("linear", 150, 150, "gradients ", { direction: 1, angle: 0, speed: 0.1 });
    spiralGradient = addAsciiGradient("spiral", 160, 160, "are  ", { direction: 1, speed: 0.01, density: 0.5 });
    radialGradient = addAsciiGradient("radial", 170, 170, "now ", { direction: -1, radius: 1.0 });
    zigzagGradient = addAsciiGradient("zigzag", 180, 180, "available ", { direction: 1, speed: 0.1 });
    conicalGradient = addAsciiGradient("conical", 190, 190, "in ", { speed: 0.01 });
    noiseGradient = addAsciiGradient("noise", 210, 240, "p5.asciify ", { noiseScale: 0.5, speed: 0.1, direction: 1 });
}

function getFillColor(row, col) {
    return fillColors[row][col];
}

function draw() {
    framebuffer.begin();
    background(0);

    noStroke();

    const rectWidth = windowWidth / gridCols;
    const rectHeight = windowHeight / gridRows;

    for (let row = 0; row < gridRows; row++) {
        for (let col = 0; col < gridCols; col++) {
            let fillColor = getFillColor(row, col);
            fill(fillColor);
            rect(-windowWidth / 2 + col * rectWidth, -windowHeight / 2 + row * rectHeight, rectWidth, rectHeight);
        }
    }

    framebuffer.end();

    image(framebuffer, -windowWidth / 2, -windowHeight / 2);

    if (frameCount == 5) {

    }

    if (frameCount > 5) {

        linearGradient.angle += 0.5;
        //zigzagGradient.angle += 0.5;
        spiralGradient.centerX = map(mouseX, 0, windowWidth, 0, 1);
        spiralGradient.centerY = map(mouseY, 0, windowHeight, 0, 1);
        radialGradient.centerX = map(mouseX, 0, windowWidth, 0, 1);
        radialGradient.centerY = map(mouseY, 0, windowHeight, 0, 1);
        conicalGradient.centerX = map(mouseX, 0, windowWidth, 0, 1);
        conicalGradient.centerY = map(mouseY, 0, windowHeight, 0, 1);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}