A relation represents tuples over named attributes and domains. A superkey uniquely identifies rows, and a candidate key is a minimal superkey. Choose a candidate key as primary key. A foreign key references a permitted candidate or unique key through the DBMS rules. Domain, key and referential constraints prevent distinct forms of inconsistency.

## Concepts in depth

A candidate key is a minimal superkey. A primary key is a selected candidate key. A foreign key references an allowed key in a target relation and may be subject to NULL and update rules. Check domain constraints independently.

## How to apply it

If A alone uniquely identifies rows, AB is a superkey but not minimal. A declaration allowing two keys does not turn their union into a candidate key. Primary key values cannot be NULL.

## Worked example

If student_id uniquely identifies students, {student_id,email} is a superkey. It is not minimal because student_id alone suffices.

## Common mistake

The absence of duplicate values in a small sample does not prove a candidate key. Use the stated semantic constraints.

## Practice

What happens if a non-null foreign key refers to a missing row and constraints are enforced?

**Answer:** The operation is rejected or handled according to defined constraint timing and action, because referential integrity would be violated.
