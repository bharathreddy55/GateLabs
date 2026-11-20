An ALU selects arithmetic and logical functions under control bits. A full-adder chain can add multiple bits. To subtract B from A in two's complement, complement B and set initial carry-in to one. Multiplexers can choose outputs among arithmetic and logic paths. Ripple carry is simple, while carry lookahead reduces long sequential carry dependencies.

## Concepts in depth

An ALU combines arithmetic, logic and shift data paths controlled by an operation code. Subtraction in two's complement can use A+NOT(B)+1. Zero, sign, carry and overflow describe distinct properties of the result or addition.

## How to apply it

For a ripple-carry adder, a carry may travel through all stages. Carry lookahead uses propagate and generate relations to reduce this dependency. Distinguish signed overflow from unsigned carry when evaluating flags.

## Worked example

A−B is computed by A+¬B+1. For 4-bit A=5 and B=2, 0101+1101+1=1 0011, giving low four bits 3.

## Common mistake

The carry-out and signed overflow flags answer different questions.

## Practice

Why can a carry-lookahead adder be faster than ripple carry?

**Answer:** It forms carries from generate and propagate relationships without waiting for each previous adder in a single chain.
