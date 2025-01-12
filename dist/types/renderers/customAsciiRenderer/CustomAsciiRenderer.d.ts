import p5 from 'p5';
import { AsciiRenderer, AsciiRendererOptions } from '../AsciiRenderer';
import { P5AsciifyGrid } from '../../Grid';
import { P5AsciifyCharacterSet } from '../../CharacterSet';
export default class CustomAsciiRenderer extends AsciiRenderer {
    private shader;
    constructor(p5Instance: p5, grid: P5AsciifyGrid, characterSet: P5AsciifyCharacterSet, options: AsciiRendererOptions);
    render(inputFramebuffer: p5.Framebuffer, previousAsciiRenderer: AsciiRenderer, isFirstRenderer: boolean): void;
}
