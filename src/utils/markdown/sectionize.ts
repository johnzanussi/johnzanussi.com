import { defineMdastPlugin } from 'satteri';
import type { Custom, MdastNode } from 'satteri';
import type { Heading, RootContent } from 'mdast';
import Slugger from 'github-slugger';

type Node = RootContent | Custom;
type Parent = Node & { children: Node[] };

const hasChildren = (node: Node): node is Parent => Array.isArray((node as Parent).children);

const isHeading = (node: Node): node is Heading => node.type === 'heading';

// MDX imports and exports end a section, like a heading does
const isBoundary = (node: Node) => isHeading(node) || node.type === 'mdxjsEsm';

const toText = (node: Node): string => {
    if (node.type === 'text' || node.type === 'inlineCode') {
        return (node as { value: string }).value;
    }
    // Some headings are just an image, so use its alt text
    if (node.type === 'image') {
        return (node as { alt?: string }).alt ?? '';
    }
    return hasChildren(node) ? node.children.map(toText).join('') : '';
};

// Wraps each heading and the content that follows it, up to the next heading,
// in a <section id="slug">. The heading itself gets id="h-slug", which the
// table of contents and scrollspy rely on. Headings nested inside components
// are sectionized within their own parent.
//
// This runs on the Markdown tree, not the HTML tree: code blocks keep their
// language and title as plain fields here, which expressive-code reads later.
export default function sectionize() {
    return defineMdastPlugin({
        name: 'sectionize',
        before(root, ctx) {
            const slugs = new Slugger();
            let changed = false;

            // Walks children in document order, so duplicate headings get the
            // same -1, -2 slug suffixes as before
            const transform = (children: Node[]): Node[] => {
                const slugged = new Map<Node, string>();

                const nested = children.map((child) => {
                    if (isHeading(child)) {
                        const headingText = toText(child)
                            .replace(/^[^a-zA-Z]+/, '')
                            .trim();
                        slugged.set(child, slugs.slug(headingText));
                        return child;
                    }
                    return hasChildren(child) ? ({ ...child, children: transform(child.children) } as Node) : child;
                });

                if (!slugged.size) {
                    return nested;
                }

                changed = true;
                const output: Node[] = [];
                let index = 0;

                while (index < nested.length) {
                    const node = nested[index]!;
                    const slug = slugged.get(node);

                    if (!isHeading(node) || slug === undefined) {
                        output.push(node);
                        index++;
                        continue;
                    }

                    let end = index + 1;
                    while (end < nested.length && !isBoundary(nested[end]!)) {
                        end++;
                    }

                    const data = (node.data ?? {}) as { hProperties?: Record<string, unknown> };
                    const heading = {
                        ...node,
                        data: {
                            ...data,
                            hProperties: { ...data.hProperties, id: `h-${slug}` },
                        },
                    } as Heading;

                    output.push({
                        type: 'section',
                        children: [heading, ...nested.slice(index + 1, end)] as Custom['children'],
                        data: {
                            hName: 'section',
                            hProperties: { id: slug },
                        },
                    } as Custom);

                    index = end;
                }

                return output;
            };

            const children = transform(root.children as Node[]);

            if (changed) {
                ctx.replaceNode(root as MdastNode, { type: 'root', children } as MdastNode);
            }
        },
    });
}
