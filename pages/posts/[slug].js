import { getPostData, getPostsStaticPaths } from '../../lib/posts';

import Layout from '../../components/Layout';
import Meta from '../../components/Meta';
import DateFormat from '../../components/DateFormat';
import Markdown from '../../components/Markdown';

const Post = ({ post }) => {

    return (

        <Layout>

            <Meta
                title={post.title}
                image={post.coverImage}
                description={post.excerpt}
                url={post.url}
            />

            <DateFormat date={post.date} />

            <h1>
                {post.title}
            </h1>

            <hr />

            <Markdown source={post.content} />

        </Layout>

    );
};

export async function getStaticProps({ params }) {

    return {
        props: {
            post: await getPostData(params.slug),
        },
    };

}

export async function getStaticPaths() {
    return getPostsStaticPaths();
}

export default Post;
