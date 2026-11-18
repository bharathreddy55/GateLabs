An ISA defines instructions, registers, encodings and visible machine behaviour. Immediate data appears in the instruction. Register operands come from registers. Direct addressing encodes an address, register indirect uses a register as a pointer, and indexed or base-plus-offset forms compute an effective address. PC-relative branching adds a signed offset to the appropriate PC value for the ISA.

## Worked example

If R2=1000 and a base-plus-offset load is LOAD R1, 12(R2), the effective address is 1012 for a byte-addressed machine with a byte offset.

## Common mistake

Distinguish the effective address from the contents stored there. The load reads memory at that address.

## Practice

What does immediate addressing typically avoid?

**Answer:** An extra memory read to obtain the operand value, because the operand is encoded in the instruction.
