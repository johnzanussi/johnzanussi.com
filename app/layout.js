import { NextSeo } from 'next-seo';
import PlausibleProvider from 'next-plausible';
import { Roboto_Flex, Roboto_Mono } from '@next/font/google';

import seoConfig from 'next-seo.config';

const robotoFlex = Roboto_Flex({
    subsets: ['latin'],
    variable: '--font-roboto',
});

const robotoMono = Roboto_Mono({
    subsets: ['latin'],
    weight: ['300', '400'],
    style: ['normal', 'italic'],
    variable: '--font-roboto-mono',
    display: 'swap',
});

export const fontClassNames = [robotoFlex, robotoMono]
    .map((font) => font.variable)
    .join(' ');

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import 'styles/index.scss';

import Layout from 'components/Layout';

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={fontClassNames}>
            <head>
                <meta charSet="utf-8" />

                <NextSeo useAppDir {...seoConfig} />

                <PlausibleProvider />
            </head>

            <body>
                <Layout>{children}</Layout>
            </body>
        </html>
    );
}
