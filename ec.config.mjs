import { defineEcConfig, definePlugin } from 'astro-expressive-code';
import { addClassName } from 'astro-expressive-code/hast';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';

const pluginFit = () => definePlugin({
    name: 'fit',
    hooks: {
        postprocessRenderedBlockGroup: ({ renderedGroupContents, renderData }) => {
            const hasFit = renderedGroupContents.some(({ codeBlock }) => codeBlock.metaOptions.getBoolean('fit'));

            if (hasFit) {
                addClassName(renderData.groupAst, 'code-fit');
            }
        },
    },
});

// Lives outside astro.config.ts so the <Code> component can load it too
export default defineEcConfig({
    plugins: [
        pluginCollapsibleSections(),
        pluginLineNumbers(),
        pluginFit(),
    ],
    defaultProps: {
        showLineNumbers: false,
    },
    themeCssSelector: (theme) => `[data-theme='${theme.type}']`,
    styleOverrides: {
        codeFontFamily: 'var(--font-mono)',
        uiFontFamily: 'var(--font-sans)',

        frames: {
            frameBoxShadowCssValue: '1.6px 1.6px 21px 0 rgba(0,0,0,0.1)',
            // editorActiveTabIndicatorTopColor: 'var(--bs-heading-color)',
            editorActiveTabIndicatorTopColor: 'var(--color-sky-500)',
        },
    },
});
