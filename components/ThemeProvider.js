'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';

export default function ThemeProvider({ ...props }) {
    return <NextThemeProvider {...props} attribute="data-bs-theme" />;
}
