Linear search examines elements one at a time. Binary search halves a sorted search interval. For comparison sorts, mergesort guarantees O(n log n) and conventionally uses extra merge space. Quicksort partitions and is O(n²) in the worst case. Heapsort guarantees O(n log n) with small extra storage. Insertion sort works well on nearly sorted items. Stable sorts preserve relative order of ties.

## Worked example

A stable sort on salary after sorting by employee name keeps alphabetical ordering within equal-salary groups. To find a lower bound in a sorted array, move the upper boundary left whenever the midpoint satisfies the lower-bound condition.

## Common mistake

Big-O time alone does not capture stability, extra storage or input assumptions.

## Practice

Why is binary search unsuitable for a general unsorted array?

**Answer:** Without ordering, the comparison cannot rule out an entire half.
