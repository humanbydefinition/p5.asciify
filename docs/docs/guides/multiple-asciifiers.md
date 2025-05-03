---
sidebar_position: 4
title: Running multiple rendering pipelines in parallel
---

So far we have only used the default `P5Asciifier` instance provided by the `p5asciify` object, which applies ASCII conversion to the main canvas. However, you can create multiple `P5Asciifier` instances to run different rendering pipelines in parallel on any texture or the main canvas. This is useful for creating complex visual effects or combining different rendering techniques.

In this guide, we will show you how to create multiple `P5Asciifier` instances and use them to render different effects in parallel.

todo