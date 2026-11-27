## Basics first

- **Day shifts.** A week has seven days. Only the remainder after division by 7 changes the weekday. Zero elapsed days leaves the weekday unchanged.
- **Ordinary and leap years.** An ordinary year has 365 days and shifts a same-date comparison by one day. An interval of 366 days shifts it by two.
- **Gregorian leap rule.** A year divisible by 4 is leap unless it is divisible by 100. Years divisible by 400 remain leap. February has 29 days in a leap year.
- **Elapsed dates.** Count transitions from the known weekday. From August 3 to August 4 is one step. For same-date comparisons, check whether the actual interval crosses the extra February day.

## Methods and when to use them

### Method A · Subtract dates within a month

Find end date minus start date and reduce modulo 7. Move forward by the remaining number of weekdays. For a date before the anchor, move backward by the elapsed difference.

**When to use it.** Use this in **Calendars / Weekdays Within One Month** questions when the weekday of one date is known and the other date is in the same month.

**Key rule.** Subtract the date numbers within a month, then use the remainder after division by seven to shift the known weekday.

#### Type 1 · Forward within a month

**Question.** If 3 August is Tuesday, what weekday is 25 August?

**Picture it.** Imagine moving a peg along seven weekday spaces. Each full week brings you back to the same space, so only the leftover moves matter.

1. **Count the elapsed days.** From 3 August to 25 August there are 25 − 3 = 22 day changes. The starting date is the reference.\
   `25 − 3 = 22 elapsed days`
2. **Remove full weeks.** 22 = 3 × 7 + 1, so only one day remains after complete weeks return to Tuesday.\
   `22 = 3 × 7 + 1`
3. **Move forward one weekday.** One day after Tuesday is Wednesday.\
   `Tuesday + 1 day = Wednesday`

**Answer:** Wednesday.

### Method B · Walk over month boundaries

Use actual month lengths or name the boundary dates when the interval is short. February 28 → February 29 → March 1 is two shifts in a leap year.

**When to use it.** Use this in **Calendars / Crossing Month Boundaries** questions when two dates are in different months and a short interval depends on the exact length of each month.

**Key rule.** Across a month boundary, count days using each month’s actual length and include 29 February only in a leap year.

#### Type 1 · Leap-year transition

**Question.** If 28 February 2024 was Wednesday, what day was 1 March?

**Picture it.** Walk through the date boxes. A leap year has one extra box between 28 February and 1 March.

1. **Check whether February has 29 days.** 2024 is divisible by 4 and is not a century year, so it is a Gregorian leap year.\
   `2024 ÷ 4 = 506`
2. **List the dates in order.** The day after 28 February is 29 February, and the day after that is 1 March.\
   `28 Feb → 29 Feb → 1 Mar: 2 days`
3. **Advance the weekday twice.** Wednesday → Thursday → Friday, so 1 March is Friday.\
   `Wednesday + 2 days = Friday`

**Answer:** Friday.

### Method C · Handle century years before longer spans

Apply the 400-year exception to a century. For longer date intervals, break the span into full years plus remaining days and count the leap days actually crossed.

**When to use it.** Use this in **Calendars / Leap Years and Long Spans** questions when dates are years apart or the interval crosses February in a century year.

**Key rule.** A century year is a leap year only if divisible by 400. Across years, count the leap days actually crossed.

#### Type 1 · Century classification

**Question.** Which of 1900, 2000 and 2100 are leap years in the Gregorian calendar?

**Picture it.** A year ending in 00 has a stricter test. Check whether 400 fits into each year without any leftovers.

1. **Apply the century exception.** All three years end in 00, so each must be divisible by 400 to be a leap year.\
   `century rule: divisibility by 400`
2. **Test each division.** 1,900 ÷ 400 leaves remainder 300. 2,000 ÷ 400 = 5 exactly. 2,100 ÷ 400 leaves remainder 100.\
   `1900 = 4 × 400 + 300`\
   `2000 = 5 × 400`\
   `2100 = 5 × 400 + 100`
3. **Classify the years.** Only 2000 passes the 400-year condition.

**Answer:** 2000 only.

#### Type 2 · Same date following year

**Question.** If 15 March 2023 was Wednesday, what day was 15 March 2024?

**Picture it.** Pretend you turn one calendar page for every day. Count whether that trip crosses a 29 February before using the usual shift of one weekday.

1. **Locate the leap day within the interval.** From 15 March 2023 to 15 March 2024, the interval includes 29 February 2024.\
   `interval includes 29 February 2024`
2. **Find the weekday shift.** The extra leap day makes the interval 366 days. Since 366 = 52 × 7 + 2, shift forward two days.\
   `366 = 52 × 7 + 2`
3. **Apply it to the given weekday.** Wednesday advances through Thursday to Friday.\
   `Wednesday + 2 days = Friday`

**Answer:** Friday.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Full week | 7 days gives weekday shift 0. |
| Common year | 365 mod 7 = 1. |
| Leap-year length | 366 mod 7 = 2. |
| Century year | Leap exactly when divisible by 400. |

## Exam tips

- **Count steps rather than labels.** Counting both endpoints adds an extra day.
- **Check the February boundary.** Two dates after February can include or exclude a leap day depending on which year lies between them.
- **Confirm weekday direction.** Move backward for a date earlier than the anchor.
