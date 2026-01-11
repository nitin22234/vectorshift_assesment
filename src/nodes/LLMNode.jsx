import React from 'react';
import BaseNode from './BaseNode';
import { Bot } from 'lucide-react';

const LLMNode = () => {
    return (
        <BaseNode
            label="LLM"
            icon={Bot}
            inputs={[{ id: 'system' }, { id: 'prompt' }]}
            outputs={[{ id: 'response' }]}
        >
            <div className="node-description" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Processes inputs using a Large Language Model.
            </div>
        </BaseNode>
    );
};

export default LLMNode;
