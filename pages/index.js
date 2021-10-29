import { getPostData } from '../lib/posts';

import Layout from '../components/Layout';
import Link from '../components/Link';
import PostCard from '../components/PostCard';
import Emoji from '../components/Emoji';

export default function Index({ featuredPost }) {

    return (

        <Layout>

            <h1 className="display-1 mb-3 mb-md-5">
                Hey, there! <Emoji label="waving hand">👋</Emoji>
            </h1>

            <p className="lead">
                I’m John. That’s me <span className="d-none d-md-inline">over there <Emoji label="left arrow">⬅️</Emoji></span><span className="d-md-none">up there <Emoji label="up left arrow">↖️</Emoji></span>.
                I guess you could say I’m like a car mechanic who drives a piece of junk clunker.
                I’ve been building stuff on the web on my own or with teams for the last 15+ years but never had a nice personal website.
                This is my solution to that.

            </p>

            <p className="lead">
                I’ve been doing a lot of DIY 3D printing and LED projects and wanted a place to share my experiences with the community.
                This is also an excuse to get my hands into coding again as a developer and try out the new hotness in web technology.

            </p>

            <p className="lead">
                You can read more about the libraries and tools I used to build this site on the <Link href="/built-with">Built With</Link> page or by checking out the code for yourself on <Link href="https://github.com/johznanussi/johnzanussi.com">GitHub</Link>.
            </p>

            <p className="lead">
                You can read more about me on my <Link href="/about">About</Link> page.
                You can see what videos I’m watching on the YouTube page.
            </p>

            <p className="lead">
                Lastly, you can check out the first post I created below.
                It dives into how I did a thing to my 3D printer.
            </p>

            <div className="mt-3">

                <PostCard post={featuredPost} />

            </div>

        </Layout>

    );
}

export async function getStaticProps() {

    const featuredPost = await getPostData('3d-printer-psu-control');

    return {
        props: {
            featuredPost,
        },
    };

}
