/**
 * @author humanbydefinition <hello@humanbydefinition.dev>
 * @version 1.0.0
 * @date Nov 2024
 * 
 * This sketch demonstrates how to use p5.asciify with custom shaders 
 * and the `custom` rendering mode to create fine-grained ascii art animations.
 * 
 * Simplified version of 
 * - ASCIISHIFT8 (https://www.fxhash.xyz/generative/slug/asciishift8)
 * - ASCIILꚘPS (https://objkt.com/collections/KT1FYXgQ4BZZfE7stqkWcRzMHxYkAU7pN97r)
 */

import p5 from 'p5';
import { p5asciify } from '../../src/lib/index';
import { RectangleManager } from './RectangleManager';

const sketch = (p) => {
	// Define the charset to be used in the ascii renderer
	let charset = "╧▓○⌐εæ▒╒╓¬└÷╨▀■≈";

	// Define a color palette to be used in the ascii renderer
	// If there is a mismatch between the charset length and the color palette length, the colors will be repeated or not used
	let colorPalette = [ // PICO-8 Palette (without #000000)
		"#1D2B53", "#7E2553", "#008751",
		"#AB5236", "#5F574F", "#C2C3C7", "#FFF1E8",
		"#FF004D", "#FFA300", "#FFEC27", "#00E436",
		"#29ADFF", "#83769C", "#FF77A8", "#FFCCAA"
	];

	let seed = "p5.asciify"; // Seed for random number generation

	// The custom ascii renderer's framebuffers
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

	p5asciify.instance(p);

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

		// Initialize and fill framebuffers
		colorPaletteFramebuffer = p.createFramebuffer({
			density: 1,
			width: colorPalette.length,
			height: 1,
			depthFormat: p.UNSIGNED_INT,
			textureFiltering: p.NEAREST
		});

		charsetColorPaletteFramebuffer = p.createFramebuffer({
			density: 1,
			width: charset.length,
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

		
	};

	p.setupAsciify = () => {
		p5asciify.fontSize(16);

		primaryColorSampleFramebuffer = p5asciify.renderers().get("custom").primaryColorFramebuffer;
		secondaryColorSampleFramebuffer = p5asciify.renderers().get("custom").secondaryColorFramebuffer;
		asciiCharacterFramebuffer = p5asciify.renderers().get("custom").characterFramebuffer;

		p5asciify.borderColor = p.color(0);
		p5asciify.renderers().get("custom").update({ enabled: true });

		charsetColorPalette = p5asciify.fontTextureAtlas.getCharsetColorArray(charset);
		charsetColorPaletteFramebuffer.loadPixels();
		for (let i = 0; i < charset.length; i++) {
			let c = charsetColorPalette[i];
			charsetColorPaletteFramebuffer.pixels[i * 4] = p.red(c);
			charsetColorPaletteFramebuffer.pixels[i * 4 + 1] = p.green(c);
			charsetColorPaletteFramebuffer.pixels[i * 4 + 2] = p.blue(c);
			charsetColorPaletteFramebuffer.pixels[i * 4 + 3] = p.alpha(c);
		}
		charsetColorPaletteFramebuffer.updatePixels();

		// Initialize framebuffers
		noiseFramebuffer = p.createFramebuffer({
			density: 1,
			width: p5asciify.grid.cols,
			height: p5asciify.grid.rows,
			depthFormat: p.UNSIGNED_INT,
			textureFiltering: p.NEAREST
		});

		shiftFramebuffer = p.createFramebuffer({
			density: 1,
			width: p5asciify.grid.cols,
			height: p5asciify.grid.rows,
			depthFormat: p.UNSIGNED_INT,
			textureFiltering: p.NEAREST
		});

		previousPushFramebuffer = p.createFramebuffer({
			density: 1,
			width: p5asciify.grid.cols,
			height: p5asciify.grid.rows,
			depthFormat: p.UNSIGNED_INT,
			textureFiltering: p.NEAREST
		});

		nextPushFramebuffer = p.createFramebuffer({
			density: 1,
			width: p5asciify.grid.cols,
			height: p5asciify.grid.rows,
			depthFormat: p.UNSIGNED_INT,
			textureFiltering: p.NEAREST
		});

		rectangleManager = new RectangleManager(p, p5asciify.grid.cols, p5asciify.grid.rows, 3, 1, 16);
		rectangleManager.initializeRectangles();

		runNoiseShader(0);
	};

	const runNoiseShader = (frameCount) => {
		noiseFramebuffer.begin();
		p.clear();
		p.shader(noiseShader);
		noiseShader.setUniform('u_bins', charset.length);
		noiseShader.setUniform('u_dimensions', [p5asciify.grid.cols, p5asciify.grid.rows]);
		noiseShader.setUniform('u_frameCount', frameCount);
		p.rect(0, 0, p.width, p.height);
		noiseFramebuffer.end();
	};

	p.draw = () => {
		if (p.frameCount % (Math.max(p5asciify.grid.cols, p5asciify.grid.rows)) === 0) {
			rectangleManager.initializeRectangles();
			runNoiseShader(p.frameCount);
		}

		shiftFramebuffer.begin(); // Create the texture based on the given rectangles, defining the direction each pixel should move
		p.clear();
		p.shader(shiftShader);
		shiftShader.setUniform('u_resolution', [p5asciify.grid.cols, p5asciify.grid.rows]);
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
		pushShader.setUniform('u_resolution', [p5asciify.grid.cols, p5asciify.grid.rows]);
		pushShader.setUniform('u_shiftMapTexture', shiftFramebuffer); // Shift map texture is used to determine the direction of the push
		pushShader.setUniform('u_noiseTexture', noiseFramebuffer); // Noise texture is used on the boundary
		pushShader.setUniform('u_previousFrameTexture', previousPushFramebuffer); // Previous frame texture is used on the rest
		p.rect(0, 0, p.width, p.height);
		nextPushFramebuffer.end();

		asciiCharacterFramebuffer.begin(); // Translate the pushShader's pixels into our ascii character colors for p5.asciify to render
		p.clear();
		p.shader(asciiCharacterShader);
		asciiCharacterShader.setUniform('u_textureSize', [p5asciify.grid.cols, p5asciify.grid.rows]);
		asciiCharacterShader.setUniform('u_pushFramebuffer', nextPushFramebuffer);
		asciiCharacterShader.setUniform('u_charPaletteTexture', charsetColorPaletteFramebuffer);
		asciiCharacterShader.setUniform('u_charPaletteSize', [charsetColorPaletteFramebuffer.width, charsetColorPaletteFramebuffer.height]);
		p.rect(0, 0, p.width, p.height);

		asciiCharacterFramebuffer.end();

		primaryColorSampleFramebuffer.begin(); // Translate the pushShader's pixels into our color palette for p5.asciify to render
		p.clear();
		p.shader(asciiColorPaletteShader);
		asciiColorPaletteShader.setUniform('u_textureSize', [p5asciify.grid.cols, p5asciify.grid.rows]);
		asciiColorPaletteShader.setUniform('u_pushFramebuffer', nextPushFramebuffer);
		asciiColorPaletteShader.setUniform('u_colorPaletteTexture', colorPaletteFramebuffer);
		asciiColorPaletteShader.setUniform('u_paletteSize', [colorPalette.length, 1]);
		p.rect(0, 0, p.width, p.height);
		primaryColorSampleFramebuffer.end();

		secondaryColorSampleFramebuffer.begin(); // Not used in this sketch
		p.clear();
		p.background(0);
		secondaryColorSampleFramebuffer.end();

		/* Since we are using the custom renderer, we don't need to draw anything on the canvas. */

		// If we disable the ascii renderer and uncomment the following lines, 
		// you can display any of the framebuffers on the canvas for debugging purposes
		//p.clear();
		//p.image(primaryColorSampleFramebuffer, -width / 2, -height / 2, width, height); // Display the shift texture
	};

	p.windowResized = () => {
		p.resizeCanvas(p.windowWidth, p.windowHeight);

		noiseFramebuffer.resize(p5asciify.grid.cols, p5asciify.grid.rows);
		shiftFramebuffer.resize(p5asciify.grid.cols, p5asciify.grid.rows);
		previousPushFramebuffer.resize(p5asciify.grid.cols, p5asciify.grid.rows);
		nextPushFramebuffer.resize(p5asciify.grid.cols, p5asciify.grid.rows);

		p.randomSeed(seed);
		p.noiseSeed(seed);

		rectangleManager.updateGridDimensions(p5asciify.grid.cols, p5asciify.grid.rows);
		rectangleManager.initializeRectangles();

		runNoiseShader(0);
	};
};

const myp5 = new p5(sketch);