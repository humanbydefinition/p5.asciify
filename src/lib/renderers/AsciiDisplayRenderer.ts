import p5 from 'p5';
import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyFontManager } from '../FontManager';
import vertexShader from '../assets/shaders/vert/shader.vert';
import asciiConversionShader from './asciiConversion.frag';

/**
 * Handles the final rendering of the ASCII output based on the final textures from the rendering pipeline.
 * 
 * @remarks
 * This class is managed by the {@link P5AsciifyRendererManager} class to render the final ASCII output.
 */
export class P5AsciifyDisplayRenderer {

    /** The asciified texture */
    private _resultFramebuffer: p5.Framebuffer;

    /** Final shader to render the ASCII output. */
    private _shader: p5.Shader;

    /** Background mode: 0 for fixed background color, 1 for sampled background color */
    private _backgroundMode: 0 | 1 = 0;

    /**
     * Creates a new `P5AsciifyDisplayRenderer` instance.
     * @param _p The p5 instance.
     * @param _grid The grid instance.
     * @param _fontManager The font texture atlas instance.
     * @ignore
     */
    constructor(
        private _p: p5,
        private _grid: P5AsciifyGrid,
        private _fontManager: P5AsciifyFontManager,
    ) {
        this._shader = this._p.createShader(vertexShader, asciiConversionShader);

        this._resultFramebuffer = this._p.createFramebuffer({
            width: this._grid.width,
            height: this._grid.height,
            depthFormat: this._p.UNSIGNED_INT,
            textureFiltering: this._p.NEAREST
        });
    };

    /**
     * Renders the ASCII output to the result framebuffer.
     * @param characterFramebuffer The framebuffer containing the character indices.
     * @param primaryColorFramebuffer The framebuffer containing the primary color values.
     * @param secondaryColorFramebuffer The framebuffer containing the secondary color values.
     * @param transformFramebuffer The framebuffer containing the inversion values.
     * @param rotationFramebuffer The framebuffer containing the rotation values.
     * @ignore
     */
    render(
        characterFramebuffer: p5.Framebuffer,
        primaryColorFramebuffer: p5.Framebuffer,
        secondaryColorFramebuffer: p5.Framebuffer,
        transformFramebuffer: p5.Framebuffer,
        rotationFramebuffer: p5.Framebuffer,
        captureFramebuffer: p5.Framebuffer,
    ) {
        this._resultFramebuffer.begin();
        this._p.clear();
        this._p.shader(this._shader);

        const uniforms = {
            u_pixelRatio: this._p.pixelDensity(),
            u_characterTexture: this._fontManager.texture,
            u_charsetDimensions: [this._fontManager.textureColumns, this._fontManager.textureRows],
            u_primaryColorTexture: primaryColorFramebuffer,
            u_secondaryColorTexture: secondaryColorFramebuffer,
            u_transformTexture: transformFramebuffer,
            u_rotationTexture: rotationFramebuffer,
            u_captureTexture: captureFramebuffer,
            u_captureDimensions: [captureFramebuffer.width, captureFramebuffer.height],
            u_asciiCharacterTexture: characterFramebuffer,
            u_gridPixelDimensions: [this._grid.width, this._grid.height],
            u_gridCellDimensions: [this._grid.cols, this._grid.rows],
            u_backgroundMode: this._backgroundMode || 0, // Default to 0 (fixed background color)
        };

        for (const [key, value] of Object.entries(uniforms)) {
            this._shader.setUniform(key, value);
        }

        this._p.rect(0, 0, this._resultFramebuffer.width, this._resultFramebuffer.height);
        this._resultFramebuffer.end();
    }

    /**
     * Resizes the framebuffer to match the grid width/height.
     * @ignore
     */
    public resizeFramebuffers() {
        this._resultFramebuffer.resize(this._grid.width, this._grid.height);
    }

    /**
     * Sets the background mode for the ASCII output.
     * @param mode - 0 for fixed background color, 1 for sampled background color.
     * @ignore
     */
    public backgroundMode(mode: 0 | 1) {
        this._backgroundMode = mode;
    }

    /**
     * Returns the framebuffer containing the final ASCII output.
     * @ignore
     */
    get resultFramebuffer() { return this._resultFramebuffer; }
};