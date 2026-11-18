For a connected undirected weighted graph, an MST spans every vertex without cycles and minimizes total edge weight. Kruskal processes edges in increasing weight and uses disjoint sets to reject cycles. Prim grows one tree by a light edge crossing its current cut. A disconnected graph gives a minimum spanning forest.

## Worked example

For a triangle with edge weights 1, 2 and 5, pick edges 1 and 2. They connect all vertices at total 3.

## Common mistake

An MST minimizes total tree weight. It need not preserve every shortest path from a chosen vertex.

## Practice

Can distinct MSTs have the same total cost?

**Answer:** Yes. Ties in edge weights can permit different optimal trees.
