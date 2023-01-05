import 'server-only';

/**
 * A check for if the current environment is development
 *
 * @type {Boolean}
 */
export const isDev = process.env.NODE_ENV === 'development';

/**
 * Alphabetically sort an array of objects by
 * the value of a key within the object
 *
 * @example
 * const arrayOfObjects = [
 *     {
 *         title: 'B',
 *     },
 *     {
 *         title: 'D',
 *     },
 *     {
 *         title: 'A',
 *     },
 * ];
 *
 * alphaSortByObjectField(arrayOfObjects, 'title')
 * // returns [
 *     {
 *         title: 'A',
 *     },
 *     {
 *         title: 'B',
 *     },
 *     {
 *         title: 'D',
 *     },
 * ]
 *
 * @param  {Array} unsorted     Array of objects to sort
 * @param  {String} field       The field to sort on
 * @return {Array}              Sorted array
 */
export const alphaSortByObjectField = (unsorted, field) => {
    return unsorted.sort((a, b) => a[field].localeCompare(b[field]));
};

/**
 *
 *
 *
 */

/**
 * Prepend the host URL to a given path.
 *
 * @param  {String} path     URL path to prepend host to
 * @param  {String} host     Host url to prepend to path
 * @return {String}          Combined url
 */
export const prependHost = (path, host = process.env.NEXT_PUBLIC_SITE_URL) => {
    if (path.includes(host)) {
        return path;
    }

    return `${host}${path}`;
};
