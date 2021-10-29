import { parseCSV } from '../lib/csv';
import { getLastUpdated } from '../lib/files';
import { alphaSortByObjectField } from '../lib/utils';

/**
 * File location for youtube subscriptions
 * @type {String}
 */
const YOUTUBE_FILE = 'data/youtube-subscriptions.csv';

/**
 * Get and parse YouTube subscriptions from the CSV file
 *
 * @return {Array}
 */
export const getYouTubeSubscriptions = () => {

    // Parse the CSV file
    const channels = parseCSV(YOUTUBE_FILE);

    // Create an object where category is the key and the value
    // is an array of channels in that category
    const grouped = channels.reduce((accum, { category, ...channel }) => {

        if (!accum[category]) {
            accum[category] = [];
        }

        accum[category].push(channel);

        return accum;

    }, {});

    /**
     * Convert the category => channels object to an array
     * of objects where category and channels are keys in each object
     *
     * @example
     * [
     *   {
     *     category: '3D Printing',
     *     channels: [],
     *   }
     * ]
     *
     */
    return Object.keys(grouped).sort().map(category => ({
        category,
        channels: alphaSortByObjectField(grouped[category], 'channel_name'),
    }));

};

/**
 * Get the modified time for the CSV
 * @return {String}
 */
export const getYouTubeLastUpdated = () => getLastUpdated(YOUTUBE_FILE);
