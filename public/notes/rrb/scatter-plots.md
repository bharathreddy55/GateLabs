## Basics first

- **Paired observations.** The point (x,y) records one response y for a measured x. Every plotted point comes from a pair, not a total across several observations.
- **Direction and shape.** As x increases, y may generally rise or fall. A straight reference line can be a reasonable summary when the pattern is approximately linear.
- **Fitted value and residual.** The fitted line predicts a response at a given x. Residual = actual y − predicted y. It is a signed vertical difference.
- **Correlation and cause.** A relationship on a plot can arise from cause, reverse direction, a third factor or sampling. The plot alone does not distinguish them.

## Methods and when to use them

### Method A · Describe the cloud in order

Identify direction, then whether the form is linear or curved, then how tightly the points follow it. Look for an unusual point before treating the overall slope as representative.

### Method B · Separate estimate from observation

For a fitted-line estimate, use two points on the fitted line to find its slope. For a residual, compare the predicted value and the actual observation at exactly the same x.

### Method C · Test claims with a rival explanation

When asked whether a pattern establishes causation, think of a plausible variable that could influence both measurements. Confounding explains why the plotted association alone cannot decide the causal direction.

## Question models and worked examples

### Read direction and form

**Question.** Points are near (1,9), (2,7), (3,6), (4,4), (5,3). Describe the pattern.

**Picture it.** Trace the points from left to right. See which way they go and imagine drawing a straight strip through the middle of them.

1. **Compare x with y.** As x advances from 1 to 5, the listed y-values fall from about 9 to about 3. This points to a negative association.
2. **Inspect the size of each fall.** Over equal x steps, the changes are roughly −2, −1, −2 and −1. The rates differ a little but stay close.\
   `successive y changes: −2, −1, −2, −1`
3. **Describe direction and shape.** A downward straight trend is a reasonable summary, so the association is negative and roughly linear.

**Answer:** Negative, roughly linear association.

### Residual and outlier

**Question.** A trend line predicts 22 faults at x=8. The plotted value is 35. Find the residual and interpret its sign.

**Picture it.** Put your finger on x = 8. Find the dot and the line straight above it. The signed gap is how much higher or lower the dot sits.

1. **Match observed and fitted values.** At x = 8, the actual point is at y = 35 and the fitted line is at y = 22. The residual compares them at that same x.\
   `observed = 35, predicted = 22`
2. **Apply the signed convention.** Residual = observed − fitted = 35 − 22 = +13 faults.\
   `35 − 22 = +13 faults`
3. **Interpret the sign.** A positive residual places the observation above the trend line. The plot would need other residuals to establish how unusual it is.

**Answer:** +13 faults.

### Slope and interpolation

**Question.** A fitted straight line passes through (2,15) and (6,27). Estimate y at x=4.

**Picture it.** The line gives you two known spots. Find how much it goes up in one step to the right, then take two steps from the left spot.

1. **Calculate the fitted slope.** From x = 2 to x = 6, y rises by 27 − 15 = 12. The slope is 12 ÷ 4 = 3 per x unit.\
   `(27 − 15)/(6 − 2) = 3`
2. **Move from a known point.** x = 4 is two units beyond x = 2. The predicted response therefore rises by 2 × 3 = 6.\
   `3 × (4 − 2) = 6`
3. **Read the fitted value.** Add the rise to the starting y-value, 15 + 6 = 21. This is an interpolation between known points.\
   `15 + 6 = 21`

**Answer:** 21.

### Correlation and causal claim

**Question.** Stores with more staff have higher daily sales. Does the scatter plot alone show that adding staff raises sales?

**Picture it.** A bigger store may have more workers and more customers. Two things moving together can still come from another cause.

1. **State the observed pattern.** The graph shows higher sales at stores with more staff, an association between the two variables.
2. **Find a plausible alternative explanation.** Store size could increase staffing and sales at the same time. The graph gives no comparison that keeps store size and similar factors fixed.
3. **Judge the causal claim.** Several explanations fit the same points, so the plot alone cannot isolate the effect of adding staff.

**Answer:** No causal conclusion follows from the scatter plot alone.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Direction of association | Rising points suggest positive association. Falling points suggest negative association. |
| Residual | Observed − predicted. A positive residual is above the fitted line. |
| Fitted slope | Change in predicted y ÷ change in x. |
| Prediction inside the observed range | Interpolation on the stated model. |

## Exam tips

- **Keep the dependent variable on the correct axis.** A slope’s units are vertical units per horizontal unit.
- **Avoid declaring an outlier by sign alone.** Use the size of a residual relative to typical spread.
- **Reserve cause for evidence that separates alternatives.** A time order or a plausible mechanism can help, but patterns alone leave other explanations open.
