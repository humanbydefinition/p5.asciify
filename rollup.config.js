import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import pkg from './package.json' assert { type: 'json' };

export default [
    // ES module (for bundlers) build.
    {
        input: 'src/index.js',
        output: [
            { file: 'dist/p5.asciify.js', format: 'es' },
            { file: 'dist/p5.asciify.min.js', format: 'es', plugins: [terser()] }
        ],
        plugins: [
            resolve(), // so Rollup can find dependencies
            commonjs() // so Rollup can convert dependencies to ES modules
        ]
    }
];