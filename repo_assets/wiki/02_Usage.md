> [!NOTE]
> All examples given here use p5.js global mode, but can be applied to instance mode as well. 
>
> Check out the `Instance mode` section in the [`README`](https://github.com/humanbydefinition/p5.asciify/tree/main?tab=readme-ov-file#instance-mode) or the [`Getting Started`](https://github.com/humanbydefinition/p5.asciify/wiki/01_Getting-Started#instance-mode) page of the Wiki to learn how to apply the functionality provided by `p5.asciify` to instance mode.

<hr/>

## `setupAsciify()`

Similar to the `setup()` function in `p5.js`, the `setupAsciify()` function is specific to the `p5.asciify` library, and is executed automatically after the setup of `p5.asciify` is finished. This function is used to modify the default ASCII rendering pipeline and it's renderers, or to create an entirely custom pipeline. All settings and modifications made here can also be changed during runtime throughout the `draw()` loop.

## `drawAsciify()`

Similar to the `draw()` function in `p5.js`, the `drawAsciify()` function is specific to the `p5.asciify` library, and is executed automatically after ASCII conversion has been applied to the canvas. This function can be used to apply additional post-processing steps on top of the ASCII conversion, like applying a CRT filter.

## The `p5asciify` object

The globally accessible `p5asciify` object of type `P5Asciifier` is the main interface for interacting with the `p5.asciify` library, providing all the necessary functions to customize the ASCII conversion of the `WebGL` canvas.

### `.fontSize(fontSize: number): void`

Sets the size of the font used throughout the whole ASCII rendering pipeline. Allowed values range from `1` *L(° O °L)* to `128`. Font sizes that are a power of 2, such as 2, 4, 8, 16, 32, 64, etc., tend to work best.

This function can be called at any time, also in `preload()` or `setup()`.

### `.loadFont(font: string | p5.Font): void`

Loads a custom font for the ASCII conversion, which is used throughout the whole ASCII rendering pipeline. The font can be either a `p5.Font` object, a path to a font file, or a `base64` encoded font string. Allowed formats are `.ttf` and `.otf`.

This function can be called at any time, also in `preload()` or `setup()`.

> [!TIP]
> For a list of free and awesome textmode/pixel fonts that have been tested to work well with `p5.asciify`, check out the `Resources` section.

> [!NOTE]
> You can use any font you prefer, but be aware that not all fonts are fully compatible with `p5.asciify`. Some fonts may cause poor ASCII conversion due to overlapping characters in the generated texture that contains all the selected characters.

### `.background(color: string | p5.Color | number[]): void`

Sets the background color of the potentially empty space, which is not covered by the centered grid of ASCII characters, which attempts to fill the whole canvas. The parameter accepts any type you would usually pass to the `background()` function in `p5.js`.

This function can be called at any time, also in `preload()` or `setup()`.

### `.renderers(): P5AsciifyRendererManager`

Returns the classes `P5AsciifyRendererManager` object, which provides access to all renderers in the ASCII rendering pipeline and allows modification of the pipeline through adding, swapping, or removing renderers.

**This function should only be called either within `setupAsciify()` or after the setup is complete during runtime.**

## The `P5AsciifyRendererManager` object

Provided through the `renderers()` function of the `p5asciify` object, the `P5AsciifyRendererManager` object is the main interface for interacting with the ASCII rendering pipeline.

By default, without any modifications, the ASCII rendering pipeline consists of the following predefined renderers in the given order:
- `{ name: "brightness", renderer: P5AsciifyBrightnessRenderer }`
- `{ name: "accurate", renderer: P5AsciifyAccurateRenderer }`
- `{ name: "gradient", renderer: P5AsciifyGradientRenderer }`
- `{ name: "edge", renderer: P5AsciifyEdgeRenderer }`
- `{ name: "custom", renderer: P5AsciifyRenderer }`

The default configurations for each of those predefined renderers can be found here: TODO

### `.add(name: string, type: RendererType, options: AsciiRendererOptions): P5AsciifyRenderer`

Adds an additional renderer of a given type to the end of the ASCII rendering pipeline. The `name` parameter is used to identify the renderer via the manager's `get()` function, if the returning instance is not stored in a variable. It's highly recommended to store the returned renderer instance in a variable for later access and modification though.

### `.get(name: string): P5AsciifyRenderer`

Returns the renderer instance with the given name, which was previously added to the ASCII rendering pipeline. Should mainly be used to access the pre-defined renderers by the `p5.asciify` library. The pre-defined renderer names to fetch the renderer instances from can be found above. It's best to store the renderer instances in variables during setup for later access and modification during runtime without having to search for them in the list of renderers constantly.

<hr/>

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