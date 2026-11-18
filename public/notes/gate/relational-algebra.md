Selection filters tuples, projection chooses attributes under set semantics, joins combine matching tuples, and division expresses many all-of queries. Union and difference require compatible schemas. Use renaming for self-joins. Understand how predicate placement interacts with an outer join when SQL is involved.

## Worked example

To find students enrolled in every required course, divide a student-course relation by the required course set, or express the equivalent condition that no required enrolment is absent.

## Common mistake

Selection concerns rows, while projection concerns columns. They serve different algebraic roles.

## Practice

What does joining two sets without any filter yield?

**Answer:** Their Cartesian product, containing each possible pair of tuples.
