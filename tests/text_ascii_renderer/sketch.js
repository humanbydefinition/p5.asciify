let sketchFramebuffer;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL); // WebGL mode is required currently

	sketchFramebuffer = createFramebuffer({ format: FLOAT });

	setAsciiOptions({
		// These are the default options, you can change them as needed in preload(), setup() or draw()
		common: {
			fontSize: 16,
		},
		ascii: {
			renderMode: 'brightness',
			enabled: true,
			characters: " .:-=+*#%@",
			characterColor: "#ff0000",
			characterColorMode: 0,
			backgroundColor: "#000000",
			backgroundColorMode: 1,
			invertMode: true,
		},
		edge: {
			enabled: true,
			invertMode: true
		},
		text: {
			enabled: true,
		}
	});

	setAsciifyPostSetupFunction(() => {
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

	

	/**

	if (frameCount == 100) {
		setAsciiOptions({
			text: {
				invertMode: true,
			}
		})
	}

	if (frameCount == 200) {
		setAsciiOptions({
			text: {
				characterColorMode: 1,
			}
		})
	}

	if (frameCount == 300) {
		setAsciiOptions({
			text: {
				characterColor: "#FF0000"
			}
		})
	}

	if (frameCount == 400) {
		setAsciiOptions({
			text: {
				backgroundColor: "#0000FF"
			}
		})
	}

	if (frameCount == 500) {
		setAsciiOptions({
			common: 
			{
				fontSize: 32,
			}
		})
	}

	**/

	
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}