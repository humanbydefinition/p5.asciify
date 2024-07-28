/**
 * This example demonstrates how to use the effects available in the p5.asciify library, 
 * which can be applied before or after the ASCII conversion.
 * 
 * The example creates a sketch that displays a number of rectangles that grow and shrink over time, 
 * with a kaleidoscope effect that rotates the canvas. Besides the kaleidoscope effect,
 * a distortion effect is applied to the sketch, which creates a wavy effect.
 */

let sketchFramebuffer;

let rectangles = [];
let angleDirection = 1;
let cooldownCounter = 120;
let maxRectangles = 30;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL); // WebGL mode is required currently
    sketchFramebuffer = createFramebuffer({ format: FLOAT });

    setAsciiOptions({ // These are the default options, you can change them as needed in preload(), setup() or draw()
        common: {
            fontSize: 8,
        },
        brightness: {
            characters: ' .:-=+*#%@',
        }
    });

    // Add pre-effects, which get applied before the ASCII conversion
    distortionEffect = addAsciiEffect('pre', 'distortion', { frequency: 5.0, amplitude: 0.4 });
    kaleidoscopeEffect = addAsciiEffect('pre', 'kaleidoscope', { segments: 4, angle: 0 });

    for (let i = 0; i < maxRectangles; i++) rectangles.push(new Rectangle());
}

function draw() {
    sketchFramebuffer.begin();
    background(0);
    noStroke();

    rectangles = rectangles.filter(rect => {
        rect.update();
        rect.display();
        return rect.size > 0;
    });

    while (rectangles.length < maxRectangles) rectangles.push(new Rectangle());

    sketchFramebuffer.end();
    background(0);
    image(sketchFramebuffer, -windowWidth / 2, -windowHeight / 2);

    // Change the kaleidoscope angle direction randomly if the cooldown is over and a random chance is met
    if (cooldownCounter-- <= 0 && random() < 0.01) {
        angleDirection *= -1;
        cooldownCounter = 120;
    }

    kaleidoscopeEffect.angle += angleDirection; // Rotate the angle of the kaleidoscope effect
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Rectangle {
    constructor() {
        this.x = random(-windowWidth / 2, windowWidth / 2);
        this.y = random(-windowHeight / 2, windowHeight / 2);
        this.size = 0;
        this.maxSize = random(50, 200);
        this.growing = true;
        this.color = color(random(255), random(255), random(255));
    }

    update() {
        if (this.growing) {
            this.size = min(this.size + 3, this.maxSize);
            this.growing = this.size < this.maxSize;
        } else {
            this.size = max(this.size - 3, 0);
            if (this.size === 0) return true;
        }

        if (!this.growing && random() < 0.01) this.growing = true;
        if (random() < 0.01) this.growing = false;

        return false;
    }

    display() {
        fill(this.color);
        rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }
}