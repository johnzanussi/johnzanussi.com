export function absoluteUrl(url) {
    // Remove starting slash from url
    if (url.startsWith('/')) {
        url = url.substring(1);
    }

    return `${import.meta.env.SITE}${url}`;
}
