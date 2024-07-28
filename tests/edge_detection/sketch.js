/**
 * This test checks if the ascii edge detection works correctly on a 3D object.
 */

let sketchFramebuffer;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL); // WebGL mode is required currently
    sketchFramebuffer = createFramebuffer({ format: FLOAT });

    setAsciiOptions({ 
        common: {
            fontSize: 32,
        },
        edge: {
            enabled: true,
            characterColorMode: 1,
            sobelThreshold: 0.5,
            sampleThreshold: 32,
        }
    });
}

function draw() {
    sketchFramebuffer.begin();
    background(0);
	fill(255);
	rotateX(radians(frameCount * 1));
	rotateZ(radians(frameCount));
	directionalLight(255, 255, 255, 0, 0, -1);
	box(800, 400, 400);
    sketchFramebuffer.end();

    image(sketchFramebuffer, -windowWidth / 2, -windowHeight / 2);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}