import { visit } from 'unist-util-visit';
import { getItemImagePath } from '../images.js';

export default function remarkImagePaths() {

    return function (tree, file) {

        try {

            const filePath = file.history[0];

            const matchContent = /\/content\/([^\/]+)/.exec(filePath);

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
