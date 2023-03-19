import { visit } from 'unist-util-visit';
import { getItemImagePath } from '../images';

import type { Transformer } from 'unified';
import type { Image } from 'mdast';

/**
 * This allows mdx files to use shortcuts
 * when refrencing images
 *
 * Instead of writing out the entire path name for an image in a
 * mdx file you can use a ~ and then the image name.
 *
 * As long as the image is in a directory with the same name
 * as the file slug this plugin will resolve the image
 *
 * Example:
 * ```mdx
 * // src/content/posts/post-1.mdx
 * ![alt text](~some-image.jpg)
 * ```
 *
 * This plugin will convert ~some-image.jpg
 * to src/assets/posts/post-1/some-image.jpg
 * @return {[type]} [description]
 */
export default function remarkImagePaths(): Transformer {
    return function (tree, file) {
        try {
            const filePath = file.history[0];

            const collectionTypeMatch = /\/content\/([^/]+)/.exec(filePath);

            if (!collectionTypeMatch) {
                return;
            }

            // Get slug from flilepath
            const slugMatch = /[^/]*$/.exec(filePath);

            if (!slugMatch) {
                return;
            }

            // Split on the period and get everything before
            const slug = slugMatch[0].split('.')[0];

            // Get collection type from filename
            const collectionType = collectionTypeMatch[1];

            const onImage = (node: Image) => {
                node.url = getItemImagePath(slug, node.url, collectionType);
            };

            visit(tree, 'image', onImage);
        } catch (error) {
            console.warn(error);
        }
    };
}
