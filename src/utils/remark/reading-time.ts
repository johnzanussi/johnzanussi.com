import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

import type { Transformer } from 'unified';

interface AstroFile {
    data: {
        astro: {
            frontmatter: {
                minutesRead?: string;
            };
        };
    };
}

export default function remarkReadingtime(): Transformer {
    return function (tree, file) {
        const astroFile = file as unknown as AstroFile;

        if (astroFile.data.astro.frontmatter) {
            const textOnPage = toString(tree);
            const readingTime = getReadingTime(textOnPage);

            astroFile.data.astro.frontmatter.minutesRead = readingTime.text;
        }
    };
}
