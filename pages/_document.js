import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {

    render() {

        return (

            <Html lang="en">

                <Head>

                    <link
                        href="https://fonts.googleapis.com/css?family=Roboto|Roboto+Mono&display=swap"
                        rel="stylesheet"
                    />

                </Head>

                <body className="bg-nav text-white">

                    <Main />

                    <NextScript />

                </body>

            </Html>

        );

    }

}
