import parse from 'csv-parse/lib/sync';

import { loadFile } from './files';

/**
 * Load a CSV file from the disk and parse it
 * using the csv-parse library
 *
 * @param  {String} filePath    Path to file to parse
 * @return {Array}              Parsed CSV file
 */
export const parseCSV = (filePath) => {
    const fileContents = loadFile(filePath);

    const data = parse(fileContents, {
        columns: true,
        skip_empty_lines: true,
    });

    return data;
};
