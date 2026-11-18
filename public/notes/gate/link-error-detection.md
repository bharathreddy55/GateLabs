Parity detects an odd number of bit flips in the protected group. A checksum combines blocks under an agreed arithmetic rule. A CRC appends a remainder computed by polynomial division over GF(2). A receiver checks divisibility by the same generator. Detection capability depends on the generator and error pattern.

## Worked example

With even parity, the four data bits 1011 have three ones, so append 1 to make the total even. Flipping one transmitted bit produces odd parity.

## Common mistake

Error detection and correction have different goals. Parity can flag a single error without identifying which bit changed.

## Practice

Does a single even-parity check always detect two flipped bits?

**Answer:** No. Two flips preserve the parity of the number of ones.
