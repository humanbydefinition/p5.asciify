/**
 * This test checks if all the effects can be applied and modified without causing any errors.
 */

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
    createCanvas(windowWidth, windowHeight, WEBGL);
    sketchFramebuffer = createFramebuffer({ format: FLOAT });

    setAsciiOptions({ 
        common: {
            fontSize: 16,
        },
        edge: {
            enabled: true,
            characterColorMode: 1,
            sobelThreshold: 0.5,
            sampleThreshold: 16,
        }
    });

    // Add all the effects to the pre effect manager
    // If they work in the pre effect manager, I am currently assuming they will in the post effect manager aswell
    kaleidoscopeEffect = addAsciiEffect('pre', 'kaleidoscope', { segments: 4, angle: 0 });
    distortionEffect = addAsciiEffect('pre', 'distortion', { frequency: 0.1, amplitude: 0.1 });
    brightnessEffect = addAsciiEffect('pre', 'brightness', { brightness: 0.5 });

    // TODO: Effect seems to affect the ascii edges conversion in a bad way when no grayscale other effect are applied after
    chromaticAberationEffect = addAsciiEffect('pre', 'chromaticaberration', { amount: 0.10, angle: 0 });
    grayscaleEffect = addAsciiEffect('pre', 'grayscale', {});

    colorPaletteEffect1 = addAsciiEffect('pre', 'colorpalette', { palette: ['#ff0000', '#00ff00', '#0000ff', '#ffffff'] });
    colorPaletteEffect2 = addAsciiEffect('pre', 'colorpalette', { palette: ['#ff00ff', '#00ffff', '#0000ff', '#ffffff'] });

    rotationEffect = addAsciiEffect('pre', 'rotate', { angle: 0 });
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

    kaleidoscopeEffect.angle = frameCount; // Update some of the effect properties
    rotationEffect.angle = frameCount;
    setAsciiOptions({ brightness: { rotationAngle: frameCount } }); // Update the rotation angle of the brightness ascii characters
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}