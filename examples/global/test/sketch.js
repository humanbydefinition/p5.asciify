
let permissionGranted = false;
let cx, cy;
let capture;

function setup() {
    setAttributes("antialias", false);
    pixelDensity(1);
    createCanvas(windowWidth, windowHeight, WEBGL);

    cx = width / 2;
    cy = height / 2;
    capture = createCapture(VIDEO);
    capture.hide();
    // DeviceOrientationEvent, DeviceMotionEvent
    if (typeof (DeviceOrientationEvent) !== 'undefined' && typeof (DeviceOrientationEvent.requestPermission) === 'function') {
        // ios 13 device

        DeviceOrientationEvent.requestPermission()
            .catch(() => {
                // show permission dialog only the first time
                let button = createButton("click to allow access to sensors");
                button.style("font-size", "24px");
                button.center();
                button.mousePressed(requestAccess);
                throw error;
            })
            .then(() => {
                // on any subsequent visits
                permissionGranted = true;
            })
    } else {
        // non ios 13 device
        textSize(48);
        // text("non ios 13 device", 100, 100);
        permissionGranted = true;
    }
}

// Set up stuff relevant to p5.asciify here
// This function is called automatically after `setup()`
function setupAsciify() {
    // Fetch the default `P5Asciifier` instance
    asciifier = p5asciify.asciifier();

    // Fetch the pre-defined "brightness" and "edge" renderers
    brightnessRenderer = asciifier.renderers().get("brightness");
    edgeRenderer = asciifier.renderers().get("edge");

    // Update the font to use
    //asciifier.font(font);

    // Update the font size
    asciifier.fontSize(16);

    // Update the pre-defined `brightness` renderer
    brightnessRenderer.update({
        enabled: true,
        characters: " .:-=+*%@#",
        characterColor: "#ffffff",
        characterColorMode: "sampled", // or "fixed"
        backgroundColor: "#000000",
        backgroundColorMode: "fixed", // or "sampled"
        invertMode: true, // swap char and bg colors
        rotationAngle: 0, // rotation angle in degrees
        flipVertically: false,
        flipHorizontally: false,
    });

    edgeRenderer.update({
        enabled: true,
        characters: "-/|\\-/|\\", // should be 8 characters long
        characterColor: "#ffffff",
        characterColorMode: "fixed",//sampled"
        backgroundColor: "#000000",
        backgroundColorMode: "fixed", // or "sampled"
        invertMode: false, // swap char and bg colors
        rotationAngle: 0, // rotation angle in degrees
        flipVertically: false,
        flipHorizontally: false,
        sampleThreshhold: 16, // sample threshold for edge detection
        sobelThreshold: 0.5, // sobel threshold for edge detection
    });
}

function requestAccess() {
    DeviceOrientationEvent.requestPermission()
        .then(response => {
            if (response == 'granted') {
                permissionGranted = true;
            } else {
                permissionGranted = false;
            }
        })
        .catch(console.error);

    this.remove();
}

function draw() {
    if (!permissionGranted) return;

    background(0);

    push();
    noFill();
    rotateY(frameCount * 0.005);
    rotateX(rotationX * 0.1);
    rotateZ(rotationY * 0.1);

    strokeWeight(4);
    stroke(255);
    let s = (1 + sin(frameCount * 0.02) * 0.2);
    scale(s);
    box(Math.max(width, height) * 0.4);
    rotateY(PI / 3);

    pop();

    push();
    texture(capture);
    //normalMaterial();
    // rotationX, rotationY
    const dx = constrain(rotationY, -3, 3);
    const dy = constrain(rotationX, -3, 3);
    cx += dx * 10;
    cy += dy * 10;
    cx = constrain(cx, 0, width);
    cy = constrain(cy, 0, height);
    translate(cx - width / 2, cy - height / 2, 0)
    rotateY(cy / 100)
    //rotateX(cx)
    strokeWeight(4);
    stroke(255);
    rotateZ(frameCount * 0.003)
    box(Math.max(width, height) * 0.2);
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    cx = width / 2;
    cy = height / 2;
}