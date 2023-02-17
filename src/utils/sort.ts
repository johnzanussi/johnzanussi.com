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
 * @param  unsorted @type {ArrayObject[]}      Array of objects to sort
 * @param  field    @type {string}             The field to sort on
 * @returns         @type {ArrayObject[]}      Sorted array of objects
 */
type ArrayObject = Record<string, any>;

export function alphaSortByObjectField<Type extends ArrayObject>(
    unsorted: Type[],
    field: keyof Type
): Type[] {
    return unsorted.sort((a, b) => a[field].localeCompare(b[field]));
}
