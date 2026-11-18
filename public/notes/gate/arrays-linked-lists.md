An array stores elements contiguously and supports constant-time indexed access. Middle insertion usually shifts a suffix. A linked list follows next pointers and needs linear time for general indexing. Insertion after a node whose pointer is already known is constant time. Doubly linked lists add efficient backwards traversal and support unlinking a known node with local pointer updates.

## Worked example

Insert X after A in A→B by setting X.next=B, then A.next=X. Reversing these steps without keeping B loses the remainder of the chain.

## Common mistake

Separate the cost of finding a position from the cost of splicing after it.

## Practice

Why can arrays outperform linked lists in sequential scans?

**Answer:** Contiguous elements often exploit cache lines and spatial locality better.
