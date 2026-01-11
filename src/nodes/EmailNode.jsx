import React from 'react';
import BaseNode from './BaseNode';
import { Mail } from 'lucide-react';

const EmailNode = () => (
    <BaseNode
        label="Email"
        icon={Mail}
        inputs={[{ id: 'to' }, { id: 'subject' }, { id: 'body' }]}
        outputs={[{ id: 'status' }]}
    >
        <div className="node-label-small">Sends an automated email.</div>
    </BaseNode>
);

export default EmailNode;
