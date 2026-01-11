import React from 'react';
import BaseNode from './BaseNode';
import { RefreshCw } from 'lucide-react';

const LoopNode = () => (
    <BaseNode
        label="Loop"
        icon={RefreshCw}
        inputs={[{ id: 'list' }]}
        outputs={[{ id: 'item' }, { id: 'onComplete' }]}
    >
        <div className="node-label-small">Iterate over a collection.</div>
    </BaseNode>
);

export default LoopNode;
export { LoopNode };
