Selection filters tuples, projection chooses attributes under set semantics, joins combine matching tuples, and division expresses many all-of queries. Union and difference require compatible schemas. Use renaming for self-joins. Understand how predicate placement interacts with an outer join when SQL is involved.

## Concepts in depth

Selection filters tuples and projection keeps designated attributes. Classical relational algebra uses set semantics, so projection removes duplicates. Join combines tuples by a predicate, while natural join matches all shared attribute names.

## How to apply it

Rename identically named columns when they should not be joined. Division expresses a for-all requirement, such as students who passed every required course. An empty requirement set makes the universal condition vacuously true over the relevant candidate domain.

## Worked example

To find students enrolled in every required course, divide a student-course relation by the required course set, or express the equivalent condition that no required enrolment is absent.

## Common mistake

Selection concerns rows, while projection concerns columns. They serve different algebraic roles.

## Practice

What does joining two sets without any filter yield?

**Answer:** Their Cartesian product, containing each possible pair of tuples.
