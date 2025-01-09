import p5 from 'p5';
import { AsciiRenderer } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyCharacterSet } from '../../CharacterSet';
import vertexShader from '../../assets/shaders/vert/shader.vert';
import asciiConversionShader from '../_common_shaders/asciiConversion.frag';

interface CustomAsciiRendererOptions {
    enabled: boolean;
}

export default class CustomAsciiRenderer extends AsciiRenderer {
    private shader: p5.Shader;

    constructor(p5Instance: p5, grid: P5AsciifyGrid, characterSet: P5AsciifyCharacterSet, options: CustomAsciiRendererOptions) {
        super(p5Instance, grid, characterSet, options);
        this.shader = this.p.createShader(vertexShader, asciiConversionShader);
    }

    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: AsciiRenderer, isFirstRenderer: boolean): void {
        this.outputFramebuffer.begin();
        this.p.clear();
        this.p.shader(this.shader);
        this.shader.setUniform('u_layer', 4);
        this.shader.setUniform('u_pixelRatio', this.p.pixelDensity());
        this.shader.setUniform('u_resolution', [this.p.width, this.p.height]);
        this.shader.setUniform('u_characterTexture', this.characterSet.asciiFontTextureAtlas.texture);
        this.shader.setUniform('u_charsetDimensions', [this.characterSet.asciiFontTextureAtlas.charsetCols, this.characterSet.asciiFontTextureAtlas.charsetRows]);
        this.shader.setUniform('u_primaryColorTexture', this.primaryColorSampleFramebuffer);
        if (!isFirstRenderer) {
            this.shader.setUniform('u_prevAsciiTexture', previousAsciiRenderer.getOutputFramebuffer());
        }
        this.shader.setUniform('u_secondaryColorTexture', this.secondaryColorSampleFramebuffer);
        this.shader.setUniform('u_asciiCharacterTexture', this.asciiCharacterFramebuffer);
        this.shader.setUniform('u_gridPixelDimensions', [this.grid.width, this.grid.height]);
        this.shader.setUniform('u_gridOffsetDimensions', [this.grid.offsetX, this.grid.offsetY]);
        this.shader.setUniform('u_gridCellDimensions', [this.grid.cols, this.grid.rows]);
        this.shader.setUniform('u_invertMode', 0);
        this.shader.setUniform('u_rotationAngle', 0);
        this.p.rect(0, 0, this.p.width, this.p.height);
        this.outputFramebuffer.end();
    }
}