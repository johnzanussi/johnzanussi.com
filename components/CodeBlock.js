import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/oceanicNext';
import classNames from 'classnames';

import Link from './Link';

const CodeBlock = ({ children, className, filename, url, title }) => {

    const language = className.replace(/language-/, '');

    return (

        <Highlight
            {...defaultProps}
            code={children.trim()}
            language={language}
            theme={theme}
        >

            {({ className, style, tokens, getLineProps, getTokenProps }) => {

                const showHeader = !!(filename || url);

                return (

                    <div
                        style={{ ...style }}
                        className="border border-danger rounded my-3">

                        {showHeader && (

                            <div className="p-3 border-bottom border-danger overflow-auto">

                                {filename}

                                {url && (
                                    <Link
                                        href={url}>
                                        {title.replace(/-/g, ' ') || url}
                                    </Link>
                                )}

                            </div>

                        )}

                        <pre className={classNames(className, 'p-4 fs-6')}>

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

CodeBlock.defaultProps = {
    className: '',
};

export default CodeBlock;
