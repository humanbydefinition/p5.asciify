import { P5Asciifier } from '../Asciifier.js';
import p5 from 'p5';

export function registerOptionsMethods(p5asciify: P5Asciifier): void {
    p5.prototype.setAsciifyBorderColor = function (this: p5, color: p5.Color | string): void {
        p5asciify.borderColor = this.color(color);
    };

    p5.prototype.setAsciifyFontSize = function (this: p5, fontSize: number): void {
        p5asciify.fontSize = fontSize;
    };

    p5.prototype.setAsciifyPostSetupFunction = function (this: p5, postSetupFunction: () => void): void {
        p5asciify.postSetupFunction = postSetupFunction;
    };

    p5.prototype.setAsciifyPostDrawFunction = function (this: p5, postDrawFunction: () => void): void {
        p5asciify.postDrawFunction = postDrawFunction;
    };
}