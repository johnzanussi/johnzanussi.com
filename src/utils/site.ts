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
    DESCRIPTION: 'A place where I write about technology, 3D Printing, and other hobby projects I have going on.',
} as SiteProps;

