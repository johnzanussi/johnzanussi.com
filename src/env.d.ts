/// <reference types="debounce" />

import { type FastCommentsUI } from 'fastcomments-typescript';

declare global {
    interface Window {
        FastCommentsUI: FastCommentsUI;
    }
}
