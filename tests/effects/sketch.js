/**
 * This test checks if all the effects can be applied and modified without causing any errors.
 */

let sketchFramebuffer;

let kaleidoscopeEffect;
let distortionEffect;
let brightnessEffect;
let chromaticAberrationEffect;
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
        ascii: {
            renderMode: 'brightness'
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

    // TODO: chromaticaberration effect seems to affect the ascii edges conversion in a bad way when no other effect are applied after
    chromaticAberrationEffect = addAsciiEffect('pre', 'chromaticaberration', { amount: 0.10, angle: 0 });
    grayscaleEffect = addAsciiEffect('pre', 'grayscale', {});

    colorPaletteEffect1 = addAsciiEffect('pre', 'colorpalette', { palette: ['#ff0000', '#00ff00', '#0000ff', '#ffffff'] });
    colorPaletteEffect2 = addAsciiEffect('pre', 'colorpalette', { palette: ['#ff00ff', '#00ffff', '#0000ff', '#ffffff'] });

    addAsciiEffect('pre', 'invert', {});
    
    rotationEffect = addAsciiEffect('pre', 'rotate', { angle: 0 });
}

function draw() {

    const [maxGridCols, maxGridRows] = p5asciify.grid._calculateGridCellDimensions();

    // Increment the grid dimensions in a sinusoidal pattern until the maximum size is reached
    // If the grid dimensions havent reached the maximum size, the grid will oscillate between 1 and the maximum size
    let cols = floor(map(sin(frameCount * 0.01), -1, 1, 1, maxGridCols));
    let rows = floor(map(sin(frameCount * 0.02), -1, 1, 1, maxGridRows));

    setAsciiOptions({
        common: {
            gridDimensions: [cols, rows],
        },
    });

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
    setAsciiOptions({ ascii: { rotationAngle: frameCount } }); // Update the rotation angle of the brightness ascii characters
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}