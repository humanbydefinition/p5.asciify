let sketchFramebuffer;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL); // WebGL mode is required currently

	sketchFramebuffer = createFramebuffer({ format: FLOAT });

	setAsciifyPostSetupFunction(() => {

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
}

function draw() {
	sketchFramebuffer.begin();

	background(0);
	fill(255);
	rotateX(radians(frameCount * 3));
	rotateZ(radians(frameCount));
	directionalLight(255, 255, 255, 0, 0, -1);
	box(800, 100, 100);

	sketchFramebuffer.end();

	image(sketchFramebuffer, -windowWidth / 2, -windowHeight / 2);



	if (frameCount == 100) {

		p5asciify.rendererManager.textAsciiRenderer.invertMode = true;

		p5asciify.rendererManager.textAsciiRenderer.updateOptions({
			invertMode: true
		});
	}

	if (frameCount == 200) {

		p5asciify.rendererManager.textAsciiRenderer.updateOptions({
			characterColorMode: 1
		});
	}

	if (frameCount == 300) {
		p5asciify.rendererManager.textAsciiRenderer.updateOptions({
			characterColor: "#FF0000"
		});
	}

	if (frameCount == 400) {
		p5asciify.rendererManager.textAsciiRenderer.updateOptions({
			backgroundColor: "#0000FF"
		});
	}

	if (frameCount == 500) {
		setAsciifyFontSize(32);
	}


}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}