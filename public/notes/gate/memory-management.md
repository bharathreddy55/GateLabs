Paging maps fixed-size virtual pages to physical frames. Split an address into page number and page offset; the offset remains unchanged. A TLB caches translations. Segmentation uses variable-size logical regions and bounds. Internal fragmentation is unused space inside allocated units; external fragmentation is free space split into inconvenient pieces.

## Worked example

With a 4 KiB page, a virtual address uses 12 offset bits. If virtual page 5 maps to frame 8, physical address is 8×4096 plus the original offset.

## Common mistake

A TLB miss need not be a page fault. A page-table walk can find a resident translation.

## Practice

What type of fragmentation can fixed-size pages cause within a process's last page?

**Answer:** Internal fragmentation, because part of an allocated page may be unused.
