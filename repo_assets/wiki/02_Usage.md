> [!NOTE]  
> This page documents the `v0.7.0` release of `p5.asciify`, introducing a new flexible ASCII rendering pipeline. The API enables greater customization and power. Documentation is still in progress, and more detailed explanations will be provided in the future. If you want to contribute to the documentation, feel free to do so by following the steps outlined in the [`Contributing`](https://github.com/humanbydefinition/p5.asciify/wiki/04_Contributing) page of the Wiki.
>
> #### Code examples for the new API:
> - **Local**: Find `instance mode` implementations in the `examples` folder
> - **Online**: See [`p5.js web editor collection`](https://editor.p5js.org/humanbydefinition/collections/VAws0yqLW) for `global mode` versions
>
> Both example sets demonstrate identical functionality, implemented for different p5.js usage modes.

> [!NOTE]
> All examples given here use p5.js global mode, but can be applied to instance mode as well. 
>
> Check out the `Instance mode` section in the [`README`](https://github.com/humanbydefinition/p5.asciify/tree/main?tab=readme-ov-file#instance-mode) or the [`Getting Started`](https://github.com/humanbydefinition/p5.asciify/wiki/01_Getting-Started#instance-mode) page of the Wiki to learn how to apply the functionality provided by `p5.asciify` to instance mode. Alternatively, you can explore the `examples` folder in the repository for more `instance mode` implementations.

<hr/>

## `setupAsciify()`

Similar to the `setup()` function in `p5.js`, the `setupAsciify()` function is specific to the `p5.asciify` library, and is executed automatically after the setup of `p5.asciify` is finished. This function is used to modify the default ASCII rendering pipeline and it's renderers, or to create an entirely custom pipeline. All settings and modifications made here can also be changed during runtime throughout the `draw()` loop.

```javascript
function setup() {
  createCanvas(800, 800, WEBGL); // Create a WebGL canvas
}

function setupAsciify() {
  // Optionally apply additional setup logic for the ASCII conversion
}

function draw() {
  background(0); // Set the background color to black
  // Draw something on the canvas to asciify...
}
```

## `drawAsciify()`

Similar to the `draw()` function in `p5.js`, the `drawAsciify()` function is specific to the `p5.asciify` library, and is executed automatically after ASCII conversion has been applied to the canvas, which happens every time the users `draw()` function has finished executing. This function can be used to apply additional post-processing steps on top of the ASCII conversion, like applying a CRT filter for example.

```javascript
function setup() {
  createCanvas(800, 800, WEBGL); // Create a WebGL canvas
}

function setupAsciify() {
  p5asciify.fontSize(8); // Set the font size to 8
  p5asciify.background("#000000"); // Set the background color to black

  // Swap the character and background colors in the brightness renderer
  p5asciify.renderers().get("brightness").invert(true); 
}

function draw() {
  background(0); // Set the background color to black
  // Draw something on the canvas to asciify...
}

function drawAsciify() {
  // Apply a CRT filter to the ASCII conversion, draw an FPS counter on top, etc..
}
```


## The `p5asciify` object

The globally accessible `p5asciify` object of type `P5Asciifier` is the main interface for interacting with the `p5.asciify` library, providing all the necessary functions to customize the ASCII conversion of the `WebGL` canvas.

### `.fontSize(fontSize: number): void`

Sets the size of the font used throughout the whole ASCII rendering pipeline. Allowed values range from `1` *L(° O °L)* to `128`. Font sizes that are a power of 2, such as 2, 4, 8, 16, 32, 64, etc., tend to work best.

This function can be called at any time, also in `preload()` or `setup()`.

```javascript
function setupAsciify() {
  p5asciify.fontSize(8); // Set the font size to 8
}
```

### `.loadFont(font: string | p5.Font): void`

Loads a custom font for the ASCII conversion, which is used throughout the whole ASCII rendering pipeline. The font can be either a `p5.Font` object, a path to a font file, or a `base64` encoded font string. Allowed formats are `.ttf` and `.otf`.

This function can be called at any time, also in `preload()` or `setup()`.

```javascript
function preload() {
  p5asciify.loadFont("path/to/font.ttf"); // Load a custom font for the ASCII conversion
}
```

> [!TIP]
> For a list of free and awesome textmode/pixel fonts that have been tested to work well with `p5.asciify`, check out the `Resources` section.

> [!NOTE]
> You can use any font you prefer, but be aware that not all fonts are fully compatible with `p5.asciify`. Some fonts may cause poor ASCII conversion due to overlapping characters in the generated texture that contains all the selected characters.

### `.background(color: string | p5.Color | number[]): void`

Sets the background color of the potentially empty space, which is not covered by the centered grid of ASCII characters, which attempts to fill the whole canvas. The parameter accepts any type you would usually pass to the `background()` function in `p5.js`.

This function can be called at any time, also in `preload()` or `setup()`.

```javascript
function setupAsciify() {
  p5asciify.background("#000000"); // Set the background color to black
}
```

### `.renderers(): P5AsciifyRendererManager`

Returns the classes `P5AsciifyRendererManager` object, which provides access to all renderers in the ASCII rendering pipeline and allows modification of the pipeline through adding, swapping, removing or modifying renderers.

**This function should only be called either within `setupAsciify()` or after the setup is complete during runtime.**

```javascript
function setupAsciify() {
  // Access the ASCII rendering pipeline, which will be described in more detail below
  console.log(p5asciify.renderers()); 
}
```

## The `P5AsciifyRendererManager` object

Provided through the `renderers()` function of the `p5asciify` object, the `P5AsciifyRendererManager` object is the main interface for interacting with the ASCII rendering pipeline.

By default, without any modifications, the ASCII rendering pipeline consists of the following predefined renderers in the given order:
- `{ name: "custom", renderer: P5AsciifyRenderer }`
- `{ name: "edge", renderer: P5AsciifyEdgeRenderer }`
- `{ name: "gradient", renderer: P5AsciifyGradientRenderer }`
- `{ name: "accurate", renderer: P5AsciifyAccurateRenderer }`
- `{ name: "brightness", renderer: P5AsciifyBrightnessRenderer }`

This pipeline is executed in opposite order, starting with the last renderer in the list and ending with the first renderer in the list.

The default configurations for each of those predefined renderers can be found here: TODO

### `.add(name: string, type: RendererType, options: AsciiRendererOptions): P5AsciifyRenderer`

Adds an additional renderer of a given type to the end of the ASCII rendering pipeline. The `name` parameter is used to return the renderer via the manager's `get()` function, if the returning instance is not stored in a variable. It's highly recommended to store the returned renderer instance in a variable for later access and modification though.

```javascript
let asciiBrightnessRenderer;

function setupAsciify() {
    p5asciify.renderers.clear() // Remove all default renderers

  asciiBrightnessRenderer = p5asciify.renderers().add("br1ghtness", "brightness", {
    characters: " .:-=+*#%@",
    invert: false,
    // Add additional options here... If missing, the default options are used
  });
}
```

### `.get(name: string): P5AsciifyRenderer`

Returns the renderer instance with the given name, which was previously added to the ASCII rendering pipeline. Should mainly be used to access the pre-defined renderers by the `p5.asciify` library. The pre-defined renderer names to fetch the renderer instances from can be found above. It's best to store the renderer instances in variables during setup for later access and modification during runtime without having to search for them in the list of renderers constantly.

```javascript
let asciiBrightnessRenderer;

function setupAsciify() {
  asciiBrightnessRenderer = p5asciify.renderers().get("brightness");
  console.log(asciiBrightnessRenderer); // Access the default brightness renderer
}
```

### `.moveDown(renderer: string | P5AsciifyRenderer): void`

Moves the renderer with the given name or the given renderer instance one position down in the ASCII rendering pipeline. The renderer will be executed earlier in the pipeline.

```javascript
function setupAsciify() {
  p5asciify.renderers().moveDown("edge"); // Move the edge renderer one position down
}
```

### `.moveUp(renderer: string | P5AsciifyRenderer): void`

Moves the renderer with the given name or the given renderer instance one position up in the ASCII rendering pipeline. The renderer will be executed later in the pipeline.

```javascript
function setupAsciify() {
  p5asciify.renderers().moveUp("brightness"); // Move the brightness renderer one position up
}
```

### `.remove(renderer: string | P5AsciifyRenderer): void`

Removes the renderer with the given name or the given renderer instance from the ASCII rendering pipeline.

```javascript
function setupAsciify() {
  p5asciify.renderers().remove("gradient"); // Remove the gradient renderer
}
```

### `.clear(): void`

Removes **all** renderers from the ASCII rendering pipeline.

```javascript
function setupAsciify() {
  p5asciify.renderers().clear(); // Remove all renderers
}
```

### `.swap(renderer1: string | P5AsciifyRenderer, renderer2: string | P5AsciifyRenderer): void`

Swaps the positions of the two given renderers in the ASCII rendering pipeline.

```javascript
function setupAsciify() {
  p5asciify.renderers().swap("edge", "gradient"); // Swap the edge and gradient renderers
}
```

## The `P5AsciifyRenderer` object and its subclasses

When adding a renderer to the ASCII rendering pipeline through the `P5AsciifyRendererManager` via the `add()` function, or by getting the pre-defined renderers through the `get()` function, the returned object is of type `P5AsciifyRenderer` or one of its subclasses, depending on the type of renderer added.

This super class can be used as a custom renderer where the ASCII conversion is fully controlled by the user. Through its exposed framebuffers, and ideally conforming to the internal logic of the `p5.asciify` library in regards to the ASCII conversion, the user can create custom ASCII conversion logic. All the framebuffers dimensions match the columns and rows of the grid at all times, and there is no manual resizing needed. The framebuffers should only be accessed and drawn to on the super class level, as the subclasses have their own logic.

The super class `P5AsciifyRenderer` provides the following properties and functions, which are shared by all subclasses:

#### Properties

### `primaryColorFramebuffer: p5.Framebuffer`

The framebuffer containing the colors which are used to define the ASCII character colors in the grid.

### `secondaryColorFramebuffer: p5.Framebuffer`

The framebuffer containing the colors which are used to define the ASCII character colors in the grid.

### `inversionFramebuffer: p5.Framebuffer`

The framebuffer containing color information whether the character and background color of a given cell should swap or not.
`#000000` means no inversion, `#ffffff` means inversion.

### `characterFramebuffer: p5.Framebuffer`

The framebuffer containing color information, which is translated to the ASCII characters to render on the grid. Proper documentation on how to use this effectively will *(hopefully)* be provided in the future.

#### Functions

### `.update(options: Partial<AsciiRendererOptions>): void`

Updates the renderer with the given options. The options are the same as the ones passed to the `add()` function of the `P5AsciifyRendererManager`.

```javascript
function setupAsciify() {
  p5asciify.renderers().get("brightness").update({
    characters: " .:-=+*#%@",
    invert: false,
    // Add additional options here if needed...
  });
}
```

### `.characters(characters: string): void`

Sets the characters used for the ASCII conversion of the renderer. 

This function and the corresponding property is only relevant for the `P5AsciifyAccurateRenderer`, the `P5AsciifyBrightnessRenderer`, and the `P5AsciifyEdgeRenderer`. The `P5AsciifyGradientRenderer` and the super class `P5AsciifyRenderer` have their own way of defining the characters used for the ASCII conversion.

```javascript
function setupAsciify() {
  // Set the characters for the brightness renderer
  p5asciify.renderers().get("brightness").characters(" .:-=+*#%@"); 
}
```

### `.invert(invert: boolean): void`

Sets whether the ASCII characters and their background colors should swap or not. This function is only relevant to the sub classes, as the super class has its own way of defining the inversion. If `true`, all the grid cells affected by a given renderer will have their character and background colors swapped.

```javascript
function setupAsciify() {
  // Swap the character and background colors in the brightness renderer
  p5asciify.renderers().get("brightness").invert(true); 
}
```

### `.rotation(rotation: number): void`

Sets the rotation of the ASCII grid in degrees *(in the future, it should be based on the defined `angleMode()` provided by `p5.js`)*. Currently, this is a global property which actually affects all renderers and grid cells in the pipeline, but in the future, there will be a separate framebuffer with the rotation information for each renderer.

```javascript
function setupAsciify() {
  // Rotate all characters in the grid by 180 degrees
  p5asciify.renderers().get("brightness").rotation(180); 
}
```

### `.characterColor(characterColor: p5.Color): void`

Sets the color of the ASCII characters. This function is only relevant to the sub classes, as the super class has its own way of defining the character color. Additionally, this `fixed` color passed is only used on all the grid cells a given renderer covers, if the `characterColorMode()` is set to `"fixed"`.

```javascript
function setupAsciify() {
  // Set the color of the ASCII characters in the brightness renderer
  p5asciify.renderers().get("brightness").characterColor(color("#ffffff")); 
}
```

### `.characterColorMode(characterColorMode: "fixed" | "sampled"): void`

Sets the mode of the ASCII character color. If set to `"fixed"`, the color set by the `characterColor()` function is used. If set to `"sampled"`, the color is sampled from the `primaryColorSampleFramebuffer`.

```javascript
function setupAsciify() {
  // Set the mode of the ASCII character color to "sampled"
  p5asciify.renderers().get("brightness").characterColorMode("sampled"); 
}
```

### `.backgroundColor(backgroundCharacterColor: p5.Color): void`

Sets the color of the grid cell backgrounds. This function is only relevant to the sub classes, as the super class has its own way of defining the background color. Additionally, this `fixed` color passed is only used on all the grid cells a given renderer covers, if the `backgroundColorMode()` is set to `"fixed"`.

```javascript
function setupAsciify() {
  // Set the color of the grid cell backgrounds in the brightness renderer
  p5asciify.renderers().get("brightness").backgroundColor(color("#000000")); 
}
```

### `.backgroundColorMode(backgroundColorMode: "fixed" | "sampled"): void`

Sets the mode of the grid cell background color. If set to `"fixed"`, the color set by the `backgroundColor()` function is used. If set to `"sampled"`, the color is sampled from the `secondaryColorSampleFramebuffer`.

```javascript
function setupAsciify() {
  // Set the mode of the grid cell background color to "fixed"
  p5asciify.renderers().get("brightness").backgroundColorMode("fixed"); 
}
```

### `.enabled(enabled: boolean): void`

Sets whether the renderer should be executed or not. If set to `false`, the renderer will not be executed, but will still be part of the ASCII rendering pipeline.

```javascript
function setupAsciify() {
  // Disable the brightness renderer
  p5asciify.renderers().get("brightness").enabled(false); 
}
```

### `.enable(): void`

Enabled the renderer, so it will be executed during the ASCII conversion.

```javascript
function setupAsciify() {
  // Enable the brightness renderer
  p5asciify.renderers().get("brightness").enable(); 
}
```

### `.disable(): void`

Disables the renderer, so it will not be executed during the ASCII conversion.

```javascript
function setupAsciify() {
  // Disable the brightness renderer
  p5asciify.renderers().get("brightness").disable(); 
}
```

<hr/>

### The `P5AsciifyBrightnessRenderer` object

The `P5AsciifyBrightnessRenderer` object is a subclass of the `P5AsciifyRenderer` object, and is used to convert the brightness of the colors in the main canvas to ASCII characters from the 1D character set. The brightness of the colors is calculated using the formula `0.299 * red + 0.587 * green + 0.114 * blue`. The sampling on the main canvas is being done at the center of each grid cell.

<hr/>

### The `P5AsciifyAccurateRenderer` object

The `P5AsciifyAccurateRenderer` object is a subclass of the `P5AsciifyRenderer` object, and attempts to create an accurate ASCII representation of the main canvas, limited by the available characters defined in the character set. The sampling process is more complex and won't be explained here. This renderer works best with smaller font sizes up to `16`. With larger font sizes, the performance will decrease significantly, potentially crashing `WebGL`. Probably won't reach 60 frames per second on most older hardware.

<hr/>

### The `P5AsciifyEdgeRenderer` object

The `P5AsciifyEdgeRenderer` object is a subclass of the `P5AsciifyRenderer` object, and is used to detect edges in the main canvas and convert them to ASCII characters on the grid. The edge detection is done using a Sobel filter and the whole renderer is inspired by the following YouTube video by [`Acerola`](https://github.com/GarrettGunnell): [`I Tried Turning Games Into Text`](https://www.youtube.com/watch?v=gg40RWiaHRY)

For this renderer, you ideally define a character set that has exactly 8 characters, which represent the different edge directions. The default character set is `"-/|\\-/|\\"`. If more or less characters are defined, there will be unexpected behavior.

Similar, but not as bad as the `P5AsciifyAccurateRenderer`, this renderer works best with smaller font sizes, and the performance will decrease with larger font sizes.

Additionally, this sub class provides two extra functions:

### `.sobelThreshold(sobelThreshold: number): void`

Sets the threshold for the edge detection. The default value is `0.5`. The higher the value, the more edges will be detected. Should be a value between `0` and `1`.

```javascript
function setupAsciify() {
  // Set the threshold for the edge detection to 0.5
  p5asciify.renderers().get("edge").sobelThreshold(0.5); 
}
```

### `.sampleThreshold(sampleThreshold: number): void`

Sets the threshold for the sampling process. The default value is `16`. This value corresponds to `"How many pixels in a grid cell need to be marked as an edge to be considered in the ASCII edge conversion?"`. The higher the value, the less edges will be detected.

```javascript
function setupAsciify() {
  // Set the threshold for the sampling process to 16
  p5asciify.renderers().get("edge").sampleThreshold(16); 
}
```

<hr/>

### The `P5AsciifyGradientRenderer` object

The `P5AsciifyGradientRenderer` object is a subclass of the `P5AsciifyRenderer` object, and can be used to apply a set of modifyable gradients/patterns to the ASCII conversion. The gradients/patterns are defined by the user and can be added multiple times to this renderer. A gradient/pattern is applied to a certain brightness range.

If a canvas contains 50% white and 50% black, and a gradient is defined from 0 to 255, the gradient will be applied to the whole canvas. If the gradient is defined from 0 to 127, the gradient will only be applied to the black part of the canvas.

#### Functions

### `.add(GradientName: "linear" | "radial" | "spiral" | "conical", brightnessStart: number, brightnessEnd: number, characters: string, params: Object): P5AsciifyGradient`

Adds a gradient/pattern to the instance of the `P5AsciifyGradientRenderer` object.

```javascript
let gradientInstance;

function setupAsciify() {
  gradientInstance = p5asciify.renderers().get("gradient").add("linear", 0, 255, " .:-=+*#%@",
    {
      direction: 1,
      angle: 0,
      speed: 0.01,
      // Add additional parameters here, otherwise the default parameters are used
    }
  );
}
```

### `.remove(gradientInstance: P5AsciifyGradient): void`

Removes a gradient/pattern from the instance of the `P5AsciifyGradientRenderer` object.

```javascript
let gradientRenderer;
let gradientInstance;

function setupAsciify() {

  gradientRenderer = p5asciify.renderers().get("gradient");

  gradientInstance = gradientRenderer.add("linear", 0, 255, " .:-=+*#%@",
    {
      direction: 1,
      angle: 0,
      speed: 0.01,
      // Add additional parameters here, otherwise the default parameters are used
    }
  );

  // Remove the gradient/pattern from the gradient renderer
  p5asciify.renderers().get("gradient").remove(gradientInstance);
}
```

<hr/>

## The `P5AsciifyGradient` object and its subclasses

When adding a gradient/pattern to the `P5AsciifyGradientRenderer` object through the `add()` function, the returned object is a concrete implementation of the abstract `P5AsciifyGradient` class. The specific subclass type (`P5AsciifyLinearGradient`, `P5AsciifyRadialGradient`, `P5AsciifySpiralGradient`, or `P5AsciifyConicalGradient`) depends on the gradient type specified in the `add()` function.

### `.brightnessStart(brightnessStart: number): void`

Sets the start of the brightness range the gradient/pattern is applied to. The value should be between `0` and `255`.

```javascript
let gradientInstance;

function setupAsciify() {
  // Add a gradient/pattern to the gradient renderer
  gradientInstance = p5asciify.renderers().get("gradient").add("linear", 0, 255, " .:-=+*#%@",
    {
    direction: 1,
    angle: 0,
    speed: 0.01,
    // Add additional parameters here, otherwise the default parameters are used
    }
  );

  // Set the start of the brightness range to 127
  gradientInstance.brightnessStart(127); 
}
```

### `.brightnessEnd(brightnessEnd: number): void`

Sets the end of the brightness range the gradient/pattern is applied to. The value should be between `0` and `255`.

```javascript
let gradientInstance;

function setupAsciify() {
  // Add a gradient/pattern to the gradient renderer
  gradientInstance = p5asciify.renderers().get("gradient").add("linear", 0, 255, " .:-=+*#%@",
    {
    direction: 1,
    angle: 0,
    speed: 0.01,
    // Add additional parameters here, otherwise the default parameters are used
    }
  );

  // Set the end of the brightness range to 127
  gradientInstance.brightnessEnd(127); 
}
```

### `.brightnessRange(brightnessStart: number, brightnessEnd: number): void`

Sets the brightness range the gradient/pattern is applied to. The values should be between `0` and `255`.

```javascript
let gradientInstance;

function setupAsciify() {
  // Add a gradient/pattern to the gradient renderer
  gradientInstance = p5asciify.renderers().get("gradient").add("linear", 0, 255, " .:-=+*#%@",
    {
    direction: 1,
    angle: 0,
    speed: 0.01,
    // Add additional parameters here, otherwise the default parameters are used
    }
  );

  // Set the brightness range to 100 and 200
  gradientInstance.brightnessRange(100, 200); 
}
```

### `.characters(characters: string): void`

Sets the characters used for the gradient/pattern. 

```javascript
let gradientInstance;

function setupAsciify() {
  // Add a gradient/pattern to the gradient renderer
  gradientInstance = p5asciify.renderers().get("gradient").add("linear", 0, 255, " .:-=+*#%@",
    {
    direction: 1,
    angle: 0,
    speed: 0.01,
    // Add additional parameters here, otherwise the default parameters are used
    }
  );

  // Set the characters for the gradient/pattern
  gradientInstance.characters("0123456789"); 
}
```

### `.enabled(enabled: boolean): void`

Sets whether the gradient/pattern should be executed or not. If set to `false`, the gradient/pattern will not be executed, but will still be part of the gradient renderer.

```javascript
let gradientInstance;

function setupAsciify() {
  // Add a gradient/pattern to the gradient renderer
  gradientInstance = p5asciify.renderers().get("gradient").add("linear", 0, 255, " .:-=+*#%@",
    {
    direction: 1,
    angle: 0,
    speed: 0.01,
    // Add additional parameters here, otherwise the default parameters are used
    }
  );

  // Disable the gradient/pattern
  gradientInstance.enabled(false); 
}
```

### `.enable(): void`

Enabled the gradient/pattern, so it will be executed during the ASCII conversion.

```javascript
let gradientInstance;

function setupAsciify() {
  // Add a gradient/pattern to the gradient renderer
  gradientInstance = p5asciify.renderers().get("gradient").add("linear", 0, 255, " .:-=+*#%@",
    {
    direction: 1,
    angle: 0,
    speed: 0.01,
    // Add additional parameters here, otherwise the default parameters are used
    }
  );

  // Enable the gradient/pattern
  gradientInstance.enable(); 
}
```

### `.disable(): void`

Disables the gradient/pattern, so it will not be executed during the ASCII conversion.

```javascript
let gradientInstance;

function setupAsciify() {
  // Add a gradient/pattern to the gradient renderer
  gradientInstance = p5asciify.renderers().get("gradient").add("linear", 0, 255, " .:-=+*#%@",
    {
    direction: 1,
    angle: 0,
    speed: 0.01,
    // Add additional parameters here, otherwise the default parameters are used
    }
  );

  // Disable the gradient/pattern
  gradientInstance.disable(); 
}
```

<hr/>

### The `P5AsciifyLinearGradient` object

The `P5AsciifyLinearGradient` object is a subclass of the `P5AsciifyGradient` object, and is used to apply a linear gradient/pattern to the ASCII conversion. It's properties are public and can be modified at any time.

#### Properties

### `direction: number`

The direction of the linear gradient. The value should be between `-1` and `1`. The default value is `1`.

### `angle: number`

The angle of the linear gradient in degrees. The value should be between `0` and `360`. The default value is `0`.

### `speed: number`

The speed of the linear gradient. The value should be between `0` and `1`. The default value is `0.01`.

### `zigzag: boolean`

Whether the linear gradient should be a zigzag pattern or not. The default value is `false`.

<hr/>

### The `P5AsciifyRadialGradient` object

The `P5AsciifyRadialGradient` object is a subclass of the `P5AsciifyGradient` object, and is used to apply a radial gradient/pattern to the ASCII conversion. It's properties are public and can be modified at any time.

#### Properties

### `direction: number`

The direction of the radial gradient. The value should be between `-1` and `1`. The default value is `1`.

### `centerX: number`

The x-coordinate of the center of the radial gradient. The value should be between `0` and `1`. The default value is `0.5`.

### `centerY: number`

The y-coordinate of the center of the radial gradient. The value should be between `0` and `1`. The default value is `0.5`.

### `radius: number`

The radius of the radial gradient. The value should be between `0` and `1`. The default value is `0.5`.

<hr/>

### The `P5AsciifySpiralGradient` object

The `P5AsciifySpiralGradient` object is a subclass of the `P5AsciifyGradient` object, and is used to apply a spiral gradient/pattern to the ASCII conversion. It's properties are public and can be modified at any time.

#### Properties

### `direction: number`

The direction of the spiral gradient. The value should be between `-1` and `1`. The default value is `1`.

### `centerX: number`

The x-coordinate of the center of the spiral gradient. The value should be between `0` and `1`. The default value is `0.5`.

### `centerY: number`

The y-coordinate of the center of the spiral gradient. The value should be between `0` and `1`. The default value is `0.5`.

### `speed: number`

The speed of the spiral gradient. The value should be between `0` and `1`. The default value is `0.01`.

### `density: number`

The density of the spiral gradient. The value should be between `0` and `1`. The default value is `0.01`.

<hr/>

### The `P5AsciifyConicalGradient` object

The `P5AsciifyConicalGradient` object is a subclass of the `P5AsciifyGradient` object, and is used to apply a conical gradient/pattern to the ASCII conversion. It's properties are public and can be modified at any time.

#### Properties

### `centerX: number`

The x-coordinate of the center of the conical gradient. The value should be between `0` and `1`. The default value is `0.5`.

### `centerY: number`

The y-coordinate of the center of the conical gradient. The value should be between `0` and `1`. The default value is `0.5`.

### `speed: number`

The speed of the conical gradient. The value should be between `0` and `1`. The default value is `0.01`.

<hr/>

Congratulations! Those are the basics of `p5.asciify`! Now you're ready to create your own ASCII art with `p5.js`.

Happy coding! (｡◕‿‿◕｡)