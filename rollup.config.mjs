import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import pkg from './package.json' assert { type: 'json' };

export default [
    // browser-friendly UMD build
    {
        input: 'src/index.js',
        output: [
            {
                name: 'p5.asciify',
                file: pkg.browser,
                format: 'umd'
            },
            {
                name: 'p5.asciify',
                file: 'dist/p5.asciify.umd.min.js',
                format: 'umd',
                plugins: [terser()]
            }
        ],
        plugins: [
            resolve(), // so Rollup can find dependencies
            commonjs() // so Rollup can convert dependencies to ES modules
        ]
    },

    // CommonJS (for Node) and ES module (for bundlers) build.
    {
        input: 'src/index.js',
        output: [
            { file: pkg.main, format: 'cjs' },
            { file: pkg.module, format: 'es' },
            { file: 'dist/p5.asciify.cjs.min.js', format: 'cjs', plugins: [terser()] },
            { file: 'dist/p5.asciify.esm.min.js', format: 'es', plugins: [terser()] }
        ]
    }
];
