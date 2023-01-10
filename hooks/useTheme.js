'use client';
import { useTheme as useThemeOrig } from 'next-themes';
import { useEffect, useState } from 'react';

export default function useTheme() {
    const { theme, setTheme } = useThemeOrig();
    const [themeValue, setThemeValue] = useState();

    useEffect(() => {
        if (theme) {
            setThemeValue(theme);
        }
    }, [theme]);

    return {
        theme: themeValue,
        setTheme,
    };
}
