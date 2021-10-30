import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkToc from 'remark-toc';
import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import rehypeImageSize from 'rehype-img-size';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import { loadFile, getFilesInDirectory, getPath, getLastUpdated } from './files';

/**
 * Matches both .md and .mdx file extensions
 * @type {RegExp}
 */
const MD_EXT_REGEXP = /\.mdx?$/;


/**
 * Build an array that getStaticPaths expects
 * for markdown files in a directory.
 *
 * https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
 *
 * @param  {String} directory   The directory to read markdown files from
 * @param  {String} key         They key to identify the path (slug, page, etc)
 * @param  {Boolean} fallback
 * @return {Object}
 */
export const getDirStaticPaths = (directory, key = 'slug', fallback = false) => {

    const files = getFilesInDirectory(directory);

    const paths = files.reduce((accum, filename) => {

        if (filename.match(MD_EXT_REGEXP)) {
            accum.push({
                params: {
                    [key]: filename.replace(MD_EXT_REGEXP, ''),
                }
            });
        }

        return accum;

    }, []);

    return {
        paths,
        fallback,
    };

};

/**
 * This returns everything after the last slash
 * of a file's path and removes the markdown extension
 *
 * Example
 * /johnzanussi.com/_pages/about.md -> about
 *
 * @param  {String} filename    Full filename to pull a slgu from
 * @return {String}             Formatted slug
 */
export const getSlugForFileName = (filename) => {
    return filename.split('/').slice(-1).pop().replace(MD_EXT_REGEXP, '');
};

/**
 * Use next-mdx-remote and remark and rehype plugins to
 * convert raw MDX to something that MDXRemote understands
 *
 * @param  {String} markdown    Raw markdown content
 * @return {Object}
 */
export const convertMarkdown = async (markdown) => {

    // Replace "(/public" with "(" so the README file
    // can display image files in the GitHub repo
    const modifiedMarkdown = markdown.replace(/\(\/?public/g, '(');

    const result = await serialize(modifiedMarkdown, {
        mdxOptions: {
            remarkPlugins: [
                remarkGfm,
                remarkUnwrapImages,
                remarkToc,
                remarkA11yEmoji,
            ],
            rehypePlugins: [
                [rehypeImageSize, {
                    dir: getPath('public'),
                }],
                rehypeSlug,
                [rehypeAutolinkHeadings, {
                    behavior: 'append',
                    properties: {
                        className: 'link-anchor ps-2',
                    },
                    content: {
                        type: 'element',
                        tagName: 'FontAwesomeHashtag',
                    },
                }],
            ],
        },
    });

    return result;

};

/**
 * Get requested formatted data from a markdown file
 *
 * @param  {String}         filePath    Path of markdown file
 * @param  {Array|String}   fields      List of fields to get data for or 'all' for everything
 * @return {Object}
 */
export const getMarkdownData = async (filePath, fields = []) => {

    // Load file from disk
    const fileContents = loadFile(filePath);

    // Pull out front matter data
    const { data, content } = matter(fileContents);

    // Check if we want everything
    const getAll = fields === 'all';

    // Use the keys from the front matter
    // as a base if getting "all"
    if (getAll) {
        fields = Object.keys(data);
    }

    // Iterate over the fields and build an object with the data
    const markdownData = fields.reduce((accum, field) => {

        // Slug is created via the filepath
        if (field === 'slug' || getAll) {
            accum.slug = getSlugForFileName(filePath) || '';
        }

        // Last updated is pulled from the file meta
        if (field === 'lastUpdated' || getAll) {
            accum.lastUpdated = getLastUpdated(filePath) || '';
        }

        // Catch all
        if (data[field]) {
            accum[field] = data[field];
        }

        return accum;

    }, {});

    // Pass the raw markdown data through the converter
    if (fields.includes('content') || getAll) {
        markdownData.content = await convertMarkdown(content);
    }

    return markdownData;

};
