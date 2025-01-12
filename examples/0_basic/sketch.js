import p5 from 'p5';
import p5asciify from '../../src/lib/index';

const sketch = (p) => {
	let sketchFramebuffer;

	p5asciify.instance(p); // Initialize p5asciify with the p5 instance

	p.preload = () => {
		//Optionally load a custom font
		//p.loadAsciiFont('path/to/your/font.ttf');
	};

	p.setup = () => {
		p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

		sketchFramebuffer = p.createFramebuffer({ format: p.FLOAT });

		p.setAsciifyPostSetupFunction(() => {
			p5asciify.rendererManager.renderers[0].updateOptions({
				enabled: true,
				characters: " .:-=+*#%@",
				characterColor: "#ff0000",
				characterColorMode: 0,
				backgroundColor: "#000000",
				backgroundColorMode: 1,
				invertMode: true,
			});
		});
	};

	p.draw = () => {
		sketchFramebuffer.begin();
		p.clear();
		p.background(0);
		p.fill(255);
		p.rotateX(p.radians(p.frameCount * 3));
		p.rotateZ(p.radians(p.frameCount));
		p.directionalLight(255, 255, 255, 0, 0, -1);
		p.box(800, 100, 100);
		sketchFramebuffer.end();

		p.image(sketchFramebuffer, -p.windowWidth / 2, -p.windowHeight / 2);
	};

	p.windowResized = () => {
		p.resizeCanvas(p.windowWidth, p.windowHeight);
	};
};

const myp5 = new p5(sketch);