The control unit asserts datapath signals that move values, select ALU operations and start memory accesses. Hardwired control derives them from state, instruction and flags using logic. Microprogrammed control fetches microinstructions from a control store and sequences them. Both implement the externally visible instruction behaviour.

## Worked example

An instruction requires reading two registers, adding their values and writing a destination. Control selects source registers and add, enables writeback and specifies its destination.

## Common mistake

Machine instructions are visible to software. Microinstructions are internal steps in one possible implementation.

## Practice

What makes microprogrammed control easier to change in a writable implementation?

**Answer:** Changing the control-store sequence can alter internal steps without redesigning all the control logic.
