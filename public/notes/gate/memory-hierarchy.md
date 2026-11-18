Registers, caches, main memory and storage trade capacity, cost and access time. Locality makes caches effective. Average memory access time is often hit time plus miss rate times miss penalty, with multiple levels handled by conditioning on misses. For memory interfacing, split address bits into chip-select and internal address fields. Several chips can operate in parallel to widen words.

## Worked example

A cache hit takes 2 ns and a miss adds 50 ns with probability 0.04. Average access is 2+0.04×50=4 ns.

## Common mistake

Capacity and addressability differ. A 1 Kiword chip needs ten address bits regardless of word width.

## Practice

How many 1 Ki × 8 chips are needed for 1 Ki × 32?

**Answer:** Four in parallel, sharing addresses and supplying separate groups of eight bits.
