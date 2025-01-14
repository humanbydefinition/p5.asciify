import p5 from 'p5';

import { AsciiRenderer, AsciiRendererOptions } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyCharacterSet } from '../../CharacterSet';
import { P5AsciifyGradientManager } from '../../gradients/GradientManager';

import grayscaleShader from './shaders/grayscale.frag';
import colorSampleShader from './shaders/colorSample.frag';
import asciiCharacterShader from './shaders/asciiCharacter.frag';
import vertexShader from '../../assets/shaders/vert/shader.vert';

/**
 * An ASCII renderer that applies all defined ASCII gradients/patterns to the input framebuffer.
 */
export default class GradientAsciiRenderer extends AsciiRenderer {
    private grayscaleShader: p5.Shader;
    private colorSampleShader: p5.Shader;
    private grayscaleFramebuffer: p5.Framebuffer;
    private prevAsciiGradientFramebuffer: p5.Framebuffer;
    private gradientManager: P5AsciifyGradientManager;

    constructor(
        p5Instance: p5,
        grid: P5AsciifyGrid,
        characterSet: P5AsciifyCharacterSet,
        gradientManager: P5AsciifyGradientManager,
        options: AsciiRendererOptions
    ) {
        super(p5Instance, grid, characterSet, options);

        this._options.characterColor = this.p.color(this._options.characterColor);
        this._options.backgroundColor = this.p.color(this._options.backgroundColor);

        this.gradientManager = gradientManager;

        this.grayscaleShader = this.p.createShader(vertexShader, grayscaleShader);
        this.colorSampleShader = this.p.createShader(vertexShader, colorSampleShader);
        this.asciiCharacterShader = this.p.createShader(vertexShader, asciiCharacterShader);

        this.grayscaleFramebuffer = this.p.createFramebuffer({
            density: 1,
            width: this.grid.cols,
            height: this.grid.rows,
            depthFormat: this.p.UNSIGNED_INT,
            textureFiltering: this.p.NEAREST
        });

        this.prevAsciiGradientFramebuffer = this.p.createFramebuffer({
            density: 1,
            width: this.grid.cols,
            height: this.grid.rows,
            depthFormat: this.p.UNSIGNED_INT,
            textureFiltering: this.p.NEAREST
        });

        this.nextAsciiGradientFramebuffer = this.p.createFramebuffer({
            density: 1,
            width: this.grid.cols,
            height: this.grid.rows,
            depthFormat: this.p.UNSIGNED_INT,
            textureFiltering: this.p.NEAREST
        });
    }

    resizeFramebuffers(): void {
        super.resizeFramebuffers();
        this.grayscaleFramebuffer.resize(this.grid.cols, this.grid.rows);
        this.prevAsciiGradientFramebuffer.resize(this.grid.cols, this.grid.rows);
    }

    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: AsciiRenderer): void {
        // Grayscale pass
        this.grayscaleFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.grayscaleShader);
        this.grayscaleShader.setUniform('u_image', inputFramebuffer);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.grayscaleFramebuffer.end();

        // Initial ASCII character setup
        this.prevAsciiGradientFramebuffer.begin();
        this.p.clear();
        this.p.image(this.grayscaleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
        this.prevAsciiGradientFramebuffer.end();

        this.nextAsciiGradientFramebuffer.begin();
        this.p.clear();
        this.p.image(this.grayscaleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2);
        this.nextAsciiGradientFramebuffer.end();

        // Gradient passes
        for (const gradient of this.gradientManager.gradients) {
            if (gradient.enabled) {
                [this.prevAsciiGradientFramebuffer, this.nextAsciiGradientFramebuffer] = [this.nextAsciiGradientFramebuffer, this.prevAsciiGradientFramebuffer];

                this.nextAsciiGradientFramebuffer.begin();
                this.p.clear();
                this.p.shader(gradient.shader);
                gradient.setUniforms(this.prevAsciiGradientFramebuffer, this.grayscaleFramebuffer);
                this.p.rect(0, 0, this.grid.cols, this.grid.rows);
                this.nextAsciiGradientFramebuffer.end();
            }
        }

        // Ascii character conversion pass
        this._asciiCharacterFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.asciiCharacterShader);
        this.asciiCharacterShader.setUniform('u_prevAsciiCharacterTexture', previousAsciiRenderer.asciiCharacterFramebuffer);
        this.asciiCharacterShader.setUniform('u_prevGradientTexture', this.grayscaleFramebuffer);
        this.asciiCharacterShader.setUniform('u_nextGradientTexture', this.nextAsciiGradientFramebuffer);
        this.asciiCharacterShader.setUniform('u_resolution', [this.grid.cols, this.grid.rows]);
        this.p.rect(0, 0, this.grid.cols, this.grid.rows);
        this._asciiCharacterFramebuffer.end();

        // Color sample passes
        this._primaryColorSampleFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.colorSampleShader);
        this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
        this.colorSampleShader.setUniform('u_previousColorTexture', previousAsciiRenderer.primaryColorSampleFramebuffer);
        this.colorSampleShader.setUniform('u_sampleTexture', this.nextAsciiGradientFramebuffer);
        this.colorSampleShader.setUniform('u_sampleReferenceTexture', this.grayscaleFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.colorSampleShader.setUniform('u_sampleMode', this._options.characterColorMode);
        this.colorSampleShader.setUniform('u_staticColor', this._options.characterColor._array);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this._primaryColorSampleFramebuffer.end();

        this._secondaryColorSampleFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.colorSampleShader);
        this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
        this.colorSampleShader.setUniform('u_previousColorTexture', previousAsciiRenderer.secondaryColorSampleFramebuffer);
        this.colorSampleShader.setUniform('u_sampleTexture', this.nextAsciiGradientFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.colorSampleShader.setUniform('u_sampleMode', this._options.backgroundColorMode);
        this.colorSampleShader.setUniform('u_staticColor', this._options.backgroundColor._array);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this._secondaryColorSampleFramebuffer.end();

        super.render(inputFramebuffer, previousAsciiRenderer);
    }
}