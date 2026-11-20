IPC lets processes exchange information or coordinate. Shared memory maps a region into more than one process and requires synchronization. Pipes and message queues exchange bytes or messages under kernel-managed semantics. Sockets communicate through endpoints. Signals can notify rather than carry bulk data.

## Concepts in depth

Pipes and message queues communicate by transferring data through an interface. Shared memory exposes the same mapped region to multiple contexts and needs coordination for concurrent use. Blocking and buffering alter progress and resource use.

## How to apply it

A producer may write to a shared ring buffer, but it still needs an agreement about which slot is ready. A message receive can block until matching data becomes available, depending on the interface.

## Worked example

A producer and consumer use a shared buffer. A mutex protects index updates and semaphores or condition variables identify available slots and data.

## Common mistake

A pipe's byte stream may not preserve application message boundaries. The program may need framing.

## Practice

When is a shared memory approach attractive?

**Answer:** For frequent exchange of large data when both processes can coordinate access safely.
