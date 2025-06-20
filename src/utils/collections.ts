import { type CollectionEntry, getCollection } from 'astro:content';
import type { CollectionsWithDateProperty, ContentCollectionKey } from '../content.config';

const collectionUrls = {
    posts: '/posts',
    pages: '/',
    projects: '/projects',
};

export const getItems = async (
    collection: ContentCollectionKey
) => {
    const items = await getCollection(collection);

    return items;
};

export const getItemUrl = (collection: ContentCollectionKey, id: string) => {
    return `${collectionUrls[collection]}/${id}`;
};

export const getCollectionUrl = (collection: ContentCollectionKey) => {
    return `${collectionUrls[collection]}/`;
};

export const getPostUrl = (id: string) => getItemUrl('posts', id);

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
export const getSiblingItems = async <T extends CollectionsWithDateProperty>(
    collection: T,
    item: CollectionEntry<T>
) => {
    // Setup return value
    const siblingItems: SiblingItems<T>[] = [];

    // Get all the items
    const allItems = await getDateSortedCollection(collection);

    // Find the index for the given item
    const itemIndex = allItems.findIndex(
        (allItem: CollectionEntry<ContentCollectionKey>) => allItem.id === item.id
    );

    // If the item was found
    if (itemIndex > -1) {

        // If the item isn't the first item, get the previous item
        if (itemIndex > 0) {
            siblingItems.push({
                item: allItems[itemIndex - 1] as unknown as CollectionEntry<T>,
                isPrevious: true,
            });
        }

        // If the item isn't the last item, get the next item
        if (itemIndex < allItems.length - 1) {
            siblingItems.push({
                item: allItems[itemIndex + 1] as unknown as CollectionEntry<T>,
                isPrevious: false,
            });
        }
    }

    return siblingItems as SiblingItems<T>[];
};
