---
sidebar_position: 4
title: Running multiple rendering pipelines in parallel
---

import MultipleAsciifiersSketch from '!!raw-loader!./sketches/multiple-asciifiers/00_multiple_asciifiers_sketch.js';
import SandpackEditor from '@site/src/components/SandpackEditor/SandpackEditor';

So far we have only used the default [`P5Asciifier`](../api/classes/P5Asciifier) instance provided by the [`p5asciify`](../api/variables/p5asciify) object, which applies ASCII conversion to the main canvas. However, you can create multiple [`P5Asciifier`](../api/classes/P5Asciifier) instances to run different rendering pipelines in parallel on any texture or the main canvas. This is useful for creating complex visual effects or combining different rendering techniques with varying fonts, font sizes, grids, and other parameters.

## Example

<SandpackEditor
  sketch={MultipleAsciifiersSketch}
  template="static"
/>

## Explanation

In the example above, we fetch the default [`P5Asciifier`](../api/classes/P5Asciifier) instance into `defaultAsciifier` and create a new [`P5Asciifier`](../api/classes/P5Asciifier) instance in [`setupAsciify()`](../api/interfaces/P5AsciifyExtensions#setupasciify) using [`p5asciify.add()`](../api/classes/P5AsciifierManager#add). This new instance is stored in the `customAsciifier` variable. The newly added [`P5Asciifier`](../api/classes/P5Asciifier) instance is applied to the `customFramebuffer` texture, which is created anywhere during setup.

The newly added [`P5Asciifier`](../api/classes/P5Asciifier) instance has the same properties and renderers defined as the default one, but you can customize it to your liking. For example, you can set a different font, font size, or grid size for the new instance. You can also add or remove renderers from the new instance without affecting the default one.

Within the [`draw()`](https://p5js.org/reference/p5/draw/) loop, we now draw varying content to the `customFramebuffer` and the main canvas. While our default [`P5Asciifier`](../api/classes/P5Asciifier) instance is still applied to the main canvas and generates the ASCII representation of it, the new [`P5Asciifier`](../api/classes/P5Asciifier) instance creates an ASCII representation of the `customFramebuffer` texture.

To provide total freedom to the user, using multiple [`P5Asciifier`](../api/classes/P5Asciifier) instances requires you to utilize the [`drawAsciify()`](../api/interfaces/P5AsciifyExtensions#drawasciify) function to draw the respective textures containing the ASCII representations to the main canvas. In [`drawAsciify()`](../api/interfaces/P5AsciifyExtensions#drawasciify), we first clear the main canvas and then draw the textures containing the ASCII representations in any order/position/size/rotation/.. to the main canvas. 