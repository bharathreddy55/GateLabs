A combinational circuit's current outputs depend on current inputs. Build a truth table, derive expressions, simplify and choose gates or larger blocks. A decoder selects a line for an input code. A multiplexer selects an input by control bits. A full adder uses sum A XOR B XOR Cin and majority carry.

## Concepts in depth

Combinational outputs depend on present inputs. A multiplexer selects one data input by address bits. A decoder activates a line associated with an encoded input. Adders expose separate sum and carry functions. Check whether enable signals are active-high or active-low.

## How to apply it

A 4-to-1 multiplexer can implement a function of two select variables by wiring its four data inputs to the truth-table outputs. For additional variables, each data input may be a small function instead of a constant.

## Worked example

For adding bits A=1, B=1, Cin=0, sum is 0 and carry is 1. Use output values to check a derived truth table.

## Common mistake

A decoder and multiplexer perform different mappings. A multiplexer chooses among data inputs.

## Practice

How many select bits address eight inputs?

**Answer:** Three, since 2³=8.
