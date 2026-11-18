A stack is last-in first-out and supports push and pop at one end. A queue is first-in first-out and normally enqueues at rear and dequeues from front. Circular arrays reuse vacated slots with modular indexes. Track size or reserve a slot to distinguish full from empty when front and rear can coincide.

## Worked example

Push A, then B, then pop. A stack returns B. If A and B were enqueued in that order, a queue returns A first.

## Common mistake

A circular queue should not shift every remaining element after dequeue. Update the front index.

## Practice

Which structure supports breadth-first graph traversal?

**Answer:** A queue, so earlier discovered vertices are processed first.
