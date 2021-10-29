import NextImage from 'next/image';

const Image = (props) => {

    return <NextImage {...props} />;

};

Image.defaultProps = {
    placeholder: 'blur',
    blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjeP/+/X8ACWsDzWO51SAAAAAASUVORK5CYII='
};

export default Image;
