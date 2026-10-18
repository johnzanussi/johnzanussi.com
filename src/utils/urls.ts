// Resolves a site path like /posts/foo against the configured `site`, which
// already includes the port in local dev
export function absoluteUrl(url: string) {

    if (!url) {
        return '';
    }

    return new URL(url, import.meta.env.SITE).href;
}
