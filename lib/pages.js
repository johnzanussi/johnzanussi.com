import 'server-only';

import { getDirStaticPaths, getMarkdownData } from 'lib/markdown';

const PAGES_DIR = '_pages';

/**
 * Get static paths for all the pages
 *
 * @return {Array}
 */
export const getPagesStaticPaths = async () => {
    const allPages = getDirStaticPaths(PAGES_DIR, 'page');
    return allPages;
};

/**
 * Get data for a markdown file in the _pages directory
 *
 * @param  {String} slug    Slug for page file
 * @return {Object}
 */
export const getPageData = async (slug) => {
    const pageData = await getMarkdownData(`${PAGES_DIR}/${slug}.md`, 'all');
    return {
        ...pageData,
        url: `/${pageData.slug}`,
    };
};
