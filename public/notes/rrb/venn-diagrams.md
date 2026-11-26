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

1. **Count everyone in at least one set.** Adding 68 Excel users and 55 SQL users counts the 26 who know both twice.
2. **Correct the double-counting.** The union is 68 + 55 − 26 = 97 applicants who know at least one.
3. **Use the outside region.** There are 120 applicants overall. Knowing neither means sitting outside the union, giving 120 − 97 = 23.

**Answer:** 23.

### Three sets and exactly two

**Question.** Pair intersections AB, AC, BC are 22, 17 and 15, each including 6 in all three. How many are in exactly two?

1. **Identify what each pair total includes.** The six people in all three appear in each reported pair intersection. They do not belong to exactly two.
2. **Subtract the triple from each pair.** AB only = 22 − 6 = 16, AC only = 17 − 6 = 11, and BC only = 15 − 6 = 9.
3. **Add the separate regions.** A person in exactly two sets fits just one of those pair-only regions. Add 16 + 11 + 9 = 36.

**Answer:** 36.

### Recover an overlap

**Question.** Of 90 candidates, 54 cleared A, 47 cleared B and 12 cleared neither. How many cleared both?

1. **Use neither to recover the union.** Of 90 candidates, 12 cleared neither, leaving 90 − 12 = 78 who cleared at least one.
2. **Add the individual totals.** The two reported totals add to 54 + 47 = 101. This counts people who cleared both twice.
3. **Find the double-counted group.** The excess over the union is 101 − 78 = 23, the number who cleared both.

**Answer:** 23.

### Inside one set and nowhere else

**Question.** Totals for A, B and C are 46, 32 and 35. Inclusive pair intersections AB=12, AC=14 and BC=10, triple=5. How many belong only to A?

1. **Start inside A.** A contains 46 people, including those who are also in B or C.
2. **Remove both overlaps.** Subtract the 12 in A∩B and the 14 in A∩C. Each subtraction includes the five people in all three, so those five were taken out twice.
3. **Restore one copy of the triple.** Now every overlap is removed exactly once. A only has 46 − 12 − 14 + 5 = 25 people.

**Answer:** 25.
