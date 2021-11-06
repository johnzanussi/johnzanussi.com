import Image from 'next/image';

import { getAllPostData } from '../../lib/posts';

import Layout from '../../components/Layout';
import Meta from '../../components/Meta';
import PageTitle from '../../components/PageTitle';
import PostCard from '../../components/PostCard';

const PostsIndex = ({ posts }) => {
    return (
        <Layout>
            <Meta
                title="Posts"
                description="A collection of posts I've written about various topics"
            />

            <PageTitle title="Posts" className="mb-4" />

            {posts.map((post) => (
                <div key={post.title} className="mb-5">
                    <PostCard post={post} />
                </div>
            ))}
        </Layout>
    );
};

export async function getStaticProps() {
    const posts = await getAllPostData();

    return {
        props: {
            posts: posts,
        },
    };
}

export default PostsIndex;
