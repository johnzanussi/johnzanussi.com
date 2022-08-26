import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { prependHost } from '../lib/utils';

const Meta = ({ title, description, openGraph, ...props }) => {
    const { asPath } = useRouter();

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    const url = prependHost(asPath);

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

Meta.defaultProps = {
    openGraph: {},
};

export default Meta;
