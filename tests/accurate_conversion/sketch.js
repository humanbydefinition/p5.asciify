/**
 * This test checks if all the effects can be applied and modified without causing any errors.
 */

let sketchFramebuffer;

let img;

function preload() {
    img = loadImage('brutalist-high-rise-building.jpeg'); // forgot where it's from, but definitely CC0
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    sketchFramebuffer = createFramebuffer({ format: FLOAT });

    setAsciiOptions({ 
        common: {
            fontSize: 8,
        },
        ascii: {
            enabled: true,
            // All characters available in the default font `UrsaFont` provided by the library
            characters: ` .‼╨\`',-_ú:░+;╘╙╤╥!"/=\^i~±âñ◘─├┬┴()*<>l|ÖÜèë←↑→↓♪?fr{}°²¶ÄÅÆÉíüƒΘΦφⁿ₧∙∞┌┘╒╓╪╫■□♀LT[]cjptvxzÑ∟7qyä│┤║╕╖╡╢╣Feo«»½απ↨≤≥╗☼1au•↔4CIYZks┼╔╚╞╟╩▄█▌▐$3gn£à▬◙%2EJSmw¡ª¼↕≈╜╝▲►◄♂59hå♠♦PVXbd¥6@GKç♣8ADOUÇáéó▀▒♫ê⌂#0HR§ºBQ═╠╦╬¢¬µ¿ï÷⌐&MNW♥ìîτ└▼ε∩╧▓☺☻ÿùûòöæô≡ßΓΣσ⌠⌡┐╛○·Ωδ√`,
            renderMode: 'accurate',
            characterColorMode: 0,
            backgroundColorMode: 0,
        },
    });
}

function draw() {
    sketchFramebuffer.begin();

    background(0);
    
    push();
    translate(100, 0, 0);
	fill(255);
	rotateX(radians(frameCount * 3));
	rotateZ(radians(frameCount));
	directionalLight(255, 255, 255, 0, 0, -1);
	box(600, 80, 80);
    pop();

    image(img, -windowWidth / 2, -windowHeight / 2);
    sketchFramebuffer.end();

    image(sketchFramebuffer, -windowWidth / 2, -windowHeight / 2);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}