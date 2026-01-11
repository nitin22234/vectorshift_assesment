import React from 'react';
import {
    Type,
    LogOut,
    Bot,
    Mail,
    Database,
    GitBranch,
    RefreshCw,
    Clock,
    TextCursor
} from 'lucide-react';

const nodeTypes = [
    { label: 'Input', type: 'customInput', icon: Type },
    { label: 'Output', type: 'customOutput', icon: LogOut },
    { label: 'LLM', type: 'llm', icon: Bot },
    { label: 'Text', type: 'text', icon: TextCursor },
    { label: 'Email', type: 'email', icon: Mail },
    { label: 'Database', type: 'database', icon: Database },
    { label: 'Condition', type: 'condition', icon: GitBranch },
    { label: 'Loop', type: 'loop', icon: RefreshCw },
    { label: 'Delay', type: 'delay', icon: Clock },
];

const PipelineToolbar = () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className="toolbar">
            {nodeTypes.map((node) => (
                <div
                    key={node.type}
                    className="toolbar-button"
                    onDragStart={(event) => onDragStart(event, node.type)}
                    draggable
                >
                    <node.icon size={20} />
                    <span>{node.label}</span>
                </div>
            ))}
        </div>
    );
};

export default PipelineToolbar;
