An n-bit two's-complement integer covers −2ⁿ⁻¹ through 2ⁿ⁻¹−1. Signed overflow occurs when adding operands of the same sign gives the opposite sign. Fixed point places the binary point at a predetermined position. Floating point stores sign, scaled significand and exponent, using format-dependent biases and handling of subnormals and special values. Align exponents before adding and round to representable precision.

## Concepts in depth

An n-bit two's-complement number ranges from −2ⁿ⁻¹ through 2ⁿ⁻¹−1. Signed addition overflows when operands share a sign and the result has the opposite sign. Floating point adjusts exponent to align significands before adding, then normalises and rounds.

## How to apply it

For an 8-bit signed value, 100+40 exceeds 127 even if low bits can be stored. Carry out is not the signed overflow rule. Floating-point finite precision means subtraction of nearby values can lose significant digits.

## Worked example

In 4-bit two's complement, 0111 + 0001 wraps to 1000. Both inputs were positive and the represented output is negative, so overflow occurred.

## Common mistake

Carry out does not by itself indicate signed overflow. Interpret the bits using the required encoding.

## Practice

With four fractional bits, what value does unsigned fixed-point 0011.1000 represent?

**Answer:** 3.5, since the first fractional bit represents one half.
