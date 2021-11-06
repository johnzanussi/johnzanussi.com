import { DefaultSeo } from 'next-seo';
import PlausibleProvider from 'next-plausible';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import seoConfig from '../next-seo.config.js';
import '../styles/index.scss';

const App = ({ Component, pageProps }) => {
    return (
        <PlausibleProvider>
            <DefaultSeo {...seoConfig} />

            <Component {...pageProps} />
        </PlausibleProvider>
    );
};

export default App;
