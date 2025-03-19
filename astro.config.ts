import { loadEnv } from 'vite';
import { defineConfig } from 'astro/config';
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
                return item;
            },
        }),
        robotsTxt(),
        compress({
            Image: false,
        }),
        icon(),
    ],
    markdown: {
        syntaxHighlight: false,
        remarkPlugins: [
            remarkSectionize,
            remarkReadingtime,
            remarkUnwrapImages,
            remarkMath,
        ],
        // https://github.com/jaywcjlove/rehype-attr
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
    },
});
