import { Children, cloneElement } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import dynamic from 'next/dynamic';

import Link from './Link';
import PageTitle from './PageTitle';
import Image from './Image';
import MDXColumns from './MDXColumns';
import CodeBlock from './CodeBlock';
import AmazonDisclosure from './AmazonDisclosure';
import AmazonProducts from './AmazonProducts';
import YouTubeEmbed from './YouTubeEmbed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';

const components = {
    a: (props) => <Link {...props} />,
    h2: (props) => <h2 className="mt-4 mb-3 pb-2 border-bottom" {...props} />,
    h3: (props) => <h3 className="mt-4" {...props} />,
    h4: (props) => <h4 className="mt-3" {...props} />,
    h5: (props) => <h5 className="mt-3 text-white" {...props} />,
    img: (props) => (
        <div className="mb-4">
            <Image
                className="img-fluid mw-100"
                layout="responsive"
                {...props}
            />
        </div>
    ),
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
};

const Markdown = ({ source }) => {
    return <MDXRemote components={components} {...source} />;
};

export default Markdown;
