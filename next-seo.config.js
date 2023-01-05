// import { background_color, theme_color } from './public/icons/manifest.json';

const seoConfig = {
    titleTemplate: '%s - John Zanussi',
    // canonical: process.env.NEXT_PUBLIC_SITE_URL,
    twitter: {
        cardType: 'summary',
        site: '@johnzanussi',
        handle: '@johnzanussi',
    },
    openGraph: {
        // url: process.env.NEXT_PUBLIC_SITE_URL,
    },
    additionalMetaTags: [
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        },
        {
            name: 'theme-color',
            content: '#16273C',
        },
        {
            name: 'mobile-web-app-capable',
            content: 'yes',
        },
        {
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
        },
        {
            name: 'application-name',
            content: 'John Zanussi',
        },
        {
            name: 'apple-mobile-web-app-title',
            content: 'John Zanussi',
        },
    ],
    additionalLinkTags: [
        {
            rel: 'shortcut icon',
            href: '/icons/favicon.ico',
        },
        {
            rel: 'manifest',
            href: '/icons/manifest.json',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/icons/favicon-16x16.png',
        },
        {
            rel: 'apple-touch-icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/icons/apple-touch-icon.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/icons/favicon-32x32.png',
        },
        {
            rel: 'apple-touch-icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/icons/favicon-32x32.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '180x180',
            href: '/icons/apple-touch-icon.png',
        },
        {
            rel: 'apple-touch-icon',
            type: 'image/png',
            sizes: '180x180',
            href: '/icons/apple-touch-icon.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '256x256',
            href: '/icons/icon-256x256.png',
        },
        {
            rel: 'apple-touch-icon',
            type: 'image/png',
            sizes: '256x256',
            href: '/icons/icon-256x256.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '384x384',
            href: '/icons/icon-384x384.png',
        },
        {
            rel: 'apple-touch-icon',
            type: 'image/png',
            sizes: '384x384',
            href: '/icons/icon-384x384.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '512x512',
            href: '/icons/android-chrome-512x512.png',
        },
        {
            rel: 'apple-touch-icon',
            type: 'image/png',
            sizes: '512x512',
            href: '/icons/android-chrome-512x512.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '192x192',
            href: '/icons/android-chrome-192x192.png',
        },
        {
            rel: 'apple-touch-icon',
            type: 'image/png',
            sizes: '192x192',
            href: '/icons/android-chrome-192x192.png',
        },
    ],
};

export default seoConfig;
