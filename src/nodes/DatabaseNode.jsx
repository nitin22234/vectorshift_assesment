import React from 'react';
import BaseNode from './BaseNode';
import { Database } from 'lucide-react';

const DatabaseNode = () => (
    <BaseNode
        label="Database"
        icon={Database}
        inputs={[{ id: 'query' }]}
        outputs={[{ id: 'results' }]}
    >
        <div className="node-input-group">
            <label className="node-label-small">DB Provider</label>
            <select className="node-select">
                <option>PostgreSQL</option>
                <option>MongoDB</option>
                <option>Redis</option>
            </select>
        </div>
    </BaseNode>
);

export default DatabaseNode;
