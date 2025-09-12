import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { SITE } from './src/config.mjs';

export default defineConfig(() => {
    return {
        base: SITE.basePathname,
        plugins: [
            qwikCity({
                trailingSlash: SITE.trailingSlash,
            }),
            qwikVite(),
            tsconfigPaths(),
        ],
        preview: {
            headers: {
                'Cache-Control': 'public, max-age=600',
            },
        },
        // Add SSR configuration to externalize Node.js built-ins
        ssr: {
            noExternal: [/^node:.*/], // Externalize all Node.js built-ins (e.g., node:fs)
            external: ['fs', 'path', 'gray-matter'], // Explicitly externalize fs, path, and gray-matter
        },
        // Exclude Node.js built-ins from dependency optimization
        optimizeDeps: {
            exclude: ['fs', 'path', 'gray-matter'],
        },
    };
});