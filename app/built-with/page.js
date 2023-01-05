import { getLastUpdated } from 'lib/files';
import { getMarkdownData } from 'lib/markdown';

import PageTitle from 'components/PageTitle';
import Markdown from 'components/Markdown';

const README_FILE = 'README.md';

export default async function BuiltWith() {
    const { content } = await getMarkdownData(README_FILE, 'all');
    const lastUpdated = getLastUpdated(README_FILE);

    return (
        <>
            <PageTitle title="Built With" lastUpdated={lastUpdated} />

            <Markdown source={content} />
        </>
    );
}
