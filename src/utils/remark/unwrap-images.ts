import type { Link, LinkReference, Paragraph, Root } from 'mdast';

import { whitespace } from 'hast-util-whitespace';
import { SKIP, visit } from 'unist-util-visit';

const unknown = 1;
const containsImage = 2;
const containsOther = 3;

export default function remarkUnwrapImages() {
    return function (tree: Root) {
        visit(tree, 'paragraph', function (node, index, parent) {
            if (
                parent &&
                typeof index === 'number' &&
                applicable(node, false) === containsImage
            ) {
                parent.children.splice(index, 1, ...node.children);
                return [SKIP, index];
            }
            return;
        });
    };
}

function applicable(
    node: Link | LinkReference | Paragraph,
    inLink: boolean
): number {
    let image = unknown;
    let index = -1;

    while (++index < node.children.length) {
        const child = node.children[index];
        if (child) {
            if (child.type === 'text' && whitespace(child.value)) {
                // Whitespace is fine.
            } else if (
                child.type === 'image' ||
                child.type === 'imageReference' ||
                ('name' in child && child.name === 'astro-image')
            ) {
                image = containsImage;
            } else if (
                !inLink &&
                (child.type === 'link' || child.type === 'linkReference')
            ) {
                const linkResult = applicable(child, true);

                if (linkResult === containsOther) {
                    return containsOther;
                }

                if (linkResult === containsImage) {
                    image = containsImage;
                }
            } else {
                return containsOther;
            }
        }
    }

    return image;
}
