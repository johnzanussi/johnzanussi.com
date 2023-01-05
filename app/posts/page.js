import { getAllPostData } from 'lib/posts';

import PageTitle from 'components/PageTitle';
import PostCard from 'components/PostCard';

export default async function PostsIndex() {
    const posts = await getAllPostData();

    return (
        <>
            <PageTitle title="Posts" className="mb-4" />

            {posts.map((post) => (
                <div key={post.title} className="mb-5">
                    <PostCard post={post} />
                </div>
            ))}
        </>
    );
}
