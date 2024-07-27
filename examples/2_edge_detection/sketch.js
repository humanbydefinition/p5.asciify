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
            fontSize: 16,
        },
        brightness: {
            enabled: true,
            characters: "0123456789",
            characterColor: "#ffffff",
            characterColorMode: 0,
            backgroundColor: "#000000",
            backgroundColorMode: 1,
            invertMode: false,
        },
        edge: {
            enabled: true,
            characters: "-/|\\-/|\\",
            characterColor: '#ffffff',
            characterColorMode: 1,
            backgroundColor: '#000000',
            backgroundColorMode: 1,
            invertMode: false,
            sobelThreshold: 0.01,
            sampleThreshold: 16,
        }
    });

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