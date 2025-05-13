import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
    server: {
        open: '/examples/index.html',
    },
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
                    p5: 'p5'
                },
                // Preserve modules structure
                preserveModules: true,
                // Output directory for preserve modules
                preserveModulesRoot: 'src/lib'
            },
        }
    },
    plugins: [
        glsl({ compress: true }),
    ],
});