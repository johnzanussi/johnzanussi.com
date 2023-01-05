'use client';

import { FastCommentsCommentWidget } from 'fastcomments-react';

export default function Comments({ id, url, title }) {
    return (
        <FastCommentsCommentWidget
            tenantId="TuZHgHCUlVl"
            urlId={id}
            url={url}
            hasDarkBackground
            pageTitle={title}
        />
    );
}
