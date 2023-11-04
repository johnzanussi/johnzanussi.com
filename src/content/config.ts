import { defineCollection, z, type SchemaContext } from 'astro:content';

// https://zod.dev/?id=primitives

// Pages
const pageCollection = defineCollection({
    schema: ({ image }: SchemaContext) => z.object({
        title: z.string(),
        excerpt: z.string().nullable(),
        cover: image(),
        draft: z.boolean().optional()
    }),
});

// Posts
const postCollection = defineCollection({
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
    categorySlug: z.string(),
    channels: z.array(ChannelSchema),
});

export type Channel = z.infer<typeof ChannelSchema>;
export type CategoryChannels = z.infer<typeof CategoryChannelsSchema>;

const youtubeChannelsCollection = defineCollection({
    type: 'data',
    schema: z.array(CategoryChannelsSchema)
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