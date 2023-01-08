import { getPageData } from 'lib/pages';
import Meta from 'components/Meta';

export default async function Head({ params }) {
    const page = await getPageData(params.page);

    return (
        <>
            <Meta
                title={page.title}
                description={page.excerpt}
                url={page.url}
            />
        </>
    );
}
