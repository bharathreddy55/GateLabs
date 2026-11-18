BFS uses a queue and discovers paths in nondecreasing edge count from a start. DFS explores a path before backtracking and supports cycle detection, finish-time ordering and structural graph analysis. With adjacency lists, visiting all vertices and edges costs O(V+E).

## Worked example

Edges A–B, A–C, B–D and C–D give D distance 2 from A. BFS identifies this even if the neighbour order changes the parent of D.

## Common mistake

For directed cycle detection in DFS, distinguish edges to currently active vertices from edges to already finished vertices.

## Practice

When does BFS directly give shortest paths?

**Answer:** When all traversed edges have equal cost, such as unweighted graphs.
