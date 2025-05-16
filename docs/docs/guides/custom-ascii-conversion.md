---
sidebar_position: 3
title: Custom ASCII Renderers
---

import CustomRendererSetupSketch from '!!raw-loader!./sketches/customRenderer/00_custom_setup_sketch.js';
import CharacterFramebufferSketch from '!!raw-loader!./sketches/customRenderer/01_characterFB_sketch.js';
import DVDLogoSketch from '!!raw-loader!./sketches/customRenderer/02_dvd_logo_sketch.js';
import SandpackEditor from '@site/src/components/SandpackEditor/SandpackEditor';

To unleash the full potential of `p5.asciify`, you can create your own custom ASCII renderers, allowing for unlimited possibilities in how you want to display your sketches by controlling every single grid cell and its properties individually.

Let's start by looking at how `p5.asciify` performs the conversion of a texture into an ASCII representation to understand which properties we can control and how to do so.

## How does `p5.asciify` convert a texture into an ASCII representation?

At the core, each and every single renderer type provided by `p5.asciify` consists of a range of framebuffers/textures that are used to control the properties of each grid cell individually. While pre-defined renderers like the `P5AsciifyBrightnessRenderer` or `P5AsciifyAccurateRenderer` use these framebuffers on their own, we have to populate those framebuffers manually in our custom renderers within the `draw()` function of our sketch.

If you have an instance of a custom renderer stored in a variable called `customRenderer`, you can access these framebuffers using the following properties within the `setupAsciify()` function and onward:

- `customRenderer.characterFramebuffer`
    - Each pixel determines which character to render in the corresponding grid cell.
- `customRenderer.primaryColorFramebuffer`
    - Each pixel determines the character color to render in the corresponding grid cell.
- `customRenderer.secondaryColorFramebuffer`
    - Each pixel determines the background color to render in the corresponding grid cell.
- `customRenderer.rotationFramebuffer`
    - Each pixel determines the rotation of the character to render in the corresponding grid cell.
- `customRenderer.transformFramebuffer`
    - Each pixels color channel defines the transformation of the character in the corresponding grid cell:
        - Red channel: Swap the character and background color *(0 or 1)*
        - Green channel: Horizontal flipping *(0 or 1)*
        - Blue channel: Vertical flipping *(0 or 1)*

All of these framebuffers share the same dimensions and are always equal to the grid dimensions in columns and rows, which are responsive based on the current font, canvas- & font-size by default.

Each framebuffer and it's pixels are processed differently, some more complex than others, but the basic idea is to populate each pixel of the framebuffers with a value that corresponds to the properties we want to control in our ASCII representation. While some framebuffers like the `primaryColorFramebuffer` and `secondaryColorFramebuffer` are pretty straightforward, others like the `characterFramebuffer` require a bit more work to display the characters we want. If a pixel in the `characterFramebuffer` is left transparent, the whole grid cell will be left transparent as well, making what's behind visible.

After the `draw()` function of your sketch has been executed, the `p5.asciify` library will automatically read the values of each ASCII converters five framebuffers in your pipeline and merge them into five combined framebuffers, which are then used to render the final ASCII representation of an `P5Asciifier` instance based on the canvas content or the texture provided to it. In the case of custom renderers, the canvas or texture content doesn't matter, as the ASCII representation is solely based on the framebuffers populated by you during the `draw()` function of your sketch.

## Creating a custom ASCII renderer

For simplicity, let's create a custom ASCII renderer without the use of shaders, but with some handy methods provided by the `P5Asciifier` instances to make our life easier when populating the `characterFramebuffer`.

:::info
If you want to learn how to use shaders with custom ASCII renderers provided by `p5.asciify`, which will yield the best performance, there currently only is a relatively advanced example available to check out: [**OpenProcessing**](#)

Feel free to create a pull request with a more beginner-friendly example, or reach out to me if you need help with it! (◕‿◕✿) Your sketches can also be featured throughout the documentation if you want to share them with the world! Appropriate credit will be given to you, of course! (｡♥‿♥｡)
:::

### Setting up the renderer

Let's start by fetching and enabling the `'custom2D'` renderer in the `asciifier` instance, similar to how we did it with the `"edge"` render in the [**Your First Rendering Pipeline**](#) guide. As described above, we'll also need variables to store the framebuffers we want to populate in our sketch. For now, we'll populate the framebuffers primitively, but we'll add some more advanced features later on.

<SandpackEditor
  sketch={CustomRendererSetupSketch}
  template="static"
/>

<br />

As you can see, it's technically quite simple to populate the framebuffers, and you might already get an idea how each framebuffer is populated and processed to get the desired properties in each grid cell. Up next, let's take a look how we can populate each framebuffer in more detail.

### Populating the framebuffers

#### Populating the `characterFramebuffer`

Let's start with the `characterFramebuffer`, which is the most complex one to populate technically. Luckily, `p5.asciify` provides us with handy methods to make our life easier. Let's try displaying the word `"p5.asciify"` in the ASCII representation of our sketch.

<SandpackEditor
  sketch={CharacterFramebufferSketch}
  template="static"
/>

<br />

In here we are using a previously unintroduced property `asciifier.fontManager`, which is the `P5AsciifyFontManager` instance of the `asciifier` instance. The `P5AsciifyFontManager` is responsible for managing the font used in the ASCII representation and provides us with methods to get relevant information about each character in the font, and which color to use for each character.

Using `asciifier.fontManager.glyphColors(string)` we can get an array of RGB colors for each character in the string. Likewise, there is `.glyphColor(char)` to get the RGB colors of a single character.

With this functionality we can easily populate the `characterFramebuffer` with the characters we want to display in the ASCII representation. One good exercise would be to create a reusable class that is able to render a split-flap display animation onto the `characterFramebuffer`.

In this example we are just using the three most relevant framebuffers to get a basic ASCII representation going: The `characterFramebuffer`, the `primaryColorFramebuffer` and the `secondaryColorFramebuffer`. The other three framebuffers are not used in this example, but you can still use them to add more advanced features to your custom renderer.

#### Populating the `rotationFramebuffer`

Since the `primaryColorFramebuffer` and `secondaryColorFramebuffer` are straightforward to populate without any special processing, let's take a look at the `rotationFramebuffer` next. This framebuffer is used to rotate the character in the corresponding grid cell. Right now the rotation is defined in degrees and a bit weird to use, but it works well enough for now.

In general, using the `rotationFramebuffer` makes the most sense when working with monospaced fonts where each character has the same width and height. Additionally, the rotations `0`, `90`, `180` and `270` degrees are the ones that most likely make sense to use, but you can use any degree you want and play around with it.

As seen in the first example, the `rotationFramebuffer` was populated with `background(0, 0, 0);` to basically apply no rotation to all the cells in the ASCII representation.

Let's look at how the other recommended rotations can be applied to the `rotationFramebuffer`:
- `0°`
    - Keep the pixel black `(0, 0, 0)` or transparent `(0, 0, 0, 0)`.
- `90°`
    - `background("rgb(25%, 0%, 0%)");`
- `180°`
    - `background("rgb(50%, 0%, 0%)");`
- `270°`
    - `background("rgb(75%, 0%, 0%)");`

That should give a rough idea of how to populate the `rotationFramebuffer` and how to use it. In the future this may be changed to use a more intuitive way of defining the rotation, also tied to the `angleMode()` function of `p5.js`.

#### Populating the `transformFramebuffer`

The `transformFramebuffer` allows you to apply various transformations to each character in your grid. Each pixel's RGB channels control different transformation properties:

- **Red channel**: Controls character/background color swapping. Setting this channel to `255` will swap the primary and secondary colors for that cell.
- **Green channel**: Controls horizontal flipping. Setting this channel to `255` will flip the character horizontally.
- **Blue channel**: Controls vertical flipping. Setting this channel to `255` will flip the character vertically.

You can combine these transformations by setting multiple channels. For example:
- To swap colors and flip horizontally: `color(255, 255, 0)`
- To flip both horizontally and vertically: `color(0, 255, 255)`
- To apply all three transformations: `color(255, 255, 255)`

### Bringing it all together

Now that we have a rough idea of how to populate the framebuffers, let's bring it all together by refining the previous sketch and creating a bouncing DVD logo animation! To spice thing up a bit, we will also utilize the `primaryColorFramebuffer` and `inversionFramebuffer` to randomly change the color of the logo and swap the character and background color every time it hits the edge of the grid.

<SandpackEditor
  sketch={DVDLogoSketch}
  template="static"
/>

### Conclusion

We have now created a custom ASCII renderer that is able to display the word `"p5.asciify"` in the ASCII representation of our sketch, and animate the text similar to the infamous bouncing DVD logo screensaver! We also learned how to populate the `characterFramebuffer`, `primaryColorFramebuffer`, `secondaryColorFramebuffer`, `rotationFramebuffer`, `inversionFramebuffer` and `flipFramebuffer` to control the properties of each grid cell individually.
We also learned how to use the `P5AsciifyFontManager` to get the relevant information about each character in the font and how to use it to populate the `characterFramebuffer`.

This is just the beginning, and there are many more possibilities to explore. You can create your own custom ASCII renderers with shaders, or even combine multiple renderers to create complex rendering pipelines. The only limit is your imagination!