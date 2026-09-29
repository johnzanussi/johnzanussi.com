import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { absoluteUrl } from '@/utils/urls';

type ImageOutputFormat = 'avif' | 'webp' | 'png' | 'jpeg' | 'jpg' | 'svg' | 'gif';
type ImageQuality = 'low' | 'mid' | 'high' | 'max' | number;

export type ImagePreset = {
    widths: number[];
    sizes: string;
    // AVIF source only; WebP is the <img> fallback — avoids a 3rd JPEG/PNG encode set.
    formats: ImageOutputFormat[];
    fallbackFormat: ImageOutputFormat;
    quality: ImageQuality;
};

export const IMAGE_PRESETS = {
    content: {
        // mobile / article 1x / article 2x
        widths: [480, 768, 1280],
        sizes: '(min-width: 1024px) 768px, (min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)',
        formats: ['avif'],
        fallbackFormat: 'webp',
        quality: 80,
    },
    hero: {
        // ~display / 1.5x / 2x of max ~958px hero
        widths: [800, 1280, 1920],
        sizes: '(min-width: 1680px) 958px, (min-width: 1200px) calc(73.91vw - 269px), (min-width: 780px) calc(85vw - 315px), calc(100vw - 32px)',
        formats: ['avif'],
        fallbackFormat: 'webp',
        quality: 80,
    },
    postCard: {
        widths: [308, 426, 852],
        sizes: '(min-width: 1640px) 426px, (min-width: 1200px) calc(35.48vw - 149px), (min-width: 780px) calc(100vw - 405px), calc(100vw - 66px)',
        formats: ['avif'],
        fallbackFormat: 'webp',
        quality: 80,
    },
    projectCover: {
        widths: [320, 512, 1024],
        sizes: '(min-width: 1024px) 512px, calc(100vw - 80px)',
        formats: ['avif'],
        fallbackFormat: 'webp',
        quality: 80,
    },
} as const satisfies Record<string, ImagePreset>;

type GetImageSrcOptions = {
    width?: number;
    height?: number;
    quality?: ImageQuality;
};

export const getImageSrc = async (
    image: ImageMetadata | string,
    format: ImageOutputFormat = 'jpeg',
    options: GetImageSrcOptions = {},
) => {
    const imageObj = await getImage({
        src: image,
        format,
        ...options,
    });

    return absoluteUrl(imageObj.src);
};

export const getLqipSrc = async (image: ImageMetadata | string) => {
    const imageObj = await getImage({
        src: image,
        width: 48,
        format: 'webp',
        quality: 20,
    });

    return absoluteUrl(imageObj.src);
};
