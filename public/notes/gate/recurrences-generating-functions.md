A recurrence needs initial conditions and a rule connecting terms. For linear homogeneous recurrences with constant coefficients, use characteristic roots. A generating function G(x)=Σ aₙxⁿ encodes terms as coefficients, and multiplying such series performs convolution. Treat the series formally when convergence is irrelevant.

## Concepts in depth

Linear homogeneous recurrences with constant coefficients can be solved by characteristic equations. Repeated root r of multiplicity m gives terms nʲrⁿ for 0≤j<m. Ordinary generating functions turn shifts into multiplication by x after subtracting initial terms.

## How to apply it

If aₙ=2aₙ₋₁ with a₀=3, then A(x)−3=2xA(x), so A(x)=3/(1−2x). The coefficient of xⁿ is 3·2ⁿ. Carry base cases into both recurrence and series solutions. The coefficient of xⁿ in (1−rx)⁻² is (n+1)rⁿ, which often signals a repeated root in a linear recurrence.

## Worked example

For a₀=1 and aₙ=2aₙ₋₁, G(x)−1=2xG(x), so G(x)=1/(1−2x) and aₙ=2ⁿ.

## Common mistake

Track the initial term when shifting an index. xG(x) starts one power later than G(x).

## Practice

If a₀=0 and aₙ=aₙ₋₁+3, find a₄.

**Answer:** 12, after four additions of three.
