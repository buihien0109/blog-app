import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

function MarkdownRenderer({ markdownContent }) {
    return (
        <ReactMarkdown
            components={{
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                        <CodeBlock language={match[1]} value={String(children).replace(/\n$/, '')} {...props} />
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                }
            }}
        >
            {markdownContent}
        </ReactMarkdown>
    );
}

export default MarkdownRenderer;