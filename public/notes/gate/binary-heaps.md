A binary heap is complete and obeys heap order. In a zero-based array, children of i are 2i+1 and 2i+2. Insert by appending and sifting up. Extract the root by moving the final element to the root and sifting down. Bottom-up build-heap costs O(n), while insert and extract cost O(log n).

## Worked example

Insert 2 into min-heap [3,5,8]. Append at index 3, swap with parent 5, then swap with 3. The result is [2,3,8,5].

## Common mistake

A heap is only locally ordered. A linear scan may be needed to find an arbitrary key.

## Practice

Where is the minimum in a min-heap?

**Answer:** At the root, because every descendant is at least as large as its ancestors.
