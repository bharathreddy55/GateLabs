Distance-vector protocols share distances with neighbours and update using neighbour-advertised metrics plus local link costs. Link-state protocols distribute link information so routers can build a topology view and compute shortest paths. Count-to-infinity can occur in distance-vector protocols after failures, while dissemination and convergence are also significant for link-state protocols.

## Concepts in depth

Distance-vector protocols update estimates from neighbours using Bellman–Ford style rules. Link-state protocols disseminate topology and compute routes locally, typically with Dijkstra for nonnegative metrics. Convergence and routing policy are separate from packet forwarding.

## How to apply it

After a link cost change, a distance-vector node must learn updated neighbour estimates and may converge slowly. Routing table selection determines next hops before packet forwarding looks up a destination.

## Worked example

If path to D through neighbour A costs 2+5=7 and through B costs 3+2=5, prefer B under the assumed additive metric.

## Common mistake

Distinguish routes chosen by a network algorithm from forwarding decisions applied per packet using an already computed table.

## Practice

What algorithm commonly finds shortest paths in a link-state topology with nonnegative costs?

**Answer:** Dijkstra's algorithm.
