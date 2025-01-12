import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
    build: {
        minify: true,
        lib: {
            entry: ['src/lib/index.ts'],
            name: 'p5.asciify',
            fileName: (format) => `p5.asciify.${format === 'es' ? 'esm' : format}.js`,
            formats: ['es', 'umd']
        },
        rollupOptions: {
            external: ['p5'],
            output: {
                globals: {
                    p5: 'p5',
                    p5asciify: 'p5asciify'
                }
            },
            plugins: [
                glsl({ compress: true }),
            ]
        }
    },
    plugins: [
        typescript()
    ],
});