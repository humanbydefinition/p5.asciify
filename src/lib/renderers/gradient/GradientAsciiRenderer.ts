import p5 from 'p5';

import { P5AsciifyRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyCharacterSet } from '../../CharacterSet';
import { P5AsciifyGradientManager } from '../../gradients/GradientManager';

import { AsciiRendererOptions } from '../types';

import grayscaleShader from './shaders/grayscale.frag';
import colorSampleShader from './shaders/colorSample.frag';
import inversionShader from './shaders/gridCellInversion.frag';
import asciiCharacterShader from './shaders/asciiCharacter.frag';
import vertexShader from '../../assets/shaders/vert/shader.vert';

/**
 * An ASCII renderer that applies all defined ASCII gradients/patterns to the input framebuffer.
 */
export class P5AsciifyGradientRenderer extends P5AsciifyRenderer {
    private grayscaleShader: p5.Shader;
    private colorSampleShader: p5.Shader;
    private grayscaleFramebuffer: p5.Framebuffer;
    private inversionShader: p5.Shader;
    private asciiCharacterShader: p5.Shader;
    private prevAsciiGradientFramebuffer: p5.Framebuffer;
    private nextAsciiGradientFramebuffer: p5.Framebuffer;
    private gradientManager: P5AsciifyGradientManager;

    constructor(
        p5Instance: p5,
        grid: P5AsciifyGrid,
        characterSet: P5AsciifyCharacterSet,
        gradientManager: P5AsciifyGradientManager,
        options: AsciiRendererOptions
    ) {
        super(p5Instance, grid, characterSet, options);

        this.gradientManager = gradientManager;

        this.grayscaleShader = this.p.createShader(vertexShader, grayscaleShader);
        this.colorSampleShader = this.p.createShader(vertexShader, colorSampleShader);
        this.inversionShader = this.p.createShader(vertexShader, inversionShader);
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
        this.nextAsciiGradientFramebuffer.resize(this.grid.cols, this.grid.rows);
    }

    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: P5AsciifyRenderer): void {
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
        if (previousAsciiRenderer !== this) {
            this.asciiCharacterShader.setUniform('u_prevAsciiCharacterTexture', previousAsciiRenderer.asciiCharacterFramebuffer);
        }
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
        if (previousAsciiRenderer !== this) {
            this.colorSampleShader.setUniform('u_previousColorTexture', previousAsciiRenderer.primaryColorSampleFramebuffer);
        }
        this.colorSampleShader.setUniform('u_sampleTexture', this.nextAsciiGradientFramebuffer);
        this.colorSampleShader.setUniform('u_sampleReferenceTexture', this.grayscaleFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.colorSampleShader.setUniform('u_sampleMode', this._options.characterColorMode as number);
        this.colorSampleShader.setUniform('u_staticColor', (this._options.characterColor as p5.Color)._array);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this._primaryColorSampleFramebuffer.end();

        this._secondaryColorSampleFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.colorSampleShader);
        this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
        if (previousAsciiRenderer !== this) {
            this.colorSampleShader.setUniform('u_previousColorTexture', previousAsciiRenderer.secondaryColorSampleFramebuffer);
        }
        this.colorSampleShader.setUniform('u_sampleTexture', this.nextAsciiGradientFramebuffer);
        this.colorSampleShader.setUniform('u_sampleReferenceTexture', this.grayscaleFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.colorSampleShader.setUniform('u_sampleMode', this._options.backgroundColorMode as number);
        this.colorSampleShader.setUniform('u_staticColor', (this._options.backgroundColor as p5.Color)._array);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this._secondaryColorSampleFramebuffer.end();

        // Inversion pass
        this._inversionFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.inversionShader);
        this.inversionShader.setUniform('u_invert', this._options.invertMode);
        this.inversionShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.inversionShader.setUniform('u_sampleTexture', this.nextAsciiGradientFramebuffer);
        this.inversionShader.setUniform('u_sampleReferenceTexture', this.grayscaleFramebuffer);
        if (previousAsciiRenderer !== this) {
            this.inversionShader.setUniform('u_previousInversionTexture', previousAsciiRenderer.inversionFramebuffer);
        }
        this.p.rect(0, 0, this.p.width, this.p.height);
        this._inversionFramebuffer.end();


        super.render(inputFramebuffer, previousAsciiRenderer);
    }
}