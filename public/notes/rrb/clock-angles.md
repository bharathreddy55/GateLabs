## Basics first

- **Minute and hour speeds.** The minute hand covers 360° in 60 minutes, or 6° per minute. The hour hand covers 30° per hour, or 0.5° per minute.
- **Position at H:M.** Measure clockwise from 12. Use the hour modulo 12. The hour angle is 30H + 0.5M and the minute angle is 6M.
- **Difference and arcs.** The raw gap is the absolute difference in hand positions. The two arcs are that gap and 360° minus it. Choose the smaller if requested.
- **Relative speed.** The minute hand gains 5.5° per minute on the hour hand. This rate times elapsed minutes predicts when the gap reaches a target.

## Methods and when to use them

### Method A · Calculate the moving hour hand

At 8:20 the hour hand is 10° past 8. Find both absolute positions before subtracting, then use the smaller arc. Using 30H alone leaves out the motion during the hour.

### Method B · Solve a signed gap

During a fixed hour, hour angle minus minute angle is 30H − 5.5m. Coincidence corresponds to 0 modulo 360°. A right angle can occur at signed gaps ±90° or equivalent values modulo 360°, such as ±270°.

### Method C · Check the target hour and turn minutes into seconds

Keep solutions in the requested interval, usually 0 ≤ m < 60. Use the question’s wording for exact endpoints. Multiply the fractional part of a minute by 60 to report seconds.

## Question models and worked examples

### Angle at a stated time

**Question.** What is the smaller angle at 8:20?

1. **Locate the hour hand.** At 8:00 it is 8 × 30° = 240° clockwise from 12. In 20 minutes it moves another 20 × 0.5° = 10°, reaching 250°.\
   `8 × 30° + 20 × 0.5° = 250°`
2. **Locate the minute hand.** It moves 6° per minute, so at 8:20 it is 20 × 6° = 120° from 12.\
   `20 × 6° = 120°`
3. **Compare the two arcs.** The direct difference is 250° − 120° = 130°. The other arc is 360° − 130° = 230°, so 130° is smaller.\
   `250° − 120° = 130°, other arc = 230°`

**Answer:** 130°.

### Coincidence

**Question.** When between 2:00 and 3:00 do the hands overlap?

1. **Find the starting gap.** At 2:00 the minute hand is at 12 and the hour hand is at the 2 mark, 2 × 30° = 60° ahead.\
   `gap at 2:00 = 2 × 30° = 60°`
2. **Find the closing rate.** The minute hand gains 6° − 0.5° = 5.5° on the hour hand every minute.\
   `6 − 0.5 = 5.5°/min`
3. **Divide the gap by that rate.** The hands meet 60/5.5 = 120/11 minutes after 2:00. The fractional minute is 10/11 × 60 ≈ 54.5 seconds, giving 2:10:54.5.\
   `60/5.5 = 120/11 min`\
   `(10/11) × 60 ≈ 54.5 s beyond 10 min`

**Answer:** About 2:10:54.5.

### Right angle with two solutions

**Question.** When between 4:00 and 5:00 do the hands make right angles?

1. **Write the signed gap.** At 4:00 the hour hand is 120° ahead. After m minutes the gap (hour position minus minute position) is 120 − 5.5m degrees.\
   `signed gap = 120° − 5.5m`
2. **Solve before the overlap.** Set the gap to +90°. Then 5.5m = 30, giving m = 60/11 minutes, or about 5 min 27.3 s.\
   `120 − 5.5m = 90 ⇒ m = 60/11 min`
3. **Solve after the overlap.** Set the gap to −90°. Then 5.5m = 210, giving m = 420/11 minutes, or about 38 min 10.9 s.\
   `120 − 5.5m = −90 ⇒ m = 420/11 min`
4. **Check the hour.** The signed gap runs from 120° down to −210° during the hour. Both ±90° occur in that range, while ±270° do not.\
   `5 min + (5/11) × 60 s ≈ 5 min 27.3 s`\
   `38 min + (2/11) × 60 s ≈ 38 min 10.9 s`

**Answer:** About 4:05:27.3 and 4:38:10.9.

### Smaller and larger arc

**Question.** Find both angles at 11:10.

1. **Locate the hour and minute hands.** The hour hand is at 11 × 30° + 10 × 0.5° = 335°. The minute hand is at 10 × 6° = 60°.\
   `hour = 11 × 30° + 10 × 0.5° = 335°`\
   `minute = 10 × 6° = 60°`
2. **Find one gap.** The difference between those angles is 335° − 60° = 275°.\
   `335° − 60° = 275°`
3. **Find the other route around the dial.** The two arcs total 360°, so the complementary arc is 360° − 275° = 85°.\
   `360° − 275° = 85°`

**Answer:** 85° smaller, 275° larger.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Hour angle | 30H + 0.5M using H modulo 12. |
| Minute angle | 6M. |
| Smaller angle | min(gap, 360° − gap). |
| Relative speed | 6 − 0.5 = 5.5°/min. |
| Perpendicular hands | Signed gap ≡ 90° or −90° modulo 360°. |

## Exam tips

- **Report both times when appropriate.** A right angle can occur on each side of an overlap within the same hour.
- **Keep units in degrees per minute.** Convert to clock time only after solving.
- **Avoid decimal clock notation.** 5.45 minutes is 5 min 27 s, because 0.45 minute is 27 seconds.
