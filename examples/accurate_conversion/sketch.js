let sketchFramebuffer;

let img;

const renderModes = ['accurate', 'brightness'];
let currentModeIndex = 0;
let renderMode = renderModes[currentModeIndex];

function preload() {
    img = loadImage('brutalist-high-rise-building.jpeg'); // forgot where it's from, but definitely CC0
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    sketchFramebuffer = createFramebuffer({ format: FLOAT });

    setAsciifyPostSetupFunction(() => {
        p5asciify.rendererManager.renderers[0].updateOptions({
            enabled: false,
        });

        p5asciify.rendererManager.renderers[1].updateOptions({
            enabled: true,
            characters: ` .‼╨\`',-_ú:░+;╘╙╤╥!"/=\^i~±âñ◘─├┬┴()*<>l|ÖÜèë←↑→↓♪?fr{}°²¶ÄÅÆÉíüƒΘΦφⁿ₧∙∞┌┘╒╓╪╫■□♀LT[]cjptvxzÑ∟7qyä│┤║╕╖╡╢╣Feo«»½απ↨≤≥╗☼1au•↔4CIYZks┼╔╚╞╟╩▄█▌▐$3gn£à▬◙%2EJSmw¡ª¼↕≈╜╝▲►◄♂59hå♠♦PVXbd¥6@GKç♣8ADOUÇáéó▀▒♫ê⌂#0HR§ºBQ═╠╦╬¢¬µ¿ï÷⌐&MNW♥ìîτ└▼ε∩╧▓☺☻ÿùûòöæô≡ßΓΣσ⌠⌡┐╛○·Ωδ√`,
            renderMode: renderMode,
            characterColorMode: 0,
            backgroundColorMode: 0,
        });
    });
}

function draw() {
    background(0);
    image(img, -windowWidth / 2, -windowHeight / 2);

    push();
    translate(100, 0, 0);
    fill(255);
    rotateX(radians(frameCount * 3));
    rotateZ(radians(frameCount));
    directionalLight(255, 255, 255, 0, 0, -1);
    box(600, 80, 80);
    pop();

    /**
    
    if (frameCount % 120 === 0) {
        currentModeIndex = (currentModeIndex + 1) % renderModes.length;
        renderMode = renderModes[currentModeIndex];
        setAsciiOptions({ ascii: { renderMode } });

        // If renderMode is 'brightness', set backgroundColorMode to 1
        if (renderMode === 'brightness') {
            setAsciiOptions({ ascii: { backgroundColorMode: 1 } });
        } else {
            setAsciiOptions({ ascii: { backgroundColorMode: 0 } });
        }
    }

    **/
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}