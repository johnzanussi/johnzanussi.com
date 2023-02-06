import rss from '@astrojs/rss';
import { getDateSortedCollection, getPostUrl } from '@utils/collections';

export async function get(context) {
    const posts = await getDateSortedCollection('posts');

    const config = {
        title: 'John Zanussi',
        description:
            'A place where I write about technology, 3D Printing, and other hobby projects I have going on.',
        site: context.site,
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.date,
            description: post.data.excerpt || '',
            link: getPostUrl(post.slug),
        })),
        customData: '<language>en-us</language>',
        stylesheet: '/rss/styles.xsl',
    };

    return rss(config);
}
