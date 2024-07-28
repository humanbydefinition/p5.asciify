import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import glslify from 'rollup-plugin-glslify';
import { string } from "rollup-plugin-string";

export default [
    {
        input: 'src/index.js',
        output: [
            { file: 'dist/p5.asciify.js', format: 'es' },
            { file: 'dist/p5.asciify.min.js', format: 'es', plugins: [terser()] }
        ],
        plugins: [
            glslify(),
            string({
                include: "**/*.txt"
            }),
            resolve(), // so Rollup can find dependencies
        ]
    }
];