import { defineMdastPlugin } from 'satteri';
import getReadingTime from 'reading-time';

interface ReadingTimeData {
    astro?: {
        frontmatter?: {
            minutesRead?: string;
        };
    };
    readingTimeText?: string[];
}

// Sets frontmatter.minutesRead from the post's prose and code
export default function readingTime() {
    return defineMdastPlugin({
        name: 'reading-time',
        before(root, ctx) {
            const data = ctx.data as ReadingTimeData;
            data.readingTimeText = [ctx.textContent(root, { includeImageAlt: true, includeHtml: true })];
        },
        // textContent skips fenced code blocks, so collect them separately
        code(node, ctx) {
            (ctx.data as ReadingTimeData).readingTimeText?.push(node.value);
        },
        after(_root, ctx) {
            const data = ctx.data as ReadingTimeData;

            if (data.astro?.frontmatter) {
                data.astro.frontmatter.minutesRead = getReadingTime((data.readingTimeText ?? []).join('\n')).text;
            }

            delete data.readingTimeText;
        },
    });
}
