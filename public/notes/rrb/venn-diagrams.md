## What it means

A Venn diagram separates membership into regions. The whole of a set includes its overlaps. “Only A” excludes anything in other named sets, while “A or B” includes their overlap in ordinary inclusive language. The region outside all circles still belongs to the stated universe.

## Formulas and rules

- **Two sets:** count(A∪B)=count(A)+count(B)−count(A∩B). Neither = universe−union.
- **Three sets:** Union adds all three totals, subtracts all three pair overlaps, then adds back the triple overlap. Pair overlaps in this formula include the triple unless labelled “only”.
- **Exclusive regions:** Start with the triple. Subtract it from each inclusive pair overlap, then subtract the occupied overlap regions from each single-set total.
- **Exactly one versus at least one:** Sum only the three single-only regions for exactly one. Include every inside region for at least one.

## How to study it for Station Master

- Draw disjoint regions and put the most restricted number into the diagram first. Check all regions are nonnegative and sum to the universe.
- Practise one reverse model using “neither”. Before arithmetic, translate “and”, “or”, “only” and “exactly two” into shaded areas.

## Question models and worked examples

### Two sets and neither

**Question.** Of 120 applicants, 68 know Excel, 55 know SQL and 26 know both. How many know neither?

1. Union=68+55−26=97. The intersection was counted twice before subtraction.
2. Subtract 97 from the 120 applicants.

**Answer:** 23.

### Three sets and exactly two

**Question.** Pair intersections AB, AC, BC are 22, 17 and 15, each including 6 in all three. How many are in exactly two?

1. Pair-only counts are 16, 11 and 9 after removing the triple from each.
2. The pair-only regions are disjoint, so add them.

**Answer:** 36.

### Recover an overlap

**Question.** Of 90 candidates, 54 cleared A, 47 cleared B and 12 cleared neither. How many cleared both?

1. At least one =90−12=78.
2. Intersection=54+47−78.

**Answer:** 23.

### Inside one set and nowhere else

**Question.** Totals for A, B and C are 46, 32 and 35. Inclusive pair intersections AB=12, AC=14 and BC=10, triple=5. How many belong only to A?

1. From A remove AB and AC. The triple was removed twice when it should be removed once.
2. Add the triple back: 46−12−14+5.

**Answer:** 25.
