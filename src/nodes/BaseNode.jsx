import React from 'react';
import { Handle, Position } from 'reactflow';

const BaseNode = ({
    label,
    icon: Icon,
    children,
    inputs = [],
    outputs = []
}) => {
    return (
        <div className="base-node">
            {inputs.map((input, index) => (
                <Handle
                    key={`in-${index}`}
                    type="target"
                    position={Position.Left}
                    id={input.id || `in-${index}`}
                    style={{
                        top: inputs.length > 1 ? `${(index + 1) * (100 / (inputs.length + 1))}%` : '50%',
                        ...input.style
                    }}
                />
            ))}

            <div className="node-header">
                {Icon && <Icon size={16} className="text-primary" />}
                <span className="node-label">{label}</span>
            </div>

            <div className="node-content">
                {children}
            </div>

            {outputs.map((output, index) => (
                <Handle
                    key={`out-${index}`}
                    type="source"
                    position={Position.Right}
                    id={output.id || `out-${index}`}
                    style={{
                        top: outputs.length > 1 ? `${(index + 1) * (100 / (outputs.length + 1))}%` : '50%',
                        ...output.style
                    }}
                />
            ))}
        </div>
    );
};

export default BaseNode;
