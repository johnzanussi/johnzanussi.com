import { visit } from 'unist-util-visit';
import he from 'he';

const CodeSnippetTagname = 'AutoImportedCodeSnippet';

export const codeBlockComponent = {
    'src/components/CodeBlock.astro': [['default', CodeSnippetTagname]],
};

export function remarkCodeBlocks() {

    return function (tree, file) {

        const transformMDX = (node, index, parent) => {

            const { lang, meta } = node;

            let metaAttributes = {};

            if (meta) {

                metaAttributes = [...meta.matchAll(/([^=\s]+)=['"]([^'"\s]+)/g)].reduce((accum, match) => {
                    const [, key, value] = match;
                    return {
                        ...accum,
                        [key]: value,
                    }
                }, {});

            }

            if (!metaAttributes.filename) {
                node.value = node.value.replace(/^\/\/\s?([^\n]+)\n/, (fullMatch, filename) => {
                    metaAttributes.filename = filename;
                    return '';
                });
            }

            const attributes = {
                ...metaAttributes,
                lang,
            };

            const codeSnippetWrapper = makeComponentNode(
                CodeSnippetTagname,
                attributes,
                node
            );

            parent.children.splice(index, 1, codeSnippetWrapper);


        };

        visit(tree, 'code', transformMDX);

    }
}

export async function getCodeFromSlot(slots) {

    const codeHtml = await slots.render('default');

    let code = codeHtml;

    if (code.includes('</code>')) {
        code = codeHtml.match(/<(code)[^>]*>(?<content>[^<]*)</)[2];
    }

    code = he.decode(code);

    return code;

}

function makeMDXComponentNode(name, attributes, ...children) {
    return {
        type: 'mdxJsxFlowElement',
        name,
        attributes: Object.entries(attributes)
            // Filter out non-truthy attributes to avoid empty attrs being parsed as `true`.
            .filter(([_k, v]) => v !== false && Boolean(v))
            .map(([name, value]) => ({ type: 'mdxJsxAttribute', name, value })),
        children,
    };
}

function makeComponentNode(tagName, attributes, ...children) {
    const factory = makeMDXComponentNode;
    return factory(tagName, attributes, ...children);
}
