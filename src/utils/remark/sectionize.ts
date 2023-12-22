import { toString } from 'mdast-util-to-string';
import { findAfter } from 'unist-util-find-after';
import { visitParents } from 'unist-util-visit-parents';
import Slugger from 'github-slugger';

import type { Transformer } from 'unified';
import type { Parent } from 'unist';
import type { Heading } from 'mdast';

const slugs = new Slugger();

export default function remarkSectionize(): Transformer {

    const sectionize = (heading: Heading, ancestors: Parent[]) => {

        const start = heading;
        const depth = start.depth;
        const parent = ancestors[ancestors.length - 1];

        if (parent) {

            const end = findAfter(parent, start, (node) => {
                // Find the next heading or the end of the document
                return node.type === 'heading' || node.type === 'export' || node.type === 'mdxjsEsm';
            });

            if (!end) {
                return;
            }

            const startIndex = parent.children.indexOf(start);
            const endIndex = parent.children.indexOf(end);

            const between = parent.children.slice(
                startIndex,
                endIndex > 0 ? endIndex : undefined
            );

            const headingText = toString(heading)
                .replace(/^[^a-zA-Z]+/, '')
                .trim();

            const slug = slugs.slug(headingText);

            if (!heading.data) {
                heading.data = {};
            }

            if (!heading.data.hProperties) {
                heading.data.hProperties = {};
            }

            heading.data.hProperties = {
                ...(heading.data.hProperties as object),
                id: `h-${slug}`,
            };

            const section = {
                type: 'section',
                depth: depth,
                children: between,
                data: {
                    hName: 'section',
                    hProperties: {
                        id: slug,
                    },
                },
            };

            parent.children.splice(startIndex, section.children.length, section);

        }

    };

    return function (tree) {
        slugs.reset();
        visitParents(tree, 'heading', sectionize);
    };
}
