import { withPlausibleProxy } from 'next-plausible';

const config = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        formats: [
            'image/avif',
            'image/webp'
        ],
        imageSizes: [
            450 // Post thumbnail
        ],
        // https://getbootstrap.com/docs/5.1/layout/breakpoints/#available-breakpoints
        deviceSizes: [
            576,
            768,
            992,
            1200,
        ],
    },
    // Using this throws 404s
    // pageExtensions: [
    //     'md',
    //     'mdx',
    // ],
};

const plausibleConfig = {
    domain: 'johnzanussi.com',
    customDomain: 'https://analytics.johnzanussi.com',
    trackOutboundLinks: true,
    selfHosted: true,
    scriptName: 'extra',
    integrity: 'sha384-SgKGCKUzFLz4c6yD0hY3wsa0IAuWZCUZCzzK91si4d/LvGTq/a7LbzMlg190satZ',
};

export default withPlausibleProxy(plausibleConfig)(config);
