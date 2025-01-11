import * as p5 from 'p5';

declare module 'p5' {
    interface Shader {
        // Extend the existing setUniform definition by adding Framebuffer
        setUniform(uniformName: string, data: Parameters<p5.Shader['setUniform']>[1] | p5.Framebuffer): void;
    }

    interface Color {
        _array: number[];
    }
}