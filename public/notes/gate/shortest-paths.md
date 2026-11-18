Use BFS for equal edge costs, Dijkstra for nonnegative weights and Bellman–Ford when reachable negative edges may occur. Bellman–Ford relaxes edges repeatedly and detects reachable negative cycles if another improvement remains after V−1 rounds. Floyd–Warshall uses each intermediate vertex in turn for all-pairs distances.

## Worked example

Given A→B cost 5, A→C cost 2 and C→B cost 1, relaxation from C gives best A→B cost 3.

## Common mistake

Dijkstra's settled-distance proof depends on nonnegative edge weights.

## Practice

Why can a reachable negative cycle prevent a finite shortest path?

**Answer:** Paths can loop around it to reduce cost indefinitely before continuing to reachable destinations.
