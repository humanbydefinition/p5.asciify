---
sidebar_position: 8
title: Live coding with p5.asciify
---



Thanks to the real-time rendering capabilities of `p5.asciify`, it is a great fit for live coding environments. You can use `p5.asciify` with `p5.js` in various live coding environments like [P5LIVE](https://teddavis.org/p5live/), [Hydra](https://hydra.ojack.xyz/), [flok](https://flok.cc/), and others.

Even though I'm not a live coder myself, I did a lot of testing with `p5.asciify` in these environments to ensure live-codeability without having to hard reset the sketch. I found that `p5.asciify` works well in all of them, but there are some limitations and quirks to be aware of.

To make live coding with `p5.asciify` easier, I’ve enhanced the library in the `v0.10.0` release. I highly recommend using the latest version to benefit from these improvements. This guide and its examples are based on `v0.10.0` or later, so be sure to use an up-to-date version.

In this guide we'll explore how to use `p5.asciify` in the mentioned live coding environments. Each section will cover the specific quirks and limitations of using `p5.asciify` in that environment, along with heavily commented code examples, demonstrating how to set up and use `p5.asciify` effectively in a live coding context.

:::note

I would love to hear your feedback and suggestions on how to improve the experience of using `p5.asciify` in live coding environments. If you have any tips or tricks, please share them with us in the [Discord](https://discord.gg/sjrw8QXNks)! 

As I'm not a live coder, my code examples might not follow the best practices for live coding. If you have suggestions for better practices, please let me know!
:::

## Live coding with `p5.asciify` in `P5LIVE`

As the name suggests, [P5LIVE](https://teddavis.org/p5live/) by [Ted Davis](https://teddavis.org/) is a live coding environment specifically designed for `p5.js`. It provides a simple interface to write and run `p5.js` sketches, making it an excellent choice for live coding with `p5.asciify`.

## Live coding with `p5.asciify` in `flok`