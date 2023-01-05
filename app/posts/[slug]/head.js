import { getPostData } from 'lib/posts';
import Meta from 'components/Meta';

export default async function Head({ params }) {
    const post = await getPostData(params.slug);

    return (
        <>
            <Meta
                title={post.title}
                image={post.coverImage}
                description={post.excerpt}
                url={post.url}
            />
        </>
    );
}
