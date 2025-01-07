import P5AsciifyFontTextureAtlas from './fontTextureAtlas.js';
import P5AsciifyGrid from './grid.js';

import P5AsciifyEventEmitter from './eventemitter.js';

import { RendererManager } from './managers/RendererManager';

class Asciifier {

    borderColor = "#000000";
    fontSize = 16;

    rendererManager = new RendererManager();

    font = null;

    postSetupFunction = null;
    postDrawFunction = null;

    instance(p) {
        this.p5Instance = p;

        this.p5Instance.preload = () => { }; // Define a default preload function in case the user doesn't provide one
    }

    /**
     * Sets up the P5Asciify library with the specified options after the user's setup() function finished.
     */
    setup() {
        this.borderColor = this.p5Instance.color(this.borderColor);

        this.asciiFontTextureAtlas = new P5AsciifyFontTextureAtlas({ p5Instance: this.p5Instance, font: this.font, fontSize: this.fontSize });
        this.grid = new P5AsciifyGrid(this.p5Instance, this.asciiFontTextureAtlas.maxGlyphDimensions.width, this.asciiFontTextureAtlas.maxGlyphDimensions.height);

        this.rendererManager.setup(this.p5Instance, this.grid, this.asciiFontTextureAtlas);

        this.events = new P5AsciifyEventEmitter();

        this.sketchFramebuffer = this.p5Instance.createFramebuffer({ depthFormat: this.p5Instance.UNSIGNED_INT, textureFiltering: this.p5Instance.NEAREST });

        if (this.postSetupFunction) {
            this.postSetupFunction();
        }
    }

    emit(eventName, data) {
        this.events.emit(eventName, data);
    }

    on(eventName, callback) {
        this.events.on(eventName, callback);
    }

    off(eventName, callback) {
        this.events.off(eventName, callback);
    }

    /**
     * Runs the rendering pipeline for the P5Asciify library.
     */
    asciify() {
        this.rendererManager.render(this.sketchFramebuffer, this.borderColor);

        if (this.postDrawFunction) {
            this.postDrawFunction();
        }
    }
}

export default Asciifier;