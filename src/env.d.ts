/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro/client" />
/// <reference types="debounce" />

import { type FastCommentsUI } from 'fastcomments-typescript';

declare global {
    interface Window {
        FastCommentsUI: FastCommentsUI;
    }
}
