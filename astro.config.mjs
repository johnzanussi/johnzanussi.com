import { loadEnv } from 'vite';
import { defineConfig } from 'astro/config';
import AutoImport from 'astro-auto-import';
import compress from 'astro-compress';
import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import purgecss from 'astro-purgecss';
import robotsTxt from 'astro-robots-txt';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';

// Remark
import remarkImagePaths from './src/utils/remark/image-paths';
import { codeBlockComponent, remarkCodeBlocks } from './src/utils/remark/code-blocks';
import remarkReadingtime from './src/utils/remark/reading-time';
import remarkSectionize from './src/utils/remark/sectionize';

// Rehype
import addClasses from 'rehype-add-classes';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';

// Env Variables
const currentEnv = process.env.VERCEL_ENV ? process.env.VERCEL_ENV : 'local';

const envVariables = {
    local: () => {
        const { SITE_URL = '', PORT = 0 } = loadEnv(import.meta.env.MODE, process.cwd(), '');
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
    site: url,
    server: {
        port: port,
    },
    output: 'static',
    adapter: vercel(),
    integrations: [
        AutoImport({
            imports: [
                codeBlockComponent,
            ],
        }),
        mdx(),
        image({
            serviceEntryPoint: '@astrojs/image/sharp',
        }),
        sitemap(),
        robotsTxt(),
        purgecss(),
        compress({
            img: false,
        }),
    ],
    markdown: {
        syntaxHighlight: false,
        remarkPlugins: [
            remarkSectionize,
            remarkCodeBlocks,
            remarkImagePaths,
            remarkReadingtime,
        ],
        rehypePlugins: [
            rehypeAccessibleEmojis,
            [
                addClasses,
                {
                    h2: 'mt-4 mb-3 pb-2 border-bottom',
                    h3: 'mt-4',
                    h4: 'mt-3',
                    h5: 'mt-3 text-emphasis',
                    iframe: 'mb-4',
                    pre: 'code-block rounded-md-2 border p-4',
                },
            ],
        ],
        extendDefaultPlugins: true,
    }
});
