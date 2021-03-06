import { FastCommentsCommentWidget } from 'fastcomments-react';

import {
    getPostData,
    getSiblingPosts,
    getPostsStaticPaths,
} from '../../lib/posts';

import Layout from '../../components/Layout';
import Meta from '../../components/Meta';
import DateFormat from '../../components/DateFormat';
import Markdown from '../../components/Markdown';
import DraftBadge from '../../components/DraftBadge';
import PostPagination from '../../components/PostPagination';
import EnjoyCTA from '../../components/EnjoyCTA';

const Post = ({ post, siblingPosts }) => {
    return (
        <Layout>
            <Meta
                title={post.title}
                image={post.coverImage}
                description={post.excerpt}
                url={post.url}
            />

            {post.isDraft && <DraftBadge className="me-auto mb-1" />}

            <DateFormat date={post.date} />

            <h1>{post.title}</h1>

            <hr />

            <Markdown source={post.content} />

            <EnjoyCTA />

            <PostPagination posts={siblingPosts} />

            <h2 id="comments">Comments</h2>

            <FastCommentsCommentWidget
                tenantId="TuZHgHCUlVl"
                urlId={post.slug}
                url={post.absoluteUrl}
                hasDarkBackground={true}
                pageTitle={post.title}
            />
        </Layout>
    );
};

export async function getStaticProps({ params }) {
    const post = await getPostData(params.slug);

    const siblingPosts = await getSiblingPosts(post);

    return {
        props: {
            post,
            siblingPosts,
        },
    };
}

export async function getStaticPaths() {
    return getPostsStaticPaths();
}

export default Post;
