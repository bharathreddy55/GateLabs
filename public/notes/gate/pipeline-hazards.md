Pipelining overlaps stages to improve throughput. With k equal-duration stages and no stalls, n instructions take k+n−1 cycles. Structural hazards compete for a resource, data hazards arise from dependencies, and control hazards arise from changes in instruction flow. Forwarding sends computed values directly to dependent stages, and prediction can reduce control stalls when correct.

## Worked example

A 5-stage pipeline handles 20 instructions in 24 ideal cycles. Two additional stall cycles make 26.

## Common mistake

Ideal throughput after filling is not the latency of a single instruction. A single instruction still visits all stages.

## Practice

What type of hazard occurs when the next instruction reads a register that an earlier instruction has yet to produce?

**Answer:** A read-after-write data hazard.
