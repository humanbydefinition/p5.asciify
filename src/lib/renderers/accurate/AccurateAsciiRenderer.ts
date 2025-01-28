import p5 from 'p5';

import { P5AsciifyRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';

import { AsciiRendererOptions } from '../types';

import { generateCharacterSelectionShader, generateBrightnessSampleShader, generateColorSampleShader } from './shaders/shaderGenerators.min';
import brightnessSplitShader from './shaders/brightnessSplit.frag';
import vertexShader from '../../assets/shaders/vert/shader.vert';
import { P5AsciifyFontTextureAtlas } from '../../FontTextureAtlas';

/** Default configuration options for accurate ASCII renderer */
export const ACCURATE_DEFAULT_OPTIONS = {
    /** Enable/disable the renderer */
    enabled: false,
    /** Characters used for pattern matching */
    characters: "0123456789",
    /** Color of the ASCII characters. Only used when `characterColorMode` is set to `fixed` */
    characterColor: "#FFFFFF",
    /** Character color mode */
    characterColorMode: "sampled",
    /** Cell background color. Only used when `characterColorMode` is set to `fixed` */
    backgroundColor: "#000000",
    /** Background color mode */
    backgroundColorMode: "fixed",
    /** Swap the cells ASCII character colors with it's cell background colors */
    invertMode: false,
    /** Rotation angle of all characters in the grid in degrees */
    rotationAngle: 0,
}

/**
 * An ASCII renderer that attempts to accurately represent the input sketch using the available ASCII characters.
 */
export class P5AsciifyAccurateRenderer extends P5AsciifyRenderer {
    private _characterSelectionShader: p5.Shader;
    private _brightnessSampleShader: p5.Shader;
    private _colorSampleShader: p5.Shader;
    private _brightnessSplitShader: p5.Shader;
    private _brightnessSampleFramebuffer: p5.Framebuffer;
    private _brightnessSplitFramebuffer: p5.Framebuffer;

    constructor(
        p5Instance: p5,
        grid: P5AsciifyGrid,
        fontTextureAtlas: P5AsciifyFontTextureAtlas,
        options: AsciiRendererOptions = ACCURATE_DEFAULT_OPTIONS
    ) {
        const mergedOptions = { ...ACCURATE_DEFAULT_OPTIONS, ...options };
        super(p5Instance, grid, fontTextureAtlas, mergedOptions);

        this._characterSelectionShader = this._p.createShader(vertexShader, generateCharacterSelectionShader(this._fontTextureAtlas.fontSize));
        this._brightnessSampleShader = this._p.createShader(vertexShader, generateBrightnessSampleShader(this._grid.cellHeight, this._grid.cellWidth));
        this._colorSampleShader = this._p.createShader(vertexShader, generateColorSampleShader(16, this._grid.cellHeight, this._grid.cellWidth));
        this._brightnessSplitShader = this._p.createShader(vertexShader, brightnessSplitShader);

        this._brightnessSampleFramebuffer = this._p.createFramebuffer({
            density: 1,
            width: this._grid.cols,
            height: this._grid.rows,
            depthFormat: this._p.UNSIGNED_INT,
            textureFiltering: this._p.NEAREST
        });
        this._brightnessSplitFramebuffer = this._p.createFramebuffer({
            depthFormat: this._p.UNSIGNED_INT,
            textureFiltering: this._p.NEAREST
        });
    }

    resizeFramebuffers(): void {
        super.resizeFramebuffers();
        this._brightnessSampleFramebuffer.resize(this._grid.cols, this._grid.rows);
    }

    resetShaders(): void {
        this._characterSelectionShader = this._p.createShader(vertexShader, generateCharacterSelectionShader(this._fontTextureAtlas.fontSize));
        this._brightnessSampleShader = this._p.createShader(vertexShader, generateBrightnessSampleShader(this._grid.cellHeight, this._grid.cellWidth));
        this._colorSampleShader = this._p.createShader(vertexShader, generateColorSampleShader(16, this._grid.cellHeight, this._grid.cellWidth));
    }

    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: P5AsciifyRenderer): void {
        // Brightness sample pass
        this._brightnessSampleFramebuffer.begin();
        this._p.clear();
        this._p.shader(this._brightnessSampleShader);
        this._brightnessSampleShader.setUniform('u_inputImage', inputFramebuffer);
        this._brightnessSampleShader.setUniform('u_inputImageSize', [this._p.width, this._p.height]);
        this._brightnessSampleShader.setUniform('u_gridCols', this._grid.cols);
        this._brightnessSampleShader.setUniform('u_gridRows', this._grid.rows);
        this._p.rect(0, 0, this._p.width, this._p.height);
        this._brightnessSampleFramebuffer.end();

        // Brightness split pass
        this._brightnessSplitFramebuffer.begin();
        this._p.clear();
        this._p.shader(this._brightnessSplitShader);
        this._brightnessSplitShader.setUniform('u_inputImage', inputFramebuffer);
        this._brightnessSplitShader.setUniform('u_brightnessTexture', this._brightnessSampleFramebuffer);
        this._brightnessSplitShader.setUniform('u_inputImageSize', [this._p.width, this._p.height]);
        this._brightnessSplitShader.setUniform('u_gridCols', this._grid.cols);
        this._brightnessSplitShader.setUniform('u_gridRows', this._grid.rows);
        this._brightnessSplitShader.setUniform('u_pixelRatio', this._p.pixelDensity());
        this._p.rect(0, 0, this._p.width, this._p.height);
        this._brightnessSplitFramebuffer.end();

        // Primary color sample pass
        this._primaryColorFramebuffer.begin();
        if (this._options.characterColorMode === 1) {
            this._p.background(this._options.characterColor as p5.Color);
        } else {
            this._p.clear();
            this._p.shader(this._colorSampleShader);
            this._colorSampleShader.setUniform('u_inputImage', inputFramebuffer);
            this._colorSampleShader.setUniform('u_inputImageBW', this._brightnessSplitFramebuffer);
            this._colorSampleShader.setUniform('u_inputImageSize', [this._p.width, this._p.height]);
            this._colorSampleShader.setUniform('u_gridCols', this._grid.cols);
            this._colorSampleShader.setUniform('u_gridRows', this._grid.rows);
            this._colorSampleShader.setUniform('u_colorRank', 1);
            this._p.rect(0, 0, this._p.width, this._p.height);
        }
        this._primaryColorFramebuffer.end();

        // Secondary color sample pass
        this._secondaryColorFramebuffer.begin();
        if (this._options.backgroundColorMode === 1) {
            this._p.background(this._options.backgroundColor as p5.Color);
        } else {
            this._p.clear();
            this._p.shader(this._colorSampleShader);
            this._colorSampleShader.setUniform('u_inputImage', inputFramebuffer);
            this._colorSampleShader.setUniform('u_inputImageBW', this._brightnessSplitFramebuffer);
            this._colorSampleShader.setUniform('u_inputImageSize', [this._p.width, this._p.height]);
            this._colorSampleShader.setUniform('u_gridCols', this._grid.cols);
            this._colorSampleShader.setUniform('u_gridRows', this._grid.rows);
            this._colorSampleShader.setUniform('u_colorRank', 2);
            this._p.rect(0, 0, this._p.width, this._p.height);
        }
        this._secondaryColorFramebuffer.end();

        this._inversionFramebuffer.begin();
        this._p.clear();

        if (this._options.invertMode) {
            this._p.background(255);
        } else {
            this._p.background(0);
        }
        this._inversionFramebuffer.end();

        this._rotationFramebuffer.begin();
        this._p.clear();
        this._p.background(this._options.rotationAngle as p5.Color);
        this._rotationFramebuffer.end();

        // ASCII character pass
        this._characterFramebuffer.begin();
        this._p.clear();
        this._p.shader(this._characterSelectionShader);
        this._characterSelectionShader.setUniform('u_characterTexture', this._fontTextureAtlas.texture);
        this._characterSelectionShader.setUniform('u_charsetCols', this._fontTextureAtlas.charsetCols);
        this._characterSelectionShader.setUniform('u_charsetRows', this._fontTextureAtlas.charsetRows);
        this._characterSelectionShader.setUniform('u_charPaletteTexture', this._characterColorPalette.framebuffer);
        this._characterSelectionShader.setUniform('u_charPaletteSize', [this._characterColorPalette.colors.length, 1]);
        this._characterSelectionShader.setUniform('u_sketchTexture', this._brightnessSplitFramebuffer);
        this._characterSelectionShader.setUniform('u_gridCellDimensions', [this._grid.cols, this._grid.rows]);
        this._characterSelectionShader.setUniform('u_gridPixelDimensions', [this._grid.width, this._grid.height]);
        this._p.rect(0, 0, this._p.width, this._p.height);
        this._characterFramebuffer.end();

        super.render(inputFramebuffer, previousAsciiRenderer);
    }
}