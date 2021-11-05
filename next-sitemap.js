module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    generateRobotsTxt: true,
    exclude: [
        '/post/draft-*',
    ],
    autoLastmod: false,
};
