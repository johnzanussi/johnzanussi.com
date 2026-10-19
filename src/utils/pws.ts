import { KV_REST_API_URL, KV_REST_API_READ_ONLY_TOKEN } from 'astro:env/server';
import { getWeatherPreview } from '@/integrations/dev-weather-preview/state';
import { type CurrentWeather, describeWeather } from '@/utils/weather';

export type WeatherReading = {
    data: CurrentWeather;
    raw: string;
};

const WEATHER_KEY = 'weather:current';

// Give up on Upstash after this long so the islands fall back to the offline state
const FETCH_TIMEOUT_MS = 5000;

// Home Assistant sends a reading every 5 minutes
export const WEATHER_CACHE_CONTROL = 'public, s-maxage=60, stale-while-revalidate=300';

// The Weather app in the dev toolbar can force the loading, offline and stale states
const preview = () => import.meta.env.DEV ? getWeatherPreview() : 'live';

export const holdForSkeleton = async () => {
    if (preview() === 'loading') {
        await new Promise(() => {});
    }
};

/**
 * Get the latest reading Home Assistant
 * pushed to Upstash
 */
export const getCurrentWeather = async () => {

    if (preview() === 'offline' || !KV_REST_API_URL || !KV_REST_API_READ_ONLY_TOKEN) {
        return null;
    }

    try {
        const response = await fetch(`${KV_REST_API_URL}/get/${WEATHER_KEY}`, {
            headers: { Authorization: `Bearer ${KV_REST_API_READ_ONLY_TOKEN}` },
            signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        });

        // Log the status only so the URL and token stay out of the logs
        if (!response.ok) {
            console.error(`Weather fetch failed with status ${response.status}`);
            return null;
        }

        const { result } = await response.json() as { result: string | null };

        if (!result) {
            return null;
        }

        const data = JSON.parse(result) as CurrentWeather;

        if (preview() === 'stale') {
            data.updated = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
        }

        const reading: WeatherReading = {
            data,
            raw: JSON.stringify(data, null, 2),
        };

        return reading;
    } catch (error) {
        console.error(`Weather fetch failed: ${error instanceof Error ? error.name : 'unknown error'}`);
        return null;
    }

};

/**
 * The card and hero show the latest reading, described for display;
 * readings older than STALE_AFTER_MINUTES are flagged as stale
 */
export const getWeather = async () => {
    const reading = await getCurrentWeather();

    return reading ? describeWeather(reading.data) : null;
};
