import { defineHastPlugin } from 'satteri';
import type { ElementContent } from 'hast';

const isWhitespace = (node: ElementContent) => node.type === 'text' && node.value.trim() === '';

const isImage = (node: ElementContent) => node.type === 'element' && node.tagName === 'img';

// A link that holds nothing but images (and whitespace)
const isImageLink = (node: ElementContent) =>
    node.type === 'element' &&
    node.tagName === 'a' &&
    node.children.some(isImage) &&
    node.children.every((child) => isImage(child) || isWhitespace(child));

// Removes the <p> that Markdown puts around images and linked images
export default function unwrapImages() {
    return defineHastPlugin({
        name: 'unwrap-images',
        element: {
            filter: ['p'],
            visit(node, ctx) {
                const children = node.children as ElementContent[];
                const hasImage = children.some((child) => isImage(child) || isImageLink(child));
                const onlyImages = children.every(
                    (child) => isImage(child) || isImageLink(child) || isWhitespace(child)
                );

                if (hasImage && onlyImages) {
                    ctx.replaceNode(node, children.filter((child) => !isWhitespace(child)));
                }
            },
        },
    });
}
