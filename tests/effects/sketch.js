let sketchFramebuffer;

let kaleidoscopeEffect;
let distortionEffect;
let brightnessEffect;
let chromaticAberationEffect;
let colorPaletteEffect1;
let colorPaletteEffect2;
let grayscaleEffect;
let rotationEffect;

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
            rotationAngle: 0
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

    kaleidoscopeEffect = addAsciiEffect('pre', 'kaleidoscope', { segments: 4, angle: 0 });
    distortionEffect = addAsciiEffect('pre', 'distortion', { frequency: 0.1, amplitude: 0.1 }); 
    brightnessEffect = addAsciiEffect('pre', 'brightness', { brightness: 0.5 });

     // TODO: Effect seems to affect the ascii edges conversion in a bad way when no grayscale other effect are applied after
    chromaticAberationEffect = addAsciiEffect('pre', 'chromaticaberration', { amount: 0.10, angle: 0 });
    grayscaleEffect = addAsciiEffect('pre', 'grayscale', { });

    colorPaletteEffect1 = addAsciiEffect('pre', 'colorpalette', { palette: ['#ff0000', '#00ff00', '#0000ff', '#ffffff'] });
    colorPaletteEffect2 = addAsciiEffect('pre', 'colorpalette', { palette: ['#ff00ff', '#00ffff', '#0000ff', '#ffffff'] });
    
    rotationEffect = addAsciiEffect('pre', 'rotate', { angle: 0 });
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

    kaleidoscopeEffect.angle = frameCount;
    rotationEffect.angle = frameCount;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}