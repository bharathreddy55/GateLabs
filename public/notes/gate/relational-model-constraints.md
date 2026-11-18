A relation represents tuples over named attributes and domains. A superkey uniquely identifies rows, and a candidate key is a minimal superkey. Choose a candidate key as primary key. A foreign key references a permitted candidate or unique key through the DBMS rules. Domain, key and referential constraints prevent distinct forms of inconsistency.

## Worked example

If student_id uniquely identifies students, {student_id,email} is a superkey. It is not minimal because student_id alone suffices.

## Common mistake

The absence of duplicate values in a small sample does not prove a candidate key. Use the stated semantic constraints.

## Practice

What happens if a non-null foreign key refers to a missing row and constraints are enforced?

**Answer:** The operation is rejected or handled according to defined constraint timing and action, because referential integrity would be violated.
