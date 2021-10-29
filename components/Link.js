import InternalLink from 'next/link';

const Link = ({ href, children, ...props }) => {

    // External
    if (href.startsWith('http')) {

        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
            >
                {children}
            </a>
        );

    }

    // Internal
    return (

        <InternalLink href={href}>

            <a {...props}>
                {children}
            </a>

        </InternalLink>

    );

};

export default Link;
