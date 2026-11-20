An ISA defines instructions, registers, encodings and visible machine behaviour. Immediate data appears in the instruction. Register operands come from registers. Direct addressing encodes an address, register indirect uses a register as a pointer, and indexed or base-plus-offset forms compute an effective address. PC-relative branching adds a signed offset to the appropriate PC value for the ISA.

## Concepts in depth

Immediate mode embeds a value. Direct mode names a memory location. Indirect uses a pointer. Indexed or base-displacement modes compute effective address using a register plus offset. PC-relative offsets are interpreted with the PC convention stated in the problem.

## How to apply it

If a base register holds 2000 and displacement is 24 bytes, effective address is 2024. Do not confuse this address with the word it contains. On a word-addressed machine the distance units may differ from byte-addressed machines.

## Worked example

If R2=1000 and a base-plus-offset load is LOAD R1, 12(R2), the effective address is 1012 for a byte-addressed machine with a byte offset.

## Common mistake

Distinguish the effective address from the contents stored there. The load reads memory at that address.

## Practice

What does immediate addressing typically avoid?

**Answer:** An extra memory read to obtain the operand value, because the operand is encoded in the instruction.
