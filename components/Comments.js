'use client';

import { useTheme } from 'next-themes';
import { FastCommentsCommentWidget } from 'fastcomments-react';

export default function Comments({ id, url, title }) {
    const { theme } = useTheme();

    return (
        <FastCommentsCommentWidget
            tenantId="TuZHgHCUlVl"
            urlId={id}
            url={url}
            hasDarkBackground={theme === 'dark'}
            pageTitle={title}
        />
    );
}
