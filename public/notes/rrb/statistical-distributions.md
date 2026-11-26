## Basics first

- **Distribution.** A distribution tells how observations spread over values or intervals. Check numerical range, centre, spread and shape separately.
- **Frequency and density.** Frequency counts observations. In a histogram with frequency density on the vertical axis, each bar’s area equals frequency.
- **Cumulative frequency.** A cumulative count includes every observation below its boundary. Subtract adjacent cumulative counts to reconstruct an interval count.
- **Skew and symmetry.** The skew is named by the long tail. For a symmetric density curve, intervals reflected across the centre have equal area.

## Methods and when to use them

### Method A · Read area rather than height in a density histogram

Find each interval width from axis boundaries, then multiply the width by its height. This permits true count comparisons when intervals have unequal widths.

### Method B · Locate central ranks with fewer details

Find total n from the last cumulative count. Identify ranks (n+1)/2 for odd n or n/2 and n/2+1 for even n. Read where those ranks fall. Grouped counts can locate the middle class without giving an exact median.

### Method C · Decide what the shape supports

Find the crowded region and look for the longer sparse tail. With a symmetric continuous curve, reflect endpoints across the centre and add matching areas. A single endpoint has no area.

## Question models and worked examples

### Unequal-width histogram

**Question.** A band of width 5 has frequency density 4. Another of width 10 has density 3. Which has more readings?

1. **Use area for a density histogram.** The vertical scale is frequency density. A bar’s frequency is width × density.\
   `frequency = width × density`
2. **Find both bar areas.** The first band represents 5 × 4 = 20 readings. The second represents 10 × 3 = 30 readings.\
   `5 × 4 = 20 and 10 × 3 = 30`
3. **Compare frequencies.** The second band is lower in height and twice as wide. Its area is larger by 30 − 20 = 10 readings.\
   `30 − 20 = 10 more readings`

**Answer:** The second band, by 10.

### Recover a class and median band

**Question.** Cumulative counts below 10, 20, 30 and 40 are 8, 21, 37 and 48. Find the count from 20 inclusive to 30 exclusive and the median band.

1. **Subtract cumulative boundaries.** Below 30 there are 37 readings, and below 20 there are 21. The class 20 ≤ x < 30 therefore contains 37 − 21 = 16.\
   `37 − 21 = 16`
2. **Find the two central ranks.** The total is 48, so median positions are 24 and 25 in sorted order.\
   `48/2 = 24, second middle rank = 25`
3. **Locate the band containing those ranks.** They are after the first 21 readings and inside the first 37. Both are in the 20–30 band.\
   `21 < 24 < 25 ≤ 37 ⇒ both in 20–30`

**Answer:** 16 observations. Median band is 20–30.

### Recognise skew

**Question.** Most times lie around 10–15 minutes, but increasingly sparse values stretch as far as 60 minutes on the high side. What shape is indicated?

1. **Locate the bulk of the readings.** Most times cluster near 10–15 minutes, so that is where the distribution is concentrated.
2. **Identify where the tail extends.** A few progressively sparser observations continue to 60 minutes, well above the main cluster.
3. **Name the skew by its tail.** Larger values sit to the right on an increasing axis, giving a long right tail and right skew.

**Answer:** Right-skewed.

### Symmetric curve area

**Question.** A continuous symmetric distribution centred at 50 has 18% of its area between 50 and 60. What share lies between 40 and 60?

1. **Find the mirror interval.** Reflection around 50 sends the endpoints 50 and 60 to 50 and 40. Thus 40–50 mirrors 50–60.\
   `50 − (60 − 50) = 40`
2. **Use symmetry of area.** The two sides of the curve mirror each other, giving another 18% in the interval 40–50.\
   `area from 40 to 50 = 18%`
3. **Add the adjacent shares.** These intervals cover 40–60. The single point 50 has zero area in a continuous distribution, so the total is 18% + 18% = 36%.\
   `18% + 18% = 36%`

**Answer:** 36%.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Frequency-density bar | Frequency = class width × frequency density. |
| Count in an interval | Cumulative upper boundary minus cumulative lower boundary. |
| Symmetric intervals around μ | Area from μ−a to μ equals area from μ to μ+a. |
| Right-skewed distribution | Long tail stretches towards larger values. |

## Exam tips

- **Check what the y-axis measures.** A bar marked frequency density needs multiplication by width.
- **Read the boundary convention.** “Below 30” excludes values at 30.
- **Avoid reporting a precise median from a band.** Values inside a band are unknown unless the problem supplies more.
