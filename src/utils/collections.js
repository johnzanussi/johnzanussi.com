import { getCollection } from 'astro:content';

const collectionUrls = {
    posts: '/posts',
    pages: '/',
};

export const getItemUrl = (collection, slug) => {
    return `${collectionUrls[collection]}/${slug}`;
};

export const getCollectionUrl = (collection) => {
    return `${collectionUrls[collection]}/`;
};

export const getPostUrl = (slug) => getItemUrl('posts', slug);

export const getDateSortedCollection = async (collection) => {
    const items = await getCollection(collection);

    const sortedCollection = items.sort(
        (itemA, itemB) => Date.parse(itemB.data.date) - Date.parse(itemA.data.date)
    );

    return sortedCollection;
};

/**
 * Get the previous and next items if
 * available for a given item
 *
 * @param  {Object} item     A item object
 * @return {Array}           Array containing 0, 1, or 2 items
 */
export const getSiblingItems = async (collection, item) => {
    // Setup return value
    const siblingItems = [];

    // Get all the items
    const allItems = await getCollection(collection);

    // Find the index for the given item
    const itemIndex = allItems.findIndex((allItem) => allItem.slug === item.slug);

    // If the item was found
    if (itemIndex > -1) {
        // If the item isn't the last item in the array (first item)
        if (itemIndex < allItems.length - 1) {
            siblingItems.push({
                ...allItems[itemIndex + 1],
                isPrevious: true,
            });
        }

        // If the item isn't the first item in the array (last item)
        if (itemIndex > 0) {
            siblingItems.push({
                ...allItems[itemIndex - 1],
                isPrevious: false,
            });
        }
    }

    return siblingItems;
};
