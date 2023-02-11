import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

export default function remarkReadingtime() {

    return function(tree, file) {

        const textOnPage = toString(tree);
        const readingTime = getReadingTime(textOnPage);

        file.data.astro.frontmatter.minutesRead = readingTime.text;

    };

}
