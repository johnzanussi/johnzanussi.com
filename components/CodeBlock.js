import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/oceanicNext';

import { Fragment } from 'react';
import classNames from 'classnames';

import Link from 'components/Link';

const CodeBlock = ({ children, filename, url, title }) => {
    const { children: code, className } = children.props;

    const language = className.replace(/language-/, '');

    return (
        <Highlight code={code} language={language} {...defaultProps}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => {
                const showHeader = !!(filename || url);

                return (
                    <div
                        style={{ ...style }}
                        className="rounded rounded-1 my-3"
                    >
                        {showHeader && (
                            <div
                                className="p-3 border-bottom overflow-auto"
                                style={{ borderColor: '#0e1114 !important;' }}
                            >
                                {filename}

                                {url && (
                                    <Link href={url}>
                                        {title.replace(/-/g, ' ') || url}
                                    </Link>
                                )}
                            </div>
                        )}

                        <pre
                            className={classNames(
                                className,
                                'pt-4 px-4 fs-6 mb-0'
                            )}
                        >
                            {tokens.map((line, i) => (
                                <div
                                    key={i}
                                    {...getLineProps({ line, key: i })}
                                >
                                    {line.map((token, key) => (
                                        <span
                                            key={key}
                                            {...getTokenProps({ token, key })}
                                        />
                                    ))}
                                </div>
                            ))}
                        </pre>
                    </div>
                );
            }}
        </Highlight>
    );
};

export default CodeBlock;
