Use BFS for equal edge costs, Dijkstra for nonnegative weights and Bellman–Ford when reachable negative edges may occur. Bellman–Ford relaxes edges repeatedly and detects reachable negative cycles if another improvement remains after V−1 rounds. Floyd–Warshall uses each intermediate vertex in turn for all-pairs distances.

## Concepts in depth

BFS works for equal edges, Dijkstra for nonnegative weights, and Bellman–Ford can handle negative edges and detect a reachable negative cycle. DAG shortest paths use topological relaxation. Relax u→v when d[u]+w improves d[v].

## How to apply it

A negative edge can improve a distance after a Dijkstra vertex is settled, violating its invariant. Repeated improvement on a reachable vertex after V−1 ordinary relaxation rounds can signal a reachable negative cycle.

## Worked example

Given A→B cost 5, A→C cost 2 and C→B cost 1, relaxation from C gives best A→B cost 3.

## Common mistake

Dijkstra's settled-distance proof depends on nonnegative edge weights.

## Practice

Why can a reachable negative cycle prevent a finite shortest path?

**Answer:** Paths can loop around it to reduce cost indefinitely before continuing to reachable destinations.
