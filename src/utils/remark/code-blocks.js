import { visit } from 'unist-util-visit';
import he from 'he';

const CodeSnippetTagname = 'AutoImportedCodeSnippet';

export const codeBlockComponent = {
    'src/components/CodeBlock.astro': [['default', CodeSnippetTagname]],
};

/**
 * Parse contents of fenced code blocks
 * and feed them to the CodeBlock.astro
 * component as props for rendering
 */
export function remarkCodeBlocks() {

    return function (tree) {

        const transformMDX = (node, index, parent) => {

            // Pull the language and other
            // possible meta string out of node
            const { lang, meta } = node;

            // Setup empty meta attributes
            let metaAttributes = {};

            if (meta) {

                // Meta strings are formatted as
                //  key1="value1" key2="value2"
                // The regex matches on the keys and values, spreads them into an array,
                // and reduces down to a key: value object
                //
                // key1="value1" key2="value2"
                // becomes
                // {
                //      key1: `value1`,
                //      key2: `value2`,
                // }
                metaAttributes = [...meta.matchAll(/([^=\s]+)=['"]([^'"\s]+)/g)].reduce((accum, match) => {
                    const [, key, value] = match;
                    return {
                        ...accum,
                        [key]: value,
                    };
                }, {});

            }

            // If there was no filename in the meta string
            if (!metaAttributes.filename) {

                // Search for two slashes then a space at the start of a line
                // and match everything until the end of the line
                // Example: // astro.config.js
                node.value = node.value.replace(/^\/\/\s?([^\n]+)\n/, (fullMatch, filename) => {
                    metaAttributes.filename = filename;
                    return '';
                });
            }

            const props = {
                code: node.value,
                lang,
                ...metaAttributes,
            };

            const attributes = Object.entries(props).map((entry) => {

                const [name, value] = entry;

                return {
                    type: 'mdxJsxAttribute',
                    name,
                    value,
                };

            });

            const codeSnippetWrapper = {
                type: 'mdxJsxFlowElement',
                name: CodeSnippetTagname,
                attributes,
                children: [],
            };

            parent.children.splice(index, 1, codeSnippetWrapper);


        };

        visit(tree, 'code', transformMDX);

    };
}

