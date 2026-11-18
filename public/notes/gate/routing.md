Distance-vector protocols share distances with neighbours and update using neighbour-advertised metrics plus local link costs. Link-state protocols distribute link information so routers can build a topology view and compute shortest paths. Count-to-infinity can occur in distance-vector protocols after failures, while dissemination and convergence are also significant for link-state protocols.

## Worked example

If path to D through neighbour A costs 2+5=7 and through B costs 3+2=5, prefer B under the assumed additive metric.

## Common mistake

Distinguish routes chosen by a network algorithm from forwarding decisions applied per packet using an already computed table.

## Practice

What algorithm commonly finds shortest paths in a link-state topology with nonnegative costs?

**Answer:** Dijkstra's algorithm.
