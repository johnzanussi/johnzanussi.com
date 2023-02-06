import { MetadataGenerator } from 'metatags-generator';
import merge from 'deepmerge';
import { getScreenshotPath } from '@utils/images';

const settings = {
    structuredData: true,
    androidChromeIcons: true,
    msTags: true,
    safariTags: true,
    appleTags: true,
    openGraphTags: true,
    twitterTags: true,
    facebookTags: true,
};

const icons = [
    // '/icons/favicon.ico',
    '/icons/favicon-16x16.png',
    '/icons/apple-touch-icon.png',
    '/icons/favicon-32x32.png',
    '/icons/apple-touch-icon-180x180.png',
    '/icons/icon-256x256.png',
    '/icons/icon-384x384.png',
    '/icons/android-chrome-512x512.png',
    '/icons/android-chrome-192x192.png',
];

const NAME = 'John Zanussi';
const URL = import.meta.env.SITE;

const defaultData = {
    title: 'John Zanussi',
    url: URL,
    ogType: 'website',
};

export function generateTags(metadata) {
    const data = merge(defaultData, metadata);

    if (data.screenshot) {
        data.image = getScreenshotPath(data.screenshot);
    }

    // https://webcode.tools/generators/open-graph/article
    const generator = withStructuredData()
        .configure(settings)
        .setIcons(icons)
        .setCanonical(data.url)
        .setProjectMeta({
            name: NAME,
        })
        .setPageMeta({
            title: data.title,
            description: data.description,
            url: data.url,
            image: data.image,
            locale: 'en_US',
        })
        .openGraphData(data.ogType)
        .setTwitterMeta({
            card: 'summary_large_image',
        });

    if (data.ogType === 'article') {
        generator.add('meta', {
            property: 'article:author',
            content: NAME,
        });

        if (data.breadcrumbs) {
            generator.breadcrumb([
                ...data.breadcrumbs,
                {
                    title: data.title,
                    url: data.url,
                },
            ]);
        }

        // https://validator.schema.org/
        generator.setStructuredData({
            '@type': 'BlogPosting',
            author: {
                '@type': 'Person',
                name: NAME,
            },
            headline: data.title,
            datePublished: new Date(data.publishDate).toISOString(),
        });
    }

    if (data.publishDate) {
        generator.add('meta', {
            property: 'article:published_time',
            content: new Date(data.publishDate).toISOString(),
        });
    }

    const tags = generator.build();

    return tags;
}

// https://github.com/Alivekeep/metatags-generator/blob/master/src/metadata-generator.ts
function withStructuredData(instance = new MetadataGenerator()) {
    instance.setStructuredData = (data) => {
        const generatedData = instance.htmlGenerator.generateJSONLD(data);

        instance.elementsOfBody.set(generatedData, generatedData);
    };

    return instance;
}
