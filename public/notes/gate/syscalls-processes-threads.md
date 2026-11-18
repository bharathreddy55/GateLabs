System calls request OS services through a controlled user-to-kernel boundary. A process has resources including an address space and handles. Threads in one process share address space and often other resources, while each has execution state such as registers and stack. A context switch saves and restores execution state.

## Worked example

One thread blocks waiting for I/O and another runs in the same process. They can still access shared heap objects but have different stacks.

## Common mistake

A mode switch to run kernel code for a system call does not necessarily switch to a different process.

## Practice

Why do threads normally require synchronization on shared mutable data?

**Answer:** An operation can interleave with another thread's operation and violate assumptions about the observed state.
