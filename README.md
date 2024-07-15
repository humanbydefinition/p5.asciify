# p5.asciify ( ͡° ͜ʖ ͡°)

![header](/repo_assets/p5.asciify.logo.gif)

`p5.asciify` is a [`p5.js`](https://github.com/processing/p5.js) addon library for converting the main drawing canvas into a grid of ASCII characters. 

*Special thanks to [`@davepagurek`](https://github.com/davepagurek) for helping me learn how to create a p5.js addon library! (✿◠‿◠)*

# Getting started
Download the latest version of p5.asciify from the [Releases]() page and embed `p5.asciify.js` or `p5.asciify.min.js` in your project's HTML file after importing the [`p5.js`](https://github.com/processing/p5.js) library, but before loading your sketch file.

```html
<!-- Import the p5.js library -->
<script src="p5.min.js"></script> 

<!-- Import the p5.asciify library -->
<!-- <script src="p5.asciify.js"></script> -->
<script src="p5.asciify.min.js"></script>

<!-- Load your sketch file -->
<script src="sketch.js"></script>
```

*Note: The unminified version of the library is useful for debugging purposes, containing some basic error handling and warnings. In a production environment when the sketch is final, it is recommended to use the minified version.*

At this point, the sketch to which the library has been added should already be converted to ASCII characters! 
(｡◕‿‿◕｡)  

**Important:** As of now, this addon library requires the sketch to contain a [`preload()`](https://p5js.org/reference/p5/preload/) function to work. This is because the library needs to load the default ascii font used for the ASCII conversion before the sketch starts, if none is provided by the user. You may leave the function completely empty if you don't need to load any assets.


To customize the ASCII conversion further, the library provides functionality which is described in the following [`Usage`](#usage) section.

# Usage

By default, when no font is provided by the user, [UrsaFont](https://ursafrank.itch.io/ursafont) by [UrsaFrank](https://www.stormrooster.com/) is used, which is an awesome textmode font, licensed under the [CC0 1.0 Universal License](https://creativecommons.org/publicdomain/zero/1.0/).

### Loading an ascii font
Similar to using [`loadFont(fontPath)`](https://p5js.org/reference/p5/loadFont/) inside the sketches [`preload()`](https://p5js.org/reference/p5/preload/) function, `loadAsciiFont(fontPath)` is used here aswell to load a custom font for the ASCII conversion. Similar to [`loadFont()`](https://p5js.org/reference/p5/loadFont/), the allowed font formats are `.ttf` and `.otf`.

```javascript
function preload() {
  loadAsciiFont('path/to/font.ttf');
}
```

Unlike [`loadFont()`](https://p5js.org/reference/p5/loadFont/), `loadAsciiFont()` does not have a return value, and is currently intended to be used like above.

For a list of free and awesome textmode/pixel fonts that have been tested to work well with the library, check out the [Resources](#resources) section. 

*Note: Feel free to use any font you like, but be aware that some fonts may not work well with the library, causing a bad ASCII conversion due to overlapping characters in the character texture.*


### Changing default options
The libraries `P5Asciify` class provides a static method `setDefaultOptions(options)` that can be called anywhere inside the sketches [`setup()`](https://p5js.org/reference/p5/setup/) function or [`draw()`](https://p5js.org/reference/p5/draw/) loop to change the default options used for the ASCII conversion. The options object passed to the method can contain one or more of the following properties:

- `enabled` (boolean): A boolean value indicating whether the ASCII conversion should be enabled. The default value is `true`.

- `characters` (string): A string containing the characters to be used for the ASCII conversion. The characters are used in order of appearance, with the first character representing the darkest pixel and the last character representing the lightest pixel. The default value is `0123456789`.

- `fontSize` (number): The size of the font used for the ASCII conversion. The default value is `16`. Allowed values range from `1` *L(° O °L)* to `512`. It is     recommended to use a font size that is a power of 2, such as 2, 4, 8, 16, 32, 64, etc.

- `characterColorMode` (number): The mode used for the color of the characters used for the ASCII conversion. The default value is `0` *(sampled)*. Allowed values are `0` *(sampled)* and `1` *(fixed)*.
    - `0` *(sampled)*: The color of a character is determined by sampling the central pixel of the cell it occupies on the canvas.
    - `1` *(fixed)*: The color of a character is determined by the `characterColor` property.

- `characterColor` (string): The color of the characters used for the ASCII conversion. The default value is `#ffffff`. Only used if the `characterColorMode` is set to `1` *(fixed)*.

- `backgroundColorMode` (number): The mode used for the color of the background of a cell, not covered by the character. The default value is `1` *(fixed)*. Allowed values are `0` *(sampled)* and `1` *(fixed)*.
    - `0` *(sampled)*: The color of a character is determined by sampling the central pixel of the cell it occupies on the canvas.
    - `1` *(fixed)*: The color of a character is determined by the `characterColor` property.

- `backgroundColor` (string): The color of the background of a cell, not covered by the character. The default value is `#000000`. Only used if the `backgroundColorMode` is set to `1` *(fixed)*.

- `invertMode` (boolean): A boolean value indicating whether the ASCII conversion should be inverted. The default value is `false`.

```javascript
// Can be called anywhere in the sketch 
// (any amount of parameters can be passed)
P5Asciify.setDefaultOptions({
    enabled: true,
	characters: '0123456789',
	fontSize: 32,
	characterColor: "#ff0000",
	characterColorMode: 1,
	backgroundColor: "#000000",
	backgroundColorMode: 1,
	invertMode: true
});
```


### Updating the ascii font
To update the font used for the ASCII conversion, call `updateAsciiFont(fontPath)` with the path to the new font file anywhere inside the sketches [`setup()`](https://p5js.org/reference/p5/setup/) function or [`draw()`](https://p5js.org/reference/p5/draw/) loop.

```javascript
let sketchFramebuffer;

function preload() {
	loadAsciiFont('UrsaFont.ttf');
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	sketchFramebuffer = createFramebuffer({ format: FLOAT });
}

function draw() {
	sketchFramebuffer.begin();
	background(0);
	fill(255);

    // Tim Rodenbroeker-esque rotating 3D box (⌐■_■)
    // https://timrodenbroeker.de/ (no affiliation)
	push(); 
	rotateX(radians(frameCount * 3));
	rotateZ(radians(frameCount));
	directionalLight(255, 255, 255, 0, 0, -1);
	box(800, 100, 100);
	pop();

	sketchFramebuffer.end();

    // Draw something on the main canvas for the library to pick up on
	background(0);
	image(sketchFramebuffer, -windowWidth / 2, -windowHeight / 2);

    // Update the asciify font based on any condition
	if (frameCount == 100) {
		updateAsciiFont("path/to/new/font.ttf");
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
```

### Resources
Besides the already awesome default font [`UrsaFont`](https://ursafrank.itch.io/ursafont) by [`UrsaFrank`](https://www.stormrooster.com/) which can be redistributed and modified under the [CC0 1.0 Universal License](https://creativecommons.org/publicdomain/zero/1.0/), here are some other free and awesome textmode/pixel fonts that have been tested to work well with the library:

| Font  | Description | 
| ------------- | ------------- |
| [C64 Pro Mono](https://style64.org/c64-truetype)  | Includes all 304 unique C64 glyphs.  |
| [DOS/V re. JPN12](https://int10h.org/oldschool-pc-fonts/fontlist/font?dos-v_re_jpn12)  | Japanese versions of IBM (PC-)DOS / MS-DOS.  |
| [Retromoticons](https://www.fontspace.com/retromoticons-font-f26602)  | Bitmap emoticon dingbat font containing 77 glyphs. |
| [og-emoji-font](https://github.com/notwaldorf/og-emoji-font)  | Based on the original DoCoMo emoji set, designed in 1999 by Shigetaka Kurita. |
| [pixelated-wingdings](https://fontstruct.com/fontstructions/show/1218140/pixelated-wingdings)  | Pixelated/8-bit version of the Wingdings font. |
| [FROGBLOCK-V2.1](https://polyducks.itch.io/frogblock)  | Monospaced 8x8 textmode font with 256 glyphs. |
| [CHUNKY](https://batfeula.itch.io/chunky)  | 8x8 textmode font with 366 glyphs. |
| [Kitchen Sink](https://polyducks.itch.io/kitchen-sink-textmode-font)  | Monospaced 8x8 textmode font with 256 glyphs. |
| [CozetteVector](https://github.com/slavfox/Cozette)  | 6x13 bitmap programming font. |
| [PixelCode](https://qwerasd205.github.io/PixelCode/)  | Monospace pixel art style programming font. |
| [ark-pixel-font](https://github.com/TakWolf/ark-pixel-font)  | Open source pan-Chinese, Japanese and Korean pixel font. |
| [Vonwaon](https://timothyqiu.itch.io/vonwaon-bitmap)  | Chinese pixel font with thousands of glyphs. |
| [unscii-16](http://viznut.fi/unscii/)  | Bitmapped Unicode fonts based on classic system fonts. |

Feel free to test your favorite fonts, but keep in mind that the current implementation for creating a 2D character tile map texture from a [`p5.Font`](https://p5js.org/reference/#/p5.Font) object may not work properly with all fonts. For fonts not mentioned here, characters might overlap into other tiles on the texture.

**If you have font suggestions to share, I'd love to hear them! 😊**

## Contributing
Contributions are welcome. Please [`open an issue`](https://github.com/humanbydefinition/p5.asciify/issues) or [`submit a pull request`](https://github.com/humanbydefinition/p5.asciify/pulls) on GitHub.

## License
This project is licensed under the MIT License. See the [`LICENSE`](https://github.com/humanbydefinition/p5.asciify/blob/main/LICENSE) file for more details.