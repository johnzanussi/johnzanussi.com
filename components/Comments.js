'use client';

import { FastCommentsCommentWidget } from 'fastcomments-react';

// import { useTheme } from 'next-themes';
import useTheme from 'hooks/useTheme';

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
