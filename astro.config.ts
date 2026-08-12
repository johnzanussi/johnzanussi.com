import { loadEnv } from 'vite';
import { defineConfig, fontProviders } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import expressiveCode from 'astro-expressive-code';
import compress from 'astro-compress';
import icon from 'astro-icon';
import mdx from '@astrojs/mdx';
import robotsTxt from 'astro-robots-txt';
import sitemap from '@astrojs/sitemap';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';

// Remark
import remarkReadingtime from './src/utils/remark/reading-time';
import remarkSectionize from './src/utils/remark/sectionize';
import remarkUnwrapImages from './src/utils/remark/unwrap-images';

// Rehype
import addClasses from 'rehype-class-names';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';

// Env Variables
type Environment = 'development' | 'preview' | 'production';
const currentEnv: Environment = (process.env.VERCEL_ENV as Environment) || 'development';

const envVariables = {
    development: () => {
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
    redirects: {
        '/resume': {
            status: 302,
            destination: '/about',
        },
    },
    site: url,
    server: {
        port: port,
    },
    output: 'static',
    image: {
        service: {
            entrypoint: 'astro/assets/services/sharp',
            config: {
                webp: { quality: 80, effort: 4 },
                avif: { quality: 65, effort: 4 },
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
        expressiveCode({
            plugins: [
                pluginLineNumbers(),
            ],
            defaultProps: {
                showLineNumbers: false,
            },
            themeCssSelector: (theme) => `[data-theme='${theme.type}']`,
            styleOverrides: {
                codeFontFamily: 'var(--font-mono)',
                uiFontFamily: 'var(--font-sans)',

                frames: {
                    frameBoxShadowCssValue: '1.6px 1.6px 21px 0 rgba(0,0,0,0.1)',
                    // editorActiveTabIndicatorTopColor: 'var(--bs-heading-color)',
                    editorActiveTabIndicatorTopColor: 'var(--color-sky-500)',
                },
            },
        }),
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
        compress({
            CSS: false,
            Image: false,
        }),
        icon(),
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
        processor: unified({
            remarkPlugins: [
                remarkSectionize,
                remarkReadingtime,
                remarkUnwrapImages,
                remarkMath,
            ],
            rehypePlugins: [
                rehypeAccessibleEmojis as unknown as any,
                [
                    addClasses,
                    {
                        iframe: 'mb-6',
                    },
                ],
                rehypeMathjax,
            ],
        }),
    },
});
