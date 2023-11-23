import { getImage } from 'astro:assets';
import { absoluteUrl } from '@/utils/urls';

export const getImageSrc = async (
    image: ImageMetadata | string,
    format = 'jpeg',
    options = {},
) => {

    const imageObj = await getImage({
        src: image,
        format: format,
        ...options
    });

    return absoluteUrl(imageObj.src);

};