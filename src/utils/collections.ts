import { CollectionEntry, getCollection } from 'astro:content';
import type { Collection } from '../content/config';

const collectionUrls = {
    posts: '/posts',
    pages: '/',
};

const isDev = import.meta.env.MODE === 'development';

// This is temporary until I can figure out how to
// better use `CollectionEntry` from `astro:content`
type GenericItem = {
    slug: string;
    data: {
        draft?: boolean;
        date: string;
    };
};

export const getItems = async (
    collection: Collection,
    includeDrafts = isDev
) => {
    const draftFilter = !includeDrafts
        ? (item: GenericItem) => !item.data.draft
        : undefined;

    const items = await getCollection(collection, draftFilter);

    return items as GenericItem[];
};

export const getItemUrl = (collection: Collection, slug: string) => {
    return `${collectionUrls[collection]}/${slug}`;
};

export const getCollectionUrl = (collection: Collection) => {
    return `${collectionUrls[collection]}/`;
};

export const getPostUrl = (slug: string) => getItemUrl('posts', slug);

export const getDateSortedCollection = async <T extends Collection>(
    collection: T
) => {
    const items = await getItems(collection);

    const sortedCollection = items.sort(
        (itemA: GenericItem, itemB: GenericItem) =>
            Date.parse(itemB.data.date) - Date.parse(itemA.data.date)
    );

    return sortedCollection as CollectionEntry<T>[];
};

export type SiblingItems<T extends Collection> = {
    isPrevious: boolean;
    item: CollectionEntry<T>;
};

/**
 * Get the previous and next items if
 * available for a given item
 */
export const getSiblingItems = async <T extends Collection>(
    collection: T,
    item: GenericItem
) => {
    // Setup return value
    const siblingItems: SiblingItems<T>[] = [];

    // Get all the items
    const allItems = await getItems(collection);

    // Find the index for the given item
    const itemIndex = allItems.findIndex(
        (allItem: GenericItem) => allItem.slug === item.slug
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
