// Define a variable to store the default `P5Asciifier` instance
let defaultAsciifier; 

// Define a variable to store the custom `P5Asciifier` instance
let customAsciifier; 

// Framebuffer the custom asciifier will asciify
let customFramebuffer; 

function setup() {
    setAttributes('antialias', false);
    createCanvas(windowWidth, windowHeight, WEBGL);
}

function setupAsciify() {
    // Fetch the default `P5Asciifier` instance provided by the library
    defaultAsciifier = p5asciify.asciifier();

    // Create a new asciifier instance and apply it to a custom framebuffer
    customFramebuffer = createFramebuffer();
    customAsciifier = p5asciify.add(customFramebuffer);

    // Set the font size for both asciifiers
    defaultAsciifier.fontSize(16);
    customAsciifier.fontSize(32);

    defaultAsciifier.renderers().get("brightness").update({
        enabled: true,
        characters: " .:-=+*#%@",
        characterColor: "#ffffff",
        characterColorMode: 'sampled',
        backgroundColor: "#000000",
        backgroundColorMode: 'fixed',
        invertMode: false,
        rotationAngle: 0
    });

    customAsciifier.renderers().get("brightness").update({
        enabled: true,
        characters: " .:oO@",
        characterColor: "#ffffff",
        characterColorMode: 'sampled',
        backgroundColor: "#000000",
        backgroundColorMode: 'fixed',
        invertMode: true,
        rotationAngle: 0
    });

    // Make the background of both asciifiers fully transparent.
    defaultAsciifier.background([0, 0, 0, 0]);
    customAsciifier.background([0, 0, 0, 0]);
}

function draw() {
    directionalLight(255, 255, 255, 0, 0, -1);

    // Draw anything on the custom framebuffer for the custom asciifier to asciify
    customFramebuffer.begin();
    clear();
    fill(255);
    rotateX(radians(frameCount * 3));
    rotateZ(radians(frameCount));
    box(400, 100, 100);
    customFramebuffer.end();

    // Draw anything on the canvas for the default asciifier to asciify
    clear();
    normalMaterial();
    rotateX(radians(frameCount * 3));
    rotateY(radians(frameCount));
    torus(150, 100);
}

function drawAsciify() {
    background(0); // Set the background to black, removing everything previously drawn

    // Draw both asciifier textures on top of each other
    image(defaultAsciifier.texture, -width / 2, -height / 2);
    image(customAsciifier.texture, -width / 2, -height / 2);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}