import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { absoluteUrl } from '@/utils/urls';

type ImageOutputFormat = 'avif' | 'webp' | 'png' | 'jpeg' | 'jpg' | 'svg' | 'gif';
type ImageQuality = 'low' | 'mid' | 'high' | 'max' | number;

export type ImagePreset = {
    widths: number[];
    sizes: string;
    formats: ImageOutputFormat[];
    quality: ImageQuality;
};

export const IMAGE_PRESETS = {
    content: {
        widths: [360, 720, 960, 1280, 1536],
        sizes: '(min-width: 1024px) 768px, (min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)',
        formats: ['avif', 'webp'],
        quality: 'high',
    },
    hero: {
        widths: [640, 960, 1280, 1600, 1920],
        sizes: '(min-width: 1680px) 958px, (min-width: 1200px) calc(73.91vw - 269px), (min-width: 780px) calc(85vw - 315px), calc(100vw - 32px)',
        formats: ['avif', 'webp'],
        quality: 'high',
    },
    postCard: {
        widths: [308, 426, 852],
        sizes: '(min-width: 1640px) 426px, (min-width: 1200px) calc(35.48vw - 149px), (min-width: 780px) calc(100vw - 405px), calc(100vw - 66px)',
        formats: ['avif', 'webp'],
        quality: 'high',
    },
    projectCover: {
        widths: [320, 512, 768, 1024],
        sizes: '(min-width: 1024px) 512px, calc(100vw - 80px)',
        formats: ['avif', 'webp'],
        quality: 'high',
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
