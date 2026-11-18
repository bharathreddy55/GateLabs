Layers separate networking responsibilities through service interfaces. Encapsulation adds layer-specific headers at the sender, and corresponding layers interpret them at the receiver. Circuit switching reserves resources for a connection. Datagram packet switching forwards packets individually. Virtual circuits establish a logical path and use labels or identifiers to forward packets along it.

## Worked example

Two packets from one flow may follow different routes in a datagram network. A configured virtual circuit generally forwards according to its path state and identifier.

## Common mistake

A virtual circuit is a packet-switched abstraction and need not reserve capacity the same way as a physical circuit.

## Practice

Why does layering help protocol design?

**Answer:** An implementation can change at one layer while preserving the interface expected by others.
