Similar to [`p5.js`](https://p5js.org/), `p5.asciify` provides global functions that can be used within the sketches `preload()`, `setup()`, and `draw()` functions to customize the ASCII conversion and apply various effects during setup or runtime.

> [!NOTE]
> All examples given here use p5.js global mode, but can be applied to instance mode as well. 
>
> Check out the `Instance mode` section in the [`README`](https://github.com/humanbydefinition/p5.asciify/tree/main?tab=readme-ov-file#instance-mode) or the [`Getting Started`](https://github.com/humanbydefinition/p5.asciify/wiki/01_Getting-Started#instance-mode) page of the Wiki to learn how to apply the functionality provided by `p5.asciify` to instance mode.

<hr/>

### `loadAsciiFont()`

`loadAsciiFont(fontPath): void`

Loads a custom font for the ASCII conversion. The font can be either a [`p5.Font`](https://p5js.org/reference/#/p5.Font) object or a path to a font file.

> [!TIP]
> For a list of free and awesome textmode/pixel fonts that have been tested to work well with `p5.asciify`, check out the `Resources` section.

> [!NOTE]
> You can use any font you prefer, but be aware that not all fonts are fully compatible with `p5.asciify`. Some fonts may cause poor ASCII conversion due to overlapping characters in the generated texture that contains all the selected characters.

#### Parameters
- **fontPath**: `string` - A path to a font file.

#### Usage Context

| Function  | Usable? |
|-----------|-----------|
| `preload()` | ✓       |
| `setup()`   | ✓       |
| `draw()`    | ✓       |

#### Example

```javascript
function preload() {
  loadAsciiFont('path/to/awesome/font.ttf');
}

function setup() {
  createCanvas(800, 800, WEBGL);
}

function draw() {
  background(0);
  noStroke();
  rotateX(radians(frameCount * 3));
  rotateY(radians(frameCount));
  directionalLight(255, 255, 255, 0, 0, -1);
  torus(200, 50);
}
```
[`run inside the p5.js web editor`](https://editor.p5js.org/humanbydefinition/sketches/bic5vh15-)

<hr/>

### `setAsciiOptions()`

`setAsciiOptions(options): void`

Sets the global options for the ASCII conversion.

#### Parameters

- **options**: `Object` - An object containing the global options for the ASCII conversion. The object can contain the following properties:

  - **`common`**: `Object` - Shared settings for all layers of the ASCII conversion.
  - **`ascii`**: `Object` - Settings for the brightness/accurate-based ASCII conversion.
  - **`gradient`**: `Object` - Settings for the gradient/pattern-based ASCII conversion.
  - **`edge`**: `Object` - Settings for the edge-based ASCII conversion.
  - **`text`**: `Object` - Settings for the text-based ASCII conversion.

#### Usage Context

| Function  | Usable? |
|-----------|-----------|
| `preload()` | ✓       |
| `setup()`   | ✓       |
| `draw()`    | ✓       |


#### **`common` options**
Shared settings for both edge- and brightness-based ASCII conversion.

| Option                | Type    | Default | Description                                                                                                                                                                                                 |
|-----------------------|---------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `fontSize`            | `number`  | `16`       | The size of the font used for the ASCII conversion. Allowed values range from `1` *L(° O °L)* to `128`. It is recommended to use a font size that is a power of 2, such as 2, 4, 8, 16, 32, 64, etc. |
| `gridDimensions`            | `list`  | `[0, 0]`       | The number of grid cells used for the ASCII conversion. The default value `[0, 0]` will automatically calculate the grid dimensions based on the canvas size and the font size. |

#### **`ascii` options**
| Option                | Type    | Default  | Description                                                                                                                                                                                                 |
|-----------------------|---------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `renderMode`          | `string`  | `brightness`        | The method used for the ASCII conversion. Allowed values are `brightness` and `accurate`. <br/> - `brightness`: The brightness-based conversion uses the brightness of the pixels to determine the ASCII character. <br/> - `accurate`: The accurate ASCII conversion attempts to recreate the image as accurately as possible using the given set of characters. <br/> - `custom`: The custom ASCII conversion requires advanced knowledge about `p5.asciify`, utilizing exposed framebuffers by the library to create custom ASCII conversion algorithms. **Not documented in detail yet!** |
| `enabled`             | `boolean` | `true`     | A boolean value indicating whether the ASCII conversion should be enabled.                                                                                                      |
| `characters`          | `string`  | `'0123456789'` | A string containing the characters to be used for the ASCII conversion. The characters are used in order of appearance, with the first character representing the darkest colors and the last character representing the brightest colors. |
| `characterColorMode`  | `number`  | `0`        | The mode used for the color of the characters used for the ASCII conversion. Allowed values are `0` *(sampled)* and `1` *(fixed)*. <br/> - `0` *(sampled)*: The color of a character is determined by sampling the central pixel of the cell it occupies on the canvas. <br/> - `1` *(fixed)*: The color of a character is determined by the `characterColor` property. |
| `characterColor`      | `string`  | `'#ffffff'` | The color of the characters used for the ASCII conversion. Only used if the `characterColorMode` is set to `1` *(fixed)*.                                                     |
| `backgroundColorMode` | `number`  | `1`        | The mode used for the color of the background of a cell, not covered by the character. Allowed values are `0` *(sampled)* and `1` *(fixed)*. <br/> - `0` *(sampled)*: The color of a character is determined by sampling the central pixel of the cell it occupies on the canvas. <br/> - `1` *(fixed)*: The color of a character is determined by the `backgroundColor` property. |
| `backgroundColor`     | `string`  | `'#000000'` | The color of the background of a cell, not covered by the character. Only used if the `backgroundColorMode` is set to `1` *(fixed)*.                                          |
| `invertMode`          | `boolean` | `false`    | A boolean value indicating whether the background and character color should swap.                                                                                                    |
| `rotationAngle`       | `number`  | `0`        | The angle of rotation in degrees, which is applied to all characters from the ASCII conversion.                                                                                                    |

#### **`gradient` options**
| Option                | Type    | Default  | Description                                                                                                                                                                                                 |
|-----------------------|---------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `enabled`             | `boolean` | `true`     | A boolean value indicating whether the ASCII conversion should be enabled.                                                                                                      |
| `characterColorMode`  | `number`  | `0`        | The mode used for the color of the characters used for the ASCII conversion. Allowed values are `0` *(sampled)* and `1` *(fixed)*. <br/> - `0` *(sampled)*: The color of a character is determined by sampling the central pixel of the cell it occupies on the canvas. <br/> - `1` *(fixed)*: The color of a character is determined by the `characterColor` property. |
| `characterColor`      | `string`  | `'#ffffff'` | The color of the characters used for the ASCII conversion. Only used if the `characterColorMode` is set to `1` *(fixed)*.                                                     |
| `backgroundColorMode` | `number`  | `1`        | The mode used for the color of the background of a cell, not covered by the character. Allowed values are `0` *(sampled)* and `1` *(fixed)*. <br/> - `0` *(sampled)*: The color of a character is determined by sampling the central pixel of the cell it occupies on the canvas. <br/> - `1` *(fixed)*: The color of a character is determined by the `backgroundColor` property. |
| `backgroundColor`     | `string`  | `'#000000'` | The color of the background of a cell, not covered by the character. Only used if the `backgroundColorMode` is set to `1` *(fixed)*.                                          |
| `invertMode`          | `boolean` | `false`    | A boolean value indicating whether the background and character color should swap.                                                                                                    |
| `rotationAngle`       | `number`  | `0`        | The angle of rotation in degrees, which is applied to all characters from the ASCII conversion.                                                                                                    |

#### **`edge` options**  
| Option                | Type    | Default | Description                                                                                                                                                                                                 |
|-----------------------|---------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `enabled`             | `boolean` | `false`     | A boolean value indicating whether the ASCII conversion should be enabled.                                                                                                      |
| `characters`          | `string`  | `'-/\|\-/\|\'` | A string containing exactly 8 characters to be used for the edge-based ASCII conversion. |
| `characterColorMode`  | `number`  | `0`        | The mode used for the color of the characters used for the ASCII conversion. Allowed values are `0` *(sampled)* and `1` *(fixed)*. <br/> - `0` *(sampled)*: The color of a character is determined by sampling the central pixel of the cell it occupies on the canvas. <br/> - `1` *(fixed)*: The color of a character is determined by the `characterColor` property. |
| `characterColor`      | `string`  | `'#ffffff'` | The color of the characters used for the ASCII conversion. Only used if the `characterColorMode` is set to `1` *(fixed)*.                                                     |
| `backgroundColorMode` | `number`  | `1`        | The mode used for the color of the background of a cell, not covered by the character. Allowed values are `0` *(sampled)* and `1` *(fixed)*. <br/> - `0` *(sampled)*: The color of a character is determined by sampling the central pixel of the cell it occupies on the canvas. <br/> - `1` *(fixed)*: The color of a character is determined by the `backgroundColor` property. |
| `backgroundColor`     | `string`  | `'#000000'` | The color of the background of a cell, not covered by the character. Only used if the `backgroundColorMode` is set to `1` *(fixed)*.                                          |
| `invertMode`          | `boolean` | `false`    | A boolean value indicating whether the background and character color should swap.                                                                                                    |
| `rotationAngle`       | `number`  | `0`        | The angle of rotation in degrees, which is applied to all characters from the ASCII conversion.                                                                                                    |
| `sobelThreshold`      | `number`  | `0.5`      | The threshold value used for the Sobel edge detection algorithm.                                                                                                    |
| `sampleThreshold`     | `number`  | `16`      | The threshold value used when downscaling the sobel framebuffer to the grid size.                                                                                                    |

#### **`text` options**
| Option                | Type    | Default | Description                                                                                                                                                                                                 |
|-----------------------|---------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `enabled`             | `boolean` | `false`     | A boolean value indicating whether the ASCII conversion should be enabled.                                                                                                      |
| `characterColor`      | `string`  | `'#ffffff'` | The color of the characters used for the ASCII conversion.                                                     |
| `characterColorMode` | `number`  | `0`        | The mode used for the color of the characters used for the ASCII conversion. Allowed values are `0` *(sampled)* and `1` *(fixed)*. <br/> - `0` *(sampled)*: Sampled from one of the previous conversion layers, based on the input texture colors. <br/> - `1` *(fixed)*: The color of a character is determined by the `characterColor` property. |
| `backgroundColor`     | `string`  | `'#000000'` | The color of the background of a cell, not covered by the character.                                          |
| `invertMode`          | `boolean` | `false`    | A boolean value indicating whether the background and character color should swap.                                                                                                    |

#### Example

```javascript
function setup() {
  createCanvas(800, 800, WEBGL);
  
  // Passing an options object that contains only a subset of possible options is also valid!
  setAsciiOptions({ 
    common: {
        fontSize: 8,
    },
    ascii: {
        renderMode: "brightness",
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
        sobelThreshold: 0.15,
        sampleThreshold: 16,
    }
});
}

function draw() {
  background(0);
  noStroke();
  rotateX(radians(frameCount * 3));
  rotateY(radians(frameCount));
  directionalLight(255, 255, 255, 0, 0, -1);
  torus(200, 50);
}
```
[`run inside the p5.js web editor`](https://editor.p5js.org/humanbydefinition/sketches/N6N33RIZe)

<hr/>

### `setAsciifyPostSetupFunction()`

`setAsciifyPostSetupFunction(postSetupFunction: Function): void`

Sets a custom function to be executed once after `p5.asciify` has been set up.

Can be useful in more advanced scenarios where you need to perform additional setup steps after the library has been set up, like fetching calculated grid dimensions or other internal data.

#### Parameters

- **postSetupFunction**: `Function` - A custom function to be executed

#### Usage Context

| Function  | Usable? |
|-----------|-----------|
| `preload()` | ✓       |
| `setup()`   | ✓       |
| `draw()`    | ✗       |



<hr />

### `setAsciifyPostDrawFunction()`

`setAsciifyPostDrawFunction(postDrawFunction: Function): void`

Sets a custom function to be executed every frame after the libraries `draw()` function has been executed, allowing for additional post-processing steps to be performed on top of the ASCII conversion.

#### Parameters

- **postDrawFunction**: `Function` - A custom function to be executed

#### Usage Context

| Function  | Usable? |
|-----------|-----------|
| `preload()` | ✓       |
| `setup()`   | ✓       |
| `draw()`    | ✓       |

<hr />

### `addAsciiGradient()`

`addAsciiGradient(gradientType, brightnessStart, brightnessEnd, characters, params): P5AsciifyGradient`

Adds a gradient/pattern-based ASCII conversion layer to the rendering pipeline.

#### Parameters

- **gradientType**: `string` - The type of gradient to use. A list of available gradient types can be found below.
- **brightnessStart**: `number` - The brightness value at which the gradient starts. Allowed values range from `0` to `255`.
- **brightnessEnd**: `number` - The brightness value at which the gradient ends. Allowed values range from `0` to `255`.
- **characters**: `string` - A string containing the characters to be used for the ASCII conversion, that will be mapped to the gradient.
- **params**: `Object` - An object containing the parameters for the gradient/pattern. The parameters are specific to each gradient type. The available parameters can be found below.

#### Returns

- `P5AsciifyGradient` - The gradient object that was added to the rendering pipeline. The object can be used to adjust the gradient's parameters during runtime.

#### Usage Context

| Function  | Usable? |
|-----------|-----------|
| `preload()` | ✓       |
| `setup()`   | ✓       |
| `draw()`    | ✓       |

#### Available gradients and parameters

| gradientType                | params                                                                                          |
|-----------------------|-------------------------------------------------------------------------------------------------|
| **`'linear'`**        | `direction` (number): The direction of the gradient in degrees. The default value is `1`. <br/> `angle` (number): The angle of the gradient in degrees. The default value is `0`. <br/> `speed` (number): The speed of the gradient. The default value is `0.01`. |
| **`'radial'`**        | `direction` (number): The direction of the gradient in degrees. The default value is `1`. <br/> `centerX` (number): The x-coordinate of the center of the gradient. The default value is `0.5`. <br/> `centerY` (number): The y-coordinate of the center of the gradient. The default value is `0.5`. <br/> `radius` (number): The radius of the gradient. The default value is `0.5`. |
| **`'zigzag'`**       | `direction` (number): The direction of the gradient in degrees. The default value is `1`. <br/> `angle` (number): The angle of the gradient in degrees. The default value is `0`. <br/> `speed` (number): The speed of the gradient. The default value is `0.01`. |
| **`'spiral'`**      | `direction` (number): The direction of the gradient in degrees. The default value is `1`. <br/> `centerX` (number): The x-coordinate of the center of the gradient. The default value is `0.5`. <br/> `centerY` (number): The y-coordinate of the center of the gradient. The default value is `0.5`. <br/> `speed` (number): The speed of the gradient. The default value is `0.01`. <br/> `density` (number): The density of the spiral. The default value is `0.01`. |
| **`'conical'`**    | `centerX` (number): The x-coordinate of the center of the gradient. The default value is `0.5`. <br/> `centerY` (number): The y-coordinate of the center of the gradient. The default value is `0.5`. <br/> `speed` (number): The speed of the gradient. The default value is `0.01`. |
| **`'noise'`**     | `noiseScale` (number): The scale of the noise. The default value is `0.1`. <br/> `speed` (number): The speed of the gradient. The default value is `0.01`. <br/> `direction` (number): The direction of the gradient in degrees. The default value is `1`. |

> [!TIP]
> All gradients/patterns can be added multiple times to the rendering pipeline with varying parameters, allowing for the creation of complex visual effects by combining multiple gradients. 

> [!NOTE]
> All gradients/patterns added have a common property called `enabled`, which is set to `true` by default. This property can be used to enable or disable the gradient/pattern while keeping it in the rendering pipeline. This feature is useful for creating interactive sketches where gradients/patterns are toggled on and off based on user input.

#### Example

```javascript
let linearGradient;
let zigzagGradient;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  setAsciiOptions({
    ascii: {
      renderMode: "brightness",
      characters: " .:-=+*#%@",
    },
    edge: {
      enabled: true,
      characterColorMode: 1,
      sobelThreshold: 0.1,
      sampleThreshold: 16,
    },
  });

  linearGradient = addAsciiGradient("linear", 0, 127, "p5.asciify  ", {
    direction: 1,
    angle: 0,
    speed: 0.1,
  });
  zigzagGradient = addAsciiGradient("zigzag", 128, 255, "humanbydefinition ", {
    direction: 1,
    speed: 0.1,
  });
}

function draw() {
  background(150, 0, 0);
  noStroke();
  rotateX(radians(frameCount * 3));
  rotateY(radians(frameCount));
  directionalLight(255, 255, 255, 0, 0, -1);
  torus(200, 50);

  linearGradient.angle += 0.5;

  if (frameCount % 180 == 0) {
    zigzagGradient.enabled = !zigzagGradient.enabled;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
```
[`run inside the p5.js web editor`](https://editor.p5js.org/humanbydefinition/sketches/5giwV1wuk)

<hr/>

### `removeAsciiGradient()`

`removeAsciiGradient(gradientInstance: P5AsciifyGradient): void`

Removes a gradient/pattern-based ASCII conversion layer from the rendering pipeline.

#### Parameters

- **gradientInstance**: `P5AsciifyGradient` - The gradient object to remove from the rendering pipeline.

#### Usage Context

| Function  | Usable? |
|-----------|-----------|
| `preload()` | ✓       |
| `setup()`   | ✓       |
| `draw()`    | ✓       |

#### Example

```javascript
let linearGradient;
let zigzagGradient;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  setAsciiOptions({
    ascii: {
      renderMode: "brightness",
      characters: " .:-=+*#%@",
    },
  });

  linearGradient = addAsciiGradient("linear", 0, 255, "p5.asciify  ", {
    direction: 1,
    angle: 0,
    speed: 0.1,
  });
}

function draw() {
  background(0);
  noStroke();
  rotateX(radians(frameCount * 3));
  rotateY(radians(frameCount));
  directionalLight(255, 255, 255, 0, 0, -1);
  torus(200, 50);

  linearGradient.angle += 0.5;

  if (frameCount === 240) {
    removeAsciiGradient(linearGradient);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
```
[`run inside the p5.js web editor`](https://editor.p5js.org/humanbydefinition/sketches/HH8PjXSTY)	

<hr/>

Congratulations! You've mastered the basics of `p5.asciify`! Now you're ready to create your own intricate visualizations using a dynamic grid of ASCII characters.  
Happy coding! (｡◕‿‿◕｡)

> [!TIP]
> To get started with some awesome free textmode/pixel fonts that work well with `p5.asciify`, make sure to check out the [`Resources`](https://github.com/humanbydefinition/p5.asciify/wiki/03_Resources) section for a list of recommended fonts.