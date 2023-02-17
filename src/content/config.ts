import { defineCollection, z } from 'astro:content';

// https://zod.dev/?id=primitives

// Pages
const pageCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        excerpt: z.string().nullable(),
        coverImage: z.object({
            url: z.string(),
            width: z.number(),
            height: z.number(),
        }),
        draft: z.boolean().optional(),
    }),
});

// Posts
const postCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        excerpt: z.string().nullable(),
        coverImage: z.object({
            url: z.string(),
            width: z.number(),
            height: z.number(),
        }),
        date: z.string().transform(date => new Date(date)),
        hasAmazonLinks: z.boolean().optional(),
        hiddenIntro: z.boolean().optional(),
        draft: z.boolean().optional(),
    }),
});

export const collections = {
    pages: pageCollection,
    posts: postCollection,
};
