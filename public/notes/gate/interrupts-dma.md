Polling checks device state repeatedly. Interrupt-driven I/O signals the CPU when an event needs service, with handler entry and return overhead. DMA transfers blocks between device and memory after CPU setup and can signal completion. Shared memory paths require arbitration, and caches may need coherence handling.

## Worked example

For a large disk block, CPU sets device, buffer and count. DMA handles transfers and notifies the CPU when finished, avoiding one instruction sequence per byte.

## Common mistake

DMA reduces CPU work but does not eliminate bus traffic or setup and completion handling.

## Practice

Why might polling make sense for a very short expected wait?

**Answer:** A busy check can avoid interrupt setup and entry overhead when waiting briefly is acceptable.
