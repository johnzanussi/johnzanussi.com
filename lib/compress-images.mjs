#!/usr/bin/env node
'use strict';

import sharp from 'sharp';
import { readFile } from 'fs/promises';

const formatOptions = {
    gif: {
        effort: 10,
    },
    jpeg: {
        quality: 80,
        chromaSubsampling: '4:4:4',
        mozjpeg: true,
        trellisQuantisation: true,
        overshootDeringing: true,
        optimizeScans: true,
    },
    png: {
        compressionLevel: 9,
        palette: true,
    },
};


const compressImage = async (file) => {

    console.log(`Compressing ${file}`);

    const imageSource = await readFile(file);

    const image = sharp(imageSource, {
        failOn: 'none',
        sequentialRead: true,
        // animated: format === 'gif',
    });

    const { format } = await image.metadata();

    const output = await image
        .toFormat(format, formatOptions[format])
        .toFile(file);

    return output;

};

const files = process.argv.slice(2);
// const files = ['/Users/johnzanussi/Sites/johnzanussi.com/src/assets/network-rack-v1@1400w.2a42dc6f.jpg'];

try {

    const compressed = await Promise.all(files.map(compressImage));

    console.log('DONE');
    console.log(compressed);

} catch (error) {

    console.error('ERROR');
    console.error(error);

    process.exit(1);

}
