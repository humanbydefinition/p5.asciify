let sketchFramebuffer;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL); // WebGL mode is required currently
    sketchFramebuffer = createFramebuffer({ format: FLOAT });

    setAsciiOptions({ // These are the default options, you can change them as needed in preload(), setup() or draw()
        common: {
            fontSize: 32,
        },
        brightness: {
            enabled: true,
            characters: "0123456789",
            characterColor: "#ffffff",
            characterColorMode: 0,
            backgroundColor: "#000000",
            backgroundColorMode: 1,
            invertMode: false,
            rotationAngle: 90
        },
        edge: {
            enabled: true,
            characters: "-/|\\-/|\\",
            characterColor: '#ffffff',
            characterColorMode: 1,
            backgroundColor: '#000000',
            backgroundColorMode: 1,
            invertMode: false,
            sobelThreshold: 0.5,
            sampleThreshold: 1,
            rotationAngle: 0,
        }
    });
}

function draw() {
    sketchFramebuffer.begin();
    background(0);
	fill(255);

	push();
	rotateX(radians(frameCount * 1));
	rotateZ(radians(frameCount));
	directionalLight(255, 255, 255, 0, 0, -1);
	box(800, 400, 400);
	pop();

    sketchFramebuffer.end();
    background(0);
    image(sketchFramebuffer, -windowWidth / 2, -windowHeight / 2);

    setAsciiOptions({ });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}