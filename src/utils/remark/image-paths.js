import { visit } from 'unist-util-visit';
import { getItemImagePath } from '../images.js';

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
export default function remarkImagePaths() {

    return function (tree, file) {

        try {

            const filePath = file.history[0];

            const matchContent = /\/content\/([^/]+)/.exec(filePath);

            if (matchContent) {

                // Get collection type from filename
                const collectionType = matchContent[1];

                // Get slug from filename
                const slug = /[^/]*$/.exec(filePath)[0].split('.')[0];

                const onImage = (node) => {
                    node.url = getItemImagePath(slug, node.url, collectionType);
                };

                visit(tree, 'image', onImage);

            }

        } catch (error) {
            console.warn(error);
        }

    };

}
