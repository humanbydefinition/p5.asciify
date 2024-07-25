let sketchFramebuffer;

let grid;

let characterSet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL); // WebGL mode is required currently
    sketchFramebuffer = createFramebuffer({ format: FLOAT });

    setAsciiOptions({ // These are the default options, you can change them as needed in preload(), setup() or draw()
        enabled: true,
        characters: characterSet,
        fontSize: 32,
        characterColor: "#ffffff",
        characterColorMode: 1,
        backgroundColor: "#000000",
        backgroundColorMode: 1,
        invertMode: false,
    });

    grid = P5Asciify.grid;
}

function draw() {
    // Calculate the starting position to center the grid
    let startX = -grid.width / 2;
    let startY = -grid.height / 2;

    sketchFramebuffer.begin();
    background(0);

    // Draw the grid
    for (let i = 0; i < characterSet.length; i++) {
        let gridCol = i % grid.cols;
        let gridRow = Math.floor(i / grid.cols);

        // Calculate brightness from 0 to 255
        // TODO: Remove this and apply quantized brightness to the sketchFramebuffer
        let brightness = i * (255 / characterSet.length) + (255 / (2 * characterSet.length));
        fill(brightness);
        stroke(255, 255, 0); // Yellow color
        strokeWeight(1); // Thin stroke
        rect(startX + gridCol * grid.cellWidth, startY + gridRow * grid.cellHeight, grid.cellWidth, grid.cellHeight);
    }

    // Draw a red stroke around the grid
    stroke(255, 0, 0); // Red color
    noFill();
    rect(startX, startY, grid.width, grid.height);

    sketchFramebuffer.end();
    background(0);
    image(sketchFramebuffer, -windowWidth / 2, -windowHeight / 2);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}