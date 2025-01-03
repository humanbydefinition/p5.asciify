/**
 * This is a basic example of how to use the p5.asciify library, updating ascii options and font dynamically.
 * It renders a rotating 3D box into an ASCII representation.
 */

let sketchFramebuffer;

function preload() {
	//Optionally load a custom font to use for the ASCII characters.
	//loadAsciiFont('path/to/your/font.ttf');
}

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
	});
}

function draw() {
	/**
	  Your creative code goes here to replace the following code, drawing to the graphic buffer.
	  Currently, the code draws a Tim Rodenbroeker-esque rotating 3D box to the graphic buffer.
	  Check out his courses on creative coding at https://timrodenbroeker.de/ (no affiliation, I just enjoyed his courses)
	  **/
	sketchFramebuffer.begin();
	clear();
	background(0);
	fill(255);
	rotateX(radians(frameCount * 3));
	rotateZ(radians(frameCount));
	directionalLight(255, 255, 255, 0, 0, -1);
	box(800, 100, 100);

	sketchFramebuffer.end();

	image(sketchFramebuffer, -windowWidth / 2, -windowHeight / 2);

	if (frameCount == 200) {
		// Update the ascii rendering based on any conditions you like
		//loadAsciiFont('path/to/your/font.ttf'); // Optionally update the font after the sketch has run for a while
		/**
			setAsciiOptions({ // Optionally update any of the default options
				common: {
					fontSize: 16
				},
				edge: {
					enabled: true // Edge detection anyone?
				}
			});
			*/
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}