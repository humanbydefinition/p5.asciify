export function registerRenderingMethods(p5asciify) {
    p5.prototype.preDrawAddPush = function () {
        p5asciify.sketchFramebuffer.begin();
        p5asciify.p5Instance.clear();
        p5asciify.p5Instance.push();
    };
    p5.prototype.registerMethod("pre", p5.prototype.preDrawAddPush);

    p5.prototype.postDrawAddPop = function () {
        p5asciify.p5Instance.pop();
        p5asciify.sketchFramebuffer.end();
    };
    p5.prototype.registerMethod("post", p5.prototype.postDrawAddPop);

    p5.prototype.asciify = function () { p5asciify.asciify(); };
    p5.prototype.registerMethod("post", p5.prototype.asciify);
}