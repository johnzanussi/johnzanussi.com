export const WEATHER_PREVIEWS = ['live', 'loading', 'offline', 'stale'] as const;

export type WeatherPreview = typeof WEATHER_PREVIEWS[number];

// The integration and the server islands load this module separately, so the mode lives on globalThis
const key = Symbol.for('johnzanussi.dev-weather-preview');

type PreviewStore = typeof globalThis & { [key]?: WeatherPreview };

export const getWeatherPreview = (): WeatherPreview => (globalThis as PreviewStore)[key] ?? 'live';

export const setWeatherPreview = (preview: WeatherPreview) => {
    (globalThis as PreviewStore)[key] = preview;
};

export const isWeatherPreview = (value: unknown): value is WeatherPreview => WEATHER_PREVIEWS.includes(value as WeatherPreview);
