## Basics first

- **Set and universe.** A set contains the objects that meet one condition. The universe is every object considered in the question. The region outside all circles still belongs to the universe.
- **Intersection and union.** Intersection requires both conditions. Union includes either condition and the overlap. “Exactly one” excludes the overlap.
- **Inclusive pair counts.** A pair intersection such as A∩B normally includes the objects also in C. A pair-only region excludes those triple members.
- **Disjoint regions.** Each object occupies one atomic region, such as A only, A and B only or all three. Sum disjoint region counts to avoid counting anything twice.

## Methods and when to use them

### Method A · Fill from the middle outward

In a three-set diagram put the triple count in the centre first. Subtract it from every inclusive pair. Then find each single-only number by removing the pair-only regions and the centre from that set total.

**When to use it.** Use this in **Venn Diagrams / Three-set Region Counts** questions when you know the count in all three sets and must find counts in pair-only or single-only regions.

**Key rule.** Pair-only count = inclusive pair count − all-three count. Subtract the relevant overlapping regions to get the single-only count.

#### Type 1 · Three sets and exactly two

**Question.** Pair intersections AB, AC, BC are 22, 17 and 15, each including 6 in all three. How many are in exactly two?

**Picture it.** Start with the six people in the middle of all three hoops. Each pair total includes those same six people. Remove them before counting the pair-only regions.

1. **Identify what each pair total includes.** The six people in all three appear in each reported pair intersection. They do not belong to exactly two.\
   `triple count = 6`
2. **Subtract the triple from each pair.** AB only = 22 − 6 = 16, AC only = 17 − 6 = 11, and BC only = 15 − 6 = 9.\
   `22 − 6 = 16, 17 − 6 = 11, 15 − 6 = 9`
3. **Add the separate regions.** A person in exactly two sets fits just one of those pair-only regions. Add 16 + 11 + 9 = 36.\
   `16 + 11 + 9 = 36`

**Answer:** 36.

#### Type 2 · Inside one set and nowhere else

**Question.** Totals for A, B and C are 46, 32 and 35. Inclusive pair intersections AB=12, AC=14 and BC=10, triple=5. How many belong only to A?

**Picture it.** Start with everyone in A. Take away people who also belong to B or C. Think about how many times you took away the people in all three.

1. **Start inside A.** A contains 46 people, including those who are also in B or C.\
   `A total = 46`
2. **Remove both overlaps.** Subtract the 12 in A∩B and the 14 in A∩C. Each subtraction includes the five people in all three, so those five were taken out twice.\
   `46 − 12 − 14 = 20`
3. **Restore one copy of the triple.** Now every overlap is removed exactly once. A only has 46 − 12 − 14 + 5 = 25 people.\
   `20 + 5 = 25`

**Answer:** 25.

### Method B · Use inclusion–exclusion when only totals are given

For two sets add their counts and subtract their intersection. For three sets subtract all three inclusive pair intersections and add the triple once. The triple had been counted three times and then removed three times.

**When to use it.** Use this in **Venn Diagrams / Counting at Least One** questions when set totals and overlaps are given and the question asks how many distinct members belong to any set.

**Key rule.** Union of two sets = size of A + size of B − size of their intersection. For three sets, add back the triple after subtracting the three inclusive pair overlaps.

#### Type 1 · Two sets and neither

**Question.** Of 120 applicants, 68 know Excel, 55 know SQL and 26 know both. How many know neither?

**Picture it.** Draw two overlapping hoops. Some learners stand in both. Count them once when adding the hoops, then see how many are outside.

1. **Count everyone in at least one set.** Adding 68 Excel users and 55 SQL users counts the 26 who know both twice.\
   `68 + 55 = 123`
2. **Correct the double-counting.** The union is 68 + 55 − 26 = 97 applicants who know at least one.\
   `123 − 26 = 97`
3. **Use the outside region.** There are 120 applicants overall. Knowing neither means sitting outside the union, giving 120 − 97 = 23.\
   `120 − 97 = 23`

**Answer:** 23.

### Method C · Solve backward from neither or exactly

Neither is the complement of the union. Recover union as total minus neither, then use the other totals to find overlap. For exactly two, sum just the three pair-only regions.

**When to use it.** Use this in **Venn Diagrams / Neither and Exactly Two** questions when a count outside the sets helps recover an overlap, or when you must count members in precisely two sets.

**Key rule.** Union = total − neither. For two sets, overlap = size of A + size of B − union.

#### Type 1 · Recover an overlap

**Question.** Of 90 candidates, 54 cleared A, 47 cleared B and 12 cleared neither. How many cleared both?

**Picture it.** Start with every candidate and set aside anyone who cleared neither. The group left is everyone in at least one hoop. Adding both hoop counts counts the middle people twice.

1. **Use neither to recover the union.** Of 90 candidates, 12 cleared neither, leaving 90 − 12 = 78 who cleared at least one.\
   `union = 90 − 12 = 78`
2. **Add the individual totals.** The two reported totals add to 54 + 47 = 101. This counts people who cleared both twice.\
   `54 + 47 = 101`
3. **Find the double-counted group.** The excess over the union is 101 − 78 = 23, the number who cleared both.\
   `101 − 78 = 23`

**Answer:** 23.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| At least one of A or B | n(A) + n(B) − n(A∩B). |
| Neither of two sets | Universe total − size of the union. |
| Exactly two of three | Sum inclusive pair counts − 3 × triple count. |
| A only | n(A) − n(A∩B) − n(A∩C) + n(A∩B∩C). |

## Exam tips

- **Look for the word only.** A count for A and B only excludes the centre.
- **Check that every region is nonnegative.** A negative count flags inconsistent data or a double subtraction.
- **Include the outside if asked about everyone.** The union by itself does not necessarily cover the universe.
