import React, { useState } from 'react';
import BaseNode from './BaseNode';
import { Type } from 'lucide-react';

const InputNode = ({ data }) => {
    const [name, setName] = useState(data?.name || 'input_1');
    const [type, setType] = useState(data?.type || 'Text');

    return (
        <BaseNode
            label="Input"
            icon={Type}
            outputs={[{ id: 'value' }]}
        >
            <div className="node-input-group">
                <label className="node-label-small">Field Name</label>
                <input
                    className="node-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="node-input-group">
                <label className="node-label-small">Type</label>
                <select
                    className="node-select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option>Text</option>
                    <option>File</option>
                </select>
            </div>
        </BaseNode>
    );
};

export default InputNode;
