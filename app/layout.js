import { NextSeo } from 'next-seo';
import PlausibleProvider from 'next-plausible';
import { Inter, Roboto_Mono } from '@next/font/google';

import seoConfig from 'next-seo.config';

const fontInter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const fontRobotoMono = Roboto_Mono({
    subsets: ['latin'],
    variable: '--font-roboto-mono',
    display: 'swap',
});

const fonts = [fontInter, fontRobotoMono];

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import 'styles/index.scss';

import Layout from 'components/Layout';
import ThemeProvider from 'components/ThemeProvider';

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={fonts.map((font) => font.variable).join(' ')}
            data-bs-theme="light"
        >
            <head>
                <meta charSet="utf-8" />

                <NextSeo useAppDir {...seoConfig} />

                <PlausibleProvider />
            </head>

            <body>
                <ThemeProvider>
                    <Layout>{children}</Layout>
                </ThemeProvider>
            </body>
        </html>
    );
}
