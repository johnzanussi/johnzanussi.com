import { Fragment } from 'react';
import { DefaultSeo } from 'next-seo';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import seoConfig from '../next-seo.config.js';
import '../styles/index.scss';

const App = ({ Component, pageProps }) => {

    return (

        <Fragment>

            <DefaultSeo {...seoConfig}/>

            <Component {...pageProps} />

        </Fragment>

    );

};

export default App;
