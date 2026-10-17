import { defineMdastPlugin } from 'satteri';
import type { MdastNode, MdastVisitorContext } from 'satteri';
import satteriMathml from 'satteri-mathml';

type Options = Parameters<typeof satteriMathml>[0];
type Render = (node: MdastNode, ctx: MdastVisitorContext) => { value: string } | undefined;

// satteri-mathml returns its MathML as `html` nodes, which MDX can't compile
// unless Sätteri's `rawHtml` feature is on, and that feature drops the language
// and title from code blocks. Hand the MathML back as raw content instead, which
// MDX parses into elements.
export default function math(options?: Options) {
    const plugin = satteriMathml(options) as unknown as Record<'math' | 'inlineMath', Render>;

    const visit = (render: Render) => (node: MdastNode, ctx: MdastVisitorContext) => {
        const output = render(node, ctx);
        if (output) {
            ctx.replaceNode(node, { raw: output.value, mdxExpressions: false });
        }
    };

    return defineMdastPlugin({
        name: 'math',
        math: visit(plugin.math),
        inlineMath: visit(plugin.inlineMath),
    });
}
