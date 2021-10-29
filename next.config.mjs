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

export default config;
