Adjacency lists store neighbours and need O(V+E) space. An adjacency matrix uses O(V²) space but answers an edge-existence lookup in O(1). Directed graph edges have direction. Weighted structures include a value per edge. Sparse graphs tend to favour lists; dense graphs can justify matrices.

## Worked example

For 1,000 vertices and 2,000 undirected edges, a list stores about 4,000 neighbour entries plus headers. A dense matrix has one million cells.

## Common mistake

An undirected edge appears in two adjacency lists, while the edge itself counts once.

## Practice

Which representation lets you iterate neighbours of u in time proportional to its degree?

**Answer:** An adjacency list for u.
