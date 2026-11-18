Block offset chooses a byte within a block. A direct-mapped cache places each block in one set. Set-associative cache permits several ways per set. Fully associative cache has one set. Derive offset and index widths from power-of-two sizes, then subtract them from address width to get tag width.

## Worked example

A 4 KiB direct-mapped cache with 64 B blocks has 64 sets. A 32-bit address uses six offset bits, six index bits and 20 tag bits.

## Common mistake

Cache size divided by block size counts lines. Divide lines by associativity to count sets.

## Practice

What kind of miss can occur when two blocks repeatedly compete for one direct-mapped line?

**Answer:** A conflict miss, once the compulsory first accesses are past.
