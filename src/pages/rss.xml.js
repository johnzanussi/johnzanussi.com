import rss from '@astrojs/rss';
import { getDateSortedCollection, getPostUrl } from '@utils/collections';
import { getItemImagePath, getRenderedImage } from '@utils/images';
import { absoluteUrl } from '@utils/urls.js';

export async function get(context) {

    const posts = await getDateSortedCollection('posts');

    const items = await Promise.all(posts.map(async (post) => {

        const url = getPostUrl(post.slug);

        const coverImage = getItemImagePath(post.slug, post.data.coverImage.url, 'posts');

        const image = await getRenderedImage(coverImage, {
            width: 150,
            height: 150,
        });

        return {
            title: post.data.title,
            pubDate: post.data.date,
            description: post.data.excerpt || '',
            link: url,
            customData: [
                `<atom:link href="${url}" rel="standout"/>`,
                `<media:content medium="image" url="${absoluteUrl(image)}" width="150" height="150" />`,
                `<media:description>${post.data.excerpt}</media:description>`,
            ].join(''),
        };

    }));

    const config = {
        title: 'John Zanussi',
        description:
            'A place where I write about technology, 3D Printing, and other hobby projects I have going on.',
        site: context.site,
        items: items,
        xmlns: {
            atom: 'http://www.w3.org/2005/Atom',
            media: 'http://search.yahoo.com/mrss/',
        },
        customData: [
            '<language>en-us</language>',
            `<atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" />`,
        ].join(''),
        stylesheet: '/rss/styles.xsl',
    };

    return rss(config);
}
