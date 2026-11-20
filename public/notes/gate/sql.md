SQL queries typically apply FROM and joins, WHERE, GROUP BY, HAVING, then projection and ordering in logical evaluation. WHERE filters rows; HAVING filters grouped results. COUNT(*) counts rows, while COUNT(column) excludes null values in that column. SQL generally uses bag semantics unless DISTINCT or a set operation changes them. Comparisons involving NULL often yield UNKNOWN.

## Concepts in depth

SQL uses three-valued logic with NULL. WHERE keeps only true predicates. COUNT(*) counts rows, while COUNT(column) skips NULLs. An outer join can preserve unmatched rows until a subsequent filter removes them.

## How to apply it

A right-table predicate in WHERE after a left join may discard NULL-extended rows. Put the predicate in ON if it should affect matching while preserving left rows. For comparison to NULL use IS NULL.

## Worked example

To find department IDs with at least three employees, group employee rows by department_id and use HAVING COUNT(*)>=3.

## Common mistake

Use IS NULL for a null test. The comparison column=NULL does not evaluate to true under normal SQL three-valued logic.

## Practice

Can a WHERE condition on a right-side column remove unmatched LEFT JOIN rows?

**Answer:** Yes. Unmatched right-side columns are null, and many WHERE predicates on them evaluate to UNKNOWN and discard the row.
