Demand paging loads a page when needed. A page fault enters the OS to validate access and obtain the required page, evicting another if necessary. FIFO evicts the earliest loaded page, LRU approximates recency, and optimal replacement evicts the page needed farthest in the future. A working set captures recent active pages. Insufficient frames can cause thrashing.

## Worked example

With two frames and references 1,2,1,3, LRU faults on 1 and 2, hits on the second 1, then faults on 3 and replaces 2.

## Common mistake

FIFO can exhibit Belady's anomaly. Stack algorithms such as true LRU do not have that anomaly.

## Practice

Why are dirty pages often costlier to evict?

**Answer:** Their modified contents may need writing back before the frame can be reused.
