Heap files favour unsorted insertion, while sorted files help ordered scans at the cost of updates. Indexes give access paths and impose storage and maintenance costs. B-tree search uses ordered keys and balanced pages. A B+ tree uses internal separator keys and stores indexed data entries at leaves, often linked for range scans. Fanout and page occupancy shape height.

## Worked example

To scan keys 20 through 60, descend to the first matching leaf in a B+ tree, then walk leaf siblings until the upper bound is passed.

## Common mistake

A secondary index may find row locations quickly while the qualifying rows still lie on many different data pages.

## Practice

Why can high indexing fanout reduce I/O?

**Answer:** It reduces tree height, so a search reads fewer levels.
