import { P5Asciifier } from '../Asciifier';
import p5 from 'p5';

/**
 * Registers the rendering methods to the p5.js instance.
 */
export function registerRenderingMethods(p5asciify: P5Asciifier): void {

    /**
     * Add `drawAsciify` function to p5 instance, which can be overridden by the user.
     * This function is called after the p5.asciify draw has been completed.
     */
    p5.prototype.drawAsciify = function(): void {};

    /**
     * Adds a pre-draw method to the p5.js instance which wraps the user draw loop in a framebuffer.
     */
    p5.prototype.registerMethod("pre", function (this: p5): void {
        p5asciify.sketchFramebuffer.begin();
        this.clear();
        this.push();
    });

    /**
     * Adds a post-draw method to the p5.js instance which ends the framebuffer and calls the asciify method.
     */
    p5.prototype.registerMethod("post", function (this: p5): void {
        this.pop();
        p5asciify.sketchFramebuffer.end();

        p5asciify.rendererManager.render(p5asciify.sketchFramebuffer, p5asciify.borderColor);
        this.drawAsciify();
    });
}