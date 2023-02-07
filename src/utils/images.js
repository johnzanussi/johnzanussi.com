import { renderImg } from "astro-imagetools/api";

import { absoluteUrl } from './urls.js';

// let _images;

// const loadImages = async function () {
//     const images = import.meta.glob('../assets/**');
//     console.log('images', images);
//     return images;
// };

// const getImages = async () => {
//     _images = _images || (await loadImages());
//     return _images;
// };

export const getImage = async (path) => {
    if (typeof path !== 'string') {
        return path;
    }

    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    const relativePath = `/src/${path.match(/assets(.*)/)[0]}`;

    return relativePath;

    // const images = await getImages();

    // const key = `../${path.match(/assets(.*)/)[0]}`;

    // return typeof images[key] === 'function' ? (await images[key]())['default'] : null;
};

export const getRelativeSrc = (slug, src) => {
    if (src?.startsWith('~')) {
        return `assets/posts/${slug}/${src.replace('~', '')}`;
    }

    return src;
};

export const getScreenshotPath = (slug) => {
    return absoluteUrl(`/public/screenshots/${slug}.jpg`);
};


export const getImageUrl = async (slug, path, width) => {

    const src = await getImage(getRelativeSrc(slug, path));

    const { img } = await renderImg({
        src: src,
        alt: 'asdf',
        breakpoints: [width],
        placeholder: 'none',
        loading: null,
        decoding: null,
    });

    const url = img.match(/srcset="([^"]+)"/)[1];

    return url;

};
