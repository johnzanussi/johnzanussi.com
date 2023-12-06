import type { MetatagsDocument, OpengraphTypes, Settings } from 'metatags-generator';

import { MetadataGenerator } from 'metatags-generator';
import { HtmlGenerator } from 'metatags-generator/lib/html-generator/generator';
import merge from 'deepmerge';

type OpenGraphTypes = OpengraphTypes | 'website';

type Metadata = {
    title: string;
    url: string;
    ogType: OpenGraphTypes;
    image?: string;
    description?: string;
    breadcrumbs?: Breadcrumb[];
    publishDate?: string;
};

type Breadcrumb = {
    title: string;
    url: string;
};

const NAME = 'John Zanussi';
const URL = import.meta.env.SITE;

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

const meta = [
    {
        name: 'theme-color',
        content: '#01233d',
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
        content: NAME,
    },
    {
        name: 'apple-mobile-web-app-title',
        content: NAME,
    },
];

const defaultData: Metadata = {
    title: NAME,
    url: URL,
    ogType: 'website',
};

export function generateTags(metadata: Metadata) {
    const data = merge(defaultData, metadata);

    // https://webcode.tools/generators/open-graph/article
    const generator = new MetadataGeneratorStructured()
        .configure(settings)
        .setOpenGraph(data.ogType)
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
        .setTwitterMeta({
            card: 'summary_large_image',
        }) as unknown as MetadataGeneratorStructured;

    meta.forEach((meta) => generator.add('meta', meta));

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

type StructuredData = {
    '@type': 'BlogPosting';
    author: {
        '@type': string;
        name: string;
    };
    headline: string;
    datePublished: string;
};

// https://github.com/Alivekeep/metatags-generator/blob/master/src/metadata-generator.ts
class MetadataGeneratorStructured extends MetadataGenerator {
    public structuredData: Map<string, string>;

    constructor() {
        super();
        this.structuredData = new Map();
    }

    configure(settings?: Settings): MetadataGeneratorStructured {
        super.configure(settings);
        return this;
    }

    setOpenGraph(
        type: OpenGraphTypes,
        duration?: number
    ): MetadataGeneratorStructured {
        if (type === 'website') {
            this.add('meta', { property: 'og:type', content: type });
        } else {
            super.openGraphData(type, duration);
        }
        return this;
    }

    setStructuredData(data: StructuredData) {
        const htmlgenerator = new HtmlGenerator();
        const generatedData = htmlgenerator.generateJSONLD(data, {});

        this.structuredData.set(generatedData, generatedData);
    }

    build(): MetatagsDocument {
        const document = super.build();

        const sData = Array.from(this.structuredData.values())
            .sort()
            .join('\n');

        document.body += sData;

        return document;
    }
}
