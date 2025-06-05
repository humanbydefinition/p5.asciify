---
sidebar_position: 8
title: Live coding with p5.asciify
---

:::note
This guide is a work in progress and will be updated with more information soon. If you have any questions or suggestions, feel free to join our community on [Discord](https://discord.gg/sjrw8QXNks)!
:::

Thanks to the real-time rendering capabilities of `p5.asciify`, it is a great fit for live coding environments. You can use `p5.asciify` with `p5.js` in various live coding environments like [P5LIVE](https://teddavis.org/p5live/), [Hydra](https://hydra.ojack.xyz/), [flok](https://flok.cc/), and others.


At the time of writing, I highly recommend using [P5LIVE](https://teddavis.org/p5live/) for live coding with `p5.asciify`, as it's currently the only environment where I was able to do updates to the `p5.asciify` properties during run-time without having to hard reset the sketch. While I was able to get `p5.asciify` working in any live coding environment, I had to hard reset the sketch to update the properties in Hydra and flok. **If you find a way to update `p5.asciify` properties in Hydra or flok without hard resetting the sketch, please join our [Discord community](https://discord.gg/sjrw8QXNks) and let us know!**

## Live coding with `p5.asciify` in `P5LIVE`

