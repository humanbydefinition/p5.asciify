let sketchFramebuffer;

function preload() {
	/**
	 * Optionally load a custom font to use for the ASCII characters.
	 * The preload() function is mandatory for using this library, but it can be left empty if no assets need to be loaded
	 */
	//loadAsciiFont('path/to/your/font.ttf');
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL); // Feel free to use any renderer you like, as long as the result is drawn to the canvas

	sketchFramebuffer = createFramebuffer({ format: FLOAT });

	P5Asciify.setDefaultOptions({ // These are the default options, you can change them as needed in setup() or draw()
		enabled: true,
		characters: ' .:-=+*#%@',
		fontSize: 32,
		characterColor: "#ff0000",
		characterColorMode: 0,
		backgroundColor: "#000000",
		backgroundColorMode: 1,
		invertMode: true,
	});
}

function draw() {

	/**
	Your creative code goes here to replace the following code, drawing to the graphic buffer.
	Currently, the code draws a Tim Rodenbroeker-esque rotating 3D box to the graphic buffer.
	Check out his courses on creative coding at https://timrodenbroeker.de/ (no affiliation, I just enjoyed his courses)
	**/
	sketchFramebuffer.begin();
	background(0);
	fill(255);

	push();
	rotateX(radians(frameCount * 3));
	rotateZ(radians(frameCount));
	directionalLight(255, 255, 255, 0, 0, -1);
	box(800, 100, 100);
	pop();
	sketchFramebuffer.end();

	background(0);
	image(sketchFramebuffer, -windowWidth / 2, -windowHeight / 2);

	if (frameCount == 200) { // Update the ascii rendering based on any conditions you like

		//updateAsciiFont('path/to/your/font.ttf'); // Optionally update the font after the sketch has run for a while

		/**
		P5Asciify.setDefaultOptions({ // Optionally update any of the default options
			fontSize: 8,
			invertMode: false,
		});
		**/
	}

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

