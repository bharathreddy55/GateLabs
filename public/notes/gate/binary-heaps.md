A binary heap is complete and obeys heap order. In a zero-based array, children of i are 2i+1 and 2i+2. Insert by appending and sifting up. Extract the root by moving the final element to the root and sifting down. Bottom-up build-heap costs O(n), while insert and extract cost O(log n).

## Concepts in depth

A binary heap stores a complete tree and requires each parent to dominate its children under the priority order. A heap does not globally sort its elements. Insertion repairs upwards and removing the root repairs downwards.

## How to apply it

Building the heap bottom-up is O(n) because most nodes lie near leaves. Repeatedly inserting n elements has O(n log n) worst-case time. In an array indexed from zero, children of i are 2i+1 and 2i+2 when present.

## Worked example

Insert 2 into min-heap [3,5,8]. Append at index 3, swap with parent 5, then swap with 3. The result is [2,3,8,5].

## Common mistake

A heap is only locally ordered. A linear scan may be needed to find an arbitrary key.

## Practice

Where is the minimum in a min-heap?

**Answer:** At the root, because every descendant is at least as large as its ancestors.
