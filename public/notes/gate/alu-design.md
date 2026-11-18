An ALU selects arithmetic and logical functions under control bits. A full-adder chain can add multiple bits. To subtract B from A in two's complement, complement B and set initial carry-in to one. Multiplexers can choose outputs among arithmetic and logic paths. Ripple carry is simple, while carry lookahead reduces long sequential carry dependencies.

## Worked example

A−B is computed by A+¬B+1. For 4-bit A=5 and B=2, 0101+1101+1=1 0011, giving low four bits 3.

## Common mistake

The carry-out and signed overflow flags answer different questions.

## Practice

Why can a carry-lookahead adder be faster than ripple carry?

**Answer:** It forms carries from generate and propagate relationships without waiting for each previous adder in a single chain.
