/**
 * This test checks if all the ascii characters of any character set are fully and uniquely represented,
 * based on a quantized brightness value.
 */

let sketchFramebuffer;
let grid;
let characterSet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    sketchFramebuffer = createFramebuffer({ format: FLOAT });

    setAsciiOptions({ // These are the default options, you can change them as needed in preload(), setup() or draw()
        ascii: {
            renderMode: 'brightness',
            enabled: true,
            characters: characterSet,
            characterColorMode: 1,
        },
        common: {
            fontSize: 32,
        }
    });
}

function draw() {
    let startX = -p5asciify.grid.width / 2; // Calculate the starting position to center the grid
    let startY = -p5asciify.grid.height / 2;

    sketchFramebuffer.begin();
    background(0);

    // Draw the grid
    for (let i = 0; i < characterSet.length; i++) {
        let gridCol = i % p5asciify.grid.cols;
        let gridRow = Math.floor(i / p5asciify.grid.cols);

        // Calculate the quantized brightness value for each cell based on the character set length
        let brightness = i * (255 / characterSet.length) + (255 / (2 * characterSet.length));
        fill(brightness);
        stroke(255, 255, 0); // Yellow stroke around each cell
        rect(startX + gridCol * p5asciify.grid.cellWidth, startY + gridRow * p5asciify.grid.cellHeight, p5asciify.grid.cellWidth, p5asciify.grid.cellHeight);
    }

    noFill();
    stroke(255, 0, 0); // Red stroke around the whole grid
    rect(startX, startY, p5asciify.grid.width, p5asciify.grid.height);
    sketchFramebuffer.end();

    image(sketchFramebuffer, -windowWidth / 2, -windowHeight / 2);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}