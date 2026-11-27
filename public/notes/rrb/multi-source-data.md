## Basics first

- **Match point.** Tables and charts can describe the same entity in different orders. Match station or depot name and period before joining counts.
- **Population and time.** A rate applies to the people, services or period named in its footnote. A combined yearly total cannot give a single station’s daily figure without more data.
- **Nested share.** “40% of digital sales” describes a subset of the 60% digital share. The overall share of the smaller group is the product of those fractions.
- **Exposure and rate.** Exposure is the denominator, such as the number of machines. Expressing faults per 100 machines makes groups of different sizes comparable.

## Methods and when to use them

### Method A · Build numerator and denominator pairs

Use a small scratch table with entity, time, count and base. Join a rate or rule only to the row it covers. Convert any percentage to a count before adding different groups.

**When to use it.** Use this in **Multi-source Data Analysis / Combining Rates and Counts** questions when a table and a chart give different parts of the same calculation, such as a total in one source and its rate in another.

### Method B · Follow the group within the group

Start at the whole, find the first subgroup, and then take the share of that subgroup. To answer what percent of the original whole the result represents, divide by the overall total.

**When to use it.** Use this in **Multi-source Data Analysis / Nested Groups** questions when a question gives a percentage of a subgroup and asks what the result represents out of the original whole.

### Method C · Make two possible examples if data look incomplete

Keep each disclosed figure fixed and vary the missing value. If two plausible values give different answers, the sources do not determine a unique result.

**When to use it.** Use this in **Multi-source Data Analysis / Missing Information** questions when asked whether combined sources determine a unique answer and an input appears to be missing.

## Question models and worked examples

### Text rule plus volumes

**Question.** A table gives 800 weekday and 500 weekend bookings. A notice gives cancellation rates of 5% and 12% respectively. How many bookings remain?

**Picture it.** Put weekday and weekend bookings in separate piles. Take the correct cancelled share from each pile, then bring the remaining bookings together.

1. **Match the weekday numbers.** The table’s 800 weekday bookings use the notice’s 5% cancellation rate. The retained count is 800 × 0.95 = 760.\
   `800 × (1 − 0.05) = 760`
2. **Match the weekend numbers.** For 500 weekend bookings use the separate 12% cancellation rate. The retained count is 500 × 0.88 = 440.\
   `500 × (1 − 0.12) = 440`
3. **Add disjoint periods.** Weekday and weekend bookings are separate, so 760 + 440 = 1,200 bookings remain.\
   `760 + 440 = 1,200 bookings`

**Answer:** 1200 bookings.

### Chart share and nested subgroup

**Question.** A chart shows digital sales are 60% of 2,500 tickets. A note says 40% of digital sales used the mobile app. Find app bookings and their share of all sales.

**Picture it.** Picture a big box of all tickets with a smaller box of digital tickets inside. App tickets are a smaller box within that one.

1. **Find the first subgroup.** Digital sales make up 60% of all 2,500 tickets. Thus the digital subgroup contains 2,500 × 0.60 = 1,500 tickets.\
   `2,500 × 0.60 = 1,500 digital`
2. **Use the correct base for app sales.** The 40% applies only to the digital subgroup, so 1,500 × 0.40 = 600 app tickets.\
   `1,500 × 0.40 = 600 app`
3. **Express that count as a share of all sales.** Divide 600 by the overall 2,500 and convert to a percent. Equivalently, multiply the nested shares 0.60 × 0.40 = 0.24.\
   `600/2,500 = 0.24 = 24%`

**Answer:** 600 tickets, 24% of all sales.

### Compare rates using a second source

**Question.** A table lists 45 faults at Depot A and 36 at B. A second table gives 900 machines at A and 600 at B. Which fault count per 100 machines is lower?

**Picture it.** Imagine two depots with very different numbers of machines. Ask how many faults each would have per 100 machines at its own rate so you can compare fairly.

1. **Join fault counts with depot sizes.** Pair A’s 45 faults with its 900 machines and B’s 36 faults with its 600 machines. The equipment totals supply the denominators.\
   `A: 45 faults over 900 machines. B: 36 over 600.`
2. **Put both rates on the same scale.** A has 45/900 × 100 = 5 faults per 100 machines. B has 36/600 × 100 = 6 per 100.\
   `A: 45/900 × 100 = 5. B: 36/600 × 100 = 6.`
3. **Compare rates rather than counts.** A has more recorded faults in total but fewer per 100 machines. The question asks for the lower rate, so choose A.\
   `5 < 6 faults per 100 machines`

**Answer:** A, with 5 faults per 100 machines.

### Spot incompatible evidence

**Question.** A chart gives travel for four stations combined. A table lists Station C’s capacity. Can you determine Station C’s utilisation from these alone?

**Picture it.** You know how many people used all four stations and how much Station C can hold. Two very different amounts at C can still give the same four-station total.

1. **State the calculation needed.** Station C’s utilisation requires its actual usage divided by its own capacity, measured for the same period.\
   `utilisation of C = usage of C ÷ capacity of C`
2. **Locate the missing input.** The table provides C’s capacity. The chart gives one combined usage total for four stations, so it leaves C’s separate usage unknown.
3. **Test whether the total settles the issue.** Some usage could shift from another station to C while the total stays fixed. C’s utilisation would change, so it cannot be determined.

**Answer:** No. Station C’s own usage is needed.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Group after cancellations | Bookings × (1 − cancellation proportion). |
| Nested share | Outer share × share within that subgroup. |
| Faults per 100 machines | Fault count ÷ machine count × 100. |
| Station utilisation | That station’s usage ÷ that station’s available capacity. |

## Exam tips

- **Align before comparing.** Read time period, unit and population on every source.
- **Treat averages cautiously.** A group rate gives no individual rate without extra information.
- **Name the missing fact.** If evidence is incomplete, say exactly which matching denominator or numerator you need.
