import { getLastUpdated } from '../lib/files';
import { getMarkdownData } from '../lib/markdown';

import Layout from '../components/Layout';
import Meta from '../components/Meta';
import PageTitle from '../components/PageTitle';
import Markdown from '../components/Markdown';

const README_FILE = 'README.md';

export default function BuiltWith({ markdownSource, lastUpdated }) {

    return (

        <Layout>

            <Meta
                title="Built With"
                description="How and what I used to build this website."
            />

            <PageTitle
                title="Built With"
                lastUpdated={lastUpdated}
            />

            <Markdown source={markdownSource} />

        </Layout>

    );
}

export async function getStaticProps() {

    const { content } = await getMarkdownData(README_FILE, 'all');
    const lastUpdated = getLastUpdated(README_FILE);

    return {
        props: {
            markdownSource: content,
            lastUpdated
        },
    };

}
