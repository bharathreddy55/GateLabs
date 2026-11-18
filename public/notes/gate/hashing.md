A hash function maps keys into buckets. Separate chaining stores colliding entries together. Open addressing probes the table according to a sequence. Load factor is entries divided by slots and influences expected operations. Bad collisions can make lookup linear even when a suitable randomized or well-distributed model yields expected constant time.

## Worked example

With table size 7 and h(k)=k mod 7, keys 10 and 17 both start at index 3. Linear probing puts the later key at index 4 if it is free.

## Common mistake

Deleting an open-addressed slot by simply marking it never-used can cut off later searches. Tombstones or reorganization preserve the probe invariant.

## Practice

If there are 15 keys and 20 table slots, what is load factor?

**Answer:** 0.75.
