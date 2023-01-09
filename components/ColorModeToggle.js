'use client';

import { useTheme } from 'next-themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

export default function ColorModeToggle({ className }) {
    const { theme, setTheme } = useTheme();

    const toggleTheme = (currentTheme) => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    const icon = theme === 'light' ? faSun : faMoon;
    const colorClass = `text-${theme === 'light' ? 'warning' : 'danger'}`;

    return (
        <button
            className={classNames('btn btn-link', colorClass, className)}
            onClick={() => toggleTheme(theme)}
            role="button"
            title={`Turn the lights ${theme === 'light' ? 'off' : 'on'}`}
        >
            <FontAwesomeIcon icon={icon} className="lead" />
        </button>
    );
}
