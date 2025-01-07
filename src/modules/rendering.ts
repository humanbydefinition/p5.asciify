import { Asciifier } from '../Asciifier';
import p5 from 'p5';

export function registerRenderingMethods(p5asciify: Asciifier): void {
    p5.prototype.preDrawAddPush = function (): void {
        p5asciify.sketchFramebuffer.begin();
        this.clear();
        this.push();
    };
    p5.prototype.registerMethod("pre", p5.prototype.preDrawAddPush);

    p5.prototype.postDrawAddPop = function (): void {
        this.pop();
        p5asciify.sketchFramebuffer.end();
    };
    p5.prototype.registerMethod("post", p5.prototype.postDrawAddPop);

    p5.prototype.asciify = function (): void {
        p5asciify.asciify();
    };
    p5.prototype.registerMethod("post", p5.prototype.asciify);
}