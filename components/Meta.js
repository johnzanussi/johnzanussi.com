import { NextSeo } from 'next-seo';
import { prependHost } from 'lib/utils';

const Meta = ({ title, description, url = '', openGraph = {}, ...props }) => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    const fullUrl = prependHost(url);

    if (props.images) {
        openGraph.images = props.images;
    } else if (props.image) {
        openGraph.images = [props.image];
    }

    if (openGraph.images) {
        openGraph.images = openGraph.images.map((image) => ({
            ...image,
            url: prependHost(image.url),
        }));
    }

    return (
        <NextSeo
            useAppDir
            title={title}
            description={description}
            canonical={fullUrl}
            openGraph={{
                title: title,
                url: fullUrl,
                ...openGraph,
            }}
        />
    );
};

export default Meta;
