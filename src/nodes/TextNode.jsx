import React, { useState, useEffect, useRef } from 'react';
import BaseNode from './BaseNode';
import { Type } from 'lucide-react';

const TextNode = ({ data, id }) => {
    const [text, setText] = useState(data?.text || '{{input}}');
    const [variables, setVariables] = useState([]);
    const textareaRef = useRef(null);

    // Variable detection logic
    useEffect(() => {
        const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
        const matches = Array.from(text.matchAll(regex)).map(m => m[1]);
        const uniqueVariables = [...new Set(matches)];
        setVariables(uniqueVariables);
    }, [text]);

    // Handle auto-resizing
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [text]);

    return (
        <BaseNode
            label="Text"
            icon={Type}
            inputs={variables.map(v => ({ id: v }))}
            outputs={[{ id: 'output' }]}
        >
            <div className="node-input-group">
                <label className="node-label-small">Text Content</label>
                <textarea
                    ref={textareaRef}
                    className="node-input"
                    style={{
                        resize: 'none',
                        overflow: 'hidden',
                        minHeight: '40px',
                        fontFamily: 'inherit'
                    }}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type something with {{var}}..."
                />
            </div>
        </BaseNode>
    );
};

export default TextNode;
