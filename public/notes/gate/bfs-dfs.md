BFS uses a queue and discovers paths in nondecreasing edge count from a start. DFS explores a path before backtracking and supports cycle detection, finish-time ordering and structural graph analysis. With adjacency lists, visiting all vertices and edges costs O(V+E).

## Concepts in depth

BFS explores by edge-count layers and yields shortest paths in unweighted graphs. DFS follows a branch before backtracking and supports finishing order, cycle detection and decomposition. Use a visited structure to avoid repeated traversal.

## How to apply it

With adjacency lists, both run in O(V+E) time over a whole graph. Missing an outer loop means you only traverse the start component. Directed acyclic graphs can be topologically ordered using reverse DFS finishing order.

## Worked example

Edges A–B, A–C, B–D and C–D give D distance 2 from A. BFS identifies this even if the neighbour order changes the parent of D.

## Common mistake

For directed cycle detection in DFS, distinguish edges to currently active vertices from edges to already finished vertices.

## Practice

When does BFS directly give shortest paths?

**Answer:** When all traversed edges have equal cost, such as unweighted graphs.
