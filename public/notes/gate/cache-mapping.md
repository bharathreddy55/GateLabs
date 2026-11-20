Block offset chooses a byte within a block. A direct-mapped cache places each block in one set. Set-associative cache permits several ways per set. Fully associative cache has one set. Derive offset and index widths from power-of-two sizes, then subtract them from address width to get tag width.

## Concepts in depth

For byte addresses and power-of-two block size B, use log₂ B offset bits. For S sets use log₂ S index bits. Remaining high bits form the tag. Direct mapping uses one way per set. Fully associative organisation uses one set.

## How to apply it

A 4 KB, 4-way cache with 16-byte blocks has 64 sets. In a 32-bit byte address, offset=4, index=6 and tag=22. Replacement operates within a set, so global LRU is not equivalent to set-local LRU.

## Worked example

A 4 KiB direct-mapped cache with 64 B blocks has 64 sets. A 32-bit address uses six offset bits, six index bits and 20 tag bits.

## Common mistake

Cache size divided by block size counts lines. Divide lines by associativity to count sets.

## Practice

What kind of miss can occur when two blocks repeatedly compete for one direct-mapped line?

**Answer:** A conflict miss, once the compulsory first accesses are past.
