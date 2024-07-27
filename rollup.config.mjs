import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json' assert { type: 'json' };

export default [
    // browser-friendly UMD build
    {
        input: 'src/prototypes.js',
        output: {
            name: 'p5.asciify',
            file: pkg.browser,
            format: 'umd'
        },
        plugins: [
            resolve(), // so Rollup can find dependencies
            commonjs() // so Rollup can convert dependencies to ES modules
        ]
    },

    // CommonJS (for Node) and ES module (for bundlers) build.
    {
        input: 'src/prototypes.js',
        output: [
            { file: pkg.main, format: 'cjs' },
            { file: pkg.module, format: 'es' }
        ]
    }
];