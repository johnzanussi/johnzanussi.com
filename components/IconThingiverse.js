// https://worldvectorlogo.com/logo/thingiverse-logo
// https://github.com/FortAwesome/Font-Awesome/blob/master/js-packages/%40fortawesome/free-brands-svg-icons/faInstagram.js

const prefix = 'fajz';
const iconName = 'thingiverse';
const width = 448;
const height = 512;
const ligatures = [];
const unicode = 'f16d';
const svgPathData =
    'M256 512C114.615 512 0 397.385 0 256S114.615 0 256 0s256 114.615 256 256-114.615 256-256 256zm0-36.571c121.187 0 219.429-98.242 219.429-219.429S377.187 36.571 256 36.571 36.571 134.813 36.571 256 134.813 475.429 256 475.429zm32.722-269.474v219.428h-65.444V205.955h-92.39V140.51h250.225v65.444z';

const ThingiverseIcon = {
    prefix: prefix,
    iconName: iconName,
    icon: [width, height, ligatures, unicode, svgPathData],
};

export default ThingiverseIcon;
