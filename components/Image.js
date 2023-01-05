import NextImage from 'next/image';

const Image = ({
    placeholder = 'blur',
    blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjeP/+/X8ACWsDzWO51SAAAAAASUVORK5CYII=',
    ...props
}) => {
    return (
        <NextImage
            placeholder={placeholder}
            blurDataURL={blurDataURL}
            {...props}
        />
    );
};

export default Image;
