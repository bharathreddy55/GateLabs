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

1. **Count the elapsed days.** From 3 August to 25 August there are 25 − 3 = 22 day changes. The starting date is the reference.
2. **Remove full weeks.** 22 = 3 × 7 + 1, so only one day remains after complete weeks return to Tuesday.
3. **Move forward one weekday.** One day after Tuesday is Wednesday.

**Answer:** Wednesday.

### Leap-year transition

**Question.** If 28 February 2024 was Wednesday, what day was 1 March?

1. **Check whether February has 29 days.** 2024 is divisible by 4 and is not a century year, so it is a Gregorian leap year.
2. **List the dates in order.** The day after 28 February is 29 February, and the day after that is 1 March.
3. **Advance the weekday twice.** Wednesday → Thursday → Friday, so 1 March is Friday.

**Answer:** Friday.

### Century classification

**Question.** Which of 1900, 2000 and 2100 are leap years in the Gregorian calendar?

1. **Apply the century exception.** All three years end in 00, so each must be divisible by 400 to be a leap year.
2. **Test each division.** 1,900 ÷ 400 leaves remainder 300. 2,000 ÷ 400 = 5 exactly. 2,100 ÷ 400 leaves remainder 100.
3. **Classify the years.** Only 2000 passes the 400-year condition.

**Answer:** 2000 only.

### Same date following year

**Question.** If 15 March 2023 was Wednesday, what day was 15 March 2024?

1. **Locate the leap day within the interval.** From 15 March 2023 to 15 March 2024, the interval includes 29 February 2024.
2. **Find the weekday shift.** The extra leap day makes the interval 366 days. Since 366 = 52 × 7 + 2, shift forward two days.
3. **Apply it to the given weekday.** Wednesday advances through Thursday to Friday.

**Answer:** Friday.
