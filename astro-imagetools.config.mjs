import { defineConfig } from 'astro-imagetools/config';

// https://astro-imagetools-docs.vercel.app/en/global-config-options
export default defineConfig({
    breakpoints: [
        // filename actualWidth
        576,
        768,
    ],

    sizes: (breakpoints) => {
        // mediaquery srcsetToUse
        return '100vw';
    },
});
