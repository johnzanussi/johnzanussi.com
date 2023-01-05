'use client';

import { Children, cloneElement } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';

import Link from 'components/Link';
import PageTitle from 'components/PageTitle';
import Image from 'components/Image';
import MDXColumns from 'components/MDXColumns';
import CodeBlock from 'components/CodeBlock';
import AmazonDisclosure from 'components/AmazonDisclosure';
import AmazonProducts from 'components/AmazonProducts';
import YouTubeEmbed from 'components/YouTubeEmbed';

const components = {
    a: (props) => <Link {...props} />,
    h2: (props) => <h2 className="mt-4 mb-3 pb-2 border-bottom" {...props} />,
    h3: (props) => <h3 className="mt-4" {...props} />,
    h4: (props) => <h4 className="mt-3" {...props} />,
    h5: (props) => <h5 className="mt-3 text-white" {...props} />,
    img: ({ alt, ...props }) => {
        const [altText, noDivWrap] = alt.split(' noDivWrap');

        const PostImage = (
            <Image className="img-fluid" alt={altText} {...props} />
        );

        if (noDivWrap === '') {
            return PostImage;
        }

        return <div className="mb-4">{PostImage}</div>;
    },
    iframe: (props) => (
        <div className="mb-4">
            <iframe {...props} />
        </div>
    ),
    sup: ({ children, ...props }) => (
        <sup {...props} className="text-danger">
            [
            {Children.map(children, (child) =>
                cloneElement(child, { className: 'link-danger' })
            )}
            ]
        </sup>
    ),
    table: (props) => (
        <div className="table-responsive mb-4">
            <table className="table text-white" {...props} />
        </div>
    ),
    FontAwesomeHashtag: (props) => (
        <FontAwesomeIcon icon={faHashtag} {...props} />
    ),
    MDXColumns: MDXColumns,
    AmazonDisclosure: AmazonDisclosure,
    AmazonProducts: AmazonProducts,
    pre: CodeBlock,
    YouTubeEmbed: YouTubeEmbed,
    Image: Image,
};

const Markdown = ({ source }) => {
    return <MDXRemote components={components} {...source} />;
};

export default Markdown;
