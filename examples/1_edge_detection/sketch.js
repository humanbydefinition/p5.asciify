/**
 * This example demonstrates how to use the edge detection feature of p5.asciify.
 *
 * The example creates a sketch that displays a number of rectangles that grow and shrink over time.
 * Each rectangle is displayed with a random color and angle.
 */

let sketchFramebuffer;

let rectangles = [];
let maxRectangles = 30;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    sketchFramebuffer = createFramebuffer({ format: FLOAT });

    setAsciifyFontSize(8);

    for (let i = 0; i < maxRectangles; i++) rectangles.push(new Rectangle());

    setAsciifyPostSetupFunction(() => {
        p5asciify.rendererManager.renderers[3].updateOptions({
            enabled: true,
            characters: "-/|\\-/|\\",
            characterColor: "#ffffff",
            characterColorMode: 1,
            backgroundColor: "#000000",
            backgroundColorMode: 1,
            invertMode: false,
            sobelThreshold: 0.01,
            sampleThreshold: 16,
        });
    });
}

function draw() {
    sketchFramebuffer.begin();

    background(0);
    noStroke();

    rectangles = rectangles.filter((rect) => {
        rect.update();
        rect.display();
        return rect.size > 0;
    });

    while (rectangles.length < maxRectangles) rectangles.push(new Rectangle());

    sketchFramebuffer.end();

    image(sketchFramebuffer, -windowWidth / 2, -windowHeight / 2);
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
        this.angle = random(TWO_PI);
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
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        fill(this.color);
        rect(-this.size / 2, -this.size / 2, this.size, this.size);
        pop();
    }
}