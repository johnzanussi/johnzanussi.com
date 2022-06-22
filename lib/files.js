import fs from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { execSync } from 'child_process';

/**
 * Get the full file path for a given path relative to this file
 *
 * @param  {String} file    The filename to get the path for
 * @return {String}         Full path for file
 */
export const getPath = (file) =>
    join(dirname(fileURLToPath(import.meta.url)), '../', file);

/**
 * Load a file from the disk
 *
 * @param  {String} path    Path to look for file
 * @return {String}         Contents of loaded file
 */
export const loadFile = (path) => fs.readFileSync(getPath(path));

/**
 * Get a file's modified time
 *
 * @param  {String} path    Path to file
 * @return {String}         Date/time ISO of last modified
 */
export const getLastUpdated = (path) => {
    const lastModified = execSync(`git log -1 --pretty="format:%ci" ${path}`, {
        encoding: 'utf-8',
    });
    return new Date(lastModified || Date.now()).toISOString();
};

/**
 * Get all the file names in a directory
 *
 * @param  {String} directory   Directory to get files
 * @return {Array}              File names in directory
 */
export const getFilesInDirectory = (directory) =>
    fs.readdirSync(getPath(directory));
