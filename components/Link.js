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

    // Hash
    if (href.startsWith('#')) {
        return (
            <a href={href} {...props}>
                {children}
            </a>
        );
    }

    // Internal
    return (
        <InternalLink href={href} scroll {...props}>
            {children}
        </InternalLink>
    );
};

export default Link;