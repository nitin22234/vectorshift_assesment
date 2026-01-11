# VectorShift Frontend Technical Assessment

## Overview

This project is a solution to the VectorShift frontend technical assessment. The goal of the assignment was to improve the scalability and usability of a visual pipeline builder by introducing better node abstractions, enhancing UI styling, improving Text node functionality, and integrating the frontend with a FastAPI backend.

The application allows users to create pipelines using different types of nodes, connect them with edges, and submit the pipeline to a backend service that analyzes the structure of the graph.

---

## Tech Stack

Frontend:
- JavaScript
- React
- React Flow

Backend:
- Python
- FastAPI

---

## Running the Project

### Frontend

cd frontend  
npm install  
npm start  

The frontend runs on http://localhost:3000

---

### Backend

cd backend  
uvicorn main:app --reload  

The backend runs on http://localhost:8000

---

## Part 1: Node Abstraction

The original node implementations (input, output, LLM, and text nodes) contained a significant amount of duplicated logic related to layout, styling, and handle configuration. While functional, this approach did not scale well as new node types were added.

To address this, I introduced a reusable node abstraction that centralizes shared behavior such as:
- Base layout and styling
- Handle positioning and configuration
- Node title and content structure

Each node type is now defined primarily through configuration and props, making it easier to create new nodes without rewriting boilerplate code.

To demonstrate the flexibility of this abstraction, I added five additional custom nodes. These nodes are intentionally simple and focus on showcasing how easily new node types can be created using the shared abstraction.

---

## Part 2: Styling

The initial project did not include much styling, so I focused on creating a clean, unified, and modern design across the application.

Key styling goals included:
- Consistent spacing and alignment across nodes
- Clear visual hierarchy for node titles and content
- A cohesive color palette and typography
- Uniform appearance for handles and connections

The result is a UI that is visually consistent, easy to read, and scalable as more node types are added.

---

## Part 3: Text Node Logic

The Text node was enhanced in two key ways to improve usability and functionality.

Dynamic resizing:
As users type more text into the Text node, the node automatically adjusts its width and height. This ensures that longer text remains visible and reduces the need for scrolling or manual resizing.

Variable detection and dynamic handles:
The Text node supports dynamic variables defined using double curly brackets (for example {{ input }}).

- The text input is parsed to detect valid JavaScript variable names wrapped in {{ }}.
- For each valid variable, a new input handle is dynamically created on the left side of the node.
- Handles are updated automatically when variables are added, removed, or edited.
- Invalid or duplicate variable names are ignored to prevent conflicts.

This behavior mirrors how Text nodes function in the VectorShift platform and allows for flexible data injection into text templates.

---

## Part 4: Backend Integration

The frontend integrates with a FastAPI backend to analyze the structure of the created pipeline.

When the user clicks the submit button:
- The frontend sends the current nodes and edges to the /pipelines/parse endpoint.
- The backend calculates the total number of nodes, the total number of edges, and whether the graph forms a directed acyclic graph (DAG).
- The backend returns a JSON response containing num_nodes, num_edges, and is_dag.
- The frontend displays this information in a user-friendly alert.

The DAG check ensures that the pipeline structure is valid and does not contain cycles.

---

## Conclusion

This project focuses on building scalable abstractions, improving user experience, and maintaining clean separation between frontend and backend logic. The node abstraction makes it easy to add new node types, the styling creates a cohesive interface, and the backend integration enables meaningful validation of user-created pipelines.

Overall, the solution meets all the requirements of the assessment while keeping the codebase clean, maintainable, and easy to extend.

---

## Notes

- The project is intentionally kept simple and readable.
- The focus is on architecture, clarity, and usability rather than overengineering.
