# p5.asciify ( ͡° ͜ʖ ͡°)

![header](/repo_assets/p5.asciify.logo.gif)

`p5.asciify` is a [`p5.js`](https://github.com/processing/p5.js) addon library for converting the main [`WebGL`](https://p5js.org/reference/p5/WEBGL/) drawing canvas into a grid of ASCII characters. 

To use `p5.asciify` with a [`p5.js`](https://github.com/processing/p5.js) sketch in [`WEBGL`](https://p5js.org/reference/p5/WEBGL/) mode, ensure to include [`p5.js`](https://github.com/processing/p5.js) version `v1.8.0` or later in your project.

To see `p5.asciify` in action, check out the example sketches in the prepared collection on the [p5.js web editor](https://editor.p5js.org/): 
[`p5.asciify examples`](https://editor.p5js.org/humanbydefinition/collections/DUa3pcJqn).

I would love to see your creations using `p5.asciify`! Feel free to tag me on social media or use the hashtag `#p5asciify` so I can enjoy and share your amazing work too. (ﾉ◕ヮ◕)ﾉ*:・ﾟ✧ 

[![Instagram](https://img.shields.io/badge/Instagram-lightgrey?style=social&logo=instagram)](https://www.instagram.com/humanbydefinition/)

*Special thanks to [`@davepagurek`](https://github.com/davepagurek) for helping me learn how to create a p5.js addon library! (✿◠‿◠)*

# Getting started
Download the latest version of p5.asciify from the [Releases](https://github.com/humanbydefinition/p5.asciify/releases) page and embed `p5.asciify.js` or `p5.asciify.min.js` in your project's HTML file after importing the [`p5.js`](https://github.com/processing/p5.js) library, but before loading your sketch file.

```html
<!-- Import p5.js -->
<script src="https://cdn.jsdelivr.net/npm/p5@1.9.4/lib/p5.min.js"></script>

<!-- Import p5.asciify -->
<script src="https://cdn.jsdelivr.net/npm/p5.asciify@0.0.6/dist/p5.asciify.min.js"></script>

<!-- If needed, import canvas recording libraries like p5.Capture after p5.asciify -->
<script src="https://cdn.jsdelivr.net/npm/p5.capture@1.4.1/dist/p5.capture.umd.min.js"></script>

<!-- Load your sketch -->
<script src="sketch.js"></script>
```

At this point, your [`p5.js`](https://github.com/processing/p5.js) canvas in [`WebGL`](https://p5js.org/reference/p5/WEBGL/) mode, to which the library has been added, should already be converted to ASCII characters!  
(｡◕‿‿◕｡)

[`P2D`](https://p5js.org/reference/p5/P2D/) rendering mode is **not** supported at the moment, but hopefully will be in the future.   ʕっ•ᴥ•ʔっ

To customize the ASCII conversion further, the library provides functionality which is described in the following [`Usage`](#usage) section.

# Usage

By default, when no font is provided by the user, [UrsaFont](https://ursafrank.itch.io/ursafont) by [UrsaFrank](https://www.stormrooster.com/) is used, which is an awesome textmode font, licensed under the [CC0 1.0 Universal License](https://creativecommons.org/publicdomain/zero/1.0/).

### Loading/updating the ascii font
To use a custom font for the ASCII conversion, the library provides a function `loadAsciiFont(font | fontPath): void`, which can be called within the sketch's [`preload()`](https://p5js.org/reference/p5/preload/), [`setup()`](https://p5js.org/reference/p5/setup/), or [`draw()`](https://p5js.org/reference/p5/draw/) functions to load/update the ASCII font. When passing a font path, the allowed font formats are `.ttf` and `.otf`. You may also pass a [`p5.Font`](https://p5js.org/reference/p5/p5.Font/) object directly to the function. You can also pass a [`base64`](https://en.wikipedia.org/wiki/Base64)-encoded string representing a font file.

```javascript
let font;

function preload() {
  font = loadFont('path/to/awesome/font.ttf');

  loadAsciiFont('path/to/cool/font.ttf');
  loadAsciiFont(font); // both are valid
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // WebGL mode is required currently
  loadAsciiFont('path/to/different/font.ttf'); // update the font here if needed
}

function draw() {
  // Your drawing code here

  if (frameCount === 60) {
    loadAsciiFont('path/to/another/font.ttf'); // update the font here if needed
  }
}

```

For a list of free and awesome textmode/pixel fonts that have been tested to work well with the library, check out the [Resources](#resources) section. 

*Note: Feel free to use any font you like, but be aware that some fonts may not work well with the library, causing a bad ASCII conversion due to overlapping characters in the character texture.*

<hr />

### Changing default options
`p5.asciify` provides a function `setAsciiOptions(options): void`, which can be called within the sketch's [`preload()`](https://p5js.org/reference/p5/preload/), [`setup()`](https://p5js.org/reference/p5/setup/), or [`draw()`](https://p5js.org/reference/p5/draw/) functions to change the default options used for ASCII conversion. The options object essentially is a dictionary of three dictionaries: `common`, `brightness` and `edge`. The `common` dictionary contains the options that are common to both the brightness-based ASCII conversion and the edge-based ASCII conversion, like the font size. The other two dictionaries `brightness` and contain options specific to the brightness-based and edge-based ASCII conversion, respectively.

**`common` options:**
| Option                | Type    | Default value  | Description                                                                                                                                                                                                 |
|-----------------------|---------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `fontSize`            | number  | 16       | The size of the font used for the ASCII conversion. Allowed values range from `1` *L(° O °L)* to `512`. It is recommended to use a font size that is a power of 2, such as 2, 4, 8, 16, 32, 64, etc. |

**`brightness` options:**
| Option                | Type    | Default value  | Description                                                                                                                                                                                                 |
|-----------------------|---------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `enabled`             | boolean | true     | A boolean value indicating whether the brightness-based ASCII conversion should be enabled.                                                                                                      |
| `characters`          | string  | '0123456789' | A string containing the characters to be used for the ASCII conversion. The characters are used in order of appearance, with the first character representing the darkest colors and the last character representing the brightest colors. |
| `characterColorMode`  | number  | 0        | The mode used for the color of the characters used for the ASCII conversion. Allowed values are `0` *(sampled)* and `1` *(fixed)*. <br> - `0` *(sampled)*: The color of a character is determined by sampling the central pixel of the cell it occupies on the canvas. <br> - `1` *(fixed)*: The color of a character is determined by the `characterColor` property. |
| `characterColor`      | string  | '#ffffff' | The color of the characters used for the ASCII conversion. Only used if the `characterColorMode` is set to `1` *(fixed)*.                                                     |
| `backgroundColorMode` | number  | 1        | The mode used for the color of the background of a cell, not covered by the character. Allowed values are `0` *(sampled)* and `1` *(fixed)*. <br> - `0` *(sampled)*: The color of a character is determined by sampling the central pixel of the cell it occupies on the canvas. <br> - `1` *(fixed)*: The color of a character is determined by the `backgroundColor` property. |
| `backgroundColor`     | string  | '#000000' | The color of the background of a cell, not covered by the character. Only used if the `backgroundColorMode` is set to `1` *(fixed)*.                                          |
| `invertMode`          | boolean | false    | A boolean value indicating whether the background and character color should swap.                                                                                                    |
| `rotationAngle`       | number  | 0        | The angle of rotation in degrees, which is applied to all characters from the brightness-based ASCII conversion.                                                                                                    |

**`edge` options:**  
| Option                | Type    | Default value  | Description                                                                                                                                                                                                 |
|-----------------------|---------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `enabled`             | boolean | false     | A boolean value indicating whether the edge-based ASCII conversion should be enabled.                                                                                                      |
| `characters`          | string  | '-/\|\\-/\|\\' | A string containing the characters to be used for the ASCII conversion. |
| `characterColorMode`  | number  | 0        | The mode used for the color of the characters used for the ASCII conversion. Allowed values are `0` *(sampled)* and `1` *(fixed)*. <br> - `0` *(sampled)*: The color of a character is determined by sampling the central pixel of the cell it occupies on the canvas. <br> - `1` *(fixed)*: The color of a character is determined by the `characterColor` property. |
| `characterColor`      | string  | '#ffffff' | The color of the characters used for the ASCII conversion. Only used if the `characterColorMode` is set to `1` *(fixed)*.                                                     |
| `backgroundColorMode` | number  | 1        | The mode used for the color of the background of a cell, not covered by the character. Allowed values are `0` *(sampled)* and `1` *(fixed)*. <br> - `0` *(sampled)*: The color of a character is determined by sampling the central pixel of the cell it occupies on the canvas. <br> - `1` *(fixed)*: The color of a character is determined by the `backgroundColor` property. |
| `backgroundColor`     | string  | '#000000' | The color of the background of a cell, not covered by the character. Only used if the `backgroundColorMode` is set to `1` *(fixed)*.                                          |
| `invertMode`          | boolean | false    | A boolean value indicating whether the background and character color should swap.                                                                                                    |
| `rotationAngle`       | number  | 0        | The angle of rotation in degrees, which is applied to all characters from the edge-based ASCII conversion.              
| `sobelThreshold`      | number  | 0.5      | The threshold value used for the Sobel edge detection algorithm.                                                                                                    |
| `sampleThreshold`     | number  | 16      | The threshold value used when downscaling the sobel framebuffer to the grid size for the edge-based ASCII conversion.                                                                                                    |

```javascript
setAsciiOptions({ 
    common: {
        fontSize: 8,
    },
    brightness: {
        enabled: true,
        characters: "0123456789",
        characterColor: "#ffffff",
        characterColorMode: 0,
        backgroundColor: "#000000",
        backgroundColorMode: 1,
        invertMode: false,
        rotationAngle: 0,
    },
    edge: {
        enabled: true,
        characters: "-/|\\-/|\\",
        characterColor: '#ffffff',
        characterColorMode: 1,
        backgroundColor: '#000000',
        backgroundColorMode: 1,
        invertMode: false,
        rotationAngle: 0,
        sobelThreshold: 0.01,
        sampleThreshold: 16,
    }
});

// Only changing selected options is also valid
setAsciiOptions({ 
    common: {
        fontSize: 8,
    },
    brightness: {
        enabled: true,
        characters: "0123456789",
        backgroundColorMode: 1,
        invertMode: false,
    },
});
```

<hr />

### Working with effects
To apply effects before and after the ASCII conversion, `p5.asciify` provides a set of functions that can be called anywhere inside the sketches [`setup()`](https://p5js.org/reference/p5/setup/) function or [`draw()`](https://p5js.org/reference/p5/draw/) loop. 

#### addAsciiEffect(effectType: string, effectName: string, params: object): P5AsciifyEffect
This function adds an effect to the ASCII conversion. The effects are applied in the order they are called, and the order of the effects can be changed by calling the functions in a different order.

**Parameters:**

| Parameter   | Type   | Description                                                                 |
|-------------|--------|-----------------------------------------------------------------------------|
| `effectType`  | string | 'pre' or 'post', depending on when the effect should be applied             |
| `effectName`  | string | The name of the effect (see below for available effects)                    |
| `params`      | object | *(optional)* The parameters for the effect. Each effect has its own set of parameters.   |

**Example:**
```javascript
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // WebGL mode is required currently

  kaleidoscopeEffect = addAsciiEffect('pre', // 'pre' or 'post', depending on when the effect should be applied
				      'kaleidoscope', // the name of the effect (see below for available effects)
				      { segments: 4, angle: 0 } // the parameters for the effect
  );

  // This pre-effect gets applied to the output of the kaleidoscope shader. 
  //The third parameter is optional. If not provided, the default values will be used for the effect.
  distortionEffect = addAsciiEffect('pre', 'distortion', { frequency: 0.1, amplitude: 0.1 });

  grayscaleEffect = addAsciiEffect('post', 'grayscale'); // This post-effect gets applied after the ASCII conversion

  // Keep the effect object around to change the parameters later, swap the effect order, or remove the effect from the rendering loop at any time
  kaleidoscopeEffect.segments = 8;
}
```

<hr />

#### removeAsciiEffect(effectInstance: P5AsciifyEffect): void
This function removes an effect from the ASCII conversion. The effect instance to be removed is passed as a parameter. If the instance exists in both the pre- and post-effect rendering loops, it will be removed from both.

**Parameters:**

| Parameter      | Type             | Description                                      |
|----------------|------------------|--------------------------------------------------|
| `effectInstance` | P5AsciifyEffect  | The instance of the effect to be removed.        |

**Example:**

```javascript
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // WebGL mode is required currently

  // Add some effects
  let kaleidoscopeEffect = addAsciiEffect('pre', 'kaleidoscope', { segments: 4, angle: 0 });
  let distortionEffect = addAsciiEffect('pre', 'distortion', { frequency: 0.1, amplitude: 0.1 });

  // Remove the distortion effect from the pre-effect rendering loop
  removeAsciiEffect(distortionEffect);
}
```

<hr />

#### swapAsciiEffects(effectInstance1: P5AsciifyEffect, effectInstance2: P5AsciifyEffect): void
This function swaps the order of two effects in the ASCII conversion. Swapping effect between the pre- and post-effect rendering loops is also supported.

**Parameters:**

| Parameter      | Type             | Description                                      |
|----------------|------------------|--------------------------------------------------|
| `effectInstance1` | P5AsciifyEffect  | The first instance of the effect to be swapped.  |
| `effectInstance2` | P5AsciifyEffect  | The second instance of the effect to be swapped. |

**Example:**

```javascript
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // WebGL mode is required currently

  // Add some effects
  let kaleidoscopeEffect = addAsciiEffect('pre', 'kaleidoscope', { segments: 4, angle: 0 });
  let distortionEffect = addAsciiEffect('pre', 'distortion', { frequency: 0.1, amplitude: 0.1 });

  // Swap the order of the effects (kaleidoscopeEffect will be applied after distortionEffect)
  // You may also swap effects between the pre- and post-effect rendering loops
  swapAsciiEffects(kaleidoscopeEffect, distortionEffect);
}
```

<hr />

#### Available effects

Currently, the following effects are available:

| Effect                | Params                                                                                          |
|-----------------------|-------------------------------------------------------------------------------------------------|
| **brightness**        | `brightness` (number): The brightness value to apply. The default value is `0.0`.               |
| **chromatic aberration** | `amount` (number): The amount of chromatic aberration to apply. The default value is `0.1`.<br>`angle` (number): The angle of the chromatic aberration in degrees. The default value is `0.0`. |
| **color palette**     | `palette` (array): An array of colors to use for the color palette. The default value is `["#0f380f", "#306230", "#8bac0f", "#9bbc0f"]`. |
| **distortion**        | `frequency` (number): The frequency of the distortion. The default value is `0.1`.<br>`amplitude` (number): The amplitude of the distortion. The default value is `0.1`. |
| **grayscale**         | *no params*                                                                                     |
| **invert**            | *no params*                                                                                     |
| **kaleidoscope**      | `segments` (number): The number of segments in the kaleidoscope. The default value is `2`.<br>`angle` (number): The angle of the kaleidoscope in degrees. The default value is `0.0`. |
| **rotate**            | `angle` (number): The angle of rotation in degrees. The default value is `0.0`.                 |

All effects also have a common class variable `enabled` (boolean) which can be used to enable or disable the effect. This option is not passed as a parameter to [`addAsciiEffect()`](#addasciieffecteffecttype-string-effectname-string-params-object-p5asciifyeffect), but can be set directly on the effect instance  *(`effect.enabled = false;`)*. By default, all effects are enabled on creation.
 Disabled effects currently also remain in the rendering loop, but do not apply any changes to the output.

Feel free to suggest new effects or contribute your own!

## Resources
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
