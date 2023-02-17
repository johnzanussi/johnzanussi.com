import { getImage } from '@astrojs/image';
import type { GetImageTransform } from '@astrojs/image/dist/lib/get-image';

import { absoluteUrl } from './urls';

let _images: Record<string, () => Promise<{ default: ImageMetadata }>>;

const loadImages = async () => {
    const images = await import.meta.glob('../assets/**');
    return images;
};

const getImages = async () => {
    _images = _images || (await loadImages());
    return _images;
};

export const loadImage = async (path: string): Promise<ImageMetadata | string> => {

    if (typeof(path) !== 'string') {
        return path;
    }

    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    const images = await getImages();

    const matches = path.match(/assets(.*)/);

    if (matches?.length) {

        const key = `../${matches[0]}`;

        if (typeof images[key] === 'function') {
            const image = await images[key]();
            return image.default;
        }

    }

    return path;

};

export const getScreenshotPath = (slug: string) => {
    return absoluteUrl(`/screenshots/${slug}.jpg`);
};

export const getItemImagePath = (
    slug: string,
    imagePath: string,
    collection = 'posts'
) => {

    if (imagePath?.startsWith('~')) {
        return `assets/${collection}/${slug}/${imagePath.replace('~', '')}`;
    }

    return imagePath;

};

export const getRenderedImage = async (path: string, options = {}) => {

    const image = await loadImage(path);

    if (image) {

        let imageOpts = {
            alt: '',
        } as GetImageTransform;

        if (typeof(image) === 'string') {

            imageOpts.src = image;

        } else if (image.src) {

            imageOpts = {
                ...imageOpts,
                src: image.src,
                width: image.width,
                height: image.height,
            };

        }

        const { src } = await getImage({
            ...imageOpts,
            ...options,
        });

        return src;

    }

    return null;
};
