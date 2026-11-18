An n-bit two's-complement integer covers −2ⁿ⁻¹ through 2ⁿ⁻¹−1. Signed overflow occurs when adding operands of the same sign gives the opposite sign. Fixed point places the binary point at a predetermined position. Floating point stores sign, scaled significand and exponent, using format-dependent biases and handling of subnormals and special values. Align exponents before adding and round to representable precision.

## Worked example

In 4-bit two's complement, 0111 + 0001 wraps to 1000. Both inputs were positive and the represented output is negative, so overflow occurred.

## Common mistake

Carry out does not by itself indicate signed overflow. Interpret the bits using the required encoding.

## Practice

With four fractional bits, what value does unsigned fixed-point 0011.1000 represent?

**Answer:** 3.5, since the first fractional bit represents one half.
