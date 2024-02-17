import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';


function CodeBlock({ language, value }) {
    return (
        <SyntaxHighlighter language={language} style={nightOwl}>
            {value}
        </SyntaxHighlighter>
    );
}

export default CodeBlock;