import { visit } from 'unist-util-visit';
import { getRelativeSrc } from '../images.js';

export default function remarkImagePaths() {
    return function (tree, file) {
        try {
            // Get slug from filename
            const slug = /[^/]*$/.exec(file.history[0])[0].split('.')[0];

            const onImage = (node) => {
                node.url = getRelativeSrc(slug, node.url);
            };

            visit(tree, 'image', onImage);
        } catch (error) {
            console.warn(error);
        }
    };
}
