Parity detects an odd number of bit flips in the protected group. A checksum combines blocks under an agreed arithmetic rule. A CRC appends a remainder computed by polynomial division over GF(2). A receiver checks divisibility by the same generator. Detection capability depends on the generator and error pattern.

## Concepts in depth

Parity detects odd numbers of bit flips. Checksums combine words under a specified arithmetic. CRC uses polynomial division over GF(2), with XOR in place of carries. Hamming distance governs minimum detectable or correctable errors.

## How to apply it

A code with minimum distance 3 detects up to 2 errors and corrects 1 under the standard distance bounds. Do not assume any detection method repairs data without a separate correction or retransmission scheme.

## Worked example

With even parity, the four data bits 1011 have three ones, so append 1 to make the total even. Flipping one transmitted bit produces odd parity.

## Common mistake

Error detection and correction have different goals. Parity can flag a single error without identifying which bit changed.

## Practice

Does a single even-parity check always detect two flipped bits?

**Answer:** No. Two flips preserve the parity of the number of ones.
