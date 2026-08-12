export interface SiteProps {
    NAME: string;
    SHORT_NAME: string;
    URL: string;
    DESCRIPTION: string;
}

export default {
    NAME: 'John Zanussi',
    SHORT_NAME: 'JZ',
    URL: import.meta.env.SITE,
    DESCRIPTION: 'I write about home automation, 3D printing, DIY projects, and the web tools I play with along the way.',
} as SiteProps;

