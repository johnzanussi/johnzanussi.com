import { Fragment } from 'react';
import Head from 'next/head';

import { getDirStaticPaths, getMarkdownData } from 'lib/markdown';

import PageTitle from 'components/PageTitle';
import Markdown from 'components/Markdown';

const PAGES_DIR = '_pages';

export default async function Page({ params }) {
    const pageData = await getMarkdownData(
        `${PAGES_DIR}/${params.page}.md`,
        'all'
    );

    return (
        <Fragment>
            <PageTitle
                title={pageData.title}
                lastUpdated={pageData.lastUpdated}
            ></PageTitle>

            <Markdown source={pageData.content} />
        </Fragment>
    );
}

export async function generateStaticParams() {
    const paths = await getDirStaticPaths(PAGES_DIR, 'page');
    return paths;
}
