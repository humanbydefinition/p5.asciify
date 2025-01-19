import p5 from 'p5';
import { p5asciify } from '../../src/lib/index';

const sketch = (p) => {
    let rectangles = [];
    let maxRectangles = 30;

    class Rectangle {
        constructor() {
            this.x = p.random(-p.windowWidth / 2, p.windowWidth / 2);
            this.y = p.random(-p.windowHeight / 2, p.windowHeight / 2);
            this.size = 0;
            this.maxSize = p.random(50, 200);
            this.growing = true;
            this.color = p.color(p.random(255), p.random(255), p.random(255));
            this.angle = p.random(p.TWO_PI);
        }

        update() {
            if (this.growing) {
                this.size = p.min(this.size + 3, this.maxSize);
                this.growing = this.size < this.maxSize;
            } else {
                this.size = p.max(this.size - 3, 0);
                if (this.size === 0) return true;
            }

            if (!this.growing && p.random() < 0.01) this.growing = true;
            if (p.random() < 0.01) this.growing = false;

            return false;
        }

        display() {
            p.push();
            p.translate(this.x, this.y);
            p.rotate(this.angle);
            p.fill(this.color);
            p.rect(-this.size / 2, -this.size / 2, this.size, this.size);
            p.pop();
        }
    }

    p5asciify.instance(p);

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

        for (let i = 0; i < maxRectangles; i++) rectangles.push(new Rectangle());
    };

    p.setupAsciify = () => {
        p5asciify.fontSize(8);

        p5asciify.renderer("edge").updateOptions({
            enabled: true,
            characters: "-/|\\-/|\\",
            characterColor: "#ffffff",
            characterColorMode: 1,
            backgroundColor: "#000000",
            backgroundColorMode: 1,
            invertMode: false,
            sobelThreshold: 0.01,
            sampleThreshold: 16,
        });
    };

    p.draw = () => {
        p.background(0);
        p.noStroke();

        rectangles = rectangles.filter((rect) => {
            rect.update();
            rect.display();
            return rect.size > 0;
        });

        while (rectangles.length < maxRectangles) rectangles.push(new Rectangle());
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
};

const myp5 = new p5(sketch);