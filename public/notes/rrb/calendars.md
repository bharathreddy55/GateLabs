## What it means

A weekday changes in a seven-day cycle. Calendar problems reduce elapsed days modulo seven, counting how many midnight-to-midnight steps separate dates. The same date in a different year can shift by one or two weekdays depending on whether a leap day falls between the two dates.

## Formulas and rules

- **Gregorian leap year:** Divisible by 4 except century years, which must be divisible by 400.
- **Odd days:** An ordinary year contributes one odd day because 365=52×7+1. A leap year contributes two. A 400-year Gregorian cycle has 146,097 days, divisible by seven.
- **Month lengths:** February has 28 or 29 days. April, June, September and November have 30. Other months have 31.
- **Day count:** Advance by elapsed days, excluding the starting date. To go back, subtract the remainder or move backwards that many weekdays.

## How to study it for Station Master

- Carry only the remainder modulo seven after counting dates. Mark whether Feb 29 actually occurs in the interval before adding a leap offset.
- Practise across February, at a century boundary and backwards from a known weekday. A same month date difference uses subtraction, without adding one.

## Question models and worked examples

### Forward within a month

**Question.** If 3 August is Tuesday, what weekday is 25 August?

1. Elapsed time is 25−3=22 days, without counting the starting day as a step.
2. 22=21+1. Move one weekday forward.

**Answer:** Wednesday.

### Leap-year transition

**Question.** If 28 February 2024 was Wednesday, what day was 1 March?

1. 2024 is divisible by 4 and is not a century year. February has 29 days.
2. Advance two days: Feb 29 is Thursday, March 1 is Friday.

**Answer:** Friday.

### Century classification

**Question.** Which of 1900, 2000 and 2100 are leap years in the Gregorian calendar?

1. Each is divisible by 100, so apply the stricter ÷400 condition.
2. Only 2000 is divisible by 400.

**Answer:** 2000 only.

### Same date following year

**Question.** If 15 March 2023 was Wednesday, what day was 15 March 2024?

1. The interval includes 29 February 2024, so there are 366 elapsed days.
2. 366 leaves remainder 2 modulo 7. Advance two days.

**Answer:** Friday.
