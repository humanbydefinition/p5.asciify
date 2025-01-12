import p5 from 'p5';
import p5asciify from '../../src/lib/index';

const sketch = (p) => {
	let sketchFramebuffer;

	p5asciify.instance(p);

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

			p5asciify.rendererManager.renderers[3].updateOptions({
				enabled: true,
				invertMode: true
			});

			p5asciify.rendererManager.textAsciiRenderer.options.enabled = true;
			p5asciify.rendererManager.textAsciiRenderer.toggleVisibility();
		});
	};

	p.draw = () => {
		sketchFramebuffer.begin();

		p.background(0);
		p.fill(255);
		p.rotateX(p.radians(p.frameCount * 3));
		p.rotateZ(p.radians(p.frameCount));
		p.directionalLight(255, 255, 255, 0, 0, -1);
		p.box(800, 100, 100);

		sketchFramebuffer.end();

		p.image(sketchFramebuffer, -p.windowWidth / 2, -p.windowHeight / 2);

		if (p.frameCount == 100) {
			p5asciify.rendererManager.textAsciiRenderer.invertMode = true;
			p5asciify.rendererManager.textAsciiRenderer.updateOptions({
				invertMode: true
			});
		}

		if (p.frameCount == 200) {
			p5asciify.rendererManager.textAsciiRenderer.updateOptions({
				characterColorMode: 1
			});
		}

		if (p.frameCount == 300) {
			p5asciify.rendererManager.textAsciiRenderer.updateOptions({
				characterColor: "#FF0000"
			});
		}

		if (p.frameCount == 400) {
			p5asciify.rendererManager.textAsciiRenderer.updateOptions({
				backgroundColor: "#0000FF"
			});
		}

		if (p.frameCount == 500) {
			p.setAsciifyFontSize(32);
		}
	};

	p.windowResized = () => {
		p.resizeCanvas(p.windowWidth, p.windowHeight);
	};
};

const myp5 = new p5(sketch);