import { getPostsStaticPaths, getPostData, getSiblingPosts } from 'lib/posts';

import DateFormat from 'components/DateFormat';
import Markdown from 'components/Markdown';
import DraftBadge from 'components/DraftBadge';
import PostPagination from 'components/PostPagination';
import EnjoyCTA from 'components/EnjoyCTA';
import Comments from 'components/Comments';

export default async function Post({ params }) {
    const post = await getPostData(params.slug);

    const siblingPosts = await getSiblingPosts(post);

    return (
        <>
            {post.isDraft && <DraftBadge className="me-auto mb-1" />}

            <DateFormat date={post.date} />

            <h1>{post.title}</h1>

            <hr />

            <Markdown source={post.content} />

            <EnjoyCTA />

            <PostPagination posts={siblingPosts} />

            <h2 id="comments">Comments</h2>

            <Comments
                id={post.slug}
                url={post.absoluteUrl}
                title={post.title}
            />
        </>
    );
}

export async function generateStaticParams() {
    const paths = await getPostsStaticPaths();
    return paths;
}

export const dynamicParams = false;
