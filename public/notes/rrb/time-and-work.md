## Basics first

- **Work and rate.** A worker who completes one job in d days has a constant rate of 1/d job per day. Multiplying that by time gives completed work.
- **Convenient integer work.** Choose a job size divisible by all given solo times. If they are 12 and 18 days, use 36 units so rates are 3 and 2 units per day.
- **Cooperation and leaks.** Independent workers’ outputs add. An outlet or a worker who undoes work subtracts from the forward rate.
- **Partial last cycles.** In an alternating schedule, work can finish partway through somebody’s shift. Full cycles are useful only while their output stays under the remaining job.

## Methods and when to use them

### Method A · Split the schedule at every rate change

Calculate the output before a worker leaves or joins. Remove that completed portion. Divide the remainder by the rate after the change.

### Method B · Give each pipe a signed rate

Measure every contribution per hour. A fill pipe is positive and a leak is negative. If net rate is zero or negative, the tank cannot fill from empty while that setup continues.

### Method C · Solve for a missing contributor

Turn together-time and solo-time into rates first. Subtract the known contributor from the total rate. Then invert the remaining rate to get the solo time.

## Question models and worked examples

### Worker leaves

**Question.** A needs 12 days alone and B needs 18. They work together four days before A leaves. When is the job done?

1. **Choose a convenient job size.** Use 36 work units, the least common multiple of 12 and 18. A produces 36 ÷ 12 = 3 units/day, and B produces 2.\
   `36 ÷ 12 = 3, 36 ÷ 18 = 2 units/day`
2. **Find the joint progress.** Together their rate is 3 + 2 = 5 units/day. In four days they complete 20 units, leaving 16.\
   `4 × (3 + 2) = 20 units`\
   `36 − 20 = 16 units`
3. **Finish at B’s rate.** B takes 16 ÷ 2 = 8 more days. Add the four days already spent to get 12 days total.\
   `4 + 16 ÷ 2 = 12 days`

**Answer:** 12 days in total.

### Tank and leak

**Question.** A tap fills a tank in eight hours and a leak empties it in 24 hours. How long from empty with both open?

1. **Express both rates in the same units.** Treat the tank as 24 units. The tap fills 24 ÷ 8 = 3 units/hour. The leak removes 24 ÷ 24 = 1 unit/hour.\
   `24 ÷ 8 = 3, 24 ÷ 24 = 1 unit/hour`
2. **Find the net fill rate.** Both act during the same hour, so net gain is 3 − 1 = 2 units/hour.\
   `3 − 1 = 2 units/hour`
3. **Find time for the whole tank.** Starting empty, 24 units must be gained. At 2 per hour, the time is 24 ÷ 2 = 12 hours.\
   `24 ÷ 2 = 12 hours`

**Answer:** 12 hours.

### Alternating work

**Question.** A and B can complete a job in six and eight days respectively. They alternate days starting with A. Find finish time.

1. **Find output per turn.** Use a 24-unit job. A produces 24 ÷ 6 = 4 units on each turn, and B produces 24 ÷ 8 = 3.\
   `24 ÷ 6 = 4, 24 ÷ 8 = 3 units/day`
2. **Count complete cycles.** Each A–B pair takes two calendar days and finishes 7 units. Three pairs take six days and finish 21 units.\
   `3 × (4 + 3) = 21 units`
3. **Stop as soon as the job finishes.** A starts day seven with 3 units remaining. At 4 units/day, A needs 3/4 of that day, giving 6¾ days total.\
   `6 + (24 − 21) ÷ 4 = 6¾ days`

**Answer:** 6¾ days.

### Recover a worker’s rate

**Question.** Together A and B take 10 days. A alone takes 15. How long for B alone?

1. **Convert the given times to rates.** Together they finish 1/10 of the job each day. A alone finishes 1/15 per day.\
   `Together = 1/10, A = 1/15 job/day`
2. **Isolate B’s contribution.** Subtract A’s rate from the joint rate. Using denominator 30 gives 1/10 − 1/15 = 3/30 − 2/30 = 1/30.\
   `B = 1/10 − 1/15 = 1/30 job/day`
3. **Convert the remaining rate back to time.** B completes one-thirtieth of a job per day, so a full job takes 30 days.\
   `1 ÷ (1/30) = 30 days`

**Answer:** 30 days.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Work completed | Rate × elapsed working time. |
| Remaining work | Job size − output already completed. |
| Work in one alternating cycle | Add the outputs of the shifts in one complete cycle. |
| Missing solo rate | Combined rate − known solo rate. |

## Exam tips

- **Label work units.** After choosing a job size, carry the same unit through every line.
- **Check whether times or rates can combine.** Add outputs per unit time, then convert back to duration.
- **Check one shift further.** If the next full cycle would overshoot, solve the remaining shifts individually.
