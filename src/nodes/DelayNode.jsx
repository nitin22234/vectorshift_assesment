import React from 'react';
import BaseNode from './BaseNode';
import { Clock } from 'lucide-react';

const DelayNode = () => (
    <BaseNode
        label="Delay"
        icon={Clock}
        inputs={[{ id: 'trigger' }]}
        outputs={[{ id: 'after' }]}
    >
        <div className="node-input-group">
            <label className="node-label-small">Seconds</label>
            <input type="number" className="node-input" defaultValue={5} />
        </div>
    </BaseNode>
);

export default DelayNode;
