import p5 from 'p5';
import { P5AsciifyGrid } from '../Grid';
import { P5AsciifyFontManager } from '../FontManager';
import vertexShader from '../assets/shaders/vert/shader.vert';
import asciiConversionShader from './asciiConversion.frag';
import { P5AsciifyError } from '../AsciifyError';

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

    /** The background color for the ASCII output. */
    private _backgroundColor: string | p5.Color | [number, number?, number?, number?] = "#000000";

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
     * Sets the background color for the ASCII output.
     * @param color The color to set as the background. Can be a string, p5.Color, or an array of RGBA values.
     * @throws {@link P5AsciifyError} - If the color is not a string, array or p5.Color.
     * @ignore
     */
    public background(color: string | p5.Color | [number, number?, number?, number?]) {
        if (typeof color !== "string" && !Array.isArray(color) && !(color instanceof p5.Color)) {
            throw new P5AsciifyError(`Invalid color type: ${typeof color}. Expected string, array or p5.Color.`);
        }

        this._backgroundColor = color;
    }

    /**
     * Renders the ASCII output to the result framebuffer.
     * @param characterFramebuffer The framebuffer containing the character indices.
     * @param primaryColorFramebuffer The framebuffer containing the primary color values.
     * @param secondaryColorFramebuffer The framebuffer containing the secondary color values.
     * @param inversionFramebuffer The framebuffer containing the inversion values.
     * @param rotationFramebuffer The framebuffer containing the rotation values.
     * @ignore
     */
    render(
        characterFramebuffer: p5.Framebuffer,
        primaryColorFramebuffer: p5.Framebuffer,
        secondaryColorFramebuffer: p5.Framebuffer,
        inversionFramebuffer: p5.Framebuffer,
        rotationFramebuffer: p5.Framebuffer
    ) {
        this._resultFramebuffer.begin();

        this._p.background(this._backgroundColor as p5.Color);
        this._p.shader(this._shader);

        const uniforms = {
            u_pixelRatio: this._p.pixelDensity(),
            u_characterTexture: this._fontManager.texture,
            u_charsetDimensions: [this._fontManager.textureColumns, this._fontManager.textureRows],
            u_primaryColorTexture: primaryColorFramebuffer,
            u_secondaryColorTexture: secondaryColorFramebuffer,
            u_inversionTexture: inversionFramebuffer,
            u_rotationTexture: rotationFramebuffer,
            u_asciiCharacterTexture: characterFramebuffer,
            u_gridPixelDimensions: [this._grid.width, this._grid.height],
            u_gridCellDimensions: [this._grid.cols, this._grid.rows],
        };

        for (const [key, value] of Object.entries(uniforms)) {
            this._shader.setUniform(key, value);
        }

        this._p.rect(0, 0, this._p.width, this._p.height);
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
     * Returns the framebuffer containing the final ASCII output.
     * @ignore
     */
    get resultFramebuffer() { return this._resultFramebuffer; }

    /**
     * Returns the background color for the ASCII output.
     * @ignore
     */
    get backgroundColor() { return this._backgroundColor; }
};