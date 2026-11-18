Turing machines have finite control and a read–write tape. A decider halts on every input. A recognizer accepts every member, while it may reject or loop on nonmembers. Prove undecidability by reducing a known undecidable problem to the target: a target decider would decide the source. The halting problem is a standard source.

## Worked example

If a computable transformation maps any halting instance to a target instance with an identical yes/no answer, a target decider followed after the transformation would decide halting. This contradicts undecidability.

## Common mistake

The reduction direction matters. Reducing the target to a hard problem does not by itself establish target hardness.

## Practice

If both a language and its complement are recognizable, what follows?

**Answer:** It is decidable. Run both recognizers in interleaved steps until one accepts.
