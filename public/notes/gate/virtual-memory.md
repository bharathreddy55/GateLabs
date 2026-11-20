Demand paging loads a page when needed. A page fault enters the OS to validate access and obtain the required page, evicting another if necessary. FIFO evicts the earliest loaded page, LRU approximates recency, and optimal replacement evicts the page needed farthest in the future. A working set captures recent active pages. Insufficient frames can cause thrashing.

## Concepts in depth

Demand paging loads a page when referenced and unavailable. FIFO evicts by insertion time, LRU by last reference, and optimal by farthest future use. Keep frame state after each reference and distinguish compulsory faults from replacements.

## How to apply it

LRU is a stack algorithm, so increasing frame count does not increase its page faults for one trace. FIFO may show Belady's anomaly. A dirty victim may add write-back cost even when the fault count is unchanged.

## Worked example

With two frames and references 1,2,1,3, LRU faults on 1 and 2, hits on the second 1, then faults on 3 and replaces 2.

## Common mistake

FIFO can exhibit Belady's anomaly. Stack algorithms such as true LRU do not have that anomaly.

## Practice

Why are dirty pages often costlier to evict?

**Answer:** Their modified contents may need writing back before the frame can be reused.
