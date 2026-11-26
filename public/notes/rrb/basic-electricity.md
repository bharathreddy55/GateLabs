## Basics first

- **Current and voltage.** Current is charge flowing per second, in amperes. Voltage is energy transferred per unit charge, in volts.
- **Resistance.** Ohm’s law at fixed resistance is V = IR. Larger resistance gives smaller current for the same voltage.
- **Series and parallel.** Series components share one current and their drops add. Parallel components connected to the same two points share one voltage and their currents add.
- **Power and energy.** Electrical power is VI. Energy equals power times run time. Billing in kWh uses kW and hours together.

## Methods and when to use them

### Method A · Reduce series and parallel groups

Add series resistances directly. In parallel add their reciprocals and invert. The equivalent positive resistance of a parallel group is smaller than any branch resistance.

### Method B · Work back through a mixed network

Reduce the parallel pair, add the remaining series resistance and find loop current. Recover voltage across the reduced pair. Apply that shared voltage separately to the requested branch.

### Method C · Find billable energy

Convert watts to kW and multiply by all operating hours. If tariff is given, multiply the result in kWh by price per kWh after accounting for any specified fixed charges.

## Question models and worked examples

### Series voltage divider

**Question.** A 6 Ω and a 3 Ω resistor are in series across 18 V. Find the drop across 6 Ω.

1. **Find total series resistance.** The same current flows in both components, and the resistances add. Rtotal = 6 + 3 = 9 Ω.\
   `6 + 3 = 9 Ω`
2. **Find that common current.** Ohm’s law gives I = V/Rtotal = 18/9 = 2 A.\
   `18 ÷ 9 = 2 A`
3. **Find the requested voltage drop.** For the 6 Ω resistor, V = IR = 2 × 6 = 12 V. The other resistor drops 6 V, so the two drops add to 18 V.\
   `2 × 6 = 12 V`

**Answer:** 12 V.

### Parallel branches

**Question.** A 6 Ω and a 3 Ω resistor are in parallel across 12 V. Find total current and resistance.

1. **Apply the same voltage to both branches.** In parallel, each resistor connects across the 12 V supply. Their currents are 12/6 = 2 A and 12/3 = 4 A.\
   `I₆ = 12/6 = 2 A and I₃ = 12/3 = 4 A`
2. **Add the branch currents.** The supply feeds both branches, so it delivers 2 + 4 = 6 A.\
   `2 + 4 = 6 A`
3. **Recover equivalent resistance.** Across the whole network, R = 12/6 = 2 Ω, which is smaller than either individual resistance.\
   `12 ÷ 6 = 2 Ω`

**Answer:** 6 A and 2 Ω.

### Mixed network

**Question.** A 4 Ω resistor is in series with two parallel 6 Ω resistors across 14 V. Find current in one 6 Ω branch.

1. **Reduce the parallel pair.** Two equal 6 Ω resistors in parallel have equivalent resistance 3 Ω. With the series 4 Ω resistor, the total is 7 Ω.\
   `Rparallel = 1/(1/6 + 1/6) = 3 Ω`
2. **Find voltage across the pair.** The total current is 14/7 = 2 A. The equivalent parallel block has drop 2 × 3 = 6 V.\
   `I = 14/(4 + 3) = 2 A`\
   `Vparallel = 2 × 3 = 6 V`
3. **Find current in one branch.** Both 6 Ω branches get that same 6 V. Each draws 6/6 = 1 A, and their currents add to the total 2 A.\
   `6 ÷ 6 = 1 A per branch`

**Answer:** 1 A in each branch.

### Power and billing units

**Question.** A 500 W fan runs 4 hours daily for 6 days. How many units of electrical energy does it use if one unit is 1 kWh?

1. **Convert power to kilowatts.** Divide 500 W by 1,000 to get 0.5 kW. Kilowatts pair with hours for billing.\
   `500 W = 0.5 kW`
2. **Add the operating hours.** Four hours a day for six days gives 4 × 6 = 24 h of use.\
   `4 × 6 = 24 h`
3. **Calculate billed energy.** Energy = power × time = 0.5 × 24 = 12 kWh. At one unit per kWh, this is 12 units.\
   `0.5 × 24 = 12 kWh`

**Answer:** 12 kWh, or 12 units.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Ohm’s law | V = IR. |
| Series equivalent | R₁ + R₂ + … . |
| Parallel equivalent | 1/R = 1/R₁ + 1/R₂ + … . |
| Power in a resistor | P = VI = I²R = V²/R. |
| Billed energy | kWh = power in kW × time in hours. |

## Exam tips

- **Trace the nodes.** Parts that look side by side are parallel only if they share both connections.
- **Check the voltage sum.** In a series loop, drops should sum to the supply voltage in these ideal circuit models.
- **Check branch currents.** Loop current entering a junction equals the sum of its outgoing branch currents.
