import { defineHastPlugin } from 'satteri';
import type { HastNode } from 'satteri';
import type { Element, Text } from 'hast';
import { gemoji } from 'gemoji';

// Characters that display as emoji by default, or text symbols forced to emoji
// with a variation selector (so plain ™ and © are left alone), chained with
// zero-width joiners
const emojiPart = String.raw`(?:\p{Extended_Pictographic}\uFE0F|\p{Emoji_Presentation}\p{Emoji_Modifier}?)`;
const emojiRegex = new RegExp(String.raw`${emojiPart}(?:\u200D${emojiPart})*`, 'gu');

const ignoredParents = new Set(['title', 'script', 'style', 'svg', 'math', 'pre', 'code']);

const descriptions = new Map<string, string>();
for (const { emoji, description } of gemoji) {
    descriptions.set(emoji, description);
    descriptions.set(emoji.replace(/\uFE0F/g, ''), description);
}

const describe = (emoji: string) => descriptions.get(emoji) ?? descriptions.get(emoji.replace(/\uFE0F/g, '')) ?? '';

// Wraps emoji in prose in <span role="img" aria-label="…"> so screen readers
// announce a name instead of reading the raw character
export default function accessibleEmojis() {
    return defineHastPlugin({
        name: 'accessible-emojis',
        text(node, ctx) {
            if (!emojiRegex.test(node.value)) {
                return;
            }
            emojiRegex.lastIndex = 0;

            const parent = ctx.parent(node as HastNode);
            if (parent?.type === 'element') {
                if (ignoredParents.has(parent.tagName) || parent.properties?.role === 'img') {
                    return;
                }
            }

            const output: (Text | Element)[] = [];
            let lastIndex = 0;

            for (const match of node.value.matchAll(emojiRegex)) {
                if (match.index > lastIndex) {
                    output.push({ type: 'text', value: node.value.slice(lastIndex, match.index) });
                }

                const description = describe(match[0]);
                output.push({
                    type: 'element',
                    tagName: 'span',
                    properties: description
                        ? { role: 'img', ariaLabel: description }
                        : { role: 'img', ariaHidden: 'true' },
                    children: [{ type: 'text', value: match[0] }],
                });

                lastIndex = match.index + match[0].length;
            }

            if (lastIndex < node.value.length) {
                output.push({ type: 'text', value: node.value.slice(lastIndex) });
            }

            ctx.replaceNode(node as HastNode, output as HastNode[]);
        },
    });
}
