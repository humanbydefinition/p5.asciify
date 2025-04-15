/**
 * @name 03_custom2D
 * @description Advanced example applying a custom 2D renderer to a p5.js canvas with p5.asciify utilizing custom shaders.
 * @author humanbydefinition
 * @link https://github.com/humanbydefinition/p5.asciify
 * 
 * This example demonstrates how to apply the pre-defined `'custom2D'` renderer to a p5.js canvas.
 * A custom 2D renderer is used to apply custom logic to the ascii grid using custom shaders.
 * 
 * Simplified version of 'ASCIISHIFT8'.
 * Minted via fx(hash): https://www.fxhash.xyz/generative/slug/asciishift8
 */

import p5 from 'p5';
import { p5asciify } from '../../src/lib/index';
import { RectangleManager } from './RectangleManager';

const sketch = (p) => {

	let asciifier; // Define the `asciifier` variable to store the `P5Asciifier` instance

	// Define a color palette to be used in the ascii renderer
	// If there is a mismatch between the charset length and the color palette length, the colors will be repeated or not used
	let colorPalette = [ // Grayscale palette
		"#181818", "#282828", "#383838",
		"#474747", "#565656", "#646464", "#717171",
		"#7e7e7e", "#8c8c8c", "#9b9b9b", "#ababab",
		"#bdbdbd", "#d1d1d1", "#e7e7e7", "#ffffff"
	];

	let seed = "p5.asciify"; // Seed for random number generation

	// The 'custom2D' ascii renderer's framebuffers we'll fetch in `setupAsciify()`
	let primaryColorSampleFramebuffer;
	let secondaryColorSampleFramebuffer;
	let asciiCharacterFramebuffer;

	let rectangleManager;
	let charsetColorPalette = [];
	let charsetColorPaletteFramebuffer;
	let colorPaletteFramebuffer;

	// Shader variables
	let noiseShader, shiftShader, pushShader;
	let asciiCharacterShader, asciiColorPaletteShader;
	let noiseFramebuffer, shiftFramebuffer;
	let previousPushFramebuffer, nextPushFramebuffer;

	p.preload = () => {
		// Relevant to the sketch, independent of p5.asciify
		noiseShader = p.loadShader('shaders/shader.vert', 'shaders/sketch/noise.frag');
		shiftShader = p.loadShader('shaders/shader.vert', 'shaders/sketch/shift.frag');
		pushShader = p.loadShader('shaders/shader.vert', 'shaders/sketch/push.frag');

		// Relevant to p5.asciify, translating the pushShader's pixels
		asciiCharacterShader = p.loadShader('shaders/shader.vert', 'shaders/asciifyTranslation/asciiCharacter.frag');
		asciiColorPaletteShader = p.loadShader('shaders/shader.vert', 'shaders/asciifyTranslation/asciiColorPalette.frag');
	};

	p.setup = () => {
		p.randomSeed(seed);
		p.noiseSeed(seed);

		p.setAttributes('antialias', false);
		p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
	};

	// After `p5.asciify` is set up in the background after `setup()`,
	// we can call `setupAsciify()` to configure `p5asciify` and it's `P5Asciifier` instances and rendering pipelines
	p.setupAsciify = () => {
		// Fetch the default `P5Asciifier` instance provided by the library
		asciifier = p5asciify.asciifier();

		// Initialize and fill the color palette framebuffer
		colorPaletteFramebuffer = p.createFramebuffer({
			density: 1,
			width: colorPalette.length,
			height: 1,
			depthFormat: p.UNSIGNED_INT,
			textureFiltering: p.NEAREST
		});
		colorPaletteFramebuffer.loadPixels();
		for (let i = 0; i < colorPalette.length; i++) {
			let c = p.color(colorPalette[i]);
			colorPaletteFramebuffer.pixels[i * 4] = p.red(c);
			colorPaletteFramebuffer.pixels[i * 4 + 1] = p.green(c);
			colorPaletteFramebuffer.pixels[i * 4 + 2] = p.blue(c);
			colorPaletteFramebuffer.pixels[i * 4 + 3] = p.alpha(c);
		}
		colorPaletteFramebuffer.updatePixels();

		// Initialize and fill the charset color palette framebuffer
		charsetColorPaletteFramebuffer = p.createFramebuffer({
			density: 1,
			width: asciifier.fontManager.characters.length,
			height: 1,
			depthFormat: p.UNSIGNED_INT,
			textureFiltering: p.NEAREST
		});

		// Fetch the colors that correspond to each character in the font and fill the framebuffer
		charsetColorPalette = asciifier.fontManager.glyphColors(asciifier.fontManager.characters);
		charsetColorPaletteFramebuffer.loadPixels();
		for (let i = 0; i < asciifier.fontManager.characters.length; i++) {
			let c = charsetColorPalette[i];
			charsetColorPaletteFramebuffer.pixels[i * 4] = p.red(c);
			charsetColorPaletteFramebuffer.pixels[i * 4 + 1] = p.green(c);
			charsetColorPaletteFramebuffer.pixels[i * 4 + 2] = p.blue(c);
			charsetColorPaletteFramebuffer.pixels[i * 4 + 3] = p.alpha(c);
		}
		charsetColorPaletteFramebuffer.updatePixels();

		asciifier.fontSize(16); // Set the font size to 16 for the `P5Asciifier` instance

		// Fetch the framebuffers from the custom ascii renderer to apply custom logic on.
		// Each pixel within these framebuffers represents a property within the ascii grid at a given position.
		primaryColorSampleFramebuffer = asciifier.renderers().get("custom2D").primaryColorFramebuffer;
		secondaryColorSampleFramebuffer = asciifier.renderers().get("custom2D").secondaryColorFramebuffer;
		asciiCharacterFramebuffer = asciifier.renderers().get("custom2D").characterFramebuffer;

		asciifier.renderers().disable(); // Disable the default renderers and enable the pre-defined 'custom2D' one
		asciifier.renderers().get("custom2D").enable();

		// Initialize sketch framebuffers with the same dimensions as the ascii grid
		noiseFramebuffer = p.createFramebuffer({
			density: 1,
			width: asciifier.grid.cols,
			height: asciifier.grid.rows,
			depthFormat: p.UNSIGNED_INT,
			textureFiltering: p.NEAREST
		});

		shiftFramebuffer = p.createFramebuffer({
			density: 1,
			width: asciifier.grid.cols,
			height: asciifier.grid.rows,
			depthFormat: p.UNSIGNED_INT,
			textureFiltering: p.NEAREST
		});

		previousPushFramebuffer = p.createFramebuffer({
			density: 1,
			width: asciifier.grid.cols,
			height: asciifier.grid.rows,
			depthFormat: p.UNSIGNED_INT,
			textureFiltering: p.NEAREST
		});

		nextPushFramebuffer = p.createFramebuffer({
			density: 1,
			width: asciifier.grid.cols,
			height: asciifier.grid.rows,
			depthFormat: p.UNSIGNED_INT,
			textureFiltering: p.NEAREST
		});

		rectangleManager = new RectangleManager(p, asciifier.grid.cols, asciifier.grid.rows, 3, 1, 16);
		rectangleManager.initializeRectangles();

		runNoiseShader(0);
	};

	const runNoiseShader = (frameCount) => {
		noiseFramebuffer.begin();
		p.clear();
		p.shader(noiseShader);
		noiseShader.setUniform('u_bins', asciifier.fontManager.characters.length);
		noiseShader.setUniform('u_dimensions', [asciifier.grid.cols, asciifier.grid.rows]);
		noiseShader.setUniform('u_frameCount', frameCount);
		p.rect(0, 0, p.width, p.height);
		noiseFramebuffer.end();
	};

	p.draw = () => {
		if (p.frameCount % (Math.max(asciifier.grid.cols, asciifier.grid.rows)) === 0) {
			rectangleManager.initializeRectangles();
			runNoiseShader(p.frameCount);
		}

		// Create the texture based on the given rectangles, defining the direction each pixel should move
		shiftFramebuffer.begin();
		p.clear();
		p.shader(shiftShader);
		shiftShader.setUniform('u_resolution', [asciifier.grid.cols, asciifier.grid.rows]);
		shiftShader.setUniform('u_frameCount', p.frameCount);

		// 8 random rectangles have a position and size, the others are passed as [0, 0, 0, 0] to the shader
		// Each rectangle defines a pattern of movement for the pixels in the given area
		rectangleManager.rectangles.forEach((rect, index) => {
			shiftShader.setUniform(`u_rect${index}`, [rect.x, rect.y, rect.width, rect.height]);
		});

		p.rect(0, 0, p.width, p.height);
		shiftFramebuffer.end();

		// Swap the previous and next push framebuffers
		[previousPushFramebuffer, nextPushFramebuffer] = [nextPushFramebuffer, previousPushFramebuffer];

		nextPushFramebuffer.begin(); // Push the pixels based on the shiftFramebuffer's output
		p.clear();
		p.shader(pushShader);
		pushShader.setUniform('u_resolution', [asciifier.grid.cols, asciifier.grid.rows]);
		pushShader.setUniform('u_shiftMapTexture', shiftFramebuffer); // Shift map texture is used to determine the direction of the push
		pushShader.setUniform('u_noiseTexture', noiseFramebuffer); // Noise texture is used on the boundary
		pushShader.setUniform('u_previousFrameTexture', previousPushFramebuffer); // Previous frame texture is used on the rest
		p.rect(0, 0, p.width, p.height);
		nextPushFramebuffer.end();

		// Translate the pushShader's pixels into our ascii character colors for p5.asciify to render
		asciiCharacterFramebuffer.begin();
		p.clear();
		p.shader(asciiCharacterShader);
		asciiCharacterShader.setUniform('u_textureSize', [asciifier.grid.cols, asciifier.grid.rows]);
		asciiCharacterShader.setUniform('u_pushFramebuffer', nextPushFramebuffer);
		asciiCharacterShader.setUniform('u_charPaletteTexture', charsetColorPaletteFramebuffer);
		asciiCharacterShader.setUniform('u_charPaletteSize', [charsetColorPaletteFramebuffer.width, charsetColorPaletteFramebuffer.height]);
		p.rect(0, 0, p.width, p.height);

		asciiCharacterFramebuffer.end();

		// Translate the pushShader's pixels into our color palette for p5.asciify to render
		primaryColorSampleFramebuffer.begin();
		p.clear();
		p.shader(asciiColorPaletteShader);
		asciiColorPaletteShader.setUniform('u_textureSize', [asciifier.grid.cols, asciifier.grid.rows]);
		asciiColorPaletteShader.setUniform('u_pushFramebuffer', nextPushFramebuffer);
		asciiColorPaletteShader.setUniform('u_colorPaletteTexture', colorPaletteFramebuffer);
		asciiColorPaletteShader.setUniform('u_paletteSize', [colorPalette.length, 1]);
		p.rect(0, 0, p.width, p.height);
		primaryColorSampleFramebuffer.end();

		// Simply make all the grid cell background colors black.
		secondaryColorSampleFramebuffer.begin();
		p.background(0);
		secondaryColorSampleFramebuffer.end();
	};

	// After the asciified content is drawn to the canvas, use `drawAsciify()` to draw on top of it
	p.drawAsciify = () => {
		const fpsText = "FPS:" + Math.min(Math.ceil(p.frameRate()), 60);

		p.noStroke();
		p.fill(0);
		p.rect(-p.width / 2, p.height / 2 - p.textAscent() - 4, p.textWidth(fpsText), p.textAscent());

		p.textFont(asciifier.fontManager.font);
		p.textSize(64);
		p.fill(255, 255, 0);
		p.text(fpsText, -p.width / 2, p.height / 2);
	};

	p.windowResized = () => {
		p.resizeCanvas(p.windowWidth, p.windowHeight);

		noiseFramebuffer.resize(asciifier.grid.cols, asciifier.grid.rows);
		shiftFramebuffer.resize(asciifier.grid.cols, asciifier.grid.rows);
		previousPushFramebuffer.resize(asciifier.grid.cols, asciifier.grid.rows);
		nextPushFramebuffer.resize(asciifier.grid.cols, asciifier.grid.rows);

		p.randomSeed(seed);
		p.noiseSeed(seed);

		rectangleManager.updateGridDimensions(asciifier.grid.cols, asciifier.grid.rows);
		rectangleManager.initializeRectangles();

		runNoiseShader(0);
	};
};

const myp5 = new p5(sketch);