import { Fragment } from 'react';
import Head from 'next/head';

import { getMarkdownData } from '../lib/markdown';

import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import Markdown from '../components/Markdown';

import { getDirStaticPaths } from '../lib/markdown';

const PAGES_DIR = '_pages';

export default function Page({ pageData }) {

    return (

        <Layout>

            <PageTitle
                title={pageData.title}
                lastUpdated={pageData.lastUpdated}>
            </PageTitle>

            <Markdown source={pageData.content} />

        </Layout>

    );
}


export async function getStaticProps({ params }) {

    return {
        props: {
            pageData: await getMarkdownData(`${PAGES_DIR}/${params.page}.md`, 'all'),
        },
    };

};

export async function getStaticPaths() {
    return getDirStaticPaths(PAGES_DIR, 'page');
}
