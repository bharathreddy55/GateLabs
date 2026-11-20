A race occurs when results depend on the timing of interleaved operations. Protect critical sections with locks or equivalent primitives. A counting semaphore tracks available permits, while a condition variable wakes waiters to recheck a predicate under a mutex. An atomic operation indivisibly updates a shared object under its defined memory semantics.

## Concepts in depth

Mutexes provide mutual exclusion. Semaphores count available permits and can coordinate producer-consumer buffers. Condition waits normally release the associated lock while sleeping and should recheck the predicate after waking.

## How to apply it

For a bounded buffer, the producer waits for an empty slot and the consumer waits for a full slot. Both guard index updates separately. A notification is not proof that a predicate remains true when the awakened thread reacquires the lock.

## Worked example

Two increments both read 5, each computes 6 and each writes 6. One increment is lost. An atomic read–modify–write or a mutex around the whole increment prevents this sequence.

## Common mistake

Recheck a condition after waking. A competing thread may have changed it before the waiter reacquires the mutex.

## Practice

What is mutual exclusion?

**Answer:** At most one participant executes a protected critical section at a time.
