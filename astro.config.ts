import { loadEnv } from 'vite';
import { defineConfig, envField, fontProviders } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import expressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';
import mdx from '@astrojs/mdx';
import imgAttr from 'satteri-imgattr';
import robotsTxt from 'astro-robots-txt';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import devWeatherPreview from '@/integrations/dev-weather-preview';

// Markdown plugins
import accessibleEmojis from '@/utils/markdown/accessible-emojis';
import math from '@/utils/markdown/math';
import readingTime from '@/utils/markdown/reading-time';
import sectionize from '@/utils/markdown/sectionize';
import unwrapImages from '@/utils/markdown/unwrap-images';

// Site URL and dev port
const { VERCEL_ENV, VERCEL_URL, VERCEL_PROJECT_PRODUCTION_URL } = process.env;
const { PORT } = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');
const port = Number(PORT) || 4321;

// Production uses the custom domain; previews use their own deployment address
const host = VERCEL_ENV === 'production' ? VERCEL_PROJECT_PRODUCTION_URL : VERCEL_URL;
const site = host ? `https://${host}/` : `http://localhost:${port}/`;

export default defineConfig({
    redirects: {
        '/resume': {
            status: 302,
            destination: '/about',
        },
    },
    site,
    server: {
        port,
    },
    output: 'static',
    // Pages stay prerendered; only server islands (the weather widget) run on demand
    adapter: vercel(),
    env: {
        schema: {
            // Upstash Redis holding the latest weather station reading
            KV_REST_API_URL: envField.string({
                context: 'server',
                access: 'secret',
                optional: true,
            }),
            KV_REST_API_READ_ONLY_TOKEN: envField.string({
                context: 'server',
                access: 'secret',
                optional: true,
            }),
        },
    },
    image: {
        service: {
            entrypoint: 'astro/assets/services/sharp',
            config: {
                // Low AVIF effort: effort 4 was taking 1–6s per encode on Vercel (~1971 assets).
                webp: { quality: 80, effort: 2 },
                avif: { quality: 65, effort: 1 },
                jpeg: { quality: 80, mozjpeg: true },
            },
        },
    },
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },
    integrations: [
        // Options are in ec.config.mjs
        expressiveCode(),
        mdx(),
        sitemap({
            serialize(item) {
                item.url = item.url.replace(/\/$/, '');
                if (/youtube$/.test(item.url)) {
                    return undefined;
                }
                return item;
            },
        }),
        robotsTxt(),
        icon(),
        devWeatherPreview(),
    ],
    fonts: [
        {
            name: 'Inter',
            cssVariable: '--font-inter',
            provider: fontProviders.fontsource(),
            weights: ['100 900'],
            styles: ['normal'],
        },
        {
            name: 'Roboto Mono',
            cssVariable: '--font-roboto-mono',
            provider: fontProviders.fontsource(),
            weights: ['100 700'],
            styles: ['normal'],
            fallbacks: ['monospace'],
        },
    ],
    markdown: {
        syntaxHighlight: false,
        processor: satteri({
            features: {
                math: {
                    singleDollarTextMath: false,
                },
            },
            mdastPlugins: [
                sectionize(),
                readingTime(),
                math({ throwOnError: true }),
            ],
            hastPlugins: [
                imgAttr(),
                unwrapImages(),
                accessibleEmojis(),
            ],
        }),
    },
});
