import parseISO from 'date-fns/parseISO';
import compareDesc from 'date-fns/compareDesc';
import { loadFile } from './files';
import { getMarkdownFilesInDirectory, getDirStaticPaths, getMarkdownData, excludeDraftsFilter } from './markdown';

export const POSTS_DIR = '_posts';
export const POSTS_PATH = 'posts';

/**
 * Get data for a markdown file in the posts directory
 *
 * @param  {String} slug    Slug for post file
 * @return {Object}
 */
export const getPostData = async (slug) => {
    const markdownData = await getMarkdownData(`${POSTS_DIR}/${slug}.mdx`, 'all');
    return {
        ...markdownData,
        url: getPostUrl(slug),
    };
};

/**
 * Get the URL for a slug
 * Useful for creating links to posts
 *
 * @param  {String} slug    Slug for post file
 * @return {String}         URL for post
 */
export const getPostUrl = (slug) => `/${POSTS_PATH}/${slug}`;

/**
 * Get static paths for all the posts
 * for the getStaticPaths func
 *
 * @return {Array}
 */
export const getPostsStaticPaths = () => getDirStaticPaths(POSTS_DIR);

/**
 * Get data for all the posts
 * Useful for the post listing page
 *
 * @return {Array}
 */
export const getAllPostData = async () => {

    // Get all the posts in the posts directory
    const postFiles = getMarkdownFilesInDirectory(POSTS_DIR).filter(excludeDraftsFilter);

    // Get data for only these fields
    const fields = [
        'slug',
        'date',
        'title',
        'coverImage',
        'excerpt',
    ];

    // Map over all the post files and get the data
    // for the fields established above
    const data = await Promise.all(postFiles.map(async (file) => {
        const markdownData = await getMarkdownData(`${POSTS_DIR}/${file}`, fields);
        return {
            ...markdownData,
            url: getPostUrl(markdownData.slug),
        };
    }));

    // Sort posts by date descending
    return data.sort((p1, p2) => compareDesc(parseISO(p1.date), parseISO(p2.date)));

};

/**
 * Get the previous and next posts if
 * available for a given post
 *
 * @param  {Object} post     A post object
 * @return {Array}           Array containing 0, 1, or 2 posts
 */
export const getSiblingPosts = async (post) => {

    // Setup return value
    const siblingPosts = [];

    // Get all the posts
    const allPosts = await getAllPostData();

    // Find the index for the given post
    const postIndex = allPosts.findIndex((allPost => allPost.title === post.title));

    // If the post was found
    if (postIndex > -1) {

        // If the post isn't the last post in the array (first post)
        if (postIndex < allPosts.length - 1) {
            siblingPosts.push({
                ...allPosts[postIndex + 1],
                isPrevious: true,
            });
        }

        // If the post isn't the first post in the array (last post)
        if (postIndex > 0) {
            siblingPosts.push({
                ...allPosts[postIndex - 1],
                isPrevious: false,
            });
        }

    }

    return siblingPosts;

};
