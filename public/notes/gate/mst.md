For a connected undirected weighted graph, an MST spans every vertex without cycles and minimizes total edge weight. Kruskal processes edges in increasing weight and uses disjoint sets to reject cycles. Prim grows one tree by a light edge crossing its current cut. A disconnected graph gives a minimum spanning forest.

## Concepts in depth

An MST minimises total edge weight among spanning trees. Kruskal takes the cheapest safe edges globally. Prim grows one connected tree. Safe edges can be justified by the cut property, and ties can allow multiple optimum trees.

## How to apply it

A uniquely lightest edge across a cut belongs to every MST. A disconnected graph has a minimum spanning forest rather than one spanning tree. Shortest-path trees generally optimise a different objective.

## Worked example

For a triangle with edge weights 1, 2 and 5, pick edges 1 and 2. They connect all vertices at total 3.

## Common mistake

An MST minimizes total tree weight. It need not preserve every shortest path from a chosen vertex.

## Practice

Can distinct MSTs have the same total cost?

**Answer:** Yes. Ties in edge weights can permit different optimal trees.
