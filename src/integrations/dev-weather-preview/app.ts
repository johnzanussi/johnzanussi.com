import { defineToolbarApp } from 'astro/toolbar';
import { WEATHER_PREVIEWS, type WeatherPreview } from './state';

const APP_ID = 'dev-weather-preview';

const labels: Record<WeatherPreview, { title: string; description: string }> = {
    live: {
        title: 'Live',
        description: 'Latest reading from Upstash',
    },
    loading: {
        title: 'Loading',
        description: 'Islands never respond, so the placeholders stay up',
    },
    offline: {
        title: 'Offline',
        description: 'No reading at all',
    },
    stale: {
        title: 'Stale',
        description: 'Latest reading, marked as 2 hours old',
    },
};

export default defineToolbarApp({
    init(canvas, app, server) {

        const toolbarWindow = document.createElement('astro-dev-toolbar-window');

        toolbarWindow.innerHTML = `
            <style>
                header { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; margin-bottom: 12px; }
                h1 { margin: 0; font-size: 16px; font-weight: 600; color: white; }
                header p { margin: 0; font-size: 12px; color: rgba(191, 193, 201, 0.7); }
                [role="radiogroup"] { display: grid; gap: 6px; min-width: 320px; }
                button { display: grid; grid-template-columns: 16px 1fr; align-items: start; gap: 0 10px; width: 100%; padding: 10px 12px; border: 1px solid rgba(52, 56, 65, 1); border-radius: 8px; background: transparent; color: rgba(191, 193, 201, 1); font: inherit; text-align: left; cursor: pointer; transition: background-color 150ms, border-color 150ms; }
                button:hover { background: rgba(255, 255, 255, 0.04); }
                button:focus-visible { outline: 2px solid rgba(157, 107, 255, 1); outline-offset: 2px; }
                button[aria-checked="true"] { border-color: rgba(157, 107, 255, 1); background: rgba(113, 24, 226, 0.15); }
                .dot { grid-row: span 2; margin-top: 3px; width: 14px; height: 14px; border: 2px solid rgba(110, 114, 125, 1); border-radius: 999px; box-sizing: border-box; }
                button[aria-checked="true"] .dot { border-color: rgba(157, 107, 255, 1); box-shadow: inset 0 0 0 3px rgba(19, 21, 26, 1); background: rgba(157, 107, 255, 1); }
                .title { font-size: 14px; font-weight: 600; color: white; }
                .description { font-size: 12px; color: rgba(191, 193, 201, 0.7); }
            </style>
            <header>
                <h1>Weather preview</h1>
                <p>Reloads the page</p>
            </header>
            <div role="radiogroup" aria-label="Weather preview"></div>
        `;

        const group = toolbarWindow.querySelector('[role="radiogroup"]')!;
        const options = new Map<WeatherPreview, HTMLButtonElement>();
        let waitingForChange = false;

        for (const preview of WEATHER_PREVIEWS) {
            const option = document.createElement('button');
            option.type = 'button';
            option.setAttribute('role', 'radio');
            option.innerHTML = `
                <span class="dot"></span>
                <span class="title">${labels[preview].title}</span>
                <span class="description">${labels[preview].description}</span>
            `;
            option.addEventListener('click', () => {
                if (option.getAttribute('aria-checked') === 'true') {
                    return;
                }

                waitingForChange = true;
                server.send(`${APP_ID}:set`, preview);
            });

            group.append(option);
            options.set(preview, option);
        }

        const showState = (current: WeatherPreview) => {
            for (const [preview, option] of options) {
                option.setAttribute('aria-checked', String(preview === current));
            }

            app.toggleNotification(current === 'live' ? { state: false } : { state: true, level: 'warning' });
        };

        server.on<WeatherPreview>(`${APP_ID}:state`, showState);

        server.on<WeatherPreview>(`${APP_ID}:changed`, (current) => {
            showState(current);

            if (waitingForChange) {
                location.reload();
            }
        });

        canvas.append(toolbarWindow);
    },
});
