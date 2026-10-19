export type CurrentWeather = {
    updated: string;
    temp_f: number | null;
    feels_like_f: number | null;
    dewpoint_f: number | null;
    humidity: number | null;
    wind_mph: number | null;
    gust_mph: number | null;
    wind_dir_deg: number | null;
    max_gust_today_mph: number | null;
    pressure_inhg: number | null;
    rain_today_in: number | null;
    rain_rate_inh: number | null;
    uv_index: number | null;
    solar_wm2: number | null;
    condition: string | null;
    pressure_trend_inhph: number | null;
};

export type UnitValue = {
    imperial: string;
    metric: string;
};

export const STALE_AFTER_MINUTES = 30;

export const UNITS = {
    speed: { imperial: 'mph', metric: 'km/h' },
    rain: { imperial: 'in', metric: 'mm' },
    pressure: { imperial: 'inHg', metric: 'hPa' },
} as const satisfies Record<string, UnitValue>;

// https://developers.home-assistant.io/docs/core/entity/weather/#recommended-values-for-state-and-condition
export const CONDITIONS = {
    'sunny': 'Sunny',
    'clear-night': 'Clear night',
    'partlycloudy': 'Partly cloudy',
    'cloudy': 'Cloudy',
    'fog': 'Foggy',
    'rainy': 'Rain',
    'pouring': 'Heavy rain',
    'lightning': 'Lightning',
    'lightning-rainy': 'Thunderstorm',
    'snowy': 'Snow',
    'snowy-rainy': 'Sleet',
    'hail': 'Hail',
    'windy': 'Windy',
    'windy-variant': 'Windy',
    'exceptional': 'Unusual',
} as const;

export type Condition = keyof typeof CONDITIONS;

const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const;

export const minutesAgo = (date: string) => {
    const minutes = Math.floor((Date.now() - new Date(date).getTime()) / 60000);

    return Math.max(0, minutes);
};

export const updatedLabel = (minutes: number) => {
    if (minutes === 0) {
        return 'just now';
    }

    if (minutes < 60) {
        return `${minutes} min ago`;
    }

    const hours = Math.floor(minutes / 60);

    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
};

const format = (value: number | null, digits = 0) => {
    if (value === null) {
        return '–';
    }

    // Values that round to zero from below would otherwise show as -0
    return value.toFixed(digits).replace(/^-(?=[0.]+$)/, '');
};

export const temperature = (fahrenheit: number | null): UnitValue => ({
    imperial: format(fahrenheit),
    metric: format(fahrenheit === null ? null : (fahrenheit - 32) * 5 / 9),
});

export const speed = (mph: number | null): UnitValue => ({
    imperial: format(mph),
    metric: format(mph === null ? null : mph * 1.609),
});

export const rainfall = (inches: number | null): UnitValue => ({
    imperial: format(inches, 2),
    metric: format(inches === null ? null : inches * 25.4, 1),
});

export const pressure = (inHg: number | null): UnitValue => ({
    imperial: format(inHg, 2),
    metric: format(inHg === null ? null : inHg * 33.864),
});

export const windDirection = (degrees: number | null) => {
    if (degrees === null) {
        return '–';
    }

    return DIRECTIONS[Math.round(((degrees % 360) + 360) % 360 / 45) % 8]!;
};

// 1.5in fills the gauge; any rain at all shows a sliver
export const rainGaugePercent = (inches: number | null) => {
    if (!inches) {
        return 0;
    }

    return Math.min(100, Math.max(6, inches / 1.5 * 100));
};

export type PressureTrend = 'Rising quickly' | 'Rising' | 'Steady' | 'Falling' | 'Falling quickly' | 'No trend yet';

// Change over the last 3 hours; about 6 hPa counts as fast
export const pressureTrend = (inHgPerHour: number | null): PressureTrend => {
    if (inHgPerHour === null) {
        return 'No trend yet';
    }

    const change = inHgPerHour * 3;

    if (change >= 0.18) {
        return 'Rising quickly';
    }
    if (change >= 0.02) {
        return 'Rising';
    }
    if (change <= -0.18) {
        return 'Falling quickly';
    }
    if (change <= -0.02) {
        return 'Falling';
    }

    return 'Steady';
};

export type HumidityFeel = 'Damp' | 'Fresh' | 'Dry' | 'Comfortable' | 'Sticky' | 'Muggy' | 'Oppressive' | 'No reading';

const COOL_BELOW_F = 60;

// Cool air feels damp or dry by its relative humidity; warm air feels sticky by its dew point
export const humidityFeel = (data: Pick<CurrentWeather, 'temp_f' | 'dewpoint_f' | 'humidity'>): HumidityFeel => {
    if (data.temp_f !== null && data.temp_f < COOL_BELOW_F) {
        if (data.humidity === null) {
            return 'No reading';
        }
        if (data.humidity >= 80) {
            return 'Damp';
        }
        if (data.humidity >= 35) {
            return 'Fresh';
        }

        return 'Dry';
    }

    const dewpoint = data.dewpoint_f;

    if (dewpoint === null) {
        return 'No reading';
    }
    if (dewpoint >= 70) {
        return 'Oppressive';
    }
    if (dewpoint >= 65) {
        return 'Muggy';
    }
    if (dewpoint >= 60) {
        return 'Sticky';
    }
    if (dewpoint >= 50) {
        return 'Comfortable';
    }

    return 'Dry';
};

export type UvLevel = 'Low' | 'Moderate' | 'High' | 'Very high' | 'Extreme' | 'No reading';

// https://www.who.int/news-room/questions-and-answers/item/radiation-the-ultraviolet-(uv)-index
export const uvLevel = (index: number | null): UvLevel => {
    if (index === null) {
        return 'No reading';
    }
    if (index >= 11) {
        return 'Extreme';
    }
    if (index >= 8) {
        return 'Very high';
    }
    if (index >= 6) {
        return 'High';
    }
    if (index >= 3) {
        return 'Moderate';
    }

    return 'Low';
};

const isCondition = (condition: string | null): condition is Condition => Boolean(condition && condition in CONDITIONS);

export const getCondition = (data: CurrentWeather) => isCondition(data.condition) ? data.condition : 'exceptional';

export const describeWeather = (data: CurrentWeather) => {
    const condition = getCondition(data);
    const rainRate = rainfall(data.rain_rate_inh);

    return {
        updated: data.updated,
        minutes: minutesAgo(data.updated),
        stale: minutesAgo(data.updated) > STALE_AFTER_MINUTES,
        condition,
        label: CONDITIONS[condition],
        temp: temperature(data.temp_f),
        feels: temperature(data.feels_like_f),
        humidity: data.humidity,
        humidityFeel: humidityFeel(data),
        wind: speed(data.wind_mph),
        gust: speed(data.gust_mph),
        // The arrow points where the wind is blowing toward
        windDegrees: (data.wind_dir_deg ?? -180) + 180,
        direction: windDirection(data.wind_dir_deg),
        rainToday: rainfall(data.rain_today_in),
        rainRate: data.rain_rate_inh
            ? { imperial: `Rain ${rainRate.imperial} in/hr`, metric: `Rain ${rainRate.metric} mm/hr` }
            : { imperial: 'Not raining', metric: 'Not raining' },
        raining: Boolean(data.rain_rate_inh),
        rainPercent: rainGaugePercent(data.rain_today_in),
        pressure: pressure(data.pressure_inhg),
        pressureTrend: pressureTrend(data.pressure_trend_inhph),
        uv: data.uv_index,
        uvLevel: uvLevel(data.uv_index),
        uvPercent: Math.min(100, (data.uv_index ?? 0) / 11 * 100),
    };
};

export type Weather = ReturnType<typeof describeWeather>;
