Sequential circuits store state. A D flip-flop samples D at its active clock edge. A T flip-flop toggles when T=1, and a JK flip-flop toggles when J=K=1. To design an FSM, choose states, draw transitions, encode states and derive next-state logic. Moore outputs depend on state, while Mealy outputs depend on state and input. Counters cycle through states.

## Worked example

A modulo-6 counter needs at least three flip-flops because two bits represent only four states. Specify transitions for unused encodings to ensure recovery if required.

## Common mistake

A latch is level-sensitive, while an edge-triggered flip-flop samples at an edge. Account for setup and hold timing.

## Practice

What state does a D flip-flop take on its next active edge if D=1 and timing is met?

**Answer:** It stores 1.
