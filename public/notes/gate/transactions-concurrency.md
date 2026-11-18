ACID concerns atomicity, consistency, isolation and durability. Conflicting operations are from different transactions on the same item with at least one write. A schedule is conflict-serializable exactly when its precedence graph is acyclic. Two-phase locking has growing and shrinking phases. Strict 2PL keeps exclusive locks until commit or abort and protects against cascading effects from uncommitted writes. Other methods include timestamp ordering and multiversion concurrency.

## Worked example

If T1 writes X before T2 reads X, add T1→T2. If T2 also writes Y before T1 reads Y, add T2→T1. The cycle proves the schedule is not conflict-serializable.

## Common mistake

An acyclic precedence graph proves conflict serializability. Recoverability involves separate constraints on dependencies and commit order.

## Practice

What order can the precedence graph provide if acyclic?

**Answer:** A topological order representing a conflict-equivalent serial schedule.
