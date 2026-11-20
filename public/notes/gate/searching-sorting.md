Linear search examines elements one at a time. Binary search halves a sorted search interval. For comparison sorts, mergesort guarantees O(n log n) and conventionally uses extra merge space. Quicksort partitions and is O(n²) in the worst case. Heapsort guarantees O(n log n) with small extra storage. Insertion sort works well on nearly sorted items. Stable sorts preserve relative order of ties.

## Concepts in depth

Binary search requires monotone comparison over sorted data. Stable sorting preserves the relative order of equal keys. Compare time with space and stability. Mergesort is Θ(n log n) with ordinary auxiliary merge storage. Quicksort can degrade to quadratic under bad partitions.

## How to apply it

A sorted array permits binary search in O(log n), but a singly linked list cannot jump to the middle cheaply. Counting sort depends on key range as well as length. Comparison sorting has an Ω(n log n) worst-case bound for arbitrary distinct keys.

## Worked example

A stable sort on salary after sorting by employee name keeps alphabetical ordering within equal-salary groups. To find a lower bound in a sorted array, move the upper boundary left whenever the midpoint satisfies the lower-bound condition.

## Common mistake

Big-O time alone does not capture stability, extra storage or input assumptions.

## Practice

Why is binary search unsuitable for a general unsorted array?

**Answer:** Without ordering, the comparison cannot rule out an entire half.
