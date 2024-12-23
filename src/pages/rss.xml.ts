import type { APIContext } from 'astro';
import type { CollectionEntry } from 'astro:content';
import rss from '@astrojs/rss';

import { getDateSortedCollection, getPostUrl } from '@/utils/collections';
import { getImageSrc } from '@/utils/images';

export async function GET(context: APIContext) {

    const posts = await getDateSortedCollection('posts');

    const items = await Promise.all(posts.map(async (post: CollectionEntry<'posts'>) => {

        const url = getPostUrl(post.id);

        const imageOptions = {
            width: 200,
            height: 112,
        };

        const coverImageSrc = await getImageSrc(post.data.cover);

        return {
            title: post.data.title,
            pubDate: post.data.date,
            description: post.data.excerpt || '',
            link: url,
            customData: [
                // `<atom:link href="${url}" rel="standout"/>`,
                `<media:content medium="image" url="${coverImageSrc}" width="${imageOptions.width}" height="${imageOptions.height}" />`,
            ].join(''),
        };

    }));

    const config = {
        title: 'John Zanussi',
        description:
            'A place where I write about technology, 3D Printing, and other hobby projects I have going on.',
        site: context.site?.toString() || '',
        items: items,
        xmlns: {
            // atom: 'http://www.w3.org/2005/Atom',
            media: 'http://search.yahoo.com/mrss/',
        },
        customData: [
            '<language>en-us</language>',
            `<generator>${context.generator}</generator>`,
            // `<atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" />`,
        ].join(''),
        stylesheet: '/rss/styles.xsl',
    };

    return rss(config);
}
