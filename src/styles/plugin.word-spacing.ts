import type { PluginAPI } from 'tailwindcss/types/config';
import plugin from 'tailwindcss/plugin';

module.exports = plugin(function({ matchUtilities, theme }: PluginAPI) {
    matchUtilities({
        'word-spacing': (value) => ({
            wordSpacing: value,
        }),
    }, {
        values: theme('spacing'),
        supportsNegativeValues: true,
    });
});
