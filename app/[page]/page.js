import { Fragment } from 'react';

import { getPagesStaticPaths, getPageData } from 'lib/pages';

import PageTitle from 'components/PageTitle';
import Markdown from 'components/Markdown';

export default async function Page({ params }) {
    const pageData = await getPageData(params.page);

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
    const paths = await getPagesStaticPaths();
    return paths;
}

export const dynamicParams = false;
