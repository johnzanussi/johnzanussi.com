import { type CollectionEntry, type ContentCollectionKey, getCollection } from 'astro:content';
import type { CollectionsWithDateProperty } from '../content/config';

const collectionUrls = {
    posts: '/posts',
    pages: '/',
};

const isDev = import.meta.env.MODE === 'development';

export const getItems = async (
    collection: ContentCollectionKey,
    includeDrafts = isDev
) => {
    const draftFilter = !includeDrafts
        ? (item: CollectionEntry<ContentCollectionKey>) => !item.data.draft
        : undefined;

    const items = await getCollection(collection, draftFilter);

    return items;
};

export const getItemUrl = (collection: ContentCollectionKey, slug: string) => {
    return `${collectionUrls[collection]}/${slug}`;
};

export const getCollectionUrl = (collection: ContentCollectionKey) => {
    return `${collectionUrls[collection]}/`;
};

export const getPostUrl = (slug: string) => getItemUrl('posts', slug);

export const getDateSortedCollection = async <T extends CollectionsWithDateProperty>(
    collection: T
) => {
    const items = await getItems(collection) as CollectionEntry<T>[];

    const sortFunc = (itemA: CollectionEntry<T>, itemB: CollectionEntry<T>) => {
        return itemB.data.date.getTime() - itemA.data.date.getTime();
    };

    return items.sort(sortFunc);
};

export type SiblingItems<T extends ContentCollectionKey> = {
    isPrevious: boolean;
    item: CollectionEntry<T>;
};

/**
 * Get the previous and next items if
 * available for a given item
 */
export const getSiblingItems = async <T extends ContentCollectionKey>(
    collection: T,
    item: CollectionEntry<T>
) => {
    // Setup return value
    const siblingItems: SiblingItems<T>[] = [];

    // Get all the items
    const allItems = await getItems(collection);

    // Find the index for the given item
    const itemIndex = allItems.findIndex(
        (allItem: CollectionEntry<ContentCollectionKey>) => allItem.slug === item.slug
    );

    // If the item was found
    if (itemIndex > -1) {
        // If the item isn't the last item in the array (first item)
        if (itemIndex < allItems.length - 1) {
            siblingItems.push({
                item: allItems[itemIndex + 1] as unknown as CollectionEntry<T>,
                isPrevious: true,
            });
        }

        // If the item isn't the first item in the array (last item)
        if (itemIndex > 0) {
            siblingItems.push({
                item: allItems[itemIndex - 1] as unknown as CollectionEntry<T>,
                isPrevious: false,
            });
        }
    }

    return siblingItems as SiblingItems<T>[];
};
