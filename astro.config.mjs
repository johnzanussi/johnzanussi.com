import { defineConfig } from 'astro/config';
import AutoImport from 'astro-auto-import';
import compress from 'astro-compress';
import compressor from 'astro-compressor';
import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import purgecss from 'astro-purgecss';
import robotsTxt from 'astro-robots-txt';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';

// Remark
import remarkImagePaths from './src/utils/remark/image-paths';
import { codeBlockComponent, remarkCodeBlocks } from './src/utils/remark/code-blocks';

// Rehype
import addClasses from 'rehype-add-classes';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';

const port = 3001;
const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
    site: isDev ? `http://localhost:${port}/` : 'https://johnzanussi.com/',
    server: {
        port: port
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
        compress(),
        compressor(),
    ],
    markdown: {
        syntaxHighlight: false,
        remarkPlugins: [
            remarkCodeBlocks,
            remarkImagePaths,
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
                    pre: 'code-block rounded-md-2 border p-4'
                }
            ]
        ],
        extendDefaultPlugins: true,
    }
});

// npm install reading-time mdast-util-to-string
// https://docs.astro.build/en/guides/markdown-content/#example-calculate-reading-time

// https://github.com/arobase-che/remark-attr
// https://github.com/remarkjs/remark-breaks
// https://github.com/remarkjs/remark-directive
// https://github.com/remarkjs/remark-unwrap-images
// https://github.com/kevinzunigacuellar/remark-code-title/blob/main/packages/remark-code-title/src/remarkPlugin.ts
// https://github.com/sindresorhus/find-up
