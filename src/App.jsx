import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
    addEdge,
    Background,
    Controls,
    applyEdgeChanges,
    applyNodeChanges
} from 'reactflow';
import 'reactflow/dist/style.css';

import PipelineToolbar from './components/PipelineToolbar';
import InputNode from './nodes/InputNode';
import OutputNode from './nodes/OutputNode';
import LLMNode from './nodes/LLMNode';
import TextNode from './nodes/TextNode';
import EmailNode from './nodes/EmailNode';
import DatabaseNode from './nodes/DatabaseNode';
import ConditionalNode from './nodes/ConditionalNode';
import LoopNode from './nodes/LoopNode';
import DelayNode from './nodes/DelayNode';

const nodeTypes = {
    customInput: InputNode,
    customOutput: OutputNode,
    llm: LLMNode,
    text: TextNode,
    email: EmailNode,
    database: DatabaseNode,
    condition: ConditionalNode,
    loop: LoopNode,
    delay: DelayNode,
};

const initialNodes = [];
const initialEdges = [];

let id = 0;
const getId = () => `node_${id++}`;

function App() {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        []
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');

            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            const result = await response.json();

            const message = `
        Pipeline Analysis:
        - Nodes: ${result.num_nodes}
        - Edges: ${result.num_edges}
        - Is DAG: ${result.is_dag ? 'Yes' : 'No'}
      `;
            alert(message);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Failed to connect to backend. Make sure the FastAPI server is running on localhost:8000');
        }
    };

    return (
        <div className="app-container">
            <PipelineToolbar />
            <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ flex: 1 }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    nodeTypes={nodeTypes}
                    fitView
                >
                    <Background color="#aaa" gap={20} />
                    <Controls />
                </ReactFlow>
            </div>
            <div className="submit-container">
                <button className="submit-button" onClick={handleSubmit}>
                    Submit Pipeline
                </button>
            </div>
        </div>
    );
}

export default App;
