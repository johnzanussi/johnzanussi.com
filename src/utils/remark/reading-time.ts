import type { Root } from 'mdast';
import type { VFile } from 'vfile';
import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';


interface AstroFile {
    data: {
        astro: {
            frontmatter: {
                minutesRead?: string;
            };
        };
    };
}

export default function remarkReadingtime() {
    return function (tree: Root, file: VFile) {
        const astroFile = file as unknown as AstroFile;

        if (astroFile.data.astro.frontmatter) {
            const textOnPage = toString(tree);
            const readingTime = getReadingTime(textOnPage);

            astroFile.data.astro.frontmatter.minutesRead = readingTime.text;
        }
    };
}
