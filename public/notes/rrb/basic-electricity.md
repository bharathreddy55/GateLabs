## What it means

Current is the rate of charge flow. Potential difference is energy transferred per unit charge, and resistance describes how strongly an element opposes current. A circuit requires a closed path for steady current. In series each element carries the same current; in parallel each branch across the same nodes has the same potential difference.

## Formulas and rules

- **Charge, voltage and resistance:** I=Q/t; V=E/Q. Ohm’s law V=IR applies to an ohmic element at constant physical conditions.
- **Series:** Rtotal=R₁+R₂+…; voltage drops add. **Parallel:** 1/Rtotal=1/R₁+1/R₂+…; branch currents add. For positive resistances, parallel total is below its smallest branch resistance.
- **Power and energy:** P=VI. For a resistor, P=I²R=V²/R. Energy=Pt; use kilowatts and hours for kWh.
- **Meters:** An ammeter goes in series with the branch measured. A voltmeter goes across two points.

## How to study it for Station Master

- Redraw the wire junctions and mark elements sharing exactly two nodes. Reduce an obvious parallel or series group first, then work back to branch quantities.
- Practise power at fixed voltage versus fixed current. The resistor with higher power can change between those cases.

## Question models and worked examples

### Series voltage divider

**Question.** A 6 Ω and a 3 Ω resistor are in series across 18 V. Find the drop across 6 Ω.

1. **Find total series resistance.** The same current flows in both components, and the resistances add. Rtotal = 6 + 3 = 9 Ω.
2. **Find that common current.** Ohm’s law gives I = V/Rtotal = 18/9 = 2 A.
3. **Find the requested voltage drop.** For the 6 Ω resistor, V = IR = 2 × 6 = 12 V. The other resistor drops 6 V, so the two drops add to 18 V.

**Answer:** 12 V.

### Parallel branches

**Question.** A 6 Ω and a 3 Ω resistor are in parallel across 12 V. Find total current and resistance.

1. **Apply the same voltage to both branches.** In parallel, each resistor connects across the 12 V supply. Their currents are 12/6 = 2 A and 12/3 = 4 A.
2. **Add the branch currents.** The supply feeds both branches, so it delivers 2 + 4 = 6 A.
3. **Recover equivalent resistance.** Across the whole network, R = 12/6 = 2 Ω, which is smaller than either individual resistance.

**Answer:** 6 A and 2 Ω.

### Mixed network

**Question.** A 4 Ω resistor is in series with two parallel 6 Ω resistors across 14 V. Find current in one 6 Ω branch.

1. **Reduce the parallel pair.** Two equal 6 Ω resistors in parallel have equivalent resistance 3 Ω. With the series 4 Ω resistor, the total is 7 Ω.
2. **Find voltage across the pair.** The total current is 14/7 = 2 A. The equivalent parallel block has drop 2 × 3 = 6 V.
3. **Find current in one branch.** Both 6 Ω branches get that same 6 V. Each draws 6/6 = 1 A, and their currents add to the total 2 A.

**Answer:** 1 A in each branch.

### Power and billing units

**Question.** A 500 W fan runs 4 hours daily for 6 days. How many units of electrical energy does it use if one unit is 1 kWh?

1. **Convert power to kilowatts.** Divide 500 W by 1,000 to get 0.5 kW. Kilowatts pair with hours for billing.
2. **Add the operating hours.** Four hours a day for six days gives 4 × 6 = 24 h of use.
3. **Calculate billed energy.** Energy = power × time = 0.5 × 24 = 12 kWh. At one unit per kWh, this is 12 units.

**Answer:** 12 kWh, or 12 units.
