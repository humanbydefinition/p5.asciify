---
sidebar_position: 8
title: Live coding with p5.asciify
---



Thanks to the real-time rendering capabilities of `p5.asciify`, it is a great fit for live coding environments. You can use `p5.asciify` with `p5.js` in various live coding environments like [P5LIVE](https://teddavis.org/p5live/), [Hydra](https://hydra.ojack.xyz/), [flok](https://flok.cc/), and others.

Even though I'm not a live coder myself, I did a lot of testing with `p5.asciify` in these environments to ensure live-codeability without having to hard reset the sketch. I found that `p5.asciify` works well in all of them, but there are some quirks to be aware of.

To make live coding with `p5.asciify` easier, I’ve enhanced the library in the [`v0.10.0`](https://github.com/humanbydefinition/p5.asciify/releases/tag/v0.10.0) release. I highly recommend using the latest version to benefit from these improvements. This guide and its examples are based on `v0.10.0` or later, so be sure to use an up-to-date version.

In this guide we'll explore how to use `p5.asciify` in the mentioned live coding environments. Each section will cover the specific quirks of using `p5.asciify` in that environment, along with heavily commented code examples, demonstrating how to set up and use `p5.asciify` effectively in a live coding context.

:::note

I would love to hear your feedback and suggestions on how to improve the experience of using `p5.asciify` in live coding environments. If you have any tips or tricks, please share them with us in the [Discord](https://discord.gg/sjrw8QXNks)! 

As I'm not a live coder, my code examples might not follow the best practices for live coding. If you have suggestions for better practices, please let me know!

This guide is a work in progress, and I will continue to update it with more examples and tips as I learn more about live coding with `p5.asciify`. If you have any specific requests or questions, feel free to reach out!
:::

## Live coding with `P5LIVE`

As the name suggests, [P5LIVE](https://teddavis.org/p5live/) by [Ted Davis](https://teddavis.org/) is a live coding environment specifically designed for `p5.js`. It provides a simple interface to write and run `p5.js` sketches, making it an excellent choice for live coding with `p5.asciify`.

To get started, visit the [P5LIVE website](https://teddavis.org/p5live/) and create a new sketch. You can then use the following code snippet to set up `p5.asciify` in a `P5LIVE` environment. Otherwise, you can also click the following link to open the example sketch directly: [P5LIVE example sketch](https://p5live.org/?code=LyoNCgloeWRyYSDihpIgcDUuanMg4oaSIHA1LmFzY2lpZnkgcGlwZWxpbmUNCglieSBAaHVtYW5ieWRlZmluaXRpb24gKGh0dHBzOi8vZ2l0aHViLmNvbS9odW1hbmJ5ZGVmaW5pdGlvbikNCglwNS5hc2NpaWZ5IGxpdmUgY29kaW5nIGd1aWRlOiBodHRwczovL3A1LnRleHRtb2RlLmFydC9kb2NzL2d1aWRlcy9saXZlY29kaW5nDQoJDQoJYmFzZWQgb24gdGhlICdfaHlkcmFfdGV4dHVyZScgZXhhbXBsZSBwcm92aWRlZCBieSBvamFjay54eXogJiB0ZWRkYXZpcy5vcmcNCgllZGl0IGh5ZHJhIGNvZGUgd2l0aGluIG9wZW4gKyBjbG9zZSAnLy8gc2FuZGJveCcgdGFncyBmb3IgY2hhbmdlcyB3L28gcmVjb21waWxpbmcgcDUhDQoJaHlkcmEgY2hlYXRzaGVldHM6IGh0dHBzOi8vaHlkcmEub2phY2sueHl6L2FwaS8gKyBodHRwczovL2h5ZHJhLm9qYWNrLnh5ei9kb2NzDQogKi8NCg0KLy8gSW1wb3J0ICdoeWRyYS1zeW50aCcsICdwNS5hc2NpaWZ5JyBhbmQgYGh5NWAgdG8gUDVMSVZFDQpsZXQgbGlicyA9IFsNCgknaHR0cHM6Ly91bnBrZy5jb20vaHlkcmEtc3ludGgnLA0KCSdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL3A1LmFzY2lpZnlAMC4xMC4wL2Rpc3QvcDUuYXNjaWlmeS51bWQubWluLmpzJywNCgknaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL2ZmZDgvaHk1QG1haW4vaHk1LmpzJw0KXQ0KDQoNCi8vIFJ1biB0aGUgaHlkcmEgc2tldGNoDQoNCi8vIHNhbmRib3gNCg0Kb3NjKDYwLCAwLjEsIDEuNSkNCiAgLnJvdGF0ZSgwLjMpDQogIC5tdWx0KG9zYygyMCwgLTAuMSwgMSkubW9kdWxhdGUobm9pemUoMywgMSkpKQ0KICAuY29sb3IoMC44LCAwLjYsIDEuMCkNCiAgLm91dCgpOw0KDQpILmhpZGUoKSAvLyBIaWRlIHRoZSBoeWRyYSBjYW52YXMNCi8vIEgucGQoLjUpIC8vIGV4dHJhIGxvZmkgPCAuNSAhDQoNCi8vIHMwLmluaXRQNSgpIC8vIHA1IGJhY2sgaW50byBoeWRyYT8hIHVzZSBzcmMoczApDQoNCi8vIHNhbmRib3gNCg0KLy8gUHJlcGFyZSB0d28gc2VwYXJhdGUgYXNjaWlmaWVycyB0byBhcHBseSBhc2NpaSBjb252ZXJzaW9uIGluIHBhcmFsbGVsDQovLyBJbiB0aGlzIGV4YW1wbGUsIHR3byBicmlnaHRuZXNzIHJlbmRlcmVycyBhcmUgYXBwbGllZCB0byB2YXJ5aW5nIGJyaWdodG5lc3MgcmFuZ2VzDQpsZXQgYXNjaWlmaWVyMTsgDQpsZXQgYnJpZ2h0bmVzc1JlbmRlcmVyMTsNCmxldCBhc2NpaWZpZXIyOw0KbGV0IGJyaWdodG5lc3NSZW5kZXJlcjI7DQoNCmZ1bmN0aW9uIHNldHVwKCkgew0KCWNyZWF0ZUNhbnZhcyh3aW5kb3dXaWR0aCwgd2luZG93SGVpZ2h0LCBXRUJHTCk7DQoJDQoJLy8gU2V0IHRoZSBlcnJvciBsZXZlbCBmb3IgYHA1LmFzY2lpZnlgDQoJLy8gVXNpbmcgYFdBUk5JTkdgLCANCgkvLyBwNS5hc2NpaWZ5IHdvbid0IGNyYXNoIGlmIHlvdSBwYXNzIGlsbGVnYWwgcGFyYW1ldGVycyB0byBwNS5hc2NpaWZ5IGZ1bmN0aW9ucywNCgkvLyBhbmQga2VlcCBpdCdzIHByZXZpb3VzIHN0YXRlDQoJcDVhc2NpaWZ5LnNldEVycm9yTGV2ZWwoUDVBc2NpaWZ5RXJyb3JMZXZlbC5XQVJOSU5HKTsNCgkNCgkvLyBEaXNhYmxlIHA1LmFzY2lpZnkgaG9va3MgYXR0YWNoZWQgdG8gdGhlIHA1LmpzIGxpZmVjeWNsZQ0KCS8vIFdlIGhhbmRsZSB0aGlzIG1hbnVhbGx5LCBvdGhlcndpc2UgdGhlcmUgd291bGQgYmUgdXNhZ2UtcmVzdHJpY3RpbmcgcXVpcmtzLCANCgkvLyBsaWtlIG5vdCBiZWluZyBhYmxlIHRvIGRyYXcgb24gdG9wIG9mIHRoZSBhc2NpaWZpZWQgdGV4dHVyZS4NCglwNWFzY2lpZnkuZGVhY3RpdmF0ZUhvb2soImFmdGVyU2V0dXAiKTsNCglwNWFzY2lpZnkuZGVhY3RpdmF0ZUhvb2soInByZSIpOw0KCXA1YXNjaWlmeS5kZWFjdGl2YXRlSG9vaygicG9zdCIpOw0KCQ0KCS8vIFNldCB1cCBwNS5hc2NpaWZ5IG1hbnVhbGx5DQoJcDVhc2NpaWZ5LnNldHVwKCk7DQoJDQoJLy8gYHNldHVwQXNjaWlmeWAgYXJlYQ0KCS8vIEZyb20gaGVyZSwgYW5kIHRocm91Z2hvdXQgdGhlIGRyYXcgbG9vcCwgDQoJLy8geW91IGNhbiBhY2Nlc3MgYW5kIG1vZGlmeSBldmVyeXRoaW5nIHA1LmFzY2lpZnkgaGFzIHRvIG9mZmVyDQoJDQoJLy8gRmV0Y2ggdGhlIGRlZmF1bHQgYXNjaWlmaWVyIGFzIHRoZSBmaXJzdCBhc2NpaWZpZXINCglhc2NpaWZpZXIxID0gcDVhc2NpaWZ5LmFzY2lpZmllcigpOw0KCWJyaWdodG5lc3NSZW5kZXJlcjEgPSBhc2NpaWZpZXIxLnJlbmRlcmVycygpLmdldCgiYnJpZ2h0bmVzcyIpOw0KCQ0KCS8vIEFkZCBhIG5ldyBhc2NpaWZpZXIgYXMgdGhlIHNlY29uZCBhc2NpaWZpZXINCglhc2NpaWZpZXIyID0gcDVhc2NpaWZ5LmFkZCgpOw0KCWJyaWdodG5lc3NSZW5kZXJlcjIgPSBhc2NpaWZpZXIyLnJlbmRlcmVycygpLmdldCgiYnJpZ2h0bmVzcyIpOw0KCQ0KCS8vIE1vZGlmeSB0aGUgZm9udCBzaXplcw0KCWFzY2lpZmllcjEuZm9udFNpemUoMTYpOw0KCWFzY2lpZmllcjIuZm9udFNpemUoMzIpOw0KCQ0KCS8vIEVtcHR5IGdyaWQgY2VsbHMgd2lsbCBiZSBsZWZ0IHRyYW5zcGFyZW50IGluIHRoZSBhc2NpaWZpZWQgdGV4dHVyZXMNCglhc2NpaWZpZXIxLmJhY2tncm91bmQoWzAsIDAsIDAsIDBdKTsNCglhc2NpaWZpZXIyLmJhY2tncm91bmQoWzAsIDAsIDAsIDBdKTsNCn0NCg0KZnVuY3Rpb24gZHJhdygpIHsNCgkvLyBVcGRhdGUgcHJvcGVydGllcyBvZiB0aGUgcDUuYXNjaWlmeSByZW5kZXJlcnMgZHVyaW5nIHJ1bi10aW1lDQoJYnJpZ2h0bmVzc1JlbmRlcmVyMS5jaGFyYWN0ZXJzKCIgLjotPSsqIyVAIik7DQoJYnJpZ2h0bmVzc1JlbmRlcmVyMS5pbnZlcnQoZmFsc2UpOw0KCWJyaWdodG5lc3NSZW5kZXJlcjEuYmFja2dyb3VuZENvbG9yTW9kZSgic2FtcGxlZCIpOw0KCWJyaWdodG5lc3NSZW5kZXJlcjEuY2hhcmFjdGVyQ29sb3JNb2RlKCJmaXhlZCIpOw0KCWJyaWdodG5lc3NSZW5kZXJlcjEucm90YXRpb24oMCk7IC8vIGluIGRlZ3JlZXMNCglicmlnaHRuZXNzUmVuZGVyZXIxLmJyaWdodG5lc3NSYW5nZShbMCwgNjNdKQ0KCS8vLi4uDQoJDQoJYnJpZ2h0bmVzc1JlbmRlcmVyMi5icmlnaHRuZXNzUmFuZ2UoWzY0LCAyNTVdKTsNCgkvLy4uLg0KCQ0KCS8vIFVwZGF0ZSBhc2NpaWZpZXIgcHJvcGVydGllcyBsaWtlIHRoZSBmb250IHNpemUsIC4uDQoJYXNjaWlmaWVyMS5mb250U2l6ZSgxNik7DQoJLy8uLi4NCgkNCgkvLyBEcmF3IHRoZSBoeWRyYSB0ZXh0dXJlIHRvIHRoZSBwNS5hc2NpaWZ5IHNrZXRjaCBmcmFtZWJ1ZmZlcg0KCXA1YXNjaWlmeS5za2V0Y2hGcmFtZWJ1ZmZlci5iZWdpbigpOw0KCWJhY2tncm91bmQoMCk7DQoJSC5nZXQoKTsNCgl0ZXh0dXJlKGgwKTsNCglwbGFuZSh3aWR0aCwgaGVpZ2h0KTsNCglwNWFzY2lpZnkuc2tldGNoRnJhbWVidWZmZXIuZW5kKCk7DQoJDQoJLy8gQ2FsbCBgYXNjaWlmeSgpYCBtYW51YWxseSB0byBnZW5lcmF0ZSB0aGUgYXNjaWlmaWVkIHRleHR1cmVzDQoJcDVhc2NpaWZ5LmFzY2lpZnkoKTsNCgkNCgkvLyBEcmF3IHRoZSBhc2NpaWZpZWQgdGV4dHVyZSB0byB0aGUgY2FudmFzLg0KCWJhY2tncm91bmQoMCk7DQoJaW1hZ2UoYXNjaWlmaWVyMS50ZXh0dXJlLCAtd2lkdGgvMiwgLWhlaWdodC8yKTsNCglpbWFnZShhc2NpaWZpZXIyLnRleHR1cmUsIC13aWR0aC8yLCAtaGVpZ2h0LzIpOw0KCQ0KCS8vIGBkcmF3QXNjaWlmeWAgYXJlYQ0KCS8vIFdpdGggdGhlIGFzY2lpZmllZCB0ZXh0dXJlcyBkcmF3biB0byB0aGUgY2FudmFzLCB3ZSBjYW4gZHJhdyBvbiB0b3AgaGVyZQ0KCQ0KCS8vIERyYXcgdGV4dCBvbiB0b3Agb2YgdGhlIGFzY2lpZmllZCBjb250ZW50DQoJdGV4dEZvbnQoYXNjaWlmaWVyMS5mb250TWFuYWdlci5mb250KTsNCglub1N0cm9rZSgpOw0KCXRleHRTaXplKDY0KTsNCgl0ZXh0QWxpZ24oQ0VOVEVSLCBDRU5URVIpOw0KCXRleHQoImxpdmUgY29kaW5nIiwgMCwgLTEwMCk7DQoJdGV4dCgid2l0aCIsIDAsIDApOw0KCXRleHQoInA1LmFzY2lpZnkiLCAwLCAxMDApOw0KfQ0KDQovLyBSZXNpemUgdGhlIHA1LmpzIGNhbnZhcw0KLy8gYHA1LmFzY2lpZnlgIGlzIHJlc3BvbnNpdmUgYnkgZGVmYXVsdCB3aXRoIGNhbnZhcyBzaXplIGNoYW5nZXMsIHVwZGF0aW5nIHRoZSBncmlkIGRpbWVuc2lvbnMNCmZ1bmN0aW9uIHdpbmRvd1Jlc2l6ZWQoKSB7DQoJcmVzaXplQ2FudmFzKHdpbmRvd1dpZHRoLCB3aW5kb3dIZWlnaHQpOw0KfQ==).

```javascript
/*
	hydra → p5.js → p5.asciify pipeline
	by @humanbydefinition (https://github.com/humanbydefinition)
	p5.asciify live coding guide: https://p5.textmode.art/docs/guides/livecoding
	
	based on the '_hydra_texture' example provided by ojack.xyz & teddavis.org
	edit hydra code within open + close '// sandbox' tags for changes w/o recompiling p5!
	hydra cheatsheets: https://hydra.ojack.xyz/api/ + https://hydra.ojack.xyz/docs
 */

// Import 'hydra-synth', 'p5.asciify' and `hy5` to P5LIVE
let libs = [
	'https://unpkg.com/hydra-synth',
	'https://cdn.jsdelivr.net/npm/p5.asciify@0.10.0/dist/p5.asciify.umd.min.js',
	'https://cdn.jsdelivr.net/gh/ffd8/hy5@main/hy5.js'
]


// Run the hydra sketch

// sandbox

osc(60, 0.1, 1.5)
  .rotate(0.3)
  .mult(osc(20, -0.1, 1).modulate(noize(3, 1)))
  .color(0.8, 0.6, 1.0)
  .out();

H.hide() // Hide the hydra canvas
// H.pd(.5) // extra lofi < .5 !

// s0.initP5() // p5 back into hydra?! use src(s0)

// sandbox

// Prepare two separate asciifiers to apply ascii conversion in parallel
// In this example, two brightness renderers are applied to varying brightness ranges
let asciifier1; 
let brightnessRenderer1;
let asciifier2;
let brightnessRenderer2;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	
	// Set the error level for `p5.asciify`
	// Using `WARNING`, 
	// p5.asciify won't crash if you pass illegal parameters to p5.asciify functions,
	// and keep it's previous state
	p5asciify.setErrorLevel(P5AsciifyErrorLevel.WARNING);
	
	// Disable p5.asciify hooks attached to the p5.js lifecycle
	// We handle this manually, otherwise there would be usage-restricting quirks, 
	// like not being able to draw on top of the asciified texture.
	p5asciify.deactivateHook("afterSetup");
	p5asciify.deactivateHook("pre");
	p5asciify.deactivateHook("post");
	
	// Set up p5.asciify manually
	p5asciify.setup();
	
	// `setupAsciify` area
	// From here, and throughout the draw loop, 
	// you can access and modify everything p5.asciify has to offer
	
	// Fetch the default asciifier as the first asciifier
	asciifier1 = p5asciify.asciifier();
	brightnessRenderer1 = asciifier1.renderers().get("brightness");
	
	// Add a new asciifier as the second asciifier
	asciifier2 = p5asciify.add();
	brightnessRenderer2 = asciifier2.renderers().get("brightness");
	
	// Modify the font sizes
	asciifier1.fontSize(16);
	asciifier2.fontSize(32);
	
	// Empty grid cells will be left transparent in the asciified textures
	asciifier1.background([0, 0, 0, 0]);
	asciifier2.background([0, 0, 0, 0]);
}

function draw() {
	// Update properties of the p5.asciify renderers during run-time
	brightnessRenderer1.characters(" .:-=+*#%@");
	brightnessRenderer1.invert(false);
	brightnessRenderer1.backgroundColorMode("sampled");
	brightnessRenderer1.characterColorMode("fixed");
	brightnessRenderer1.rotation(0); // in degrees
	brightnessRenderer1.brightnessRange([0, 63])
	//...
	
	brightnessRenderer2.brightnessRange([64, 255]);
	//...
	
	// Update asciifier properties like the font size, ..
	asciifier1.fontSize(16);
	//...
	
	// Draw the hydra texture to the p5.asciify sketch framebuffer
	p5asciify.sketchFramebuffer.begin();
	background(0);
	H.get();
	texture(h0);
	plane(width, height);
	p5asciify.sketchFramebuffer.end();
	
	// Call `asciify()` manually to generate the asciified textures
	p5asciify.asciify();
	
	// Draw the asciified texture to the canvas.
	background(0);
	image(asciifier1.texture, -width/2, -height/2);
	image(asciifier2.texture, -width/2, -height/2);
	
	// `drawAsciify` area
	// With the asciified textures drawn to the canvas, we can draw on top here
	
	// Draw text on top of the asciified content
	textFont(asciifier1.fontManager.font);
	noStroke();
	textSize(64);
	textAlign(CENTER, CENTER);
	text("live coding", 0, -100);
	text("with", 0, 0);
	text("p5.asciify", 0, 100);
}

// Resize the p5.js canvas
// `p5.asciify` is responsive by default with canvas size changes, updating the grid dimensions
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
```

## Live coding with `flok`

[flok](https://github.com/munshkr/flok) is a web-based P2P collaborative editor for live coding music and graphics by [@munshkr](https://github.com/munshkr). It allows multiple users to collaborate in real-time, making it a great platform for live coding with `p5.asciify`.

To get started, visit the [flok website](https://flok.cc/) and make sure you are in a `hydra` tab. You can then use the following code snippet to set up `p5.asciify` in a `flok` environment:.

```javascript
/*
	hydra → p5.js → p5.asciify → hydra pipeline
	by @humanbydefinition (https://github.com/humanbydefinition)
	p5.asciify live coding guide: https://p5.textmode.art/docs/guides/livecoding
 */

// Import `hydra-synth` and `p5.asciify`
await loadScript("https://cdn.jsdelivr.net/npm/hydra-synth@1.3.29/dist/hydra-synth.min.js");
await loadScript("https://cdn.jsdelivr.net/npm/p5.asciify@0.10.0/dist/p5.asciify.umd.min.js");

// Set the error level for `p5.asciify`
// Using `WARNING`, p5.asciify won't crash if you pass illegal parameters to p5.asciify functions, and keep it's previous state instead
p5asciify.setErrorLevel(P5AsciifyErrorLevel.WARNING);

// Initialize the first hydra canvas, which will be passed to the p5.js canvas
window.hydraCanvas = document.createElement('canvas');
hydraCanvas.width = window.innerWidth;
hydraCanvas.height = window.innerHeight;
hydraCanvas.style.display = 'none';
document.body.appendChild(hydraCanvas);

// Create the initial hydra object and attach it to the global context, so we can reference it at any time
window.h1 = new Hydra({
  canvas: hydraCanvas,
  detectAudio: false,
  makeGlobal: false
});

// Run the initial hydra simulation (This block can be soft-compiled during run-time)
h1.synth.osc(60, 0.1, 1.5)
  .rotate(0.3)
  .mult(h1.synth.osc(20, -0.1, 1).modulate(h1.synth.noise(3, 1)))
  .color(0.8, 0.6, 1.0)
  .out();

// Create a new p5.js instance and attach it to the global context
window.p5i = new P5({mode: 'webgl'})
p5i.hide();

// By nature, flok loads p5.asciify without hooks enabled
// That's why we initialize and set up `p5.asciify` manually
await p5asciify.init(p5i);
await p5asciify.setup();

// Create a p5.Graphics object which will contain the initial hydra texture to asciify
window.pg = p5i.createGraphics(window.innerWidth, window.innerHeight);

// Fetch the default asciifier as the first asciifier
window.asciifier1 = p5asciify.asciifier();
window.brightnessRenderer1 = asciifier1.renderers().get("brightness");
	
// Add a new asciifier as the second asciifier
window.asciifier2 = p5asciify.add();
window.brightnessRenderer2 = asciifier2.renderers().get("brightness");

// Modify the font sizes (Can be soft-compiled during run-time)
asciifier1.fontSize(16);
asciifier2.fontSize(32);

// Empty grid cells will be left transparent in the asciified textures (Can be soft-compiled during run-time)
asciifier1.background([0, 0, 0, 0]); 
asciifier2.background([0, 0, 0, 0]);

// Update the properties of the brightness renderers (Blocks can be soft-compiled during run-time)
// When properties are updated in `draw`, they have priority over the definitions here
brightnessRenderer1.update({
    enabled: true,
    characters: " .:-=+*#%@",
    characterColor: "#ffffff",
    characterColorMode: 'sampled',
    backgroundColor: "#000000",
    backgroundColorMode: 'fixed',
    invert: false,
    rotation: 0,
    flipHorizontally: false,
    flipVertically: false,
    brightnessRange: [0, 255],
  });

brightnessRenderer2.update({
    enabled: true,
    characters: " .:-=+*#%@",
    characterColor: "#ffffff",
    characterColorMode: 'sampled',
    backgroundColor: "#000000",
    backgroundColorMode: 'fixed',
    invert: false,
    rotation: 0,
    flipHorizontally: false,
    flipVertically: false,
    brightnessRange: [0, 255],
  });

// p5.js draw loop (The whole function can be soft-compiled during run-time)
p5i.draw = () => {

  // Update properties of the p5.asciify renderers during run-time
  brightnessRenderer1.characters(" .:-=+*#%@");
  brightnessRenderer1.invert(false);
  brightnessRenderer1.backgroundColorMode("sampled");
  brightnessRenderer1.characterColorMode("fixed");
  brightnessRenderer1.rotation(0); // in degrees
  brightnessRenderer1.brightnessRange([0, 63])
  //...
  
  brightnessRenderer2.brightnessRange([64, 255]);
  //...
  
  // Update asciifier properties like the font size, ..
  asciifier1.fontSize(16);
  //...

  // Clear pg and re-draw the hydra canvas to it.
  pg.clear();
  pg.drawingContext.drawImage(hydraCanvas, 0, 0, p5i.width, p5i.height);

  // Update the p5.asciify main framebuffer with the content to asciify
  p5asciify.sketchFramebuffer.begin();
  p5i.clear();
  p5i.image(pg, -p5i.width / 2, -p5i.height / 2);
  p5asciify.sketchFramebuffer.end();
  
  // Call `asciify()` manually to generate the asciified textures
  p5asciify.asciify();

  // Draw the asciified texture to the canvas.
  p5i.background(0);
  p5i.image(asciifier1.texture, -width/2, -height/2);
  p5i.image(asciifier2.texture, -width/2, -height/2);

  // `drawAsciify` area
  // With the asciified textures drawn to the canvas, we can draw on top here

  // Draw text on top of the asciified content
  p5i.textFont(asciifier1.fontManager.font);
  p5i.noStroke();
  p5i.textSize(64);
  p5i.fill(255);
  p5i.textAlign(p5i.CENTER, p5i.CENTER);
  p5i.text("live coding", 0, -100);
  p5i.text("with", 0, 0);
  p5i.text("p5.asciify", 0, 100);
}

// Resize the p5.js canvas and pg (holds the initial hydra texture to asciify)
// `p5.asciify` is responsive by default with canvas size changes, updating the grid dimensions
p5i.windowResized = () => {
  p5i.resizeCanvas(p5i.windowWidth, p5i.windowHeight);
  pg = p5i.createGraphics(p5i.windowWidth, p5i.windowHeight);

  // Also update the resolution of the initial hydra canvas
  h1.setResolution(p5i.windowWidth, p5i.windowHeight);
}

// Initialize the final hydra canvas with the p5.js texture
s0.init({ src: p5i.canvas });

// Run the final hydra simulation (Block can be soft-compiled during run-time)
src(s0)
  .modulateRotate(osc(8, 0.15).kaleid(8), 0.8)
  //.color(1.1, 0.9, 1.3)
  .contrast(1.2)
  .modulateScale(noise(1.5, 0.08), 0.15)
  //.blend(src(s0).shift(0.01, 0.01, 0.01), 0.8)
  .out();
```

## Live coding with the `hydra` web editor
[hydra](https://hydra.ojack.xyz/) is a live coding environment for visuals, created by [@ojack](https://github.com/ojack). Unfortunately, `p5.asciify` is currently not compatible with the official hydra web editor, as it is running an older version of `p5.js` that is not compatible with `p5.asciify`. 

Running the web editor locally with the latest version of `p5.js` and `p5.asciify` is possible, but it requires some setup. If you are interested in this, please let me know in the [Discord](https://discord.gg/sjrw8QXNks) and I can provide a guide on how to set it up.

Otherwise, I might make a pull request to the hydra web editor to update the `p5.js` version, but I haven't had the time to do this yet. If that eventually happens, I will update this guide accordingly.