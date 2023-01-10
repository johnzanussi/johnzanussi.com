'use client';

// https://github.com/pacocoursey/next-themes
import { ThemeProvider as NextThemeProvider } from 'next-themes';

export default function ThemeProvider({ ...props }) {
    return (
        <NextThemeProvider
            attribute="data-bs-theme"
            enableColorScheme={false}
            {...props}
        />
    );
}
