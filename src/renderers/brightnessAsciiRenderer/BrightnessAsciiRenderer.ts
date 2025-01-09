import p5 from 'p5';

import { AsciiRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { CharacterSet } from '../../CharacterSet';

import vertexShader from '../../assets/shaders/vert/shader.vert';
import asciiConversionShader from '../_common_shaders/asciiConversion.frag';
import colorSampleShader from './shaders/colorSample.frag';
import asciiCharacterShader from './shaders/asciiCharacter.frag';

interface BrightnessAsciiRendererOptions {
    enabled: boolean;
    characters: string;
    characterColorMode: number;
    characterColor: p5.Color;
    backgroundColorMode: number;
    backgroundColor: p5.Color;
    invertMode: number;
    rotationAngle: number;
}

export default class BrightnessAsciiRenderer extends AsciiRenderer {
    private colorSampleShader: p5.Shader;
    private asciiCharacterShader: p5.Shader;
    private shader: p5.Shader;
    private colorSampleFramebuffer: p5.Framebuffer;

    constructor(p5Instance: p5, grid: P5AsciifyGrid, characterSet: CharacterSet, options: BrightnessAsciiRendererOptions) {
        super(p5Instance, grid, characterSet, options);

        this.colorSampleShader = this.p.createShader(vertexShader, colorSampleShader);
        this.asciiCharacterShader = this.p.createShader(vertexShader, asciiCharacterShader);
        this.shader = this.p.createShader(vertexShader, asciiConversionShader);

        this.colorSampleFramebuffer = this.p.createFramebuffer({ density: 1, width: this.grid.cols, height: this.grid.rows, depthFormat: this.p.UNSIGNED_INT, textureFiltering: this.p.NEAREST });
    }

    resizeFramebuffers(): void {
        super.resizeFramebuffers();
        this.colorSampleFramebuffer.resize(this.grid.cols, this.grid.rows);
    }

    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: AsciiRenderer, isFirstRenderer: boolean): void {

        this.colorSampleFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.colorSampleShader);
        this.colorSampleShader.setUniform('u_sketchTexture', inputFramebuffer);
        this.colorSampleShader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.colorSampleFramebuffer.end();

        this.primaryColorSampleFramebuffer.begin();
        if (this.options.characterColorMode === 1) {
            this.p.background(this.options.characterColor);
        } else {
            this.p.clear();
            this.p.image(this.colorSampleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2, this.grid.cols, this.grid.rows);
        }
        this.primaryColorSampleFramebuffer.end();

        this.secondaryColorSampleFramebuffer.begin();
        if (this.options.backgroundColorMode === 1) {
            this.p.background(this.options.backgroundColor);
        } else {
            this.p.clear();
            this.p.image(this.colorSampleFramebuffer, -this.grid.cols / 2, -this.grid.rows / 2, this.grid.cols, this.grid.rows);
        }
        this.secondaryColorSampleFramebuffer.end();

        this.asciiCharacterFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.asciiCharacterShader);
        this.asciiCharacterShader.setUniform('u_textureSize', [this.grid.cols, this.grid.rows]);
        this.asciiCharacterShader.setUniform('u_colorSampleFramebuffer', this.colorSampleFramebuffer);
        this.asciiCharacterShader.setUniform('u_charPaletteTexture', this.characterSet.characterColorPalette.framebuffer);
        this.asciiCharacterShader.setUniform('u_charPaletteSize', [this.characterSet.characterColorPalette.framebuffer.width, 1]);

        this.p.rect(0, 0, this.p.width, this.p.height);
        this.asciiCharacterFramebuffer.end();

        this.outputFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.shader);
        this.shader.setUniform('u_layer', 1);
        this.shader.setUniform('u_pixelRatio', this.p.pixelDensity());
        this.shader.setUniform('u_resolution', [this.p.width, this.p.height]);
        this.shader.setUniform('u_characterTexture', this.characterSet.asciiFontTextureAtlas.texture);
        this.shader.setUniform('u_charsetDimensions', [this.characterSet.asciiFontTextureAtlas.charsetCols, this.characterSet.asciiFontTextureAtlas.charsetRows]);
        this.shader.setUniform('u_primaryColorTexture', this.primaryColorSampleFramebuffer);
        this.shader.setUniform('u_secondaryColorTexture', this.secondaryColorSampleFramebuffer);
        this.shader.setUniform('u_asciiCharacterTexture', this.asciiCharacterFramebuffer);
        if (!isFirstRenderer) {
            this.shader.setUniform('u_prevAsciiTexture', previousAsciiRenderer.getOutputFramebuffer());
        }
        this.shader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
        this.shader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
        this.shader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.shader.setUniform('u_invertMode', this.options.invertMode);
        this.shader.setUniform('u_rotationAngle', this.p.radians(this.options.rotationAngle));
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.outputFramebuffer.end();
    }
}