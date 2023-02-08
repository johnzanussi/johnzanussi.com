import { getImage } from '@astrojs/image';

import { absoluteUrl } from './urls.js';

let _images;

const loadImages = async function () {
    const images = import.meta.glob('../assets/**');
    return images;
};

const getImages = async () => {
    _images = _images || (await loadImages());
    return _images;
};

export const loadImage = async (path) => {
    if (typeof path !== 'string') {
        return path;
    }

    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    const images = await getImages();

    const key = `../${path.match(/assets(.*)/)[0]}`;

    return typeof images[key] === 'function' ? (await images[key]())['default'] : null;

    // const relativePath = `/src/${path.match(/assets(.*)/)[0]}`;

    // return relativePath;
};

export const getScreenshotPath = (slug) => {
    return absoluteUrl(`/screenshots/${slug}.jpg`);
};

export const getItemImagePath = (slug, imagePath, collection = 'posts') => {

    if (imagePath?.startsWith('~')) {
        return `assets/${collection}/${slug}/${imagePath.replace('~', '')}`;
    }

    return imagePath;

};

export const getRenderedImage = async (path, options = {}) => {

    const image = await loadImage(path);

    const { src } = await getImage({
        ...image,
        ...options,
    });

    return src;
}
