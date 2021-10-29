import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

const Meta = ({ title, description, openGraph, ...props }) => {

    const { asPath } = useRouter();

    const url = `${process.env.NEXT_PUBLIC_SITE_URL}${asPath}`;

    if (props.images) {
        openGraph.images = props.images;
    } else if (props.image) {
        openGraph.images = [props.image];
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
