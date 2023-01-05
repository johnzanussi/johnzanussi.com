import { NextSeo } from 'next-seo';
import { prependHost } from 'lib/utils';

const Meta = ({ title, description, path = '', openGraph = {}, ...props }) => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    const url = prependHost(path);

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
            canonical={url}
            openGraph={{
                title: title,
                url: url,
                ...openGraph,
            }}
        />
    );
};

export default Meta;
