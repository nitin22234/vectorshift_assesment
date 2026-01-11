import React from 'react';
import BaseNode from './BaseNode';
import { GitBranch } from 'lucide-react';

const ConditionalNode = () => (
    <BaseNode
        label="Condition"
        icon={GitBranch}
        inputs={[{ id: 'input' }]}
        outputs={[{ id: 'true', style: { background: '#22c55e' } }, { id: 'false', style: { background: '#ef4444' } }]}
    >
        <div className="node-input-group">
            <label className="node-label-small">Operator</label>
            <select className="node-select">
                <option>Equals</option>
                <option>Contains</option>
                <option>Greater Than</option>
            </select>
        </div>
    </BaseNode>
);

export default ConditionalNode;
