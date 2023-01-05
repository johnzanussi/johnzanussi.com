import InternalLink from 'next/link';

const Link = ({ href, children, ...props }) => {
    // External
    if (href.startsWith('http')) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                {children}
            </a>
        );
    }

    // Internal
    return (
        <InternalLink href={href} {...props}>
            {children}
        </InternalLink>
    );
};

export default Link;
