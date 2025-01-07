export function registerOptionsMethods(p5asciify) {
    p5.prototype.setAsciifyBorderColor = function (color) {
        p5asciify.borderColor = this.color(color);
    }

    p5.prototype.setAsciifyFontSize = function (fontSize) {
        p5asciify.fontSize = fontSize;

        if(this._setupDone) {
            p5asciify.asciiFontTextureAtlas.setFontSize(fontSize);
            p5asciify.grid.resizeCellPixelDimensions(this.asciiFontTextureAtlas.maxGlyphDimensions.width, this.asciiFontTextureAtlas.maxGlyphDimensions.height);
            p5asciify.rendererManager.renderers.forEach(renderer => renderer.resetShaders());
            p5asciify.rendererManager.textAsciiRenderer.updateFontSize();
        }
    }

    p5.prototype.setAsciifyPostSetupFunction = function (postSetupFunction) {
        p5asciify.postSetupFunction = postSetupFunction;
    };

    p5.prototype.setAsciifyPostDrawFunction = function (postDrawFunction) {
        p5asciify.postDrawFunction = postDrawFunction;
    };
}