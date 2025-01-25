import p5 from 'p5';
import { p5asciify } from '../../src/lib/index';

const sketch = (p) => {
    let img;

    const renderModes = ['accurate', 'brightness'];
    let currentModeIndex = 0;
    let renderMode = renderModes[currentModeIndex];

    p5asciify.instance(p);

    p.preload = () => {
        img = p.loadImage('brutalist-high-rise-building.jpeg');
    };

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    };

    p.setupAsciify = () => {
        p5asciify.renderers().get("brightness").update({
            enabled: false,
        });

        p5asciify.renderers().get("accurate").update({
            enabled: true,
            characters: ` .‼╨\`',-_ú:░+;╘╙╤╥!"/=\^i~±âñ◘─├┬┴()*<>l|ÖÜèë←↑→↓♪?fr{}°²¶ÄÅÆÉíüƒΘΦφⁿ₧∙∞┌┘╒╓╪╫■□♀LT[]cjptvxzÑ∟7qyä│┤║╕╖╡╢╣Feo«»½απ↨≤≥╗☼1au•↔4CIYZks┼╔╚╞╟╩▄█▌▐$3gn£à▬◙%2EJSmw¡ª¼↕≈╜╝▲►◄♂59hå♠♦PVXbd¥6@GKç♣8ADOUÇáéó▀▒♫ê⌂#0HR§ºBQ═╠╦╬¢¬µ¿ï÷⌐&MNW♥ìîτ└▼ε∩╧▓☺☻ÿùûòöæô≡ßΓΣσ⌠⌡┐╛○·Ωδ√`,
            characterColorMode: "sampled",
            backgroundColorMode: "sampled",
        });
    };

    p.draw = () => {
        p.background(0);
        p.image(img, -p.windowWidth / 2, -p.windowHeight / 2);

        p.push();
        p.translate(100, 0, 0);
        p.fill(255);
        p.rotateX(p.radians(p.frameCount * 3));
        p.rotateZ(p.radians(p.frameCount));
        p.directionalLight(255, 255, 255, 0, 0, -1);
        p.box(600, 80, 80);
        p.pop();
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
};

const myp5 = new p5(sketch);