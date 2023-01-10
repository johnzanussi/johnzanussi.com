'use client';

import Highlight, { defaultProps } from 'prism-react-renderer';
import themeLightOrig from 'prism-react-renderer/themes/nightOwlLight';
import themeDark from 'prism-react-renderer/themes/vsDark';
import classNames from 'classnames';

// import { useTheme } from 'next-themes';
import useTheme from 'hooks/useTheme';

import Link from 'components/Link';

const CodeBlock = ({ children, filename, url, title }) => {
    const { theme, setTheme } = useTheme();

    const { children: code, className = '' } = children.props;

    const language = className.replace(/language-/, '');

    const themeLight = {
        ...themeLightOrig,
        plain: {
            ...themeLightOrig.plain,
            backgroundColor: '#F7f7fa',
        },
    };

    const highlightTheme = theme === 'light' ? themeLight : themeDark;

    return (
        <Highlight
            {...defaultProps}
            code={code.trim()}
            language={language}
            theme={highlightTheme}
        >
            {({ className, style, tokens, getLineProps, getTokenProps }) => {
                const showHeader = !!(filename || url);

                return (
                    <div
                        className="code-block rounded-md-2 border mx-n4 mx-md-0 mb-3 overflow-hidden"
                        style={style}
                    >
                        {showHeader && (
                            <div className="py-2 px-4 border-bottom overflow-auto text-muted font-monospace">
                                {filename}

                                {url && (
                                    <Link href={url}>
                                        {title.replace(/-/g, ' ') || url}
                                    </Link>
                                )}
                            </div>
                        )}

                        <div className="position-relative p-4 pb-0">
                            {!!language && (
                                <div
                                    className="code-language position-absolute top-0 end-0 opacity-75 px-2 font-monospace border-bottom-start small"
                                    style={{
                                        fontSize: '0.75em',
                                        color: highlightTheme.plain.color,
                                    }}
                                >
                                    {language}
                                </div>
                            )}

                            <pre className={classNames(className, 'mb-0 pb-4')}>
                                {tokens.map((line, i) => (
                                    <div
                                        {...getLineProps({ line, key: i })}
                                        key={i}
                                    >
                                        {line.map((token, key) => (
                                            <span
                                                {...getTokenProps({
                                                    token,
                                                    key,
                                                })}
                                                key={key}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </pre>
                        </div>
                    </div>
                );
            }}
        </Highlight>
    );
};

export default CodeBlock;
