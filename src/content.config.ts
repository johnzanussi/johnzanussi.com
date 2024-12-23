import { defineCollection, z, type SchemaContext } from 'astro:content';
import { glob, file } from 'astro/loaders';

// https://zod.dev/?id=primitives

const mdxLoader = (contentDir: string) => glob({
    pattern: '**/*.mdx',
    base: `./src/content/${contentDir}`,
});

// Pages
const pageCollection = defineCollection({
    loader: mdxLoader('pages'),
    schema: ({ image }: SchemaContext) => z.object({
        title: z.string(),
        excerpt: z.string().nullable(),
        cover: image(),
        draft: z.boolean().optional()
    }),
});

// Posts
const postCollection = defineCollection({
    loader: mdxLoader('posts'),
    schema: ({ image }: SchemaContext) => z.object({
        title: z.string(),
        excerpt: z.string().nullable(),
        cover: image(),
        date: z.string().transform((date) => new Date(date)),
        hasAmazonLinks: z.boolean().optional(),
        hiddenIntro: z.boolean().optional(),
        draft: z.boolean().optional(),
    }),
});

// YouTube Channels
const ChannelSchema = z.object({
    title: z.string(),
    hasNotifications: z.boolean(),
    channelId: z.string(),
});

const CategoryChannelsSchema = z.object({
    category: z.string(),
    slug: z.string(),
    channels: z.array(ChannelSchema),
});

export type Channel = z.infer<typeof ChannelSchema>;
export type CategoryChannels = z.infer<typeof CategoryChannelsSchema>;

const youtubeChannelsCollection = defineCollection({
    loader: file('./src/content/youtube/channels.json'),
    schema: CategoryChannelsSchema,
});

export const collections = {
    pages: pageCollection,
    posts: postCollection,
    youtube: youtubeChannelsCollection,
};
// type Foo = z.infer<typeof pageCollection>

// type KeysWithDateProperty<T> = {
//     [K in keyof T]: "date" extends keyof T[K] ? K : never;
// }[keyof T];

// type CollectionsWithDateProperty = KeysWithDateProperty<typeof collections>;

export type CollectionsWithDateProperty = 'posts';