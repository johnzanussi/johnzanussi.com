export function absoluteUrl(url: string): string {
    if (!url) {
        return '';
    }
    // Remove starting slash from url
    if (url.startsWith('/')) {
        url = url.substring(1);
    }

    const { SITE, PORT } = import.meta.env;

    const parts = [
        SITE,
        PORT ? `:${PORT}` : '',
        '/',
        url,
    ];

    return parts.join('');
}
