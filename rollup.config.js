import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import inject from '@rollup/plugin-inject';
import terser from '@rollup/plugin-terser';
import glslify from 'rollup-plugin-glslify';
import { string } from "rollup-plugin-string";
import typescript from '@rollup/plugin-typescript';

export default [
    {
        input: 'src/index.js',
        output: [
            { 
                file: 'dist/p5.asciify.js', 
                format: 'umd', 
                name: 'P5Asciify',
                globals: { p5: 'p5' } // Assumes p5 will be available globally
            },
            { 
                file: 'dist/p5.asciify.min.js', 
                format: 'umd', 
                name: 'P5Asciify',
                globals: { p5: 'p5' },
                plugins: [terser()]
            }
        ],
        plugins: [
            typescript(),
            glslify(),
            string({
                include: "**/*.txt"
            }),
            resolve(),
            commonjs(),  // Convert CommonJS modules to ES6
            inject({
                p5: 'p5'   // Injects p5 globally for use in modules
            })
        ],
        external: ['p5']  // Prevents p5 from being bundled
    }
];
