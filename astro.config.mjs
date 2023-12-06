import { loadEnv } from 'vite';
import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import compress from 'astro-compress';
import icon from 'astro-icon';
import mdx from '@astrojs/mdx';
import purgecss from 'astro-purgecss';
import robotsTxt from 'astro-robots-txt';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';

// Remark
import remarkReadingtime from './src/utils/remark/reading-time';
import remarkSectionize from './src/utils/remark/sectionize';
import remarkUnwrapImages from './src/utils/remark/unwrap-images';

// Rehype
import addClasses from 'rehype-add-classes';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';

// Env Variables
const currentEnv = process.env.VERCEL_ENV ? process.env.VERCEL_ENV : 'local';

const envVariables = {
    local: () => {
        const { SITE_URL = '', PORT = 0 } = loadEnv(
            import.meta.env.MODE,
            process.cwd(),
            ''
        );
        return {
            url: SITE_URL,
            port: Number(PORT),
        };
    },
    preview: () => ({
        url: `https://${process.env.VERCEL_URL}/`,
        port: 0,
    }),
    production: () => ({
        url: 'https://johnzanussi.com/',
        port: 0,
    }),
};

const { url, port } = envVariables[currentEnv]();

export default defineConfig({
    experimental: {
        // contentCollectionCache: true,
    },
    site: url,
    server: {
        port: port,
    },
    output: 'static',
    adapter: vercel({
        speedInsights: {
            enabled: true,
        },
    }),
    integrations: [
        expressiveCode({
            themeCssSelector: (theme) => `[data-bs-theme='${theme.type}']`,
            styleOverrides: {
                codeFontFamily: 'var(--bs-font-monospace)',
                uiFontFamily: 'var(--bs-font-sans-serif)',

                frames: {
                    frameBoxShadowCssValue: '1.6px 1.6px 21px 0 rgba(0,0,0,0.1)',
                    // editorActiveTabIndicatorTopColor: 'var(--bs-heading-color)',
                    editorActiveTabIndicatorTopColor: 'var(--bs-link-color)',
                },
            },
        }),
        mdx(),
        sitemap({
            serialize(item) {
                item.url = item.url.replace(/\/$/, '');
                return item;
            },
        }),
        robotsTxt(),
        purgecss(),
        compress({
            Image: false,
        }),
        icon({
            include: {
                'fa-solid': ['*'],
                'fa6-solid': ['*'],
                'fa6-brands': ['*'],
                'mdi': ['*'],
            },
        }),
    ],
    markdown: {
        syntaxHighlight: false,
        remarkPlugins: [
            remarkSectionize,
            remarkReadingtime,
            remarkUnwrapImages,
        ],
        rehypePlugins: [
            rehypeAccessibleEmojis,
            [
                addClasses,
                {
                    h2: 'mt-4 mb-3 pb-2 border-bottom',
                    h3: 'mt-4',
                    h4: 'mt-3',
                    h5: 'mt-3 text-body-emphasis',
                    iframe: 'mb-4',
                },
            ],
        ],
        extendDefaultPlugins: true,
    },
});
