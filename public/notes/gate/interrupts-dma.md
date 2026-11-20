Polling checks device state repeatedly. Interrupt-driven I/O signals the CPU when an event needs service, with handler entry and return overhead. DMA transfers blocks between device and memory after CPU setup and can signal completion. Shared memory paths require arbitration, and caches may need coherence handling.

## Concepts in depth

Polling repeatedly checks status. An interrupt lets a device request CPU service. DMA transfers blocks between a device and memory with less CPU intervention after configuration. Bus arbitration can still delay CPU access during the transfer.

## How to apply it

A DMA controller may steal cycles or use a burst to move bytes, then interrupt on completion. Distinguish responsibility for initiating a transfer, moving each word, and handling completion when comparing I/O schemes.

## Worked example

For a large disk block, CPU sets device, buffer and count. DMA handles transfers and notifies the CPU when finished, avoiding one instruction sequence per byte.

## Common mistake

DMA reduces CPU work but does not eliminate bus traffic or setup and completion handling.

## Practice

Why might polling make sense for a very short expected wait?

**Answer:** A busy check can avoid interrupt setup and entry overhead when waiting briefly is acceptable.
