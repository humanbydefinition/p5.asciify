export function registerRenderingMethods(p5asciify) {
    p5.prototype.preDrawAddPush = function () {
        p5asciify.sketchFramebuffer.begin();
        this.clear();
        this.push();
    };
    p5.prototype.registerMethod("pre", p5.prototype.preDrawAddPush);

    p5.prototype.postDrawAddPop = function () {
        this.pop();
        p5asciify.sketchFramebuffer.end();
    };
    p5.prototype.registerMethod("post", p5.prototype.postDrawAddPop);

    p5.prototype.asciify = function () { p5asciify.asciify(); };
    p5.prototype.registerMethod("post", p5.prototype.asciify);
}